import React, {
  useEffect,
} from 'react';
import {
  Button,
  Alert,
} from 'components';

export const App = () => {
  useEffect(() => Alert({ message: 'heyo' }), []);
  return (
  <>
    <div>TODO</div>
    <Button onClick={() => Alert({ message: 'sup' })}>sup</Button>
  </>
)}