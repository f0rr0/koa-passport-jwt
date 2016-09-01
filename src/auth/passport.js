import passport from "koa-passport";
import { Strategy as LocalStrategy } from "passport-local";
import { generateTokens } from "./oauth";

if (module.hot) {
  module.hot.accept("./oauth", () => {});
}

passport.use(new LocalStrategy((username, password, done) => {
  if (username === "test" && password === "test") {
    done(null, {
      username: "test",
      verified: "true"
    }, { message: 'Success' });
  } else if (username !== "test" || password !== "test") {
    done(null, false, { message: 'Incorrect username or password.' });
  }
}));

export const localAuthHandler = (ctx, next) => {
  return passport.authenticate('local', async (err, user, info) => {
    if (user === false) {
      ctx.status = 401;
      ctx.body = info.message;
    } else {
      try {
        const { accessToken, refreshToken } = await generateTokens({user}, "secret");
        ctx.body = {
          accessToken,
          refreshToken
        }
      } catch (e) {
        ctx.throw(500, e);
      }
    }
  })(ctx, next);
};

export default passport;
