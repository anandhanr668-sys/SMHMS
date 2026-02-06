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
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET || "dev_secret"
    );

    // Attach user info and role for downstream RBAC
    req.user = payload;
    if (payload && (payload as any).role) {
      req.userRole = (payload as any).role;
    }

    next();
  } catch {
    return res.status(401).json({
      success: false,
      error: { code: "INVALID_TOKEN" }
    });
  }
};
