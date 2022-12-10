import { verify } from "jsonwebtoken";

const useAuth = async () => {
  verify(
    req.headers.authorization,
    process.env.ACCESS_TOKEN_SECRET,
    async function (err, decoded) {
      if (!err && decoded) {
        return await fn(req, res);
      }

      res.status(401).json({ message: "Sorry you are not authenticated" });
    }
  );
};

export default useAuth;
