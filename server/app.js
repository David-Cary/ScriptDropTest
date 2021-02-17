// Load environment variables.
require('dotenv').config();

// Require express and create an instance of it
const express = require('express');
const app = express();

app.use(express.json()); // Enables parsing request bodies

// Set up postgres connection.
const { Pool } = require('pg');
const pool = new Pool();

// Importing lodash functions for convenience.
const { get } = require('lodash');

// Handles log in request and returns initial company info.
app.post('/log-in', (req, res) => {
  pool.query(`
      SELECT id, type
      FROM companies
      WHERE companies.name = $1
        AND companies.password = $2
    `,
    [
      req.body.name,
      req.body.password
    ]
  )
  .then(results => {
    if(results.rowCount) {
      res.json(results.rows[0]);
    } else {
      res.status(404).send("Company name or password incorrect.")
    }
  })
  .catch(e => res.status(400).send(e));
});

app.post('/order', (req, res) => {
  pool.query(`
      INSERT INTO  orders  (
        pharmacy_id,
        patient_name,
        address,
        pickup_date
      ) VALUES (
        $1,
        $2,
        $3,
        $4
      )
      RETURNING id
    `,
    [
      req.body.pharmacy,
      req.body.name,
      req.body.address,
      `${req.body.pickUpDate} ${req.body.pickUpTime}`
    ]
  )
  .then(results => {
    res.json(results.rows[0]);
  })
  .catch(e => res.status(400).send(e));
});

app.get('/daily-orders-for/:id', async (req, res) => {
  try {
    // Check the type of company as orders are stored by pharmacy.
    const companyId = req.params.id;
    const companyData = await pool.query(`
        SELECT type
        FROM companies
        WHERE companies.id = $1
      `,
      [companyId]
    );
    // Use that to build a list of valid pharmacy ids.
    const companyType = get(companyData, ['rows', '0', 'type']);
    let pharmacyIds = [];
    switch (companyType) {
      case 'pharmacy':
        pharmacyIds.push(companyId);
        break;
      case 'courier':
        const courierPharmacies = await pool.query(`
            SELECT pharmacy_id
            FROM pharmacy_couriers
            WHERE pharmacy_couriers.courier_id = $1
          `,
          [companyId]
        );
        pharmacyIds = courierPharmacies.rows.map(row => row.pharmacy_id);
        break;
    }
    // Create a timestamp for the start of the current day.
    const now = new Date();
    const todayString = now.toDateString();
    const startOfDay = new Date(todayString);
    // Return all orders that match the pharmacy list and timestamp.
    const orders = await pool.query(`
        SELECT
          id,
          patient_name AS name,
          address,
          pickup_date AS "pickUpDate",
          delivered,
          canceled
        FROM orders
        WHERE orders.pharmacy_id = ANY($1)
          AND orders.pickup_date >= $2
        ORDER BY orders.pickup_date ASC
      `,
      [
        pharmacyIds,
        startOfDay
      ]
    );
    res.json(orders.rows);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.put('/order/cancel', (req, res) => {
  pool.query(`
      UPDATE orders
      SET canceled = NOW()
      WHERE orders.id = $1
        AND orders.canceled IS NULL
      RETURNING canceled
    `,
    [
      req.body.id
    ]
  )
  .then(results => {
    res.json(results.rows[0]);
  })
  .catch(e => res.status(400).send(e));
});


app.put('/order/delivered', (req, res) => {
  pool.query(`
      UPDATE orders
      SET delivered = NOW()
      WHERE orders.id = $1
        AND orders.delivered IS NULL
      RETURNING delivered
    `,
    [
      req.body.id
    ]
  )
  .then(results => {
    res.json(results.rows[0]);
  })
  .catch(e => res.status(400).send(e));
});

// Start the server.
const server = app.listen(3000, function () {
  console.log('ScriptDropTest API listening on port 3000.');
});

module.exports = {
  app,
  pool,
  server
};
