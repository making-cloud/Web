import { css } from "@emotion/css";
import {
  Map,
  CustomOverlayMap,
} from "react-kakao-maps-sdk";
import { AiTwotoneCloud } from "react-icons/ai";

function MapContainer({ locaDatas, setSelectedLoc }) {
  function setLocation(title) {
    setSelectedLoc(title);
  }

  const EventMarkerContainer = ({ position, onClick, children }) => {

    return (
      <CustomOverlayMap
        position={position} // 마커를 표시할 위치
        onClick={onClick}
        removable={false}
      >
        {children}
      </CustomOverlayMap>
    );
  };

  const markers = locaDatas.map((locaData, index) => {
    return (
      <EventMarkerContainer
        key={locaData.title + index}
        position={{ lat: locaData.latitude, lng: locaData.longtitude }}
      >
        <div className={markPoint} />
        <div className={markContainer}>
          <div className={markImg}>
            <AiTwotoneCloud
              style={{ width: "100%", height: "100%", color: "white" }}
            />
          </div>
          <button
            className={markTitle}
            onClick={() => setLocation(locaData)}
          >
            {locaData.title}
          </button>
        </div>
        <div />
      </EventMarkerContainer>
    );
  }, []);

  return (
    <>
      <Map
        center={{ lat: 37.539237, lng: 126.97959 }}
        style={{ width: "100%", height: "100%" }}
        level={6}
      >
        {markers}
      </Map>
    </>
  );
}

const markPoint = css`
  position: absolute;
  bottom: -5px;
  left: 15px;
  width: 0;
  height: 0;
  border-color: #0475f4 transparent transparent;
  border-style: solid;
  border-width: 6px 4px 0;
  pointer-events: none;
  &:before {
    opacity: 0.1;
    position: absolute;
    bottom: -2px;
    left: -5px;
    width: 10px;
    height: 3px;
    background-color: #000;
    filter: blur(1px);
    content: "";
  }
  &:after {
    width: 0;
    height: 0;
    border-color: #fff transparent transparent;
    border-style: solid;
    border-width: 9px 6px 0;
    position: absolute;
    top: -11px;
    left: -6px;
    content: "";
  }
`;

const markContainer = css`
  display: flex;
  height: 40px;
  border: 1px solid #0475f4;
  border-radius: 23px;
  padding: 5px;
  background: #fff;
  font-size: 13px;
`;

const markImg = css`
  width: 28px;
  height: 28px;
  padding: 2px 4px 4px 4px;
  border-radius: 23px;
  border: 1px solid #0475f4;
  background: #0475f4;
`;

const markTitle = css`
  width: "100%";
  height: "100%";
  margin: -2px 0;
  padding: 2px 9px 2px 5px;
  font-size: 13px;
  line-height: 28px;
  letter-spacing: -0.4px;
  font-weight: 600;
  color: black;

  &:hover {
    color: #0475f4;
    font-weight: 800;
  }
`;

export default MapContainer;
