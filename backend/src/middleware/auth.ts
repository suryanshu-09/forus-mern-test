import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
}
export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ err: "No token provided" });
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.SECRET || "secret",
    ) as JwtPayload;
    (req as any).user = { id: decoded.id };
    next();
  } catch (error) {
    res.status(401).json({ err: "Invalid token" });
  }
};
