import { Route,Routes } from 'react-router-dom';
import GuestLayout from './components/guestLayout/GuestLayout';
import Home from './components/guestLayout/Home';
import AdminLogin from './components/guestLayout/AdminLogin';
import AdminLayout from './components/adminLayout/AdminLayout';
import AdminDashboard from './components/adminLayout/AdminDashboard';
import AdminReports from './components/adminLayout/AdminReports';
import Users from './components/adminLayout/Users';
import AdminMap from './components/adminLayout/AdminMap';


function App() {
  return (
   <Routes>
      <Route path="/" element={<GuestLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/AdminLogin" element={<AdminLogin/>}/>
      </Route>

      <Route path="/admin" element={<AdminLayout/>}>
        <Route index element={<AdminDashboard/>}/>
        <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
        <Route path="/admin/reports" element={<AdminReports/>}/>
        <Route path="/admin/users" element={<Users/>}/>
        <Route path="/admin/map" element={<AdminMap/>}/>
      </Route>
   </Routes>
  );
}

export default App;
