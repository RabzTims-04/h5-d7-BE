import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import { join } from "path";
import productsRouter from "./services/products/index.js";
import {
  catchAllErrors,
  badRequestMiddleware,
  notFoundMiddleWare,
} from "./errorMiddlewares.js";
/* import { getCurrentFolderPath } from "./lib/fs-tools.js" */

const PORT = process.env.PORT;
const server = express();
/* const publicFolderPath = join(getCurrentFolderPath(import.meta.url), "../public")
 */
const whitelist = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_PROD_URL,
  process.env.VERCEL_URL,
  process.env.VERCEL_URL_SECOND,
  process.env.VERCEL_URL_THIRD
];
console.log(process.env.FRONTEND_URL);
/* ************MIDDLEWARES***************** */

/* server.use(express.static(publicFolderPath)) */
server.use(express.json());
server.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("not allowed by cors"));
      }
    },
  })
);

/* ************ENDPOINTS******************* */

server.use("/products", productsRouter);

/* ***********ERROR MIDDLEWARES************ */

server.use(notFoundMiddleWare);
server.use(badRequestMiddleware);
server.use(catchAllErrors);

console.table(listEndpoints(server));
server.listen(PORT, () => {
  console.log("🧡 server is running on port: " + PORT);
});

server.on("error", (error) =>
  console.log("💔 Server is not running due to 🛠", error)
);
