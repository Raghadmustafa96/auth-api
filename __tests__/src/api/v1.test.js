'use strict';
const { server } = require('../../../src/server.js');
const supergoose = require('@code-fellows/supergoose'); 
const request = supergoose(server);
let id;

describe('Clothes Api Server', () => {
    it('should be able to create a clothes on POST /clothes', async () => {
        const response = await request.post('/api/v1/clothes').send({
          name: 'dress',
          color: 'black',
          size: 'small'
        });
        expect(response.status).toEqual(201);
        expect(response.body.name).toEqual('dress');
        expect(response.body.color).toEqual('black');
        expect(response.body.size).toEqual('small');

        id = response.body._id;
      });
      it('should be able to update a clothes on PUT /clothes', async () => {
        const response = await request.put(`/api/v1/clothes/${id}`).send({
            name: 'skirt',
            color: 'green',
            size: 'small'
        });
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('skirt');
        expect(response.body.color).toEqual('green');
      });
      it('should be able to update a clothes on patch /clothes', async () => {
        const response = await request.patch(`/api/v1/clothes/${id}`).send({
            name: 'skirt',
            color: 'yellow',
            size: 'small'
        });
        expect(response.status).toEqual(200);
        expect(response.body.color).toEqual('yellow');
      });
      it('should be able to get a clothes on Get /clothes/:id', async () => {
        const response = await request.get(`/api/v1/clothes/${id}`);
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('skirt');
        expect(response.body.color).toEqual('yellow');
      });
      it('should be able to delete specific clothes on DELETE /clothes/:id', async () => {
		const response = await request.delete(`/api/v1/clothes/${id}`);
		expect(response.status).toEqual(200);
	 });
     it('should get all Clothes on GET /clothes', async () => {
		const response = await request.get('/api/v1/clothes');
		expect(response.status).toEqual(200);
	});
  });
