import User from '../../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const postRegister = async (req, res) => {
  try {
    const { username, mail, password } = req.body;
    console.log('reqbody',req.body)
    const userExists = await User.exists({ mail });
    if (userExists) {
      console.log('exist');
      return res.status(409).send('Email already exist');
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      mail: mail.toLowerCase(),
      password: encryptedPassword,
    });
    const token = jwt.sign(
      {
        userId: user._id,
        mail,
      },
      process.env.TOKEN_KEY,
      { expiresIn: '24h' }
    );
    res.status(201).json({
      userDetails: {
        mail: user.mail,
        token: token,
        username: user.username,
      },
    });
  } catch (err) {
    return res.status(500).send('please try again');
  }
};
export default postRegister;
