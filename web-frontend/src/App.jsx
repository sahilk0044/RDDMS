import {   Routes, Route } from "react-router-dom";
import GuestLayout from "./components/guestLayout/GuestLayout";
import Home from "./components/guestLayout/Home";
import Login from "./components/guestLayout/Login";
import AdminLayout1 from "./components/adminLayout/AdminLayout1";
import AdminDashboard1 from "./components/adminLayout/AdminDashboard1";






function App() {

  return (
    
      <Routes>
        
        <Route path="/" element={<GuestLayout/>}>
          <Route index element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
        </Route>

        <Route path="/admin" element={<AdminLayout1/>}>
          <Route path="/admin/dashboard" element={<AdminDashboard1/>}/>
        </Route>
        

        
      </Routes>
    

  );

}

export default App;