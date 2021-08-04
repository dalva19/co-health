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
//login from chai docs?
// var agent = chai.request.agent(app);
// agent
//   .post("/session")
//   .send({ username: "me", password: "123" })
//   .then(function (res) {
//     expect(res).to.have.cookie("sessionid");
//     // The `agent` now has the sessionid cookie saved, and will send it
//     // back to the server in the next request:
//     return agent.get("/user/me").then(function (res) {
//       expect(res).to.have.status(200);
//     });
//   });

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

describe("Community member profile", () => {
  describe("GET /profile/requests", () => {
    it("gets requests placed by a community member", (done) => {
      chai
        .request(app)
        .get(`/co-health/profile/requests`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an("object");
          done();
        });
    });
  });

  describe("GET /profile/:request", () => {
    it("gets a request by ID placed by a community member", (done) => {
      const request = "61099a14ed6ec710af4d5bab";
      chai
        .request(app)
        .get(`/co-health/profile/${request}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
  describe("PUT /profile/:request", () => {
    it("Not allow user to edit if request dose not exist", (done) => {
      const request = "12345";
      chai
        .request(app)
        .put(`/co-health/profile/${request}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});
