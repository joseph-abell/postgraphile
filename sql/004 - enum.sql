create type forum.post_topic as enum (
  'sql',
  'graphql',
  'postgres',
  'react',
  'javascript',
  'c',
  'c++'
);

-- Enum stands for enumerated type. It is a type consisting of named values. And example of this
-- is in a pack of cards: you can only have Hearts, Diamonds, Spades and Clubs.

-- Here we are making topics for our users to discuss. 