import { Navigate } from "react-router-dom";
// CUSTOM DEFINED HOOK
import useAuth from "hooks/useAuth";
import useLocation from "hooks/useLocation";
import { useEffect, useState } from "react";
import axiosInstance from "utils/axios";
import SocketClient from "services/SocketClient";
import SocketContext from "contexts/SocketContext";
const AuthGuard = ({
  children
}) => {
  const {
    pathname
  } = useLocation();
  const {
    isAuthenticated
  } = useAuth();

  const [socketInitialized, setSocketInitialized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {   

        return;
    }

    axiosInstance.get("/api/auth/me/profile")
        .then((res) => {
            SocketClient.getInstance()
                .connect({
                    uid: res.data.d.uid,
                    ssid: token,
                })
                .then(() => {
                  console.log('socket init');
                    setSocketInitialized(true);      
                });
        })
        .catch((err) => {
            localStorage.removeItem("accessToken");

        });
}, [isAuthenticated]);
  if (isAuthenticated) return <SocketContext.Provider value={{socketInitialized}}>{children}</SocketContext.Provider>;
  return <Navigate replace to="/login" state={{
    from: pathname
  }} />;
};
export default AuthGuard;