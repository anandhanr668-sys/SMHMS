import jwt from "jsonwebtoken";

export const authMiddleware = (req: any, res: any, next: any) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({
      success: false,
      error: { code: "UNAUTHENTICATED" }
    });
  }

  const token = header.split(" ")[1];

  try {
    req.user = jwt.verify(
      token,
      process.env.JWT_SECRET || "dev_secret"
    );

    next();
  } catch {
    return res.status(401).json({
      success: false,
      error: { code: "INVALID_TOKEN" }
    });
  }
};
