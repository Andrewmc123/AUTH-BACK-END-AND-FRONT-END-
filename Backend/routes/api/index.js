const router = require('express').Router();

// POST route for testing
router.post('/test', function (req, res) {
  res.json({ requestBody: req.body });
});

// Import necessary functions
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');

// GET route to set the token cookie
router.get('/set-token-cookie', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: 'Demo-lition',
      },
    });

    if (!user) {
      const err = new Error('User not found');
      err.status = 404; // Return a 404 if user doesn't exist
      return next(err);
    }

    setTokenCookie(res, user); // Set the JWT token cookie
    return res.json({ user: user });
  } catch (error) {
    next(error); // Ensure any error is passed to the error handler
  }
});

module.exports = router; // Fixed missing semicolon 555555
