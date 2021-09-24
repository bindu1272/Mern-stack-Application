require('dotenv').config();
const {
  createUser,
  fetchUser,
  updateUser,
  removeUser,
  signinUserAccount,
} = require("../models/user.model");
const bcrypt = require("bcrypt");
const { commonResponse } = require("../common");
const jwt = require('jsonwebtoken');

const signupUser = (req, res) => {
  bcrypt.hash(req.body.password, 12).then((hash) => {
    let user = { ...req.body, password: hash };
    createUser(req.connection, user, (err, result) => {
      commonResponse({
        res,
        success: err ? false : true,
        message: err ? "user not created" : "user created successfully",
        data: null,
      });
    });
  });
};

const getUser = (req, res) => {
  fetchUser(req.connection, req.params.email, (err, users) => {
    commonResponse({
      res,
      success: err ? false : true,
      message: err ? "user not found" : "user fetched successfully",
      data: users,
    });
  });
};

const editUser = (req, res) => {
  updateUser(req.connection, req.body, req.body.email, (err, users) => {
    commonResponse({
      res,
      success: users.affectedRows > 0 ? true : false,
      message:
        users.affectedRows > 0 ? "user updated succesfully" : " user not found",
      data: null,
    });
  });
};

const deleteUser = (req, res) => {
  let users = { ...req.body, activestatus: 0 };
  updateUser(req.connection, users, req.body.email, (err, users) => {
    commonResponse({
      res,
      success: users.affectedRows > 0 ? true : false,
      message:
        users.affectedRows > 0 ? "user deleted succesfully" : " user not found",
      data: null,
    });
  });
};

const hardDeleteUser = (req, res) => {
  let users = { ...req.body, activestatus: 0 };
  removeUser(req.connection, req.body.email, (err, users) => {
    commonResponse({
      res,
      success: users.affectedRows > 0 ? true : false,
      message:
        users.affectedRows > 0
          ? "user deleted permanently succesfully"
          : " user not found",
      data: null,
    });
  });
};

// const verifyUser = (req, res) => {
//   verifyUserAccount(req.connection, req.params.token, (err, result) => {
//     if (result.length > 0) {
//       updateUser(
//         req.connection,
//         { refreshtoken: null, expiretoken: null, verified: 1 },
//         result[0].email,
//         (err, users) => {
//           if (users.affectedRows > 0) {
//             res.send(
//               "<h1>user verified successfully </h1> <script>window.location.href='http://location:3000/login' </script>"
//             );
//           } else {
//             res.send("<h1>user not verified</h1>");
//           }
//         }
//       );
//     }
//   });
// };

 const signinUser = (req, res) => {
  signinUserAccount(req.connection, req.body.email, (err, user) => {
    if (user.length > 0) {
      bcrypt.compare(req.body.password, user[0].password).then((result) => {
        if (result) {
          const token = jwt.sign({...user[0]},process.env.SECRET_KEY,{expiresIn:100000});
          commonResponse({
            res,
            success: true,
            message: "user logged in succesfuly",
            data: null,
            token,
            email:req.body.email,
           });
        } else {
          res.send({ success: false, message: "invalid password" });
        }
      });
    } else {
      res.send({ success: false, message: "user not found" });
    }
  });
};
module.exports = {
  signupUser,
  getUser,
  editUser,
  deleteUser,
  hardDeleteUser,
  signinUser,
  // verifyUser,
};
