import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({ success: false, message: "not authorized, Login Again" });
    }
    const token_decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
        return res.json({ success: false, message: "not authorized, Login Again" });
    }
    next()
  } catch (error) {
    console.log(error);
  }
};

export default adminAuth