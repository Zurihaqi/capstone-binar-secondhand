const request = require("supertest");
const { sequelize } = require("../server/db/models/index");
const { queryInterface } = sequelize;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = require("../app");

describe("GET All Users Testing", () => {
  it("Success", (done) => {
    request(app)
      .get("/api/users")
      //   .set("authorization", token)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(200);
          expect(res.body).toHaveProperty("data");
          done();
        }
      });
  });
  //   it("Unauthorized", (done) => {
  //     request(app)
  //       .get("/api/cities")
  //       .end((err, res) => {
  //         if (err) {
  //           done(err);
  //         } else {
  //           expect(res.status).toBe(401);
  //           expect(res.body).toHaveProperty("status");
  //           expect(res.body.status).toBe("Unauthorized");
  //           done();
  //         }
  //       });
  //   });
  //   it("Invalid Token", (done) => {
  //     request(app)
  //       .get("/api/cities")
  //       .set("authorization", [...token].reverse().join(""))
  //       .end((err, res) => {
  //         if (err) {
  //           done(err);
  //         } else {
  //           expect(res.status).toBe(401);
  //           expect(res.body).toHaveProperty("status");
  //           expect(res.body.status).toBe("Unauthorized");
  //           done();
  //         }
  //       });
  //   });
});
describe("GET User by Id Testing", () => {
  it("Success", (done) => {
    request(app)
      .get("/api/users/1")
      //   .set("authorization", token)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(200);
          expect(res.body).toHaveProperty("data");
          done();
        }
      });
  });
});
