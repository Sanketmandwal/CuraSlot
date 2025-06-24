import { useContext } from "react";
import Login from "./pages/Login"
import { ToastContainer } from 'react-toastify';
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route,Routes } from "react-router-dom";
import DashBoard from "./pages/Admin/DashBoard";
import Appointments from "./pages/Admin/Appointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";
import { DoctorContext } from "./context/DoctorContext";
import DoctorAppointment from "./pages/Doctor/DoctorAppointment";
import { DoctorProfile } from "./pages/Doctor/DoctorProfile";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";

function App() {

  const {aToken} = useContext(AdminContext)
  const {dToken} = useContext(DoctorContext)

  return aToken || dToken ? (
    <div className="bg-[#F8F9FD]">
    <ToastContainer/>
    <Navbar/>
    <div className="flex items-start">
      <Sidebar/>
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/admin-dashboard" element={<DashBoard/>} />
        <Route path="/all-appointments" element={<Appointments/>} />
        <Route path="/add-doctor" element={<AddDoctor/>} />
        <Route path="/doctor-list" element={<DoctorsList/>} />

        {/* doctor routes */}
        <Route path="/doctor-appointment" element={<DoctorAppointment/>} />
        <Route path="/doctor-profile" element={<DoctorProfile/>} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard/>} />

      </Routes>
    </div>
    </div>
  ) : (
    <>
     <Login/>
    <ToastContainer/>
    </>
  )
}

export default App
