const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

//----------------------------------------------
const userRegister = async (req, res) => {
  const oldUser = await User.findOne({ email: req.body.email });

  if (oldUser) {
    return res.status(401).json("User Exists");
  }

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};
//----------------------------------------------
const userLogin = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    !user && res.status(401).json("User Name incorrect!");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = req.body.password;

    originalPassword != inputPassword &&
      res.status(401).json("Password incorrect!");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
};
//----------------------------------------------
const userForgotPass = async (req, res) => {
  try {
    const oldUser = await User.findOne({
      email: req.body.email,
    });

    if (!oldUser) {
      return res.status(401).json("User Not Exists!");
    } else {
      const hashedPassword = CryptoJS.AES.decrypt(
        oldUser.password,
        process.env.PASS_SEC
      );

      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      const secret = process.env.JWT_SEC + originalPassword;
      const token = jwt.sign(
        {
          id: oldUser.id,
        },
        secret,
        { expiresIn: "3d" }
      );
      res.status(200).json({ token });
      const link = `http://localhost:5000/auth/reset/${oldUser._id}/${token}`;
      console.log(link);
      const mailReset = oldUser.email;

      const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "764267df40b43c",
          pass: "005583a7b0090d",
        },
      });

      const info = await transport.sendMail({
        from: '"DucManh" <example@gmail.com>',
        to: mailReset, // Mails to array of recipients
        subject: "Reset Pass Mail",
        html: `<h1>Reset Pass Link</h1>
        <a href ="${link}">Click to reset</a>`,
      });

      console.log(info.messageId);
      console.log(info.accepted); // Array of emails that were successful
      console.log(info.rejected); // Array of unsuccessful emails
    }
  } catch (error) {
    res.status(500).json(err);
  }
};

//----------------------------------------------
const userResetPass = async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await User.findById(req.params.id);

  if (!oldUser) {
    return res.status(401).json("User Not Exists!");
  } else {
    const hashedPassword = CryptoJS.AES.decrypt(
      oldUser.password,
      process.env.PASS_SEC
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    const secret = process.env.JWT_SEC + originalPassword;
    try {
      const verifyTokenReset = jwt.verify(token, secret);
      res.send("Verify");
    } catch (error) {
      res.status(500).send("Not verify");
    }
    // const oldUser = await User.findOne({ _id: id });
    // if (!oldUser) {
    //   return res.json({ status: "User Not Exists!!" });
    // }
    // const secret = JWT_SECRET + oldUser.password;
    // try {
    //   const verify = jwt.verify(token, secret);
    //   res.render("index", { email: verify.email, status: "Not Verified" });
    // } catch (error) {
    //   console.log(error);
    //   res.send("Not Verified");
  }
};

module.exports = {
  userRegister,
  userLogin,
  userForgotPass,
  userResetPass,
};
