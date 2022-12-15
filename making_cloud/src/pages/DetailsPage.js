import SideLocationList from "../component/Map/SideLocationList";
import UserRating from "../component/Map/UserRating/UserRating";
import { css } from "@emotion/css";
import { useEffect, useState } from "react";

function DetailsPage({ locaDatas, selectedLoc, setSelectedLoc }) {
  const [isSelected, setIsSelcted] = useState(false);

  console.log(isSelected);
  useEffect(() => {
    if (selectedLoc) setIsSelcted(true);
  }, [selectedLoc]);

  return (
    <div className={container}>
      {isSelected ? (
        <UserRating selectedLoc={selectedLoc} />
      ) : (
        <SideLocationList
          locaDatas={locaDatas}
          setSelectedLoc={setSelectedLoc}
        />
      )}
    </div>
  );
}

const container = css`
  position: absolute;
  height: 100vh;
  z-index: 3;
  background: #fff;
  width: 390px;
`;

export default DetailsPage;
