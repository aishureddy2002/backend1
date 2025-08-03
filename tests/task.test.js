import request from "supertest";
import app from "../server.js";
import mongoose from "mongoose";
import Task from "../models/Task.js";

// Connect to MongoDB before all tests
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

// Clean DB after each test
afterEach(async () => {
  await Task.deleteMany();
});

// Disconnect DB after all tests
afterAll(async () => {
  await mongoose.disconnect();
});

describe("POST /tasks", () => {
  it("should create a task", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ title: "Test Task" });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("title", "Test Task");
  });
});

describe("DELETE /tasks/:id", () => {
  it("should delete a task", async () => {
    const task = new Task({ title: "Delete Me" });
    await task.save();

    const res = await request(app).delete(`/tasks/${task._id}`);
    expect(res.statusCode).toEqual(204);
  });
});
