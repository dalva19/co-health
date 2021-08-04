let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
const { expect } = require("chai");

let should = chai.should();

chai.use(chaiHttp);

describe("LOGIN", () => {
  describe("/POST login", () => {
    it("should NOT POST to user login if no username or password and redirect to login", (done) => {
      chai
        .request(server)
        .post(`/co-health/user/login`)
        .send({ username: "", password: "" })
        .redirects(0)
        .end((err, res) => {
          expect(res).to.redirect;
          done();
        });
    });

    // it("should NOT POST user login if username or password is incorrect", (done) => {
    //   chai
    //     .request(server)
    //     .post(`/api/login`)
    //     .send({ username: "yellowleopard753", password: "123" })
    //     .end((err, res) => {
    //       expect(res).to.have.status(401);
    //       done();
    //     });
    // });

    // it("should return access token with correct username and password", (done) => {
    //   chai
    //     .request(server)
    //     .post(`/api/login`)
    //     .send({ username: "yellowleopard753", password: "jonjon" })
    //     .end((err, res) => {
    //       expect(res).to.have.status(200);
    //       //expect(res.body).to.be.an("object");
    //       done();
    //     });
    // });
  });
});

describe("LOGIN", () => {
  describe("/GET home", () => {
    it("get home page", (done) => {
      chai
        .request(server)
        .post(`/co-health/home`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
