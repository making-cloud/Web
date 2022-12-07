import { css, cx } from "@emotion/css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/firebase";
import { useState } from "react";
import { useUserContext } from "../../contexts/UserContext";

const Main = () => {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  var nm = "";

  if (user) {
    const Email = user.email;
    nm = Email;
  }
  const onLogOutClick = () => {
    auth.signOut();
    setUser(null);
    navigate("/");
  };
  return !user ? (
    <>
      <p className="ToLogin">
        로그인을 하셔야 다양한 기능을 이용할 수 있습니다. <br></br>
        <span className="Gologin">
          <Link to="/Login">로그인 하러가기</Link>
        </span>
      </p>
    </>
  ) : (
    <>
      <header className="header">
        <p className="User">
          <div className="Users" />{nm}님
          환영합니다.
        </p>

        <p className="LogOut" onClick={onLogOutClick}>
          로그아웃
        </p>
      </header>
    </>
  );
};
export default Main;
