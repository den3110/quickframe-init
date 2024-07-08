
import React, { createContext, useEffect, useReducer } from 'react';
import axiosInstance from 'utils/axios';

export const PortfolioContext = createContext();

const initialState = { portfolios : [], budgetStrategies : [] };

function portfolioReducer(state, action) {
  switch (action.type) {
    case 'INIT':
        console.log('action init',action);
    return {  portfolios : [], budgetStrategies : action.payload.budgetStrategies };
    case 'SET_PORTFOLIOS':
      return { ...state, portfolios: action.payload };
    case 'SET_BUDGETSTRATEGIES':
      return { ...state, budgetStrategies: action.payload };
    default:
      return state;
  }
}




export function PortfolioProvider({ children }) {
    const [state, dispatch] = useReducer(portfolioReducer, initialState);
  

    const init =async ()=>{
        const resBudgetStrategies =  await axiosInstance.get("/api/bot/capital-config/list");
        const dataBudgetStrategies = resBudgetStrategies.data;
        

      dispatch({ type: 'INIT', payload : {portfolios:[1], budgetStrategies : dataBudgetStrategies.ok ? dataBudgetStrategies.d : []  } });
    }


    useEffect(()=>{
        init();
    }, [])



    return (
      <PortfolioContext.Provider value={{ state, dispatch }}>
        {children}
      </PortfolioContext.Provider>
    );
  }