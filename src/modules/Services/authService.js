const User  = require("../Models/User");

const registerUserService = async ({ name, email, password }) => {
  const existingUser = await User.findOne( {email} );
  if (existingUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  const user = await User.create({ name, email, password });
  const tokens = generateAuthTokens(user);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    tokens,
  };
};

const loginUserService = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user || !user.comparePassword(password)) {
    throw new ApiError(409, "Invalid email or password");
  }

  const tokens = generateAuthTokens(user);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    tokens,
  };
};

// const logoutUserService = async () => {

// };

const refreshUserService = async ({ incomingrefreshToken }) => {
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request. Refresh token missing.");
  }

  let decoded;
  try {
    decoded = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );
  } catch (err) {
    throw new ApiError(403, "Invalid or expired refresh token");
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Issue new access & refresh tokens
  const tokens = generateAuthTokens(user);

  return { tokens };
};

const changePasswordService = async (userId, { oldPassword, newPassword }) => {
  const user = await User.findById(userId).select('+password');
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const isPasswordValid = await user.comparePassword(oldPassword);
  if (!isPasswordValid) {
    throw new ApiError(400, 'Current password entered is incorrect');
  }

  user.password = newPassword;
  await user.save(); // Triggers Mongoose pre-save hook for hashing

  return true;
};

module.exports = {
  registerUserService,
  loginUserService,
  refreshUserService,
  changePasswordService,
};
