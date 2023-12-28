import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Homepage from "./pages/client/Homepage";
import Signin from "./pages/client/Signin";
import Register from "./pages/client/Register";
import PropertyPage from "./pages/client/Property/Property";
import Navbar from "./components/layout/Navbar";
import BookingPage from "./pages/client/Booking/Booking";
import PaymentPage from "./pages/client/Payment/Payment";
import AdminLayout from "./components/Admin/AdminLayout";
import SignInAdmin from "./pages/admin/Signin";
import ProtectedRoute from "./components/utils/ProtectedRoutes";
import Dashboard from "./pages/admin/Dashboard";

const App = () => {
  const NavbarWrapper = () => {
    const location = useLocation();
    const hiddenNavbarPaths = ["/signin", "/register"];
    const isNavbarHidden =
      hiddenNavbarPaths.includes(location.pathname) ||
      location.pathname.startsWith("/admin");

    return !isNavbarHidden && <Navbar />;
  };

  return (
    <Provider store={store}>
      <Router>
        <NavbarWrapper />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/property/:id" element={<PropertyPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/cart" element={<PaymentPage />} />
          <Route
            path="/admin/*"
            element={
              <AdminLayout>
                <Routes>
                  <Route path="/" element={<SignInAdmin />} />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute roles={["admin"]} element={Dashboard} />
                    }
                  />
                </Routes>
              </AdminLayout>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
