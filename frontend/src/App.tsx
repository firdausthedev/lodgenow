import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/client/Homepage";
import Signin from "./pages/client/Signin";
import Register from "./pages/client/Register";
import PropertyPage from "./pages/client/Property/Property";
import BookingPage from "./pages/client/Booking/Booking";
import PaymentPage from "./pages/client/Payment/Payment";
import AdminLayout from "./components/Admin/AdminLayout";
import SignInAdmin from "./pages/admin/Signin";
import ProtectedRoute from "./components/utils/ProtectedRoutes";
import Dashboard from "./pages/admin/Dashboard";
import PropertyPageAdmin from "./pages/admin/Property/PropertyPage";
import AgentPageAdmin from "./pages/admin/Agent/AgentPage";
import BookingPageAdmin from "./pages/admin/Booking/BookingPage";
import PaymentPageAdmin from "./pages/admin/Payment/PaymentPage";
import ReviewPageAdmin from "./pages/admin/Review/ReviewPage";
import UserPageAdmin from "./pages/admin/User/UserPage";
import PropertyAddForm from "./pages/admin/Property/PropertyAddForm";
import PropertyEditForm from "./pages/admin/Property/PropertyEditForm";
import AgentAddForm from "./pages/admin/Agent/AgentAddForm";
import AgentEditForm from "./pages/admin/Agent/AgentEditForm";
import ClientLayout from "./components/layout/ClientLayout";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route
            path="/*"
            element={
              <ClientLayout>
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/signin" element={<Signin />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/property/:id" element={<PropertyPage />} />
                  <Route path="/booking" element={<BookingPage />} />
                  <Route path="/cart" element={<PaymentPage />} />
                </Routes>
              </ClientLayout>
            }
          />
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
                  <Route
                    path="/property"
                    element={
                      <ProtectedRoute
                        roles={["admin"]}
                        element={PropertyPageAdmin}
                      />
                    }
                  />
                  <Route
                    path="/agent"
                    element={
                      <ProtectedRoute
                        roles={["admin"]}
                        element={AgentPageAdmin}
                      />
                    }
                  />
                  <Route
                    path="/booking"
                    element={
                      <ProtectedRoute
                        roles={["admin"]}
                        element={BookingPageAdmin}
                      />
                    }
                  />
                  <Route
                    path="/payment"
                    element={
                      <ProtectedRoute
                        roles={["admin"]}
                        element={PaymentPageAdmin}
                      />
                    }
                  />
                  <Route
                    path="/review"
                    element={
                      <ProtectedRoute
                        roles={["admin"]}
                        element={ReviewPageAdmin}
                      />
                    }
                  />
                  <Route
                    path="/user"
                    element={
                      <ProtectedRoute
                        roles={["admin"]}
                        element={UserPageAdmin}
                      />
                    }
                  />
                  <Route
                    path="/property/add"
                    element={
                      <ProtectedRoute
                        roles={["admin"]}
                        element={PropertyAddForm}
                      />
                    }
                  />
                  <Route
                    path="/agent/add"
                    element={
                      <ProtectedRoute
                        roles={["admin"]}
                        element={AgentAddForm}
                      />
                    }
                  />
                  <Route
                    path="/property/edit/:id"
                    element={
                      <ProtectedRoute
                        roles={["admin"]}
                        element={PropertyEditForm}
                      />
                    }
                  />
                  <Route
                    path="/agent/edit/:id"
                    element={
                      <ProtectedRoute
                        roles={["admin"]}
                        element={AgentEditForm}
                      />
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
