import { createContext, useEffect, useReducer, useCallback } from "react";
import {jwtDecode} from 'jwt-decode';

import axios from "utils/axios";
// CUSTOM LOADING COMPONENT
import { LoadingProgress } from "components/loader";
const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  toastMessage: null,
  toastType: null,
  betAccountType : 'LIVE'
};


const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  // ----------------------------------------------------------------------

  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const setSession = accessToken => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common.Authorization;
  }
};
const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      {
        return {
          isInitialized: true,
          user: action.payload.user,
          isAuthenticated: action.payload.isAuthenticated
        };
      }
    case "LOGIN":
      {
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload.user
        };
      }
    case "LOGOUT":
      {
        return {
          ...state,
          user: null,
          isAuthenticated: false
        };
      }
    case "REGISTER":
      {
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload.user
        };
      }
    default:
      {
        return state;
      }
  }
};
export const AuthContext = createContext({});
export const AuthProvider = ({
  children
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // USER LOGIN HANDLER
  const login = useCallback(async (email, password) => {
    
    const {
      data
    } = await axios.post(`/api/auth/auth/token`, {
      email,
      password,
      grant_type : "password"
    });

    if(data.ok && !data.d?.require2fa){
      setSession(data.d.access_token);

      const user = jwtDecode(data.d.access_token)
      dispatch({
        type: "LOGIN",
        payload: {
          user: user
        }
      });


      loadProfile();
    }
  
  
    return data;
  }, []);

  // USER REGISTER HANDLER
  const register = useCallback(async (email, password) => {
    const {
      data
    } = await axios.put(`/api/auth/account/register`, {
      email,
      password
    });

    if(data.ok){
      setSession(data.d.access_token);

      const user = jwtDecode(data.d.access_token)
  
      dispatch({
        type: "REGISTER",
        payload: {
          user
        }
      });
    }
    return data;
  }, []);

  // USER LOGOUT HANDLER
  const logout = () => {
    setSession(null);
    dispatch({
      type: "LOGOUT"
    });
  };

  const loadProfile = async()=>{
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        setSession(accessToken);
        const {
          data
        } = await axios.get(`/api/auth/me/profile`);
        let userAccessToken = jwtDecode(accessToken)

        if(data.ok){
          const user = {
            uid : data.d.uid,
            email : data.d.e,
            sid : userAccessToken.sid,
            nick_name : userAccessToken.nick_name,
            exchange_clientId : data.d.exchange_clientId,
            isExchangeConnected : data.d.isExchangeConnected,
            exchange_email : data.d.exchange_email,
            exchange_nickname : data.d.exchange_nickname
          }

          console.log(user);
          dispatch({
            type: "INIT",
            payload: {
              user: user,
              isAuthenticated: true
            }
          });
        }



       
      } else {
        dispatch({
          type: "INIT",
          payload: {
            user: null,
            isAuthenticated: false
          }
        });
      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          setSession(accessToken);
          const {
            data
          } = await axios.get(`/api/auth/me/profile`);
          let userAccessToken = jwtDecode(accessToken)

          if(data.ok){
            const user = {
              uid : data.d.uid,
              email : data.d.email,
              sid : userAccessToken.sid,
              nick_name : userAccessToken.nick_name,
              exchange_clientId : data.d.exchange_clientId,
              isExchangeConnected : data.d.isExchangeConnected,
              exchange_email : data.d.exchange_email,
              exchange_nickname : data.d.exchange_nickname
            }
            dispatch({
              type: "INIT",
              payload: {
                user: user,
                isAuthenticated: true
              }
            });
          }



         
        } else {
          dispatch({
            type: "INIT",
            payload: {
              user: null,
              isAuthenticated: false
            }
          });
        }
      } catch (err) {
        // console.error(err);
        dispatch({
          type: "INIT",
          payload: {
            user: null,
            isAuthenticated: false
          }
        });
      }
    })();
  }, []);

  // show loading until not initialized
  if (!state.isInitialized) return <LoadingProgress />;
  return <AuthContext.Provider value={{
    ...state,
    method: "JWT",
    login,
    register,
    logout
  }}>
      {children}
    </AuthContext.Provider>;
};