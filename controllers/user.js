import { User } from "../models/user.js";
import { setUser, getUser } from "../service/auth.js";


export const handleUserSignup = async (req, res) => {
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");
}


export const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if(!user){
        return res.render("login", {
            error: "Invalade username or password!"
        });
    }

    const token = setUser(user);
    res.cookie("uid", token);
    return res.redirect("/");
}