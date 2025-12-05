import type { Server } from "http";
import app from "./app";
import { EnvVars } from "./config/env";
import { seedAdmin } from "./app/helpers/seed";

const listenServer = async () => {
  let server: Server;

  try {
    await seedAdmin();
    // Start the server
    server = app.listen(EnvVars.PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${EnvVars.PORT}`);
    });

    // Handle unhandled promise rejections
    process.on("unhandledRejection", (error) => {
      console.log(
        "Unhandled Rejection is detected, we are closing our server..."
      );
      if (server) {
        server.close(() => {
          console.log(error);
          process.exit(1);
        });
      } else {
        process.exit(1);
      }
    });
  } catch (error) {
    console.error("Error during server startup:", error);
    process.exit(1);
  }
};

listenServer();
