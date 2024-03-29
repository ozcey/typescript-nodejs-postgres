import { Request, Response } from "express";
import User from "../models/user";
import * as auth_util from '../utils/auth_util';

export const register = async (req: Request, res: Response) => {
    let user;
    try {
        const { name, email, username, password, role } = req.body;
        const hash = await auth_util.hashPassword(password);

        user = await User.create({
            name: name,
            email: email,
            username: username,
            password: hash,
            resetPasswordToken: '',
            resetPasswordExpire: new Date(),
            role: role
        });

    } catch (error) {
        return res.status(400).json({
            message: 'An error occurred while registering user',
            error: error
        });
    }
    return res.status(201).json(user);
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            message: `Please provide a valid username or password`
        });
    };
    let user, token;

    try {
        user = await User.findOne({
            where: { username: username }
        });

        if (!user) {
            return res.status(404).json({
                message: `User not found with username ${username}`
            });
        };

        const isPassMatch = await auth_util.matchPasswords(password, user.password);
        if (!isPassMatch) {
            return res.status(401).json({
                message: 'Invalid credentails'
            });
        };

        token = auth_util.getSignedJwtToken(user.id);


    } catch (error) {
        return res.status(401).json({
            message: 'Not authroized!',
            error: error
        });
    }
    return res.status(200).json({
        token: token
    });
};

export const getMe = async (req: Request | any, res: Response) => {
    let user;
    try {
        user = await User.findByPk(req.userData.id);
    } catch (error) {
        return res.status(401).json({ message: 'Not authroized!' });
    }

    return res.status(200).json(user);
};

export const updateUserDetails = async (req: Request | any, res: Response) => {
    const { username, name } = req.body;
    let user;
    try {
        user = await User.update({
            username: username,
            name: name
        }, {
            where: { id: req.userData.id }
        });
    } catch (error) {
        return res.status(400).json({
            message: 'An error occurred while updating user details',
            error: error
        });
    }

    return res.status(200).json({
        message: 'User details updated successfully!'
    });
};

export const updatePasword = async (req: Request | any, res: Response) => {
    const user = await User.findByPk(req.userData.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const { currentPassword, newPassword } = req.body;

    try {
        // check current password
        const isMatch = await auth_util.matchPasswords(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentails' });
        }

        // update new password
        user.password = await auth_util.hashPassword(newPassword);
        await user.save();
    } catch (error) {
        return res.status(400).json({
            message: 'An error occurred while ppdating password',
            error: error
        });
    }
    return res.status(200).json({
        message: 'User password updated successfully!'
    });
};