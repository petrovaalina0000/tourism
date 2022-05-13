import React, {FC} from "react";
import {Header} from "../../components/Header";
import {Route, Routes} from "react-router-dom";
import {ToursPage} from "../ToursPage";

export const MainPage: FC = () => {
  return <><Header/><Routes>
    <Route index element={<ToursPage/>}/>
    <Route path='/tours' element={<ToursPage/>}/>
  </Routes></>
}