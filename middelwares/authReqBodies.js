const  isvalid=(value)=>
{
  return String(value).toLowerCase().match( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}

const singUpValidation = (req, res, next) => {
    try {
      if (!req.body.username || req.body.username == " ") {
        return res.status(400).send({
          message: "Failed!!! user doesn't provide username",
        });
      } else if (typeof req.body.username !== "string") {
        return res.status(400).send({
          message: "Failed!!! username value provided is invalid formate(String)",
        });
      }
  
      if (!req.body.email || req.body.email == " ") {
        return res.status(400).send({
          message: "Failed!!! user doesn't provide email",
        });
      } else if (typeof req.body.email !== "string") {
        return res.status(400).send({
          message: "Failed!!! email value provided is invalid formate(String)",
        });
      }
      
      if(!isvalid(req.body.email))
      {
        return res.status(400).send({
            message:"Failed!!! email provide id Invalid formate"
        })
      }
      if (!req.body.password || req.body.password == " ") {
        return res.status(400).send({
          message: "Failed!!! user doesn't provide password",
        });
      } else if (typeof req.body.password !== "string") {
        return res.status(400).send({
          message: "Failed!!! password value provided is invalid formate(String)",
        });
      }
      next();
    } catch (err) {
      console.log("\n #### error while user singUp #### \n", err.message);
      res.status(500).send({
        message: "internal server error while user singUp ",
      });
    }
  };
  
  const singInValidation = (req, res, next) => {
    try {
      if (req.body.email) {
        if (req.body.email == " ") {
          return res.status(400).send({
            message: "Failed!!! user doesn't provide email ",
          });
        } else if (typeof req.body.email !== "string") {
          return res.status.send({
            message: "Failed!!! email value provided is invalid formate(String)",
          });
        }
      }
  
      if (req.body.password) {
        if (req.body.password == " ") {
          return res.status(400).send({
            message: "Failed!!! user doesn't provide password ",
          });
        } else if (typeof req.body.password !== "string") {
          return res.status.send({
            message:
              "Failed!!! password value provided is invalid formate(String)",
          });
        }
      }
  
      next();
    } catch (err) {
      console.log("\n #### error while user singUp #### \n", err.message);
      res.status(500).send({
        message: "internal server error while user singUp ",
      });
    }
  };


  const authValidaton={
    singInValidation:singInValidation,
    singUpValidation:singUpValidation
  }

  module.exports=authValidaton