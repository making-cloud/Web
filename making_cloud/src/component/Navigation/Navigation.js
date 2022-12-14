import { css, cx } from "@emotion/css";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  BsCalendarCheck,
  BsCalendarCheckFill,
  BsMap,
  BsMapFill,
} from "react-icons/bs";
import { RiSettings4Line, RiSettings4Fill } from "react-icons/ri";
import { auth } from "../../Firebase/firebase";
import { useEffect } from "react";
import { useUserContext } from "../../contexts/UserContext";

const NaviItems = ({ title, path, nowPath, logo, onClickLogo }) => {
  const isClicked = path === nowPath;
  return (
    <div className={items}>
      <Link
        to={path}
        className={cx(itemClickAbleArea, isClicked && selectedNav)}
      >
        <div className={ path === '/settings' ? settingIconSize : iconSize}>
        {isClicked ? onClickLogo : logo}
        </div>
        <div className={itemTitle}>{title}</div>
      </Link>
    </div>
  );
};

function Navigation() {
  const { setUser } = useUserContext();
  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    auth.onAuthStateChanged((currentuser) => {
      if (currentuser) {
        setUser(currentuser);
      } else {
        setUser(null);
        history.push("/login");
      }
    });
  }, []);

  return (
    <div className={container}>
      <section className={service}>
        <Link to="/home" className={serciveTitle}>
          구름 좌표
        </Link>
      </section>
      <section>
        <NaviItems
          title="지도"
          path="/map"
          nowPath={pathname}
          logo={<BsMap />}
          onClickLogo={<BsMapFill />}
        />
        <NaviItems
          title="내 흡연 관리"
          path="/my"
          nowPath={pathname}
          logo={<BsCalendarCheck />}
          onClickLogo={<BsCalendarCheckFill />}
        />
        <NaviItems
          title="설정"
          path="/settings"
          nowPath={pathname}
          logo={<RiSettings4Line size={21} />}
          onClickLogo={<RiSettings4Fill size={21}/>}
        />
      </section>
    </div>
  );
}

const container = css`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 0px;

  width: 244px;
  height: 100vh;

  padding: 8px 12px 20px;
  border-right: 1px solid rgb(219, 219, 219);
`;

const service = css`
  height: 60px;
  padding: 12px;
  margin-bottom: 5px;
`;

const serciveTitle = css`
  display: block;
  wdith: 100%;
  height: 29px;
  margin-top: 7px;

  line-height: 29px;

  font-family: "SUIT Variable", sans-serif;
  font-size: 18px;
  font-weight: 700;
  text-align: left;
`;

const items = css`
  height: 40px;
  margin: 8px 0;

  text-align: left;
`;

const itemClickAbleArea = css`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 12px;

  text-align: left;
  line-height: 16px;

  font-size: 13px;
  font-weight: 400;
  text-overflow: ellipsis;
  white-space: nowrap;

  color: black;
  border-radius: 10px;
  &: hover {
    background-color: #f2f4f6;
  }
`;

const itemTitle = css`
  padding-left: 16px;
  padding-top: 2px;
`;

const selectedNav = css`
  font-weight: 600;
`;

const iconSize = css`
  width: 18px;
  height: 100%;

  svg {
    width: 100%;
    height: 100%;
  }

  // hover 시 아이콘 크기 키우기 추가하기
`;

const settingIconSize = css`
  width: 18px;
  height: 20px;

  svg {
    width: 100%;
    height: 100%;
  }

  // hover 시 아이콘 크기 키우기 추가하기
`;

export default Navigation;
