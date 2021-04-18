import request from "supertest";
import app from "../../src/app";

describe("GET /random-url", () => {
  it("should return 404", async (done) => {
    const res = await request(app).get("/test");
    expect(res.status).toBe(404);
    done();
  });
});
