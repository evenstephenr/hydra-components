import React, {
  useEffect,
} from 'react';
import {
  Button,
  sayHello,
} from 'components';

export const App = () => {
  useEffect(() => sayHello('heyo'), []);
  return (
  <>
    <div>TODO</div>
    <Button onClick={() => alert('sup')}>sup</Button>
  </>
)}