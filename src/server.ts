import http from "http";
import app from "./app";
import { config } from "./config/config"; //

const PORT = config.PORT;

// Create HTTP server from Express app
const server = http.createServer(app);

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// Graceful shutdown
function shutdown(signal: string) {
  console.log(`\nReceived ${signal}. Closing server...`);
  server.close((err) => {
    if (err) {
      console.error("❌ Error closing server:", err);
      process.exit(1);
    }
    console.log("✅ Server closed gracefully");
    // async function cleanup() {
    //   await db.disconnect();
    //   await kafka.disconnect();
    // }
    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
