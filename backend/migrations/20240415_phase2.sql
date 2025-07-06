CREATE TABLE IF NOT EXISTS Categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS Tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS Transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  type ENUM('income','expense') NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  category_id INT,
  tag_id INT,
  notes TEXT,
  entry_date DATE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(id),
  FOREIGN KEY (category_id) REFERENCES Categories(id),
  FOREIGN KEY (tag_id) REFERENCES Tags(id)
);

CREATE TABLE IF NOT EXISTS TransactionTags (
  transaction_id INT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY(transaction_id, tag_id),
  FOREIGN KEY (transaction_id) REFERENCES Transactions(id),
  FOREIGN KEY (tag_id) REFERENCES Tags(id)
);
