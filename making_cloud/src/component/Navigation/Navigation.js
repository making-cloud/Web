import { css, cx } from "@emotion/css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NaviItems = ({ title, path, nowPath }) => {
  return (
    <div className={items}>
    <Link to={path}>
      <div className={cx(items, path === nowPath && selectedNav)}>{title}</div>
    </Link>
    </div>
  );
};

function Navigation(props) {
  const nowPath = window.location.pathname;

  return (
    <div className={container}>
      <NaviItems title="지도" path="/map" nowPath={nowPath} />
      <NaviItems title="내 페이지" path="/my" nowPath={nowPath} />
      <NaviItems title="설정" path="/settings" nowPath={nowPath} />
    </div>
  );
}

const container = css`
  position: absolute;
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: stretch;
  bottom: 0px;
  border-top: 0.5px solid black;
`;

const items = css`
  flex-grow: 1;
  text-align: center;
  line-height: 50px;
  height: 100%;
  font-size: 20px;
  color: #4e5968;
  &: hover {
    background-color: #f2f4f6;
  }
`;
const selectedNav = css`
  background-color: #f2f4f6;
`;

export default Navigation;
