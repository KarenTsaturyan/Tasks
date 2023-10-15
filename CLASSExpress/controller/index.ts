import { userService } from "../services";
import { UserController } from "./userController";

export const userController = new UserController(userService)