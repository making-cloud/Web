import { css } from "@emotion/css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../Firebase/firebase";
import { useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { deleteUser } from "firebase/auth";

const Login = () => {
  const { user, setUser } = useUserContext();
  const history = useHistory();

  var nm = "";

  if (user) {
    const Email = user.email;
    nm = Email;
  }
  const logoutUser = () => {
    auth.signOut();
    setUser(null);
    history.push("/");
  };

  const deleteUserF = () => {
    const cUser = auth.currentUser;
    console.log(auth);
    deleteUser(cUser).then(() => {
      alert("삭제되었습니다");
      history.push("/");
    })
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
        <div className="User">
          <p className="Users">{nm}님</p>
          환영합니다.
        </div>

        <button className="LogOut" onClick={logoutUser}>
          로그아웃
        </button>
        <br />
        <button onClick={deleteUserF}>회원 탈퇴</button>
      </header>
    </>
  );
};

const container = css``;

export default Login;
