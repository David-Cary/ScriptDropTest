CREATE TYPE company_type AS ENUM ('pharmacy', 'courier');

CREATE TABLE companies (
	id SERIAL PRIMARY KEY,
	name VARCHAR UNIQUE,
  password VARCHAR (64),
	type company_type,
	address JSONB
);

CREATE TABLE  pharmacy_couriers (
	pharmacy_id INT,
	courier_id INT,
	CONSTRAINT fk_pharmacy
		FOREIGN KEY(pharmacy_id)
			REFERENCES companies(id),
	CONSTRAINT fk_courier
		FOREIGN KEY(courier_id)
			REFERENCES companies(id)
);

CREATE TABLE orders (
	id SERIAL PRIMARY KEY,
  pharmacy_id INT,
  patient_name VARCHAR,
  address JSONB,
  pickup_date TIMESTAMP WITH TIME ZONE,
  delivered TIMESTAMP WITH TIME ZONE,
  canceled TIMESTAMP WITH TIME ZONE,
  CONSTRAINT fk_pharmacy
  	FOREIGN KEY(pharmacy_id)
  		REFERENCES companies(id)
);

INSERT INTO companies (name, password, type, address) VALUES
('BetterRx', 'BR', 'pharmacy', '{ "street": ["1275 Kinnear Road"], "city": "Columbus", "state": "OH", "zip_code": "43212"}'),
('BestRx', 'BR', 'pharmacy', '{ "street": ["123 Austin St,"], "city": "Austin", "state": "TX", "zip_code": "78702"}'),
('Drugs R Us', 'DRU', 'pharmacy', '{ "street": ["4925 LA Ave"], "city": "Los Angeles", "state": "CA", "zip_code": "90056"}'),
('Same Day Delivery', 'SDD', 'courier', '{ "street": ["900 Trenton Lane"], "city": "Trenton", "state": "NJ", "zip_code": "08536"}'),
('Previous Day Delivery', 'PDD', 'courier', '{ "street": ["7433 LA Ct"], "city": "Los Angeles", "state": "CA", "zip_code": "90056"}');

INSERT INTO  pharmacy_couriers  (pharmacy_id, courier_id) VALUES
(1, 4),
(2, 4),
(3, 5);
