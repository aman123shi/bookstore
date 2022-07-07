const request = require("supertest");
const server = require("../app");
describe("/api/books", () => {
  describe("/GET", () => {
    it("should return all the books ", async () => {
      let res = await request(server).get("/api/books");
    });
  });
});
