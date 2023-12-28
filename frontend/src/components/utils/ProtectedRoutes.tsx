import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";

const ProtectedRoute = ({ roles, element: Component, ...rest }) => {
  const { role } = useSelector(selectUser);
  const navigate = useNavigate();

  const isAuthorized = roles.includes(role);

  React.useEffect(() => {
    if (!isAuthorized) {
      navigate("/");
    }
  }, [isAuthorized, navigate]);

  return isAuthorized ? <Component {...rest} /> : null;
};

export default ProtectedRoute;
