import chai, { expect } from 'chai';
import chaiHttp from "chai-http";
import app from '../app';
import { user, applicant, applicant2 } from './test_data';
let should = chai.should();

chai.use(chaiHttp);

let loggedInUserId: number, token: string, applicantId: number;

describe('Applicant API Tests', () => {
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

    it('Applicant should create a new application', async () => {
        const res = await chai.request(app)
            .post('/api/applicant/create')
            .send(applicant);

        expect(res.status).to.eq(201);
        expect(res.body.email).to.equals(applicant.email);
        expect(res.body.phone).to.equals(applicant.phone);
        expect(res.body).to.have.property('id');
        applicantId = res.body.id;
    });

    it('User should retrieve all applicant', async () => {
        const res = await chai.request(app)
            .get('/api/applicant')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.eq(200);
    });

    it('User should retrieve applicant by id', async () => {
        const res = await chai.request(app)
            .get('/api/applicant/' + applicantId)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.eq(200);
        expect(res.body.email).to.equals(applicant.email);
        expect(res.body.phone).to.equals(applicant.phone);
        expect(res.body.id).to.equals(applicantId);
    });


    it('User should update applicant data', async () => {
        const res = await chai.request(app)
            .put('/api/applicant/update/' + applicantId)
            .send(applicant2)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.eq(200);
        expect(res.body.message).to.equals(`Applicant with id: ${applicantId} updated successfully.`);
    });


    it('User should delete user successfully', async () => {
        const res = await chai.request(app)
            .delete('/api/applicant/delete/' + applicantId)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).to.eq(200);
        expect(res.body.message).to.equals(`Applicant with id: ${applicantId} deleted successfully.`);
    });
});