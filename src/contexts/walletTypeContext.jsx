
import React, { createContext, useEffect, useReducer } from 'react';
import axiosInstance from 'utils/axios';

export const WalletTypeContext = createContext();

const initialState = { type: localStorage.getItem('wallet_type') !== undefined ? localStorage.getItem('wallet_type') : "LIVE", spotBalance : {
  availableBalance: 0,
  usdtAvailableBalance: 0,
  demoBalance: 0.0,
  luckyPoint: 0.0,
  aliAvailableBalance: 0.0,
  aliPrice: 0.0001,
} };

function walletTypeReducer(state, action) {
  switch (action.type) {
    case 'INIT':
      const wallet_type = localStorage.getItem('wallet_type');
    return {  type: wallet_type, spotBalance : {
      availableBalance: 0,
      usdtAvailableBalance: 0,
      demoBalance: 0.0,
      luckyPoint: 0.0,
      aliAvailableBalance: 0.0,
      aliPrice: 0.0001,
    } };
    case 'SET_WALLET_TYPE':
      localStorage.setItem('wallet_type', action.payload)
      return { ...state, type: action.payload };
    case 'SET_SPOT_BALANCE':
      return { ...state, spotBalance: action.payload };
    default:
      return state;
  }
}




export function WalletTypeProvider({ children }) {
    const [state, dispatch] = useReducer(walletTypeReducer, initialState);
  
    useEffect(()=>{
      if(!localStorage.getItem('wallet_type')){
        localStorage.setItem('wallet_type', 'LIVE')        
      }

      dispatch({ type: 'INIT' });
    }, [])



    return (
      <WalletTypeContext.Provider value={{ state, dispatch }}>
        {children}
      </WalletTypeContext.Provider>
    );
  }