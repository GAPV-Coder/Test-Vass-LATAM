import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import AuthService from '../services/auth.services.js';

chai.use(chaiHttp);
const expect = chai.expect;

describe('AuthService', () => {
    describe('registerUser', () => {
        it('should register a user', async () => {
            const encryptPasswordStub = sinon.stub(
                encryptPasswordHelper,
                'encryptPassword',
            );
            encryptPasswordStub.resolves('hashedPassword');

            const findOneStub = sinon.stub(User, 'findOne');
            findOneStub.resolves(null);

            const saveStub = sinon.stub(User.prototype, 'save');
            saveStub.resolves({
                _id: 'userId',
                email: 'user@example.com',
                role: 'user',
            });

            const result =
                await AuthService.registerUser();

            expect(result).to.be.an('object');
            expect(result).to.have.property('user');
            expect(result.user).to.have.property('email', 'user@example.com');
            expect(result).to.have.property('token');
            expect(encryptPasswordStub.calledOnce).to.be.true;
            expect(findOneStub.calledOnce).to.be.true;
            expect(saveStub.calledOnce).to.be.true;

            encryptPasswordStub.restore();
            findOneStub.restore();
            saveStub.restore();
        });

        it('should handle registration failure', async () => {
            const findOneStub = sinon.stub(User, 'findOne');
            findOneStub.resolves({
                _id: 'existingUserId',
                email: 'user@example.com',
            });

            try {
                await AuthService.registerUser();
            } catch (error) {
                expect(error).to.be.an('error');
                expect(error.message).to.equal('Email already exists');
                expect(error.statusCode).to.equal(401);
            }

            findOneStub.restore();
        });
    });

    describe('loginUser', () => {
        it('should log in a user and return a token', async () => {
            const findOneStub = sinon.stub(User, 'findOne');
            findOneStub.resolves({
                _id: 'userId',
                email: 'user@example.com',
                password: 'hashedPassword',
            });

            const comparePasswordStub = sinon.stub(
                encryptPasswordHelper,
                'comparePassword',
            );
            comparePasswordStub.resolves(true);

            const result = await AuthService.loginUser(
                'user@example.com',
                'password',
            );

            expect(result).to.be.an('object');
            expect(result).to.have.property('user');
            expect(result.user).to.have.property('email', 'user@example.com');
            expect(result).to.have.property('token');
            expect(findOneStub.calledOnce).to.be.true;
            expect(comparePasswordStub.calledOnce).to.be.true;

            findOneStub.restore();
            comparePasswordStub.restore();
        });

        it('should handle login failure', async () => {
            const findOneStub = sinon.stub(User, 'findOne');
            findOneStub.resolves(null);

            try {
                await AuthService.loginUser(
                    'nonexistent@example.com',
                    'password',
                );
            } catch (error) {
                expect(error).to.be.an('error');
                expect(error.message).to.equal('User not found');
                expect(error.statusCode).to.equal(404);
            }

            findOneStub.restore();
        });
    });
});