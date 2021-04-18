import request from "supertest";
import { getConnection } from "typeorm";
import app from "../../src/app";
import connections from "../../src/database/connections";

beforeAll(async () => {
  await connections.create('test');
});

afterAll(async () => {
  await connections.clear();
  await getConnection().dropDatabase();
  await connections.close();
});

describe("USER", () => {
  it("should return 200 with a new user", async () => {
    const res = await request(app).post("/api/v1/user").send({
      name: "Xavero",
      email: "evandromelos@hotmail.com",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('name');
    expect(res.body.name).toBe('Xavero');
  });

  it("should return 409 if user already exists", async () => {
    const res = await request(app).post("/api/v1/user").send({
      name: "Xavero",
      email: "evandromelos@hotmail.com",
    });
    expect(res.status).toBe(409);
    expect(res.body).toEqual({
      "message": "User Xavero with evandromelos@hotmail.com e-mail already exists",
      "status":"error"
    });
  });

  it("should return 200 with a updated user", async () => {
    const res = await request(app).patch("/api/v1/user").send({
      name: "Xavero",
      email: "evandromelos@hotmail.com",
      subreddits: [
        "https://www.reddit.com/r/games/",
        "https://www.reddit.com/r/music/",
        "https://www.reddit.com/r/tech/"
      ]
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('subreddits');
    expect(res.body.subreddits[0]).toEqual({url: "https://www.reddit.com/r/games/"});
  });

  it("should return 200 and add a new subreedit", async () => {
    const res = await request(app).post("/api/v1/user/subreddit").send({
      "email": "evandromelos@hotmail.com",
      "subreddits": [
        "https://www.reddit.com/r/drums/"
      ]
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('subreddits');
    expect(res.body.subreddits).toEqual([
      {"url": "https://www.reddit.com/r/games/"},
      {"url": "https://www.reddit.com/r/music/"},
      {"url": "https://www.reddit.com/r/tech/"},
      {"url": "https://www.reddit.com/r/drums/"}
    ]);
  });

  it("should return 200 and LOCK the newletter's user", async () => {
    const res = await request(app).post("/api/v1/user/newsletter/turnon").send({
      email: "evandromelos@hotmail.com",
    });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({"message": "User Xavero with evandromelos@hotmail.com email has turned the newsletter ON"});
  });

  it("should return 200 and UNLOCK the newletter's user", async () => {
    const res = await request(app).post("/api/v1/user/newsletter/turnoff").send({
      email: "evandromelos@hotmail.com",
    });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({"message": "User Xavero with evandromelos@hotmail.com email has turned the newsletter OFF"});
  });

  it("should return 200 and return All Users", async () => {
    const res = await request(app).get("/api/v1/");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });
});
