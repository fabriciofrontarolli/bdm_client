import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';

it('Main App renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
