// src/App.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import Body from './components/Body';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';

/**
 * Root App Component
 * 
 * - Wraps the entire application inside the Redux Provider
 *   so all components can access the Redux store.
 * - Renders the Body component, which handles routing and
 *   authentication state logic.
 */
const App = () => {
  return (
    <Provider store={appStore}>
      <Body />
    </Provider>
  );
};

export default App;
