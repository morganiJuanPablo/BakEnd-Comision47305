//
import passport from "passport";
import localStrategy from "passport-local";
import GithubStrategy from "passport-github2";
import GoogleStrategy from "passport-google-oauth20";
import jwt from "passport-jwt";
import { createHashPass, isValidated, roleClient } from "../utils.js";
import { sessionsService } from "../repository/index.js";
import { generalConfig } from "./generalConfig.js";
import { CustomError } from "../services/customError.service.js";
import { EError } from "../Enums/EError.js";
import { userCreateError } from "../Enums/userCreateError.service.js";

const JWTStrategy = jwt.Strategy;
const extractJwt = jwt.ExtractJwt;

export const passportInit = () => {
  //////////////////////////////////////////////////////////////////REGISTRO LOCAL
  //Primero, el nombre de la estrategia
  passport.use(
    "localRegisterStrategy",
    new localStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { first_name, last_name, age } = req.body;
        try {
          const user = await sessionsService.getUser(username);
          if (user) {
            return done(null, false);
          } else {
            const newUser = {
              first_name,
              last_name,
              age,
              email: username,
              password: createHashPass(password),
              role: roleClient(username),
            };
            if (
              !newUser.first_name ||
              !newUser.last_name ||
              !newUser.email ||
              !newUser.password
            ) {
              CustomError.createError({
                name: "Create error user",
                cause: userCreateError(newUser),
                message: "Datos inválidos al crear el usuario",
                errorCode: EError.INVALID_INFO_BODY,
              });
            } else {
              const userRegistered = await sessionsService.createUser(newUser);
              return done(null, userRegistered);
            }
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  /////////////////////////////////////////////////////////////////LOGIN LOCAL

  //Primero, el nombre de la estrategia
  passport.use(
    "localLoginStrategy",
    new localStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        try {
          const user = await sessionsService.getUser(username);
          if (!user) {
            return done(null, false);
          }
          if (!isValidated(password, user)) {
            return done(null, false);
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //////////////////////////////////////////////////////////////////REGISTRO CON GITHUB

  passport.use(
    "githubRegisterStrategy",
    new GithubStrategy(
      {
        clientID: generalConfig.github.clientId,
        clientSecret: generalConfig.github.clientKey,
        callbackURL: `http://localhost:8080/api/session${generalConfig.github.callbackUrl}`,
      },
      async (accesToken, refreshToken, profile, done) => {
        try {
          const user = await sessionsService.getUser(profile.username);
          if (user) {
            return done(null, user);
          } else {
            const newUser = {
              first_name: profile.username,
              last_name: profile._json.name,
              email: profile.username,
              password: createHashPass(profile.id),
            };
            const userRegistered = await sessionsService.createUser(newUser);
            return done(null, userRegistered);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //////////////////////////////////////////////////////////////////REGISTRO CON GOOGLE

  passport.use(
    "googleRegisterStrategy",
    new GoogleStrategy(
      {
        clientID: generalConfig.google.clientId,
        clientSecret: generalConfig.google.clientKey,
        callbackURL: `http://localhost:8080/api/session${generalConfig.google.callbackUrl}`,
        scope: [
          "https://www.googleapis.com/auth/userinfo.email",
          "https://www.googleapis.com/auth/userinfo.profile",
        ],
      },
      async (accesToken, refreshToken, profile, done) => {
        try {
          const user = await sessionsService.getUser(profile._json.email);
          if (user) {
            return done(null, user);
          } else {
            const newUser = {
              first_name: profile._json.family_name,
              last_name: profile._json.given_name,
              /* age:  */
              email: profile._json.email,
              password: createHashPass(profile.id),
            };
            const userRegistered = await sessionsService.createUser(newUser);
            return done(null, userRegistered);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //////////////////////////////////////////////////////////////////PASSPORT JWT

  passport.use(
    "jwtAuth",
    new JWTStrategy(
      {
        //Extraer la informacion del token
        jwtFromRequest: extractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: generalConfig.tokenJWT.tokenJWTkey,
      },
      async (jwtPayload, done) => {
        try {
          return done(null, jwtPayload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

const cookieExtractor = (req) => {
  let token;
  if (req && req.cookies) {
    token = req.cookies["authLoginFoo"];
  } else {
    token = null;
  }
  return token;
};
