CREATE DATABASE IF NOT EXISTS sco;
USE sco;

CREATE TABLE salesman (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  region VARCHAR(100)
);

INSERT INTO salesman (name, region) VALUES
('Alice', 'North'),
('Bob', 'South');


SELECT * FROM salesman;