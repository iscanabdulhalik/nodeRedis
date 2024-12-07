import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config.js";
import User from "./Model.js";
import { redisClient, connectRedis } from "./redis.js";

const app = express();
app.use(bodyParser.json());

connectDB();
connectRedis();

app.get("/users", async (req, res) => {
  try {
    const cachedUsers = await redisClient.get("users");
    if (cachedUsers) {
      return res.json({ source: "cache", data: JSON.parse(cachedUsers) });
    }

    const users = await User.find();
    await redisClient.setEx("users", 3600, JSON.stringify(users)); //1saat sure verdik cach icin
    res.json({ source: "db", data: users });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const cachedUser = await redisClient.get(`user:${userId}`);
    if (cachedUser) {
      return res.json({ source: "cache", data: JSON.parse(cachedUser) });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    await redisClient.setEx(`user:${userId}`, 3600, JSON.stringify(user));
    res.json({ source: "database", data: user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();

    const users = await User.find();
    await redisClient.setEx("users", 3600, JSON.stringify(users));

    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: "Invalid data", error: err.message });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    const users = await User.find();
    await redisClient.setEx("users", 3600, JSON.stringify(users));
    await redisClient.setEx(
      `user:${userId}`,
      3600,
      JSON.stringify(updatedUser)
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: "Invalid data", error: err.message });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    const users = await User.find();
    await redisClient.setEx("users", 3600, JSON.stringify(users));
    await redisClient.del(`user:${userId}`);

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

const PORT = 3023;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
