import './App.css';
import axios from "axios";
import { useEffect, useState } from 'react';
import { Route,Routes,Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dash from './pages/Dash';
import { getUserRoute } from './API/Routes';

function App() {
  const [user,setUser] = useState([]);
  const getUser = async() => {
    const {data} = await axios.get(getUserRoute);
    console.log(data);
    setUser(data);
  }
  useEffect(()=>{
    getUser();
  },[])
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
      </Routes>
      <Routes>
        <Route exact path='/dash' element={user ? <Dash user={user} /> : <Navigate to={'/'} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
