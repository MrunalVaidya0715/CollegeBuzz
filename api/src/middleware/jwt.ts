import { Request, Response, NextFunction } from "express";
import createError from "../utils/createError";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

export interface CustomRequest extends Request {
  userId?: string;
  role?: string;
}

interface CustomJwtPayload extends JwtPayload {
  id: string;
  role: string;
}

export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;
  if (!token) return next(createError(401, "You are not Authenticated"));

  jwt.verify(
    token,
    process.env.JWT_KEY as string,
    (err: VerifyErrors | null, payload: any) => {
      if (err || !payload) {
        return next(createError(403, "Token is Invalid"));
      }

      req.userId = payload.id;
      req.role = payload.role;
      next();
    }
  );
};
