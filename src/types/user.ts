export interface IUSer {
    id?: number,
    name: string,
    email: string,
    password: string,
    resetPasswordToken: string,
    resetPasswordExpire: Date,
    role: string
};