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

export const isAuthenticated = async (req, res, next) => {
  const token = req.cookies?.access_token;
  console.log({ token, cookies: req.cookies });

  //then we will call jwt to verify the token
  //if token is invalid we will throw error

  let user;
  try {
    user = await verifyToken(token);
    req.user = user.user;
  } catch (error) {
    res.status(400).send({ message: "Authorization token was not provided" });
  }

  //if the token is valid then we will user retrived from the token in the request object

  next();
};
