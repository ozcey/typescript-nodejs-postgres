import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

interface JwtPayload {
    id: number
};

export const verifyToken = async (req: Request | any, res: Response, next: NextFunction) => {
    let token;

    // set token from Bearer token in header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'You do not have the permission to perform this action!' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload;
        req.userData = await User.findByPk(decoded.id);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'You do not have the permission to perform this action!' });
    }
};

export const verifyRoles = (...roles: string[]) => {
    return (req: Request | any, res: Response, next: NextFunction) => {
        if (!roles.includes(req.userData.role)) {
            return res.status(401).json({ message: 'You do not have the permission to perform this action!' });
        };
        next();
    }
}