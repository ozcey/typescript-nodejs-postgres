import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/user';
import 'dotenv/config';

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

export const getSignedJwtToken = (id: number) => {
    const secret = process.env.JWT_SECRET_KEY!;
    return jwt.sign(
        { id: id },
        secret,
        { expiresIn: '1d' }
    );
}

export const matchPasswords = async (password: string, hash: string) => {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
};

export const getResetPasswordToken = (user: User | any) => {
    // generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // hash token and set to resetPasswordToken field in User model
    user['resetPasswordToken'] = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // set resetPasswordExpire field for 10mins in User model
    user['resetPasswordExpire'] = new Date(Date.now() + (10 * 60 * 1000));
    return resetToken;
}