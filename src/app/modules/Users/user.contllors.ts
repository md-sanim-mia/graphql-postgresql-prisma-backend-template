import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.services";


const createUser = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await UserService.createUser({ name, email, password });
  sendResponse(res, {
    statusCode: 201,
    message: "User created successfully",
    data: user,
  });
});

export const userController = {
  createUser,
};