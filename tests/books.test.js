const request = require("supertest");
const server = require("../app");
describe("/api/books", () => {
  describe("/GET", () => {
    it("should return array of books ", async () => {
      let res = await request(server).get("/api/books");
      expect(res.body).toBe([]);
    });
    it("should only filtered books based on query ", async () => {
      let price = 100;
      let res = await request(server).get("/api/books?price=" + price);
      expect(res.body[0].price).toEqual(price);
    });
  });

  describe("/POST", () => {
    it("should return status 401  when invalid data is sent", async () => {
      let res = await request(server)
        .post("/api/books")
        .send({ firstName: "" });
      expect(res.status).toBe(401);
    });
  });
});
