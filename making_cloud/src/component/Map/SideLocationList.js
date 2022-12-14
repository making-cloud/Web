import React from "react";
import { css } from "@emotion/css";

function SideLocationList({ locaDatas, setSelectedLoc }) {

  const locaDiv = locaDatas.map((data) => {
    return <button key={data.title} className={paddingCss} onClick={() => setSelectedLoc(data)}>{data.title}</button>;
  });
  return <>{locaDiv}</>;
}

export default SideLocationList;

const paddingCss = css`
    padding: 10px;
`;