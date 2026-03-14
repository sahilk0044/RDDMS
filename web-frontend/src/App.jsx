import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GuestLayout from "./components/guestLayout/GuestLayout";
import Home from "./components/guestLayout/Home";
import Login from "./components/guestLayout/Login";
import AdminLayout from "./components/adminLayout/AdminLayout";
import DashboardCards from "./components/adminLayout/AdminDashboard";





function App() {

  return (
      <Routes>
        <Route path="/" element={<GuestLayout/>}>
          <Route index element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
        </Route>
        <Route path="/admin" element={<AdminLayout/>}>
          <Route index element={<DashboardCards/>}/>
          <Route path="/admin/dashboard" element={<DashboardCards/>}/>
        
        </Route>

        
      </Routes>

  );

}

export default App;