const request = require("supertest");
const app = require("../app");
const connectDB = require("../config/db");

connectDB();
describe("Test GET all products at /products", () => {
  test("It should respond with 200 success", async () => {
    await request(app).get("/products").expect(200);
  });
});

describe("Test GET single product at /products/:id", () => {
  test("It should respond with 200 success", async () => {
    await request(app).get("/products/4000405002070").expect(200);
  });
});

describe("Test PUT update product at /products/:id", () => {
  test("It should respond with 200 success", async () => {
    await request(app).put("/products/4000405002070").expect(200);
  });
});

describe("Test DELETE delete product at /products/:id", () => {
  test("It should respond with 200 success", async () => {
    await request(app).delete("/products/4000405002070").expect(200);
  });
});

describe("Test GET get API status at /", () => {
  test("It should respond with 200 success", async () => {
    await request(app).get("/").expect(200);
  });
});