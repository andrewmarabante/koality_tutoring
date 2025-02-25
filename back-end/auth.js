const argon2 = require("argon2");
const jwt = require('jsonwebtoken');


async function hashPassword(password) {
  try {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  } catch (err) {
    console.error("Error hashing password:", err);
  }
}

async function verifyPassword(enteredPassword, storedHash) {
    try {
      if (await argon2.verify(storedHash, enteredPassword)) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error("Error verifying password:", err);
    }
  }

  function createToken(userId){
    const accessToken = jwt.sign({ userId: userId }, process.env.SECRET, { expiresIn: "24h" });
    return accessToken
  }

  function verifyToken(req,res,next){


    const accessToken = req.cookies.bigmanjwt;

    if (accessToken == null){return res.status(401).json('401')}
    jwt.verify(accessToken, process.env.SECRET, (err, user) => {
        if(err){
          if(res.websocket){
            return next('403')
          }
          return res.status(403).json('403')
        }
        req.userInfo = user
        next()
    })
}

function generateVerificationToken(email){
  return jwt.sign({ email }, process.env.SECRET , { expiresIn: '1h' });
};

function sendVerificationEmail(userEmail, token) {
  const verificationLink = `${process.env.backendDomain}/verifyEmail?token=${token}`;
  const mailOptions = {
    from: process.env.companyEmail,
    to: userEmail,
    subject: 'Email Verification',
    text: `
    Dear User,
    Please verify your email by clicking the following link:
    ${verificationLink}
    If you did not create an account with us, please disregard this email!
    `
  };

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.companyUsername,
      pass: process.env.companyPassword
    }
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
  });
}

  module.exports = {
    hashPassword,
    verifyPassword,
    createToken,
    verifyToken,
    generateVerificationToken,
    sendVerificationEmail
  }