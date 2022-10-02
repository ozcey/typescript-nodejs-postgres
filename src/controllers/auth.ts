import { Request, Response } from "express";
import User from "../models/user";
import * as auth_util from '../utils/auth_util';


export const register = async (req: Request, res: Response) => {
    let user;
    try {
        const { name, email, password, role } = req.body;
        const hash = await auth_util.hashPassword(password);

        user = await User.create({
            name: name,
            email: email,
            password: hash,
            resetPasswordToken: '',
            resetPasswordExpire: new Date(),
            role: role
        });

        // TODO: fix user and IUser map
        // send token in the cookie
        sendTokenResponse(user, 201, res);

    } catch (error) {
        res.status(400).json({ message: 'Creating user failed!', error: error });
    }
};

const sendTokenResponse = (user: User, statusCode: number, res: Response) => {
    // create a token
    let token = '';
    if (user['id']) {
        token = auth_util.getSignedJwtToken(user['id']);
    }

    // create cookie options
    const cookieExpireTime = process.env.JWT_COOKIE_EXPIRE!
    const options = {
        expires: new Date(Date.now() + (+cookieExpireTime * 24 * 60 * 60 * 1000)),
        httpOnly: true,
        secure: false
    };

    // set secure property in the cookie as true in production
    // if secure is true, only https can access to cookie
    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({ success: true, token: token });
};
