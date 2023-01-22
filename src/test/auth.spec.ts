import chai, { expect } from 'chai';
import chaiHttp from "chai-http";
import app from '../app';
import { user } from './test_data';
let should = chai.should();

chai.use(chaiHttp);
const baseUrl = '/career-center/api';
let userId: number, token: string;

describe('Auth API Tests', () => {

    after(async () => {
        const res = await chai.request(app)
            .delete(baseUrl + '/user/delete/' + userId)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.eq(200);
        expect(res.body.message).to.equals(`User with id: ${userId} deleted successfully.`);
    });

    it('User should register successfully', async () => {
        const res = await chai.request(app)
            .post(baseUrl + '/auth/signup')
            .send(user);
        expect(res.status).to.eq(201);
        expect(res.body.email).to.equals(user.email);
        expect(res.body).to.have.property('id');
        userId = res.body.id;
    });

    it('User should log in successfully', async () => {
        const loginRequest = {
            email: user.email,
            password: user.password
        }
        const res = await chai.request(app)
            .post(baseUrl + '/auth/login')
            .send(loginRequest);
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('token');
        token = res.body.token;
    });

    it('User should retrieve current logged in user', async () => {
        const res = await chai.request(app)
            .get(baseUrl + '/auth/me')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.eq(200);
        expect(res.body.email).to.equals(user.email);
        expect(res.body.id).to.equals(userId);
    });


    it('User should update user details', async () => {
        const reqBody = {
            email: 'mark@gmail.com',
            name: 'Mark Johnson'
        }
        const res = await chai.request(app)
            .put(baseUrl + '/auth/updatedetails')
            .send(reqBody)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.eq(200);
        expect(res.body.message).to.equals('User details updated successfully!');
    });

    it('User should update password', async () => {
        const reqBody = {
            currentPassword: user.password,
            newPassword: '12345678'
        }
        const res = await chai.request(app)
            .put(baseUrl + '/auth/updatepassword')
            .send(reqBody)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.eq(200);
        expect(res.body.message).to.equals('User password updated successfully!');
    });

});