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

INSERT IGNORE INTO portfolios (id, name, value, performance, assets_count) VALUES
  (1, 'Crecimiento Global', 84200.00, 7.5, 12),
  (2, 'Renta Fija Conservadora', 32620.00, 2.1, 8),
  (3, 'Inversiones Tecnológicas', 42100.00, 11.8, 10);

INSERT IGNORE INTO market_instruments (id, ticker, name, price, change_percent, sector) VALUES
  (1, 'AAPL', 'Apple Inc.', 182.56, 1.24, 'Technology'),
  (2, 'MSFT', 'Microsoft Corp.', 327.12, -0.82, 'Technology'),
  (3, 'TSLA', 'Tesla Inc.', 236.43, 0.58, 'Automotive'),
  (4, 'VWO', 'Vanguard FTSE Emerging Markets ETF', 44.18, 0.12, 'ETF'),
  (5, 'BND', 'Vanguard Total Bond Market ETF', 80.10, -0.05, 'Fixed Income');
