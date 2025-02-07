import * as passportStrategy from "passport-local";
import passport from "passport";
import bcrypt from "bcrypt";
import { Express, Request, Response, NextFunction } from "express";
import { Person } from "@prisma/client";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import jwt from "jsonwebtoken";

import { PersonRepository } from "./repositories/Person";

export function initPassport(app: Express) {
  const person = new PersonRepository();

  // Initialize passport middleware
  app.use(passport.initialize());
  app.use(passport.authenticate("session"));

  // Local Strategy (existing email/password)
  passport.use(
    new passportStrategy.Strategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          if (!email) return done(null, false);
          const user = await person.findOne({ email });

          if (
            !user ||
            !user.password ||
            !(await bcrypt.compare(password, user.password))
          ) {
            return done(null, false, { message: "User or password incorrect" });
          }

          return done(null, user);
        } catch (e) {
          return done(e);
        }
      }
    )
  );

  // Google OAuth Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"],
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;
          if (!email)
            return done(new Error("No email found in Google profile"));

          let user = await person.findOne({ email });

          if (!user) {
            user = await person.create({
              name: profile.displayName,
              email,
              password: null,
              role: "USER",
              createdAt: new Date(),
              updatedAt: new Date(),
              maxPublications: 3,
              openingHours: null,
              locationStreet: null,
              accounts: {
                create: [
                  {
                    provider: "google",
                    providerId: profile.id,
                    accessToken,
                    refreshToken,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  },
                ],
              },
            });
          }

          return done(null, { ...user, providerId: profile.id });
        } catch (error) {
          return done(
            error instanceof Error
              ? error
              : new Error("Google authentication failed")
          );
        }
      }
    )
  );

  // Facebook OAuth Strategy
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID!,
        clientSecret: process.env.FACEBOOK_APP_SECRET!,
        callbackURL: "/auth/facebook/callback",
        profileFields: ["id", "emails", "name", "displayName"],
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;
          if (!email)
            return done(new Error("No email found in Facebook profile"));

          let user = await person.findOne({ email });

          if (!user) {
            user = await person.create({
              name: profile.displayName,
              email,
              password: null,
              role: "USER",
              createdAt: new Date(),
              updatedAt: new Date(),
              maxPublications: 3,
              openingHours: null,
              locationStreet: null,
              accounts: {
                create: [
                  {
                    provider: "facebook",
                    providerId: profile.id,
                    accessToken,
                    refreshToken,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  },
                ],
              },
            });
          }
          return done(null, user);
        } catch (error) {
          return done(
            error instanceof Error
              ? error
              : new Error("Facebook authentication failed")
          );
        }
      }
    )
  );

  // Serialization/Deserialization (keep existing)
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser(async (user: Express.User, done) => {
    try {
      const u = await person.findOne({ email: (user as Person).email });
      done(null, u);
    } catch (error) {
      done(error);
    }
  });
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authorized" });

  jwt.verify(
    token,
    process.env.JWT_SECRET!,
    async (
      err: jwt.VerifyErrors | null,
      decoded: string | jwt.JwtPayload | undefined
    ) => {
      if (err) return res.status(403).json({ message: "Invalid token" });
      if (!decoded) return res.status(403).json({ message: "Invalid token" });

      req.user = decoded as Express.User;

      const person = new PersonRepository();

      const select = {
        id: true,
        email: true,
        locationStreet: true,
        maxPublications: true,
        name: true,
        openingHours: true,
        role: true,
        updatedAt: true,
        accounts: true,
      };

      const user = await person.findOne(
        { id: (decoded as { id: number }).id },
        select
      );

      if (!user) return res.status(401).json({ message: "Not authorized" });

      let isFacebookAccount = false;
      let isGoogleAccount = false;

      // User could have multiple accounts (e.g., Facebook and Google) associated with the same email
      if (user.accounts.length > 0) {
        const acc = user.accounts.find(
          (account) => account.providerId === decoded?.providerId
        );

        isFacebookAccount = acc?.provider === "facebook";
        isGoogleAccount = acc?.provider === "google";
      }

      req.user = { ...user, isFacebookAccount, isGoogleAccount };

      next();
    }
  );
}
