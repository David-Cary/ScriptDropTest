const { app, server, pool } = require('./app.js');
const request = require('supertest');

process.env.PGDATABASE = 'ScriptDropTest_jest';

afterAll(async () => {
  // Clean up orders.
  pool.query(`DELETE FROM orders`);
  server.close();
});

describe('ScriptDrop Test API', () => {
  it('Log in with no password should fail', async done => {
    request(app)
      .post('/log-in')
      .send({
        name: 'BestRx'
      })
      .expect(404, done);
  });
  it('Log in with password should succeed', async done => {
    request(app)
      .post('/log-in')
      .send({
        name: 'BestRx',
        password: 'BR'
      })
      .expect(200, done);
  });
  let newOrderId;
  it('Creating a new order should succced', async done => {
    const now = new Date();
    const response = await request(app)
      .post('/order')
      .send({
        pharmacy: 2,
        name: 'Patient X',
        address: {
          street: ['123 My St'],
          city: 'Somewhere',
          state: 'OH',
          zip_code: '12345'
        },
        pickUpDate: now.toLocaleDateString(),
        pickUpTime: now.toLocaleTimeString()
      })
      .expect(200);
    // Capture id of new order.
    newOrderId = response.body.id;
    done();
  });
  it('New order should be in the daily orders list', async done => {
    const response = await request(app)
      .get('/daily-orders-for/2')
      .expect(200);
    expect(response.body[0]).toHaveProperty('id', newOrderId);
    done();
  });
  it('Canceling an order should succeed', async done => {
    await request(app)
      .put('/order/cancel')
      .send({ id: newOrderId })
      .expect(200);
    const results = await pool.query(`
      SELECT canceled
      FROM orders
      WHERE orders.id = ${newOrderId}
    `);
    expect(results.rows[0].canceled).toBeTruthy();
    done();
  });
  it('Marking an order delivered should succeed', async done => {
    await request(app)
      .put('/order/delivered')
      .send({ id: newOrderId })
      .expect(200);
    const results = await pool.query(`
      SELECT delivered
      FROM orders
      WHERE orders.id = ${newOrderId}
    `);
    expect(results.rows[0].delivered).toBeTruthy();
    done();
  });
});
