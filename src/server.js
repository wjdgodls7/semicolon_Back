import "./env"
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import passport from "passport";
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport";
import { uploadSingleController, uploadMiddleware, uploadArrayController } from "./upload";

const PORT = process.env.PORT;

const server = new GraphQLServer({
    schema,
    context: ({ request }) => ({ request })
});

server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.express.post("/api/upload", uploadMiddleware, uploadArrayController);

server.start({ port: PORT }, () => console.log(`✅ Server running on port http://localhost:${PORT} ✅`));
