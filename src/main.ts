import express, { json } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware as apolloMiddleware } from "@apollo/server/express4";
import { readFile } from "node:fs/promises";
import authRoutes from "./routes/auth/auth";
import companyRoutes from "./routes/company/company";
import jobRoutes from "./routes/job/job";
import { resolvers } from "./resolvers/resolver";
const app = express();
const port = 3000;
app.use(json());
app.use("/auth", authRoutes);
app.use("/company", companyRoutes);
app.use("/job", jobRoutes);
async function loadgql() {
  const typeDefs = await readFile("./src/schema.graphql", "utf-8");
  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();
  app.use("/graphql", apolloMiddleware(apolloServer));
}
loadgql();
app.listen(port, () => {
  console.log(`app  running on port ${port} http://localhost:3000/`);
  console.log(`gql ${port} http://localhost:3000/graphql`);
});
