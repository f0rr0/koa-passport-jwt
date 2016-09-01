import Koa from "koa";
import route from "koa-route";
import logger from "koa-logger";
import jwt from "koa-jwt";
import bodyParser from "koa-bodyparser"
import passport, { localAuthHandler } from "./auth/passport";


if (module.hot) {
  module.hot.accept("./auth/passport", () => {});
}



const app = new Koa();
app.use(logger())
   .use(bodyParser())
   .use(passport.initialize())
   .use(route.post("/auth", localAuthHandler))
   .use(jwt({ secret: "secret", debug: true }))
   .use(route.get("/me", (ctx) => {
     ctx.body = ctx.state.user;
    }))
   .listen(3000, () => console.log("Listening on Port 3000"));
