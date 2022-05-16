import React, {FC} from 'react';
import {Routes, Route} from "react-router-dom";
import {MainPage} from "./pages/MainPage";
import {LoginPage} from "./pages/LoginPage";
import {RegisterPage} from "./pages/RegisterPage";
import {ToursPage} from "./pages/ToursPage";
import {OrdersPage} from "./pages/OrdersPage";

export const App:FC=()=> {
  return (
    <Routes>
      <Route path='/' element={<MainPage/>}>
        <Route path='tours' element={<ToursPage/>}/>
        <Route path='orders' element={<OrdersPage/>}/>
        <Route index element={<ToursPage/>}/>
      </Route>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
    </Routes>
  );
}
