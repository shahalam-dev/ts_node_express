import { Router } from "express";
import { UserController } from "../../controllers/user.controller";
import { validate } from "../../middlewares/validator.middleware";
import { createUserSchema, getUserParamsSchema, queryParamsSchema } from "../../validators/user.validator";

const router = Router();

router.post("/", validate(createUserSchema), UserController.createUser);
router.get("/", validate(queryParamsSchema), UserController.getAllUsers);
router.get("/:id", validate(getUserParamsSchema), UserController.getUserById);

export default router;