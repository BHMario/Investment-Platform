CREATE DATABASE IF NOT EXISTS investment_platform;
USE investment_platform;

CREATE TABLE IF NOT EXISTS portfolios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  value DECIMAL(14,2) NOT NULL DEFAULT 0,
  performance DECIMAL(6,2) NOT NULL DEFAULT 0,
  assets_count INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS market_instruments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ticker VARCHAR(10) NOT NULL,
  name VARCHAR(150) NOT NULL,
  price DECIMAL(12,2) NOT NULL DEFAULT 0,
  change_percent DECIMAL(6,2) NOT NULL DEFAULT 0,
  sector VARCHAR(80) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(200) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS password_resets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  token VARCHAR(128) NOT NULL UNIQUE,
  expires_at DATETIME NOT NULL,
  used TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT IGNORE INTO portfolios (id, name, value, performance, assets_count) VALUES
  (1, 'Crecimiento Global', 84200.00, 7.5, 12),
  (2, 'Renta Fija Conservadora', 32620.00, 2.1, 8),
  (3, 'Inversiones Tecnológicas', 42100.00, 11.8, 10);

INSERT IGNORE INTO market_instruments (id, ticker, name, price, change_percent, sector) VALUES
  (1, 'AAPL', 'Apple Inc.', 182.56, 1.24, 'Technology'),
  (2, 'MSFT', 'Microsoft Corp.', 327.12, -0.82, 'Technology'),
  (3, 'TSLA', 'Tesla Inc.', 236.43, 0.58, 'Automotive'),
  (4, 'VWO', 'Vanguard FTSE Emerging Markets ETF', 44.18, 0.12, 'ETF'),
  (5, 'BND', 'Vanguard Total Bond Market ETF', 80.10, -0.05, 'Fixed Income'),
  (6, 'BTC', 'Bitcoin', 67420.00, 3.20, 'Crypto'),
  (7, 'SPX', 'S&P 500', 4650.00, 1.24, 'Index');
