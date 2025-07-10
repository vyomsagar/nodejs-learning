import jwt from "jsonwebtoken";
const secret = "vyom3103";
export const setUser = (user) => {
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, secret);
}

export const getUser = (token) => {
   try {
        return jwt.verify(token, secret);
    } catch (err) {
        console.error("JWT Error:", err.message); // log the actual problem
        return null;
    }
}
