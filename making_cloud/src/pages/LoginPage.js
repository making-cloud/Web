import { useHistory, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  sendPasswordResetEmail,
  getRedirectResult,
} from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { useEffect, useState } from "react";
import "../component/Login/Login.css";
import { useUserContext } from "../contexts/UserContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const { user, setUser } = useUserContext();
  const history = useHistory();

  auth.onAuthStateChanged((currentuser) => {
    console.log(currentuser);
    if (currentuser) {
      setUser(currentuser);
      history.push("/map");
    } else {
      setUser(null);
    }
  });

  const handleGoogleLogin = async (event) => {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
  };

  const handleLogin = (e) => {
    const {
      target: { name },
    } = e;

    handleGoogleLogin();
  };

  function onChange(event) {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }
  const changePasswordUsingEmail = async () => {
    var email = prompt("이메일을 입력해 주세요.");
    try {
      await sendPasswordResetEmail(auth, email);
      alert("비밀번호 수정 url을 보냈습니다.");
    } catch (error) {
      console.log(error);
      alert("입력하신 정보의 유저가 없습니다.");
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (!newAccount) {
        // create account
        try {
          data = await createUserWithEmailAndPassword(auth, email, password);
          window.location.href = "/map";
        } catch (error) {
          alert(`${error}`);
        }
      } else {
        // log in
        try {
          data = await signInWithEmailAndPassword(auth, email, password);
          window.location.href = "/";
        } catch (error) {
          alert(error);
        }
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  const State = () => {
    return user ? (
      <Link to="/">메인화면으로 돌아가기</Link>
    ) : (
      <>
        <form onSubmit={onSubmit}>
          <h3>{!newAccount ? "회원가입" : "로그인"}</h3>
          <input
            className="Login_box"
            label="Email Address"
            name="email"
            type="email"
            required
            value={email}
            onChange={onChange}
            placeholder="이메일"
          ></input>
          <input
            className="passWord_box"
            label="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={onChange}
            placeholder="비밀번호"
          ></input>
          <button
            className="submit_button"
            type="submit"
            value={!newAccount ? "Create Account" : "Sign In"}
          >
            {!newAccount ? "Create Account" : "Sign in"}
          </button>
          <div style={{ justifyContent: "space-between" }}>
            <div style={{ textAlign: "start" }}>
              <span onClick={toggleAccount} className="gg">
                {!newAccount ? "Sign in" : "Create Account"}
              </span>
              <span className="di">|</span>
              <span className="findPassword" onClick={changePasswordUsingEmail}>
                비밀번호 찾기
              </span>
            </div>
          </div>

          <p className="Google_login" name="Google" onClick={handleLogin}>
            continue with Google
          </p>
          <br></br>

          <Link to="/" className="mainpage">
            메인화면으로 돌아가기
          </Link>
        </form>
      </>
    );
  };
  return State();
}

export default LoginPage;
