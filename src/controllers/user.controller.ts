import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { successResponse } from "../utils/response";
import { ApiError } from "../middlewares/error-handler.middleware";
import { logger } from "../utils/logger";

export class UserController {
  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const { users, total } = await UserService.getUsersPaginated(skip, limit);

      return res.json(
        successResponse(users, "Users fetched successfully", {
          page,
          limit,
          total,
        }),
      );
    } catch (err) {
      // logger.info({ err }, "Error fetching users");
      next(new ApiError(500, "Failed to fetch users"));
    }
  }

  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.createUser(req.body);
      return res.status(201).json(successResponse(user, "User created"));
    } catch (err) {
      next(new ApiError(500, "Failed to create user"));
    }
  }

  static async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const user = await UserService.getUserById(id);
      if (!user) return next(new ApiError(404, "User not found"));
      return res.json(successResponse(user, "User fetched"));
    } catch (err) {
      next(new ApiError(500, "Failed to fetch user"));
    }
  }
}
