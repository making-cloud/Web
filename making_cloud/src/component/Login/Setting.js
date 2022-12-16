import { css } from "@emotion/css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../Firebase/firebase";
import { useUserContext } from "../../contexts/UserContext";
import { deleteUser } from "firebase/auth";

const Setting = () => {
  const { user, setUser } = useUserContext();
  const history = useHistory();

  var userName = "";

  if (user) {
    const Email = user.email;
    userName = Email;
  }
  const logoutUser = () => {
    auth.signOut();
    setUser(null);
    history.push("/");
  };

  const deleteUserF = () => {
    const cUser = auth.currentUser;
    deleteUser(cUser)
      .then(() => {
        alert("삭제되었습니다");
        history.push("/");
      })
      .catch((e) => {
        alert(e);
      });
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
    <div className={container}>
      <section className={profile}>
        <div className={userNameDiv}>
          <p className={userNameP}>{userName}님</p>
        </div>
        <button className="LogOut" onClick={logoutUser}>
          로그아웃
        </button>
      </section>
      <section className={usefulllink}>
        <a className={linkBox} href="https://ncc.re.kr/main.ncc?uri=manage03">
          금연 상담 전화
        </a>
        <a
          className={linkBox}
          href="http://health.jeonju.go.kr/index.jeonju?menuCd=DOM_000000105002001003
"
        >
          흡연으로 인한 건강피해
        </a>
        <a className={linkBox} href="https://www.nosmokeguide.go.kr/index.do">
          금연 길라잡이
        </a>
        <a
          className={linkBox}
          href="https://www.nosmokeguide.go.kr/lay2/bbs/S1T33C110/H/23/view.do?knowledge=Y&article_seq=802212&tag_name=&cpage=1&rows=10&condition=&keyword=&cat=&rn=1&only_one=Y"
        >
          금연을 실천해야하는 104가지 이유
        </a>
      </section>
      <section className={userDeleteBox}>
        <button onClick={deleteUserF}>회원 탈퇴</button>
      </section>
    </div>
  );
};

const container = css`
  margin: 0 auto;
  width: 450px;
  height: 100vh;
`;

const profile = css`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 68px;
  padding: 14px 12px;
`;

const userNameDiv = css`
  height: 20px;
  bottom: 0.5px;
`;

const userNameP = css`
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 20px;
  letter-spacing: -0.1px;
  color: black;
  font-weight: 700;
`;

const usefulllink = css`
  display: flex;
  flex-direction: column;
`;

const linkBox = css`
  width: 450px;
  height: 70px;
  margin-bottom: 12px;
  background-color: #fff;
  padding: 5px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 500

  text-align: center;

  border-radius: 12px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);

  &:hover {
    transform: scale(1.02);

    transition: 0.2s ease-in-out;
    box-shadow: 0px 3px 9px 3px rgb(0 0 0 / 10%);
  }
`;

const userDeleteBox = css`
  cursor: pointer;
`;

export default Setting;
