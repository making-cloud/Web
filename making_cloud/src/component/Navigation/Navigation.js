import { css, cx } from "@emotion/css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BsCalendarCheck,
  BsCalendarCheckFill,
  BsMap,
  BsMapFill,
} from "react-icons/bs";
import { RiSettings4Line, RiSettings4Fill } from "react-icons/ri";
import { auth } from "../../Firebase/firebase";
import { useState } from "react";

const NaviItems = ({ title, path, nowPath, logo, onClickLogo }) => {
  const isClicked = path === nowPath;
  return (
    <div className={items}>
      <Link
        to={path}
        className={cx(itemClickAbleArea, isClicked && selectedNav)}
      >
        {isClicked ? onClickLogo : logo}
        <div className={itemTitle}>{title}</div>
      </Link>
    </div>
  );
};

function Navigation() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  auth.onAuthStateChanged((_userInfo) => {
    console.log(_userInfo);
    if (_userInfo) {
      if (pathname === "/") navigate("/map");
    } else {
      // navigate("/Login");
    }
  });

  return (
    <div className={container}>
      <section className={service}>
        <Link to="/home" className={serciveTitle}>
          구름 좌표
        </Link>
      </section>
      <section></section>
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
          logo={<RiSettings4Line />}
          onClickLogo={<RiSettings4Fill />}
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
  height: 73px;

  padding: 25px 12px 16px;
`;

const serciveTitle = css`
  display: block;
  wdith: 100%;
  height: 29px;
  margin-top: 7px;

  line-height: 29px;

  font-family: "dongle";
  font-size: 29px;
  text-align: left;
`;

const items = css`
  height: 48px;
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
  line-height: 24px;

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
`;

const selectedNav = css`
  font-weight: 600;
`;

export default Navigation;
