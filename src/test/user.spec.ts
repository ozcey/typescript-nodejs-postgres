import chai, { expect } from 'chai';
import chaiHttp from "chai-http";
import app from '../app';
import { user, user2 } from './test_data';
let should = chai.should();

chai.use(chaiHttp);

let loggedInUserId: number, token: string, userId: number;

describe('User API Tests', () => {
    before(async () => {
        // register as an admin user
        const res = await chai.request(app)
            .post('/api/auth/signup')
            .send(user);
        expect(res.status).to.eq(201);
        expect(res.body.email).to.equals(user.email);
        expect(res.body).to.have.property('id');
        loggedInUserId = res.body.id;
        // login as an admin user
        const loginRequest = {
            email: user.email,
            password: user.password
        }
        const loginResponse = await chai.request(app)
            .post('/api/auth/login')
            .send(loginRequest);
        expect(loginResponse.status).to.eq(200);
        expect(loginResponse.body).to.have.property('token');
        token = loginResponse.body.token;

    });

    after(async () => {
        const res = await chai.request(app)
            .delete('/api/user/delete/' + loggedInUserId)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.eq(200);
        expect(res.body.message).to.equals(`User with id: ${loggedInUserId} deleted successfully.`);
    });

    it('Admin should create a new user', async () => {
        const res = await chai.request(app)
            .post('/api/auth/signup')
            .send(user2)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.eq(201);
        expect(res.body.email).to.equals(user2.email);
        expect(res.body).to.have.property('id');
        userId = res.body.id;
    });

    it('Admin should retrieve all users', async () => {
        const res = await chai.request(app)
            .get('/api/user')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.eq(200);
    });

    it('Admin should retrieve user by id', async () => {
        const res = await chai.request(app)
            .get('/api/user/' + userId)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.eq(200);
        expect(res.body.email).to.equals(user2.email);
    });


    it('Admin should update user data', async () => {
        const reqBody = {
            email: 'mark@gmail.com',
            name: 'Mark Johnson',
            password: '12345678',
            role: 'ROLE_USER'
        }
        const res = await chai.request(app)
            .put('/api/user/update/' + userId)
            .send(reqBody)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.eq(200);
        expect(res.body.message).to.equals(`User with id: ${userId} updated successfully.`);
    });


    it('Admin should delete user successfully', async () => {
        const res = await chai.request(app)
            .delete('/api/user/delete/' + userId)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.eq(200);
        expect(res.body.message).to.equals(`User with id: ${userId} deleted successfully.`);
    });
});