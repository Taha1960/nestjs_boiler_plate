import { HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { UserRole } from "src/models/user.entity"; // Import enum for roles

export function authorizeScope(requiredRoles) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user:any = req["user"];

    if (!user) {
      throw new HttpException("Unauthorized access", HttpStatus.UNAUTHORIZED);
    }

    if (!requiredRoles.includes(user.role)) {
      throw new HttpException("Insufficient permissions", HttpStatus.FORBIDDEN);
    }

    next();
  };
}
