import { Request, Response, NextFunction } from "express";
import User from "../models/user";

export const getUsers = async (req: Request, res: Response) => {
    let users;
    try {
        users = await User.findAll();
    } catch (error) {
        return res.status(400).json({ message: 'An error occurred while retrieving users' });
    }

    return res.status(200).json({ users: users });
};

export const getUserById = async (req: Request, res: Response) => {
    let user;
    try {
        user = await User.findByPk(req.params.id);
    } catch (error) {
        return res.status(400).json({ message: 'An error occurred while retrieving user' });
    }

    return res.status(200).json({ user: user });
};

export const createUser = async (req: Request, res: Response) => {
    let user;
    try {
        user = await User.create(req.body)
    } catch (error) {
        return res.status(400).json({ message: 'An error occurred while creating user' });
    }

    return res.status(201).json({ user: user });
};

export const updateUser = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;
    let user;
    try {
        user = await User.update({
            name,
            email,
            password,
            role
        }, {
            where: { id: req.params.id }
        });
    } catch (error) {
        return res.status(400).json({ message: 'An error occurred while updating user' });
    }

    return res.status(200).json({
        message: 'User updated successfully!',
    });
};

export const deleteUser = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const applicant = await User.findByPk(id);
    if (!applicant) {
        return res.status(404).json({
            message: `User not found with id ${id}`
        });
    };

    try {
        await User.destroy({ where: { id: id } });
    } catch (error) {
        return res.status(400).json({
            message: 'An error occurred while deleting user'
        });
    };
    return res.status(200).json({
        message: 'User deleted successfully!',
    });
};