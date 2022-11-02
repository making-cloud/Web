import React from "react";
import { css } from "@emotion/css";
import Navigation from "../Navigation/Navigation";

function PageWrapper(props) {
  return (
    <center className={container}>
      <div className={listWrapper}>
      {props.children}
      </div>
      <Navigation />
    </center>
  );
}

const container = css`
  position: relative;
  // width: 390px;
  min-height: 600px;
  border: 1px solid black;
  margin: 0 auto;
`;

const listWrapper = css`
  margin-bottom: 50px;
  height: calc(100vh - 50px);
  overflow-y: scroll;
`

export default PageWrapper;
