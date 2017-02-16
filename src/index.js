import React           from 'react';
import ReactDOM        from 'react-dom';

import { Provider }    from 'react-redux';
import { createStore,
         applyMiddleware
       }               from 'redux';
import thunk from 'redux-thunk';

import storeReducer    from './reducers';

/* Application Components */
import AppView         from './App';

let store = createStore(storeReducer, applyMiddleware(thunk));

import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <AppView />
  </Provider>
  ,document.getElementById('root')
);
