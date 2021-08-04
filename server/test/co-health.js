let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../index");
const { expect } = require("chai");

let should = chai.should();

chai.use(chaiHttp);

describe("LOGIN", () => {
  describe("/POST login", () => {
    it("should NOT POST to user login if no username or password and redirect to login", (done) => {
      chai
        .request(app)
        .post(`/co-health/user/login`)
        .send({ username: "", password: "" })
        .redirects(0)
        .end((err, res) => {
          expect(res).to.redirectTo("login");
          done();
        });
    });

    it("should NOT POST user login if username or password is incorrect and redirect to login", (done) => {
      chai
        .request(app)
        .post(`/co-health/user/login`)
        .send({ username: "danna8", password: "123" })
        .end((err, res) => {
          expect(res).to.redirect;
          done();
        });
    });
  });
});

describe("Home", () => {
  describe("/GET home", () => {
    it("gets home page", (done) => {
      chai
        .request(app)
        .get(`/co-health/home`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
