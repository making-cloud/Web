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
  min-height: 600px;
  width: 100%;
  margin: 0 auto;
`;

const listWrapper = css`
  margin-left: 244px;
  width: calc(100%- 244px);
  height: 100vh;
  overflow-y: scroll;
`

export default PageWrapper;
