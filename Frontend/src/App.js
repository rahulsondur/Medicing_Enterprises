import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';


// userapp routes
import UserAppLogin from './pages/user/auth/Login';
import UserAppSignup from './pages/user/auth/Signup';
import UserAppMachineTable from './pages/user/dashboard/machines/MachineTable';

// client routes 
import ClientLogin from './pages/client/auth/Login';
import ClientSignup from './pages/client/auth/Signup';
import ClientMachineTable from './pages/client/dashboard/machines/MachineTable';

// operator routes
import OperatorLogin from './pages/operator/auth/Login';
import OperatorSignup from './pages/operator/auth/Signup';
import OperatorMachineTable from './pages/operator/dashboard/machines/MachineTable';

// admin routes
import AdminLogin from './pages/admin/auth/Login';
import AdminSignup from './pages/admin/auth/Signup';
import AdminMachineTable from './pages/admin/dashboard/machine/MachineTable';
import AdminUserTable from "./pages/admin/dashboard/users/UserTable"

function App() {
  return (
    <div >
    
      <Router>
      <Routes>


      {/* UserApp route Setup */}
        <Route exact path='/' element={<UserAppMachineTable/>}/>
        <Route exact path='/userapp/auth/login' element={<UserAppLogin/>}/>
        <Route exact path='/userapp/auth/signup' element={<UserAppSignup/>}/>

         {/* Client route Setup */}
         <Route exact path='/client' element={<ClientMachineTable/>}/>
        <Route exact path='/client/auth/login' element={<ClientLogin/>}/>
        <Route exact path='/client/auth/signup' element={<ClientSignup/>}/>
        
         {/* UserApp route Setup */}
         <Route exact path='/operator' element={<OperatorMachineTable/>}/>
        <Route exact path='/operator/auth/login' element={<OperatorLogin/>}/>
        <Route exact path='/operator/auth/signup' element={<OperatorSignup/>}/>

         {/* Admin route Setup */}
         <Route exact path='/admin' element={<AdminMachineTable/>}/>
        <Route exact path='/admin/auth/login' element={<AdminLogin/>}/>
        <Route exact path='/admin/auth/signup' element={<AdminSignup/>}/>
        <Route exact path='/admin/user/list' element={<AdminUserTable/>}/>

      </Routes>
      </Router>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
