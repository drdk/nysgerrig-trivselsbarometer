import React from 'react';
import Example from '../lib';
import { EmojiSelector } from '../lib/';
import animalemojis from '../lib/components/animalemojis.json';

const App = () => (
  <div>
    <Example />
    <EmojiSelector emojis={animalemojis} />
  </div>
);

export default App;
