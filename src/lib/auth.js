import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  trustedOrigins: [
    "http://localhost:3000",
    "https://tts-todos-nextjs.vercel.app",
    process.env.FRONTEND_URL,
    ...(process.env.CORS_ORIGINS
      ? process.env.CORS_ORIGINS.split(",").map((o) => o.trim())
      : []),
  ].filter(Boolean),

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  advanced: {
    useSecureCookies: true, // Force secure cookies
    cookies: {
      session_token: {
        name: "better-auth.session_token", // You can customize the name
        attributes: {
          sameSite: "none", // THIS IS THE KEY SETTING
          secure: true,
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        },
      },
      // Also set for session_data if cookie cache is enabled
      session_data: {
        name: "better-auth.session_data",
        attributes: {
          sameSite: "none",
          secure: true,
          httpOnly: true,
          path: "/",
          maxAge: 5 * 60, // 5 minutes (same as cookieCache.maxAge)
        },
      },
    },
  },
  trustHost: true,
  logger: {
    level: "debug",
  },
});
