const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
    _id: userOneId,
    name: "Resul",
    email: "Resuls123@gmail.com",
    password: "Resul123",
    tokens: [{
        token: jwt.sign({ _id: userOneId}, process.env.JWT_SECRET )
    }]
}

beforeEach(async () => {
    await User.deleteMany();

    await new User(userOne).save();
})

test('Should signup a new user', async () => {
    await request(app)
    .post('/users')
    .send({
        name: "Perman",
        email: "permanuss99@gmail.com",
        password: "perman123"
    })
    .expect(201);
})

test('Should login existing user', async() => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    })
    .expect(200)
})

test('Should not login the user', async() => {
    await request(app).post('/user/login').send({
        email: 'wrongEmail.ccccom'
    })
    .expect(404)
});

test('Should get profile for user', async() => {
    await request(app)
    .get("/users/me")
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Should not get profile for unauthenticated user', async() => {
    await request(app)
    .get("/users/me")
    .send()
    .expect(401);
});

test('Should delete the profile for auth user', async() => {
    await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should not delete an account for unauthenticated user', async() => {
    await request(app)
    .delete("/users/me")
    .send()
    .expect(401)
})