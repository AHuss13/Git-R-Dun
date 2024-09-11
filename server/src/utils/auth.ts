import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

const secret = "mysecretssshhhhhhh";
const expiration = "2h";

export const AuthenticationError = new GraphQLError("Could not authenticate user.", {
  extensions: {
    code: "UNAUTHENTICATED",
  },
});

export function authMiddleware({ req }: { req: any }) {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch {
    console.log("Invalid token");
  }

  return req;
}

export function signToken({ email, username, _id }: { email: any; username: any; _id: any }) {
  const payload = { email, username, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}
