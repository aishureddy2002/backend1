const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const app = require("../server"); // or wherever your Express app is

describe("Task API", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("should create a task", async () => {
    const res = await request(app).post("/tasks").send({ title: "Test task" });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test task");
  });

  test("should get all tasks", async () => {
    const res = await request(app).get("/tasks");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
