import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Auth from './components/Auth';
import Posts from './components/Posts';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/posts" element={<Posts />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

