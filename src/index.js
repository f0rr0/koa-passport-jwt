import Koa from "koa";
import route from "koa-route";
import logger from "koa-logger";
import jwt from "koa-jwt";
import bodyParser from "koa-bodyparser"
import passport, { localAuthHandler } from "./passport";


if (module.hot) {
  module.hot.accept("./passport", () => {});
}



const app = new Koa();
app.use(logger())
   .use(bodyParser())
   .use(passport.initialize())
   .use(route.post("/auth", localAuthHandler))
   .use(jwt({ secret: 'server secret' }))
   .use(route.get("/me", (ctx) => {
     ctx.body = ctx.state.user;
    }))
   .listen(8000, () => console.log("Listening on Port 8000"));
