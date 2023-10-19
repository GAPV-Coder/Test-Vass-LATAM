import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';

chai.use(chaiHttp);
const expect = chai.expect;

let authToken;

describe('User Routes', () => {
    it('should log in and get an auth token', (done) => {
        chai.request(app)
        .post('/api/v1/auth/login')
        .send({
            email: 'ypereira@test.com',
            password: 'ypereira2023',
        })
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('token');
            authToken = res.body.token;
            done();
        });
    });
    it('should get all users', (done) => {
        chai.request(app)
            .get('/api/v1/users/all-users')
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });
    it('should get a user by id', (done) => {
        chai.request(app)
            .get('/api/v1/users/user/60a4b3f3c9b4c50015b3e1f2')
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    });
    it('should update a user by id', (done) => {
        chai.request(app)
            .patch('/api/v1/users/update-user/60a4b3f3c9b4c50015b3e1f2')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                'fullName': 'John Doe',
                'email': 'jonhdoe@test.com',
                'phoneNumber': '+23480758392',
            }).end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
    it('should delete a user by id', (done) => {
        chai.request(app)
            .delete('/api/v1/users/delete-user/60a4b3f3c9b4c50015b3e1f2')
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});
