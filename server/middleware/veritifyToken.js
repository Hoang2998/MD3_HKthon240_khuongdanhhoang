const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyToken = async (req, res, next) => {
    try {
        // Lấy token
        const token = req.headers.authorization.split(" ")[1];
      //   console.log(token);
      //   return res.status(200).json({ message: "success" });
        if (!token) {
          return res.status(401).json({ message: "Không tìm thấy token",type:'error' });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) {
            if (err.name === "TokenExpiredError") {
              // Nếu token đã hết hạn
              return res.status(401).json({ message: "Token đã hết hạn mời bạn đăng nhập lại",status:'1',type:'error' });
            }else{
              // Nếu token không hợp lệ
              return res.status(403).json({ message: "Token không hợp lệ",status:'1',type:'error' });
            }
          }
          if(decoded.role != 1){
              return res.status(403).json({ message: "ban ko co quyen thay doi",type:'error' });
          }
          next()
          
        });
      } catch (error) {
        return res.status(500).json({ message: "Server error", type: 'error' });
      }
  }
  
  module.exports = {
      verifyToken
  }