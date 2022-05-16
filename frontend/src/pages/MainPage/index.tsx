import React, {FC} from "react";
import {Header} from "../../components/Header";
import {Outlet} from "react-router-dom";

export const MainPage: FC = () => {
  return <><Header/>
    <Outlet/>
  </>
}