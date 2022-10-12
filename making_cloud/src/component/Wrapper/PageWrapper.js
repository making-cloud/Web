import React from "react";
import { css } from "@emotion/css";
import Navigation from "../Navigation/Navigation";

function PageWrapper(props) {
  return (
    <center className={minWidth}>
      {props.children}
      <Navigation />
    </center>
  );
}

const minWidth = css`
  position: relative;
  width: 390px;
  min-height: 600px;
  border: 1px solid black;
  margin: 0 auto;
`;

export default PageWrapper;
