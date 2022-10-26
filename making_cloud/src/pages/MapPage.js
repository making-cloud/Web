import React, { useEffect, useState } from "react";
import { sendGetdRequest } from "../component/Hooks/sendGetdRequest";
import PageWrapper from "../component/Wrapper/PageWrapper";


function MapPage() {
  const [datas, setDatas] = useState(null);
  const [div, setDiv] = useState(<div>로딩중</div>)

  const apiAddr =
    "https://api.odcloud.kr/api/15073796/v1/uddi:17fbd06c-45bb-48aa-9be7-b26dbc708c9c?page=1&perPage=10000000";

  useEffect(() => {
    sendGetdRequest({
      endpoint: apiAddr,
      method: "GET",
      headers: {
        Authorization:
          "Infuser LvuQr1SXWErs3fay0lXZ5refligsDNX9J1gcTjPFI0iBzMsJBZw5LPCgrTpRPY3HazBEKGUKsglW3Hw9EVeqbA==",
        accept: "application/json",
      },
    }).then((data) => {
      console.log(data);
      setDatas(data);
    });
  }, []);

  useEffect(() => {
    if (!datas) return;

    const res = datas.data.map((data, i) => {
      const key = i + 1;
      return <div key={key}>{data['서울특별시 용산구 설치 위치']}</div>;
    });
    setDiv(res);
  }, [datas]);

  return <PageWrapper>{div}</PageWrapper>;
}

export default MapPage;
