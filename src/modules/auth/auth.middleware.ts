import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { MoreThanOrEqual, Repository } from "typeorm";
import { User } from "src/models/user.entity";
import { AccessToken } from "src/models/access-token.entity";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(AccessToken) private accessTokenRepository: Repository<AccessToken>,
    private jwtService: JwtService
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // Get the authorization header from the request
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new HttpException("Invalid or missing access token", HttpStatus.BAD_REQUEST);
    }

    // Extract the token from the authorization header
    const token = authHeader.split(" ")[1];
    console.log("Token received: ", token);

    try {
      const currentTimestamp = new Date();
      
      // Find the access token in MySQL database
      const tokenData = await this.accessTokenRepository.findOne({
        where: { access_token: token, access_expire_at: MoreThanOrEqual(currentTimestamp) },
        relations: ["user"], // Load associated user
      });

      if (!tokenData) {
        throw new HttpException("Session Expired", HttpStatus.UNAUTHORIZED);
      }

      // Fetch user details
      const user = tokenData.user;
      if (!user) {
        throw new HttpException("User not found", HttpStatus.UNAUTHORIZED);
      }

      // console.log("User Authenticated:", user.email, user.role);
      
      // Attach user to request
      req["user"] = user;
      req["token"] = token;
      next();
      
    } catch (error) {
      console.error("AuthMiddleware Error:", error);
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
  }
}
