import cron from "node-cron";
import http from "http";
import https from "https";

const BACKEND_URL = process.env.RENDER_URL || "http://localhost:3000";

export const startKeepAlive = () => {
  cron.schedule("*/14 * * * *", () => {
    console.log("Pinging server to keep alive...");

    const client = BACKEND_URL.startsWith("https") ? https : http;

    client.get(`${BACKEND_URL}/api/health`, (res) => {
      console.log(`Status Code: ${res.statusCode}`);
    }).on("error", (err) => {
      console.error("Ping failed:", err.message);
    });

  });

  console.log("Keep-alive cron started");
};