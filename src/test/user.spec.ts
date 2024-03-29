import chai, { expect } from 'chai';
import chaiHttp from "chai-http";
import app from '../app';
import User from '../models/user';
import { user, user2 } from './test_data';
let should = chai.should();

chai.use(chaiHttp);
const baseUrl = '/career-center/api';
let loggedInUserId: number, token: string, userId: number;

describe('User API Tests', () => {
    before(async () => {
        // delete all records
        await User.destroy({
            truncate: true
        });
        // register as an admin user
        const res = await chai.request(app)
            .post(baseUrl + '/auth/signup')
            .send(user);
        expect(res.status).to.eq(201);
        expect(res.body.email).to.equals(user.email);
        expect(res.body.username).to.equals(user.username);
        expect(res.body).to.have.property('id');
        loggedInUserId = res.body.id;
        // login as an admin user
        const loginRequest = {
            username: user.username,
            password: user.password
        }
        const loginResponse = await chai.request(app)
            .post(baseUrl + '/auth/login')
            .send(loginRequest);
        expect(loginResponse.status).to.eq(200);
        expect(loginResponse.body).to.have.property('token');
        token = loginResponse.body.token;

    });

    after(async () => {
        const res = await chai.request(app)
            .delete(baseUrl + '/user/delete/' + loggedInUserId)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.eq(200);
        expect(res.body.message).to.equals(`User with id: ${loggedInUserId} deleted successfully.`);
    });

    it('Admin should create a new user', async () => {
        const res = await chai.request(app)
            .post(baseUrl + '/auth/signup')
            .send(user2)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.eq(201);
        expect(res.body.email).to.equals(user2.email);
        expect(res.body.username).to.equals(user2.username);
        expect(res.body).to.have.property('id');
        userId = res.body.id;
    });

    it('Admin should retrieve all users', async () => {
        const res = await chai.request(app)
            .get(baseUrl + '/user')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.eq(200);
    });

    it('Admin should retrieve user by id', async () => {
        const res = await chai.request(app)
            .get(baseUrl + '/user/' + userId)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.eq(200);
        expect(res.body.email).to.equals(user2.email);
    });


    it('Admin should update user data', async () => {
        const reqBody = {
            email: 'mark@gmail.com',
            name: 'Mark Johnson',
            username: "mark",
            password: '12345678',
            role: 'ROLE_USER'
        }
        const res = await chai.request(app)
            .put(baseUrl + '/user/update/' + userId)
            .send(reqBody)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.eq(200);
        expect(res.body.message).to.equals(`User with id: ${userId} updated successfully.`);
    });


    it('Admin should delete user successfully', async () => {
        const res = await chai.request(app)
            .delete(baseUrl + '/user/delete/' + userId)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.eq(200);
        expect(res.body.message).to.equals(`User with id: ${userId} deleted successfully.`);
    });
});