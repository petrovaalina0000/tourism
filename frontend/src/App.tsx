import React, {FC} from 'react';
import {Routes, Route} from "react-router-dom";
import {MainPage} from "./pages/MainPage";
import {LoginPage} from "./pages/LoginPage";

export const App:FC=()=> {
  return (
    <Routes>
      <Route path='/' element={<MainPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
    </Routes>
  );
}
