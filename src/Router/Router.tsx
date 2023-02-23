import { Route, Routes } from "react-router-dom";
import LoginPage from "../components/pages/LoginPage/LoginPage";
import PrivateRoute from "./PrivateRoute";
import HomePage from "../components/pages/HomePage";
import UserTable from "../components/pages/UserPage/UserTable";
import UserPage from "../components/pages/UserPage/UserPage";
import EventPage from "../components/pages/EventPage/EventPage";
import NotFoundPage from "../components/pages/NotFound/NotFoundPage";
import OwnEventsPage from "../components/pages/OwnEventsPage/OwnEventsPage";

/**
 * Router component renders a route switch with all available pages
 */

const Router = () => {
  //const { checkRole } = useContext(ActiveUserContext);

  /** navigate to different "home"-locations depending on Role the user have */

  return (
    <Routes>
      <Route path={"/"} element={<HomePage />} />
      <Route path={"/login"} element={<LoginPage />} />

      <Route
        path={"/users"}
        element={<PrivateRoute authorities={[]} element={<UserTable />} />}
      />
      <Route
        path={"/events"}
        element={<EventPage />} 
      />
      <Route
        path={"/ownevents"}
        element={<OwnEventsPage />} 
      />
      <Route
        path="/useredit"
        element={
          <PrivateRoute authorities={[]} element={<UserPage />}></PrivateRoute>
        }
      />
      <Route
        path="/useredit/:userId"
        element={
          <PrivateRoute authorities={[]} element={<UserPage />}></PrivateRoute>
        }
      />

      <Route path="*" element={<NotFoundPage/>} />
    </Routes>
  );
};

export default Router;
