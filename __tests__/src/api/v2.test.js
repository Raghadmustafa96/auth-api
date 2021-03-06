'use strict';
require('dotenv').config();
const supergoose = require('@code-fellows/supergoose');
const jwt = require('jsonwebtoken');
const Users = require('../../../src/auth/models/users.js');
const { server } = require('../../../src/server.js');
const request = supergoose(server);

let id;
let SECRET = process.env.SECRET;
const token = jwt.sign({ username: 'admin' }, SECRET);

describe('clothes', () => {
  it('POST /clothes', async () => {
         await new Users({ username: 'admin', password: '123', role: 'admin' }).save();
        const response = await request.post('/api/v2/clothes').send({
            name: 'dress',
            color: 'green',
            size: 'small',
        }).set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(201);
        expect(response.body.color).toEqual('green');
        id = response.body._id;
  });

  it('should be able to read data from GET /clothes', async () => {
        const response = await request.get(`/api/v2/clothes/${id}`).set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(200);
        expect(response.body.color).toEqual('green');
  });

  it('read all from DataBase test on GET /clothes', async () => {
        const response = await request.get('/api/v2/clothes').set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(200);
  });

  it('should be able to update data on PUT /clothes', async () => {
    const response = await request
      .put(`/api/v2/clothes/${id}`)
      .send({
        name: 'dress',
        color: 'black',
        size: 'small',
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(response.body.color).toEqual('black');
  });
  
  it('should be able to delete data on DELETE /clothes', async () => {
    const response = await request
      .delete(`/api/v2/clothes/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
  });
});