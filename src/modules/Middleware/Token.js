const jwt = require('jsonwebtoken');

// 1. Middleware to GENERATE Access & Refresh Tokens
const generateAuthTokens = (req, res, next) => {
  if (!req.user) {
    return res.status(500).json({ error: 'User context missing for token generation' });
  }

  const payload = {
    id: req.user._id,
    role: req.user.role || 'user',
  };

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });

  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });

  // Attach tokens to request object for the final handler
  req.tokens = { accessToken, refreshToken };
  next();
};

// 2. Middleware to VERIFY Access Token on Protected Routes
const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded; // Attach decoded token payload to req.user
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired. Please refresh or sign in again.' });
    }
    return res.status(403).json({ error: 'Invalid access token.' });
  }
};

// 3. Middleware to VERIFY Refresh Token (for /refresh route)
const verifyRefreshToken = (req, res, next) => {
  const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token required.' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired refresh token.' });
  }
};

module.exports = {
  generateAuthTokens,
  verifyAccessToken,
  verifyRefreshToken,
};