const asyncHandler = require("../../utils/asyncHandler");
const authService = require("../Services/authService");
// const {
//   registerUserService,
//   loginUserService,
//   logoutUserService,
//   refreshUserService,
//   changePasswordService,
// } = require("../Services/authService");

// register controller
const registerUserController = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await authService.registerUserService({ name, email, password });

  res.cookie("refreshToken", tokens.refreshToken, COOKIE_OPTIONS);

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        user,
        accessToken: tokens.accessToken,
      },
      "User registered successfully",
    ),
  );
});

// login Controller
const loginUserController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, tokens } = await authService.loginUserService({ email, password });

  res.cookie("refreshToken", tokens.refreshToken, COOKIE_OPTIONS);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user, accessToken: tokens.accessToken },
        "User logged in successfully",
      ),
    );
});

// logout Controller
const logoutUserController = asyncHandler(async (req, res) => {
  res.clearCookie("refreshToken", COOKIE_OPTIONS);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

// refresh Controller
const refreshUserController = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken;
  const { tokens } = await authService.refreshUserService(incomingRefreshToken);

  res.cookie("refreshToken", tokens.refreshToken, COOKIE_OPTIONS);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { accessToken: tokens.accessToken },
        "Access token refreshed successfully",
      ),
    );
});

//changePassword Controller
const changePasswordUserController = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  await authService.changeUserPasswordService(req.user.id, {
    oldPassword,
    newPassword,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password updated successfully"));
});

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshUserController,
  changePasswordUserController,
};

