-- Drop and recreate polls table

DROP TABLE IF EXISTS polls CASCADE;
CREATE TABLE polls (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  created_on DATE NOT NULL DEFAULT CURRENT_DATE,
  admin_url VARCHAR(255) NOT NULL,
  guest_url VARCHAR(255) NOT NULL
);
