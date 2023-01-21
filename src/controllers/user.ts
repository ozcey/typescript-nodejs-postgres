import { Request, Response } from "express";
import User from "../models/user";
import * as auth_util from '../utils/auth_util';

export const getUsers = async (req: Request, res: Response) => {
    let users;
    try {
        users = await User.findAll();
    } catch (error) {
        return res.status(400).json({ message: 'An error occurred while retrieving users.' });
    }

    return res.status(200).json(users);
};

export const getUserById = async (req: Request, res: Response) => {
    let user;
    try {
        user = await User.findByPk(req.params.id);
    } catch (error) {
        return res.status(400).json({ message: 'An error occurred while retrieving user.' });
    }

    return res.status(200).json(user );
};


export const createUser = async (req: Request, res: Response) => {
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

    } catch (error) {
        return res.status(400).json({
            message: 'An error occurred while registering user.',
            error: error
        });
    }
    return res.status(201).json(user);
};

export const updateUser = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const { name, email, password, role } = req.body;
    const hash = await auth_util.hashPassword(password);
    let user;
    try {
        user = await User.update({
            name: name,
            email: email,
            password: hash,
            role: role
        }, {
            where: { id: id }
        });
    } catch (error) {
        return res.status(400).json({ message: 'An error occurred while updating user.' });
    }

    return res.status(200).json({
        message:  `User with id: ${id} updated successfully.`
    });
};

export const deleteUser = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const applicant = await User.findByPk(id);
    if (!applicant) {
        return res.status(404).json({
            message: `User not found with id ${id}.`
        });
    };

    try {
        await User.destroy({ where: { id: id } });
    } catch (error) {
        return res.status(400).json({
            message: 'An error occurred while deleting user.'
        });
    };
    return res.status(200).json({
        message:  `User with id ${id} deleted successfully.`
    });
};