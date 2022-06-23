const request = require("supertest");
const { sequelize } = require("../server/db/models/index");
const { queryInterface } = sequelize;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = require("../app");

describe("GET All Tender Testing", () => {
  it("Success", (done) => {
    request(app)
      .get("/api/tenders")
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
describe("GET Specific Tender Testing", () => {
  it("Success", (done) => {
    request(app)
      .get("/api/tenders/1")
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
describe("POST Create Tender Testing", () => {
  it("Success", (done) => {
    request(app)
      .post("/api/tenders")
      //   .set("authorization", token)
      .send({
        offer_status: "PENDING",
        price: 90000,
        buyer_id: 2,
        seller_id: 1,
        products_id: 1,
      })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(201);
          expect(res.body).toHaveProperty("data");
          done();
        }
      });
  });
});
describe("PUT Update Tender Testing", () => {
  it("Success", (done) => {
    request(app)
      .put("/api/tenders/1")
      //   .set("authorization", token)
      .send({
        offer_status: "SUCCESS",
        price: 90000,
        buyer_id: 2,
        seller_id: 1,
        products_id: 1,
      })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(201);
          expect(res.body).toHaveProperty("data");
          done();
        }
      });
  });
});
describe("DELETE Remove Tender Testing", () => {
  it("Success", (done) => {
    request(app)
      .delete("/api/tenders/1")
      //   .set("authorization", token)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.status).toBe(200);
          expect(res.body).toHaveProperty("status");
          done();
        }
      });
  });
});
