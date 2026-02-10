import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./models/DataSource";
import { User } from "./models/entities/User.entity";

const PORT = 3000;

AppDataSource.initialize()
  .then(async () => {
    console.log("✅ DB connected");

    // 🔥 TEST QUERY
    const userRepo = AppDataSource.getRepository(User);
    const users = await userRepo.find();

    console.log("📦 USERS FROM DB:");
    console.log(users);

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB error", err);
  });