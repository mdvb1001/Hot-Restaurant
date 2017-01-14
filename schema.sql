CREATE DATABASE Hot_Restaurant_DB;

USE Hot_Restaurant_DB;

CREATE TABLE waitlist (
  customer_name VARCHAR(250) NOT NULL,
  phone_number VARCHAR(250) NOT NULL,
  email VARCHAR(250) NOT NULL,
  unique_id VARCHAR(250) NOT NULL,
  PRIMARY KEY (unique_id)
);

CREATE TABLE reservations (
  customer_name VARCHAR(250) NOT NULL,
  phone_number VARCHAR(250) NOT NULL,
  email VARCHAR(250) NOT NULL,
  unique_id VARCHAR(250) NOT NULL,
  PRIMARY KEY (unique_id)
);

