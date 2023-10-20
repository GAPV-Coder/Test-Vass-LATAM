import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import UserService from '../services/user.services.js';
import User from '../models/user.model.js';

chai.use(chaiHttp);
const expect = chai.expect;

describe('UserService', () => {
    describe('getUsers', () => {
        it('should get all users', async () => {
            const findStub = sinon.stub(User, 'find');
            findStub.resolves([
                { _id: 'userId1', name: 'User 1' },
                { _id: 'userId2', name: 'User 2' },
            ]);

            const users = await UserService.getUsers();

            expect(users).to.be.an('array');
            expect(users).to.have.length(2);
            expect(findStub.calledOnce).to.be.true;

            findStub.restore();
        });

        it('should handle error when getting users', async () => {
            const findStub = sinon.stub(User, 'find');
            findStub.rejects(new Error('Database error'));

            try {
                await UserService.getUsers();
            } catch (error) {
                expect(error).to.be.an('error');
                expect(error.message).to.equal('Database error');
            }

            findStub.restore();
        });
    });

    describe('getUserById', () => {
        it('should get a user by ID', async () => {
            const findByIdStub = sinon.stub(User, 'findById');
            findByIdStub.resolves({ _id: 'userId', name: 'User' });

            const user = await UserService.getUserById('userId');

            expect(user).to.be.an('object');
            expect(user).to.have.property('name', 'User');
            expect(findByIdStub.calledOnce).to.be.true;

            findByIdStub.restore();
        });

        it('should handle error when getting a user by ID', async () => {
            const findByIdStub = sinon.stub(User, 'findById');
            findByIdStub.rejects(new Error('Database error'));

            try {
                await UserService.getUserById('userId');
            } catch (error) {
                expect(error).to.be.an('error');
                expect(error.message).to.equal('Database error');
            }

            findByIdStub.restore();
        });

        it('should handle user not found', async () => {
            const findByIdStub = sinon.stub(User, 'findById');
            findByIdStub.resolves(null);

            try {
                await UserService.getUserById('nonexistentUserId');
            } catch (error) {
                expect(error).to.be.an('error');
                expect(error.message).to.equal('User not found');
                expect(error.statusCode).to.equal(404);
            }

            findByIdStub.restore();
        });
    });
});