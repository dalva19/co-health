// let chaiHttp = require("chai-http");
let chai = require("chai");
const request = require("supertest");
let app = require("../index");
const expect = require("chai").expect;
let should = chai.should();
let User = require("../models/User");

let user;

before((done) => {
  user = User.create({
    name: { firstName: "tester", lastName: "lastname" },
    email: "tester@email.com",
    username: "username-community",
    password: "password",
    address: {
      street: "12345 street",
      city: "city",
      state: "state",
      zipcode: "12345",
    },
    profileType: "commuity member",
  }).then(() => done());
});

// describe("Registration", () => {
//   describe("POST /regiser", () => {
//     it("should create a new user", (done) => {
//       request(app)
//         .post("/register")
//         .send(user)
//         .end((err, res) => {
//           user = res.body;
//           expect(res.status).to.eq(200);
//           done();
//         });
//     });
//   });
// });

describe("Home", () => {
  describe("/GET home", () => {
    it("gets home page", (done) => {
      request(app)
        .get(`/co-health/home`)
        .end((err, res) => {
          expect(res.status).to.eq(200);
          done();
        });
    });
  });
});

// describe("Community member profile", () => {
//   describe("GET /profile/requests", () => {
//     it("gets requests placed by a community member", (done) => {
//       request(app)
//         .get(`/co-health/profile/requests`)
//         .end((err, res) => {
//           expect(res.status).to.eq(200);
//           expect(res).to.be.an("object");
//           done();
//         });
//     });
//   });
// });

//   describe("GET /profile/:request", () => {
//     it("gets a request by ID placed by a community member", (done) => {
//       const request = "61099a14ed6ec710af4d5bab";
//       chai
//         .request(app)
//         .get(`/co-health/profile/${request}`)
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           expect(res).to.be.an("object");
//           done();
//         });
//     });
//   });
//   describe("PUT /profile/:request", () => {
//     it("Not allow user to edit if request dose not exist", (done) => {
//       const request = "12345";
//       chai
//         .request(app)
//         .put(`/co-health/profile/${request}`)
//         .end((err, res) => {
//           expect(res).to.have.status(404);
//           done();
//         });
//     });
//   });
// });
