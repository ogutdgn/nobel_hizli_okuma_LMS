import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRouter from "./PrivateRouter";
import Dashboard from "../pages/Dashboard";
// import Home from "../pages/Home";
// import Purchases from "../pages/Purchases";
// import Sales from "../pages/Sales";
// import Brands from "../pages/Brands";
// import Firms from "../pages/Firms";
// import Products from "../pages/Products";
import HomePage from "../pages/HomePage";
import Students from "../pages/Students";
import Tasks from "../pages/Tasks";
import Exercises from "../pages/Exercises";
import Courses from "../pages/Courses";
import Profile from "../pages/Profile";
import Progress from "../pages/Progress";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="banned" element={<div>Banned User Page</div>} /> {/* For the banned users */}
        <Route path="nobelhizliokuma/admin-dashboard" element={<PrivateRouter isAdminRoute={true} />}>
          <Route path="" element={<Dashboard role="admin" />}>
            <Route index element={<HomePage />} />
            <Route path="ogrenciler" element={<Students />} />
            <Route path="odevler" element={<Tasks />} />
            <Route path="egzersizler" element={<Exercises />} />
            <Route path="kurslar" element={<Courses />} />
            <Route path="profil" element={<Profile />} />
          </Route>
        </Route>
        <Route path="nobelhizliokuma" element={<PrivateRouter isAdminRoute={false} />}>
          <Route path="" element={<Dashboard role="user" />}>
            <Route index element={<HomePage />} />
            <Route path="ilerlemeler" element={<Progress />} />
            <Route path="odevler" element={<Tasks />} />
            <Route path="egzersizler" element={<Exercises />} />
            <Route path="kurslar" element={<Courses />} />
            <Route path="profil" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
