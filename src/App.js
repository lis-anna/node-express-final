import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LogInPage from './pages/LogInPage';
import Registration from './pages/Registration';
import Home from './pages/Home/Home';

function App() {
  console.log('hello there. I am react app');
  return (
    <>
      <Routes>
        {/* Registration */}
        <Route path='/register' element={<Registration />}></Route>

        {/* Log In */}
        <Route path='/' element={<LogInPage />}></Route>

        {/* home */}
        <Route path='/home' element={<Home />}></Route>
      </Routes>
    </>
  );
}
export default App;
