import user from '../models/user.model.js';

// next() is the next middleware to be executed
const isAdmin = async (req, res, next) => {
  const { UserName } = req.body;

  try {
    const admin_attempt = await user.findOne({ UserName: UserName });

    if (admin_attempt && admin_attempt.isAdmin === true) {
      next();
    } else {
      return res
        .status(403)
        .json({ success: false, message: 'User does not have Admin status' });
    }
  } catch (error) {
    console.error('Error checking admin status:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export default isAdmin;
