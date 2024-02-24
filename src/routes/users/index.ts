import express, { Request, Response, NextFunction } from "express";
import { isAxiosError } from "axios";
import { createUser, getAllUsers, getUserById } from "../../services/users";
import { cacheMiddleware } from "../../middlewares/cache";

const router = express.Router();

// duration: 1 = 1 second
const getAllUsersCacheDuration = 120; // 2 minutes
const getUserByIdCacheDuration = 300; // 5 minutes

router.get(
  "/",
  cacheMiddleware(getAllUsersCacheDuration),
  async (req: Request, res: Response) => {
    try {
      const defaultPage = 1;
      const { page } = req.query;
      const pageNumber: number = page
        ? parseInt(page as string, 10)
        : defaultPage;

      const data = await getAllUsers(pageNumber);

      res.status(200).json(data);
    } catch (error: unknown) {
      res.status(500).json({ error: "internal server error" });
    }
  },
);

router.get(
  "/:id",
  cacheMiddleware(getUserByIdCacheDuration),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = parseInt(id as string, 10);

    if (isNaN(userId)) {
      res.status(400).json({ error: "invalid user id" });
      return;
    }

    try {
      const data = await getUserById(userId);

      res.status(200).json(data);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        res
          .status(error?.response?.status as number)
          .json({ error: error?.response?.statusText });
        return;
      }
      res.status(500).json({ error: "internal server error" });
    }
  },
);

router.post("/create", async (req: Request, res: Response) => {
  const { name, job } = req.body;
  try {
    if (!name || !job) {
      res
        .status(400)
        .json({ error: "invalid user data, both name and job are required" });
      return;
    }

    const data = await createUser({ name, job });

    console.log(`[server]: new user added - ${name}`);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

export default router;
