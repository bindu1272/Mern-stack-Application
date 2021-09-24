const commonResponse = ({res, success=false, message='', data=null,token,email}) => {
  if (success) {
    res.send({ success, message, data,token,email});
  } else {
    res.send({ success, message, data,token,email});
  }
};
module.exports = {
  commonResponse,
};
