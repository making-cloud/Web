import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserContextProvider } from "./contexts/UserContext";
import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear'; // 윤년 판단 플러그인
import 'dayjs/locale/ko'; // 한국어 가져오기

dayjs.extend(isLeapYear); // 플러그인 등록
dayjs.locale('ko'); // 언어 등록

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserContextProvider>
    <App />
  </UserContextProvider>
);