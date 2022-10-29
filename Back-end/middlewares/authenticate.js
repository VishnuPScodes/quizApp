import jwt from "jsonwebtoken";
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return reject(err);
      } else {
        resolve(user);
      }
    });
  });
};

export const authenticate = async (req, res, next) => {
  //check weather autherization header is set
  //if not throw an error
  if (!req.headers.authorization) {
    return res
      .status(400)
      .send({ message: "Authorization token was not provided" });
  }

  //if bearer token in autherization header

  //if not throw an error
  if (!req.headers.authorization.startsWith("Bearer ")) {
    return res
      .status(400)
      .send({ message: "Authorization token was not provided" });
  }
  //else split the bearer token and get the [1] which is the token
  const token = req.headers.authorization.split(" ")[1];

  //then we will call jwt to verify the token
  //if token is invalid we will throw error

  let user;
  try {
    user = await verifyToken(token);
    console.log("user", user);
    req.user = user.user;
  } catch (error) {
    res.status(400).send({ message: "Authorization token was not provided" });
  }

  console.log(req.user);
  //if the token is valid then we will user retrived from the token in the request object

  next();
};
