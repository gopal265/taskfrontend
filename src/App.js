import './App.css';
import { useState } from 'react';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Signup from './components/SignUp/SignUp';
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom";
import UpdateProfile from './components/UpdateProfile/UpdateProfile';
function App() {

  const [user,setUser] = useState();
  return (
    <div className="App">
      <BrowserRouter >
      <Routes>
        <Route path='/' element ={<Login user ={user} setUser={setUser} />} />
        <Route path='/register' Component={Signup} />
        <Route path='/profile' element={user ? <Profile user={user} setUser={setUser} /> : <Navigate to="/" />} />
        <Route path='/updateprofile' element={user ? <UpdateProfile user={user} setUser={setUser} /> : <Navigate to="/" />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
