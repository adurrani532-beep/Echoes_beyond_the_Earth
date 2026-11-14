import mongoose from "mongoose";
import { machines as bundled } from "../client/src/data/machines.js";

const machineSchema = new mongoose.Schema({ id: { type: String, unique: true } }, { strict: false });
const scoreSchema = new mongoose.Schema(
  {
    name: { type: String, maxlength: 20 },
    score: { type: Number, min: 0, max: 10 },
    total: { type: Number, min: 1, max: 10 }
  },
  { timestamps: true }
);
const Machine = mongoose.models.Machine || mongoose.model("Machine", machineSchema);
const Score = mongoose.models.Score || mongoose.model("Score", scoreSchema);

let connected = false;
const memoryScores = [];

export async function connect(uri) {
  if (!uri) {
    console.log("No MONGODB_URI set: using bundled data and in-memory scores.");
    return;
  }
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
    connected = true;
    console.log("Connected to MongoDB.");
  } catch (err) {
    console.error("MongoDB connection failed, falling back to memory:", err.message);
  }
}

export const isDb = () => connected;

export async function listMachines() {
  if (connected) {
    const docs = await Machine.find({}, { _id: 0, __v: 0 }).lean();
    if (docs.length) {
      const order = bundled.map((m) => m.id);
      return docs.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
    }
  }
  return bundled;
}

export async function seedMachines() {
  for (const m of bundled) await Machine.updateOne({ id: m.id }, { $set: m }, { upsert: true });
  return bundled.length;
}

export async function addScore(row) {
  if (connected) return Score.create(row);
  memoryScores.push({ ...row, createdAt: new Date() });
  return row;
}

export async function topScores(limit = 10) {
  if (connected) return Score.find({}, { _id: 0, name: 1, score: 1, total: 1, createdAt: 1 }).sort({ score: -1, createdAt: 1 }).limit(limit).lean();
  return [...memoryScores].sort((a, b) => b.score - a.score || a.createdAt - b.createdAt).slice(0, limit);
}
