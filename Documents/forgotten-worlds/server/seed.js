import "dotenv/config";
import mongoose from "mongoose";
import { connect, isDb, seedMachines } from "./store.js";

await connect(process.env.MONGODB_URI);
if (!isDb()) {
  console.error("Set MONGODB_URI in server/.env first.");
  process.exit(1);
}
console.log(`Seeded ${await seedMachines()} machines.`);
await mongoose.disconnect();
