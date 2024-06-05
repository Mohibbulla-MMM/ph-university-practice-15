import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import { Server } from "http";

let server: Server;
async function main() {
  try {
    const url = config.database_url as string;
    await mongoose.connect(url, {
      dbName: "ph-university",
      // useUnifiedTopology: true,
      // useNewUrlParser: true,
    });
    server = app.listen(config.port, () => {
      console.log(`Student server is running on the port ${config.port} `);
    });
  } catch (err) {
    console.log(`server file errro :>  ${err}`);
  }
}

main();

// unhandle rejection asynchronous code
process.on("unhandledRejection", () => {
  // console.log(!server);
  if (server) {
    // console.log(!server);
    server.close(() => {
      process.exit(1);
    });
  }
  console.log("⭕🐞⭕unhandledRejection is detected. server sutting down!");
  process.exit(1);
});

// uncaught exception synchronous code
process.on("uncaughtException", () => {
  console.log("⭕🐞⭕ uncaughtExeption is detected. server sutting down!");
  process.exit(1);
});

// console.log(adsf);
