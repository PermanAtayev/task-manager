const app = require('../src/app');
const request = require('supertest');
const Task = require('../src/models/task');
const User = require('../src/models/user');

const {userOneId, userOne, taskOneId, userTwoId, userTwo, setupDatabase} = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create a task for user', async() => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', userOne.tokens[0].token)
        .send({
            description : "Test task"
        })
        .expect(201);

    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
})

test('Should return one task for user 1', async() => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', userOne.tokens[0].token)
        .expect(200)
    
    const tasks = await Task.find({owner: userOneId});
    expect(tasks.length).toBe(1);
})

test('Should not be able to delete a task since it is not user twos task', async() => {
    const response = await request(app)
        .delete('/tasks/' + taskOneId)
        .set('Authorization', userTwo.tokens[0].token)
        .expect(404)
    
    const task = await Task.findById(taskOneId);
    expect(task).not.toBeNull();
})

