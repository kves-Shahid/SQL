
CREATE DATABASE IF NOT EXISTS lms
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE lms;


-- 2) Session & safety settings

SET NAMES utf8mb4;
SET time_zone = '+00:00';
-- Keep strict semantics for app safety (avoids silent truncation)
SET SESSION sql_mode =
  'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';



CREATE USER IF NOT EXISTS 'lms_app'@'localhost' IDENTIFIED BY 'CHANGE_ME_STRONG!';
CREATE USER IF NOT EXISTS 'lms_app'@'%'         IDENTIFIED BY 'CHANGE_ME_STRONG!';

-- Grant only what the API needs at runtime:
--  - DML on tables (SELECT/INSERT/UPDATE/DELETE)
--  - EXECUTE to call stored procedures/functions
--  - SHOW VIEW to read view definitions (optional)
--  - CREATE TEMPORARY TABLES for advanced queries (optional)
GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE, SHOW VIEW
  ON lms.* TO 'lms_app'@'localhost', 'lms_app'@'%';
GRANT CREATE TEMPORARY TABLES
  ON lms.* TO 'lms_app'@'localhost', 'lms_app'@'%';



FLUSH PRIVILEGES;


SELECT DATABASE() AS current_database;
SHOW GRANTS FOR 'lms_app'@'localhost';


SHOW TABLES;
