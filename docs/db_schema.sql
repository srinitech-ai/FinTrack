-- Users table
CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE Categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- Transactions table
CREATE TABLE Transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  category_id INT,
  amount DECIMAL(10,2) NOT NULL,
  type ENUM('income','expense') NOT NULL,
  entry_date DATE NOT NULL,
  notes TEXT,
  FOREIGN KEY (user_id) REFERENCES Users(id),
  FOREIGN KEY (category_id) REFERENCES Categories(id)
);

-- Tags table
CREATE TABLE Tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- Transaction-Tags join table
CREATE TABLE TransactionTags (
  transaction_id INT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY(transaction_id, tag_id),
  FOREIGN KEY (transaction_id) REFERENCES Transactions(id),
  FOREIGN KEY (tag_id) REFERENCES Tags(id)
);

-- Recurring payments table
CREATE TABLE RecurringPayments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  category_id INT,
  amount DECIMAL(10,2) NOT NULL,
  frequency ENUM('daily','weekly','monthly','yearly') NOT NULL,
  next_date DATE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(id),
  FOREIGN KEY (category_id) REFERENCES Categories(id)
);
