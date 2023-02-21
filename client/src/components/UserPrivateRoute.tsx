import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { AuthState } from "redux/slices/authSlice";
import { userRoleId } from "../roles";

const UserPrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const [decodedRole, setDecodedRole] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    const authToken = jwt_decode(token) as AuthState;
    //@ts-ignore
    setDecodedRole({ authToken });
  }, []);

  //@ts-ignore
  if (decodedRole && decodedRole.authToken.role !== userRoleId) {
    return <Navigate to="/" />;
  }

  return children;
};

export default UserPrivateRoute;
