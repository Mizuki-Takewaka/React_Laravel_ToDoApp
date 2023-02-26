import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    BrowserRouter,
    Route,
    Routes,
  } from 'react-router-dom';
import Example from './pages/Example';
import Home from './pages/Home';



  function App() {
    return (
        <div>
            <Routes>
              <Route path='/example' element={<Example />} />
              <Route path='/' element={<Home />} />
            </Routes>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
