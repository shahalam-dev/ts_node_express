import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { successResponse } from "../utils/response";
import { ApiError } from "../middlewares/error-handler.middleware";

export class UserController {
  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getAllUsers();
      return res.json(successResponse(users, "Users fetched successfully"));
    } catch (err) {
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