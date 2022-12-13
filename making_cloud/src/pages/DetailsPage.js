import SideLocationList from "../component/Map/SideLocationList";
import UserRating from "../component/Map/UserRating/UserRating";
import { css } from "@emotion/css";

function DetailsPage({ locaDatas, selectedLoc }) {
  return (
    <div className={container}>
      {selectedLoc ? (
        <UserRating selectedLoc={selectedLoc} />
      ) : (
        <SideLocationList locaDatas={locaDatas} />
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
