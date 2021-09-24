
let query = "";
const createUser = (connection, data, callback) => {
  query = "INSERT into users SET ?";
  connection.query(query, [data], callback);
};
const fetchUser = (connection, email, callback) => {
  query = "select * ,'' as password  from users where email =?";
  connection.query(query, [email], callback);
};

const updateUser = (connection, data, email, callback) => {
  query = "update users SET ? where email = ?";
  connection.query(query, [data, email], callback);
};

const removeUser=(connection,email,callback)=>{
    query = "delete from users where email=?";
    connection.query(query,[email],callback);
}
const verifyUserAccount=(connection,refreshtoken,callback)=>{
    query = "select * from users where refreshtoken=? and expiretoken=?";
    connection.query(query,[refreshtoken,Date.now()],callback)
}

const signinUserAccount = (connection, email, callback) => {
    query = "select *  from users where email =?";
    connection.query(query, [email], callback);
  };
module.exports = {
  createUser,
  fetchUser,
  updateUser,
  removeUser,
  signinUserAccount
};
