-- Drop and recreate responses table

DROP TABLE IF EXISTS responses CASCADE;
CREATE TABLE responses (
  id SERIAL PRIMARY KEY NOT NULL,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  choice VARCHAR(255) NOT NULL,
  borda_score DECIMAL DEFAULT 0
);
