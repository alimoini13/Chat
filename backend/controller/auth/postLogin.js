import User from '../../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const postLogin = async (req, res) => {
  try {
    const { mail, password } = req.body;
    const user = await User.findOne({ mail: mail.toLowerCase() });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          userId: user._id,
          mail,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: '24h',
        }
      );
      return res.status(200).json({
        userDetails: {
          mail: user.mail,
          token: token,
          username: user.username,
          _id: user._id,
        },
      });
    }
    return res.status(404).send('invalid Credential');
  } catch (err) {
    return res.status(500).send('somthing went wrong');
  }
};
export default postLogin;
