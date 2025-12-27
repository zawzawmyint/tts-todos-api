import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth.js";

const requireAuth = async (req, res, next) => {
  try {
    console.log("auth body", req.body);
    // Use better-auth's built-in cookie parsing
    const convertedHeaders = fromNodeHeaders(req.headers);

    const session = await auth.api.getSession({
      headers: convertedHeaders,
    });

    if (!session || !session.user) {
      console.log("❌ No valid session found");
      return res.status(401).json({
        success: false,
        message: "Authentication required: Invalid or expired session",
      });
    }

    req.user = session.user;
    req.session = session;
    next();
  } catch (error) {
    console.error("❌ Auth middleware error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid authentication",
      error: error.message,
    });
  }
};

export default requireAuth;
