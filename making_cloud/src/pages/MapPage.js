import React, { useEffect, useState } from "react";
import { sendGetdRequest } from "../component/Hooks/sendGetdRequest";
import PageWrapper from "../component/Wrapper/PageWrapper";
import axios from "axios";
import { getLocation, setLocation } from "../Firebase/location";
import MapContainer from "./MapContainer";

const MapPage = () => {
  const [locaDatas, setlocaDatas] = useState([]);

  useEffect(() => {
    getLocation().then(setlocaDatas);
  }, []);

  return (
    <div>
      <PageWrapper>
        <MapContainer locaDatas={locaDatas} />
      </PageWrapper>
    </div>
  );
};

export default MapPage;

    // 용인시 api 호출 후 firebase 저장 코드
    // axios
    //   .all([
    //     axios.get("url"),
    //   ])
    //   .then(
    //     axios.spread((response1) => {
    //       const locaInfos = response1.data.data;

    //       locaInfos.map((locaInfo) => {
    //         console.log(locaInfo);
    //         setLocation(
    //           locaInfo["서울특별시 용산구 설치 위치"],
    //           locaInfo["위도"],
    //           locaInfo["경도"],
    //           {
    //             "설치 주체": locaInfo["설치 주체"],
    //             "시설 구분": locaInfo["시설 구분"],
    //             시설형태: locaInfo["시설형태"],
    //             자치구명: locaInfo["자치구명"],
    //           }
    //         );
    //       });
    //     })
    //   );