import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRouter from "./PrivateRouter";
import Dashboard from "../pages/Dashboard";
import HomePage from "../pages/HomePage";
import Students from "../pages/Students";
import Assignments from "../pages/Assignments";
import ExercisesHome from "../pages/ExercisesPage/ExercisesHome";
import Courses from "../pages/Courses";
import Profile from "../pages/Profile";
import Progress from "../pages/Progress";
import DotEyeExercise from "../pages/ExercisesPage/Exercises/13-dot-eye/DotEyeExercise";
// import exercisesData from "../pages/ExercisesPage/exercisesData";
import VerticalOpening from "../pages/ExercisesPage/Exercises/vertical-opening/VerticalOpening";
import GrowingObjects from "../pages/ExercisesPage/Exercises/growing-hexagon/GrowingObjects";
import SimilarWords from "../pages/ExercisesPage/Exercises/similar-words/SmilarWords";

const renderExerciseRoutes = (basePath) => {
  return [
    <>
      <Route
        key="dot-eye"
        path={`${basePath}/13-nokta-egzersizi`}
        element={<DotEyeExercise />}
      />

      {/* <Route
        key="vertical-opening"
        path={`${basePath}/vertical-opening`}
        element={<VerticalOpening />}
      /> */}

      <Route
        key="growing-objects"
        path={`${basePath}/buyuyen-sekiller`}
        element={<GrowingObjects />}
      />

      <Route
        key="similar-words"
        path={`${basePath}/benzer-kelimeler`}
        element={<SimilarWords />}
      />
    </>
  ];
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="banned" element={<div>Banned User Page</div>} />
        <Route path="nobelhizliokuma/admin-dashboard" element={<PrivateRouter isAdminRoute={true} />}>
          <Route path="" element={<Dashboard role="admin" />}>
            <Route index element={<HomePage />} />
            <Route path="ogrenciler" element={<Students />} />
            <Route path="odevler" element={<Assignments />} />
            <Route path="egzersizler" element={<ExercisesHome />} />
            <Route path="kurslar" element={<Courses />} />
            <Route path="profil" element={<Profile />} />
            {renderExerciseRoutes("/nobelhizliokuma/admin-dashboard/egzersizler")}
          </Route>
        </Route>
        <Route path="nobelhizliokuma" element={<PrivateRouter isAdminRoute={false} />}>
          <Route path="" element={<Dashboard role="user" />}>
            <Route index element={<HomePage />} />
            <Route path="ilerlemeler" element={<Progress />} />
            <Route path="odevler" element={<Assignments />} />
            <Route path="egzersizler" element={<ExercisesHome />} />
            <Route path="kurslar" element={<Courses />} />
            <Route path="profil" element={<Profile />} />
            {renderExerciseRoutes("/nobelhizliokuma/egzersizler")}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
