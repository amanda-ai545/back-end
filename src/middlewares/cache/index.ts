import { Request, Response, NextFunction } from "express";
import NodeCache from "node-cache";

const cache = new NodeCache();

export const cacheMiddleware =
  (duration: number) => (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== "GET") {
      console.error("[cache]: cannot cache non-GET methods");
      throw new Error("[cache]: cannot cache non-GET methods");
    }

    const key = req.originalUrl;
    const cachedResponse = cache.get(key);
    if (typeof cachedResponse === "undefined") {
      console.log(`[cache]: missing key - ${key}`);
      const originalJson = res.json;
      res.json = (body) => {
        // set cache
        cache.set(key, body, duration);

        // return the original response object
        return originalJson.call(res, body);
      };
      next();
    } else {
      console.log(`[cache]: hit key - ${key}`);
      res.json(cachedResponse);
    }
  };
