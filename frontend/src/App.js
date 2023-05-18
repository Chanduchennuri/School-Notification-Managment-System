import './App.css';
import { useEffect, useState } from 'react';
import { Route,Routes,Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dash from './pages/Dash';
import { getUserRoute } from './API/Routes';
import instance from './util/instance';
import AdminDash from './pages/Admin/AdminDash';
import Teacher from './pages/Admin/Teacher';
import AddTeacher from './pages/Admin/AddTeacher';
import EditTeacher from './pages/Admin/EditTeacher';

function App() {
  const [user,setUser] = useState({});
  const getUser = async() => {
    const {data} = await instance.get(getUserRoute);
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
      <Routes>
        <Route exact path='/admin' element={user ? <AdminDash user={user} /> : <Navigate to={'/'} />}></Route>
      </Routes>
      <Routes>
        <Route exact path='/admin/teacher' element={<Teacher />}></Route>
      </Routes>
      <Routes>
        <Route exact path='/admin/teacher/add' element={<AddTeacher />} ></Route>
      </Routes>
      <Routes>
        <Route exact path={`/admin/teacher/edit`} element={<EditTeacher />}></Route>
      </Routes>
    </div>
  );
}

export default App;
