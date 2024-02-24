import request from "supertest";
import { app, server } from "../app";

describe("GET /users", () => {
  it("responds with 200 with user data", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
  });
});

describe("GET /users/:id", () => {
  it("responds with 400 and error message if ID is not a number", async () => {
    const response = await request(app).get("/users/invalid_id");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "invalid user id" });
  });

  it("responds with 404 and error message if user is not found", async () => {
    const response = await request(app).get("/users/999"); // assuming user with ID 999 does not exist

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Not Found" });
  });
});

describe("POST /users/create", () => {
  test("should create a new user", async () => {
    const response = await request(app)
      .post("/users/create")
      .send({ name: "morepheus", job: "leader" });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("name", "morepheus");
    expect(response.body).toHaveProperty("job", "leader");
  });

  test("should return 400 for invalid user data", async () => {
    const response = await request(app)
      .post("/users/create")
      .send({ name: "morepheus" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "invalid user data, both name and job are required",
    );
  });
});

afterAll((done) => {
  server.close(done);
});
