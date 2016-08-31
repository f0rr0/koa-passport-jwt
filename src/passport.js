import passport from "koa-passport";
import { Strategy as LocalStrategy } from "passport-local";
import jwt from "jsonwebtoken";
import promisify from "es6-promisify";

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

const signAsync = promisify(jwt.sign, jwt);

const generateToken = ({ username }) => {
  return signAsync({ username }, 'server secret', { expiresIn: 60 * 30 });
};

export const localAuthHandler = (ctx, next) => {
  return passport.authenticate('local', async (err, user, info) => {
    if (user === false) {
      ctx.status = 401;
      ctx.body = info.message;
    } else {
      try {
        ctx.body = await generateToken(user);
      } catch (err) {
        ctx.throw(500, err);
      }
    }
  })(ctx, next);
};

export default passport;
