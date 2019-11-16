-- Drop and recreate votes table

DROP TABLE IF EXISTS votes CASCADE;
CREATE TABLE votes (
  id SERIAL PRIMARY KEY NOT NULL,
  response_id INTEGER REFERENCES responses(id),
  cookie VARCHAR(255) NOT NULL,
  score INT NOT NULL
);
