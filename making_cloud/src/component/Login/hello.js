import { css, cx } from "@emotion/css";
import { Link } from "react-router-dom";
import { auth } from "../../Firebase/firebase";
import { useState } from "react";

const Main = () => {
  const [User, setuser] = useState(false);
  auth.onAuthStateChanged((currentuser) => {
    if (currentuser) {
      setuser(true);
    } else {
      setuser(false);
    }
  });
  var nm = "";
  const user = auth.currentUser;

  if (user) {
    const Email = user.email;
    nm = Email;
  }
  const onLogOutClick = () => {
    auth.signOut();
    window.location.href = "/";
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
          <div className="Users" dangerouslySetInnerHTML={{ __html: nm }} />님
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
