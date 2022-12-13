import React from "react";
import { css } from "@emotion/css";

function SideLocationList({ locaDatas, setSelectedLoc }) {

  const locaDiv = locaDatas.map((data, i) => {
    return <button key={data.title + i} className={paddingCss} onClick={() => setSelectedLoc(data.title)}>{data.title}</button>;
  });
  return <>{locaDiv}</>;
}

export default SideLocationList;

const paddingCss = css`
    padding: 10px;
`;