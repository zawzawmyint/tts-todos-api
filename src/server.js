import * as dotenv from "dotenv"; // Use '*' for module if 'dotenv' is CJS
import app from "./app.js"; // Note: Use extension here too
import { fileURLToPath } from "url"; // Needed to replace CommonJS 'require.main === module'

dotenv.config();

const __filename = fileURLToPath(import.meta.url);

// ESM equivalent of 'if (require.main === module)'
if (process.argv[1] === __filename) {
  const PORT = process.env.PORT || 3001;

  const server = app.listen(PORT, () => {
    console.log(
      `Server is running in ${
        process.env.NODE_ENV || "development"
      } mode on port ${PORT}`
    );
  });

  process.on("unhandledRejection", (err) => {
    console.log(`UNHANDLED REJECTION! Shutting down...`);
    console.error(err);
    console.log(err.name, err.message);

    server.close(() => {
      process.exit(1);
    });
  });

  process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION! Shutting down...");
    console.error(err.name, err.message);
    process.exit(1);
  });
}

// Export the app for Vercel
export default app;
