import React, { useEffect } from "react";

function MapContainer({ locaDatas }) {
  const { kakao } = window;
  // new kakao.maps.LatLng(37.553149, 126.968881),
  useEffect(() => {
    //지도 표시 시작
    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(37.539237, 126.97959), // 지도의 중심좌표
        level: 6, // 지도의 확대 레벨
      };
    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    var mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    var imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png"; // 마커이미지 주소
    var imageSize = new kakao.maps.Size(34, 36); // 마커이미지의 크기
    var imageOption = { offset: new kakao.maps.Point(17, 36) }; // 마커의 좌표와 일치시킬 이미지 안에서의 좌표설정

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    for (let i = 0; i < locaDatas.length; i++) {
      var data = locaDatas[i];
      displayMarker(data);

      function displayMarker(data) {
        var markerTmp = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(data.latitude, data.longtitude),
          title: data.title,
          image: markerImage,
          map: map,
        });
        var customOverlay = new kakao.maps.CustomOverlay({
          map: map,
          position: markerTmp.getPosition(),
          content: "하이", //클릭시 이동 url
          yAnchor: 1.5, //컨텐츠의 y축 위치
          clickable: true,
        });

        var content = document.createElement("div");
        content.innerHTML =
          `<div class='customoverlay' style="background-color: white;">` +
          `<a href="http://localhost:3000/map/${data.title}" +"' target='_blank'>` +
          `<span class='title'>` +
          data.title +
          `</span>` +
          `</a>` +
          `</div>`;
        var closeBtn = document.createElement("button");
        closeBtn.innerHTML = "X";
        closeBtn.onclick = function () {
          customOverlay.setMap(null);
        };
        customOverlay.setContent(content);

        kakao.maps.event.addListener(markerTmp, "click", function () {
          customOverlay.setMap(map);
        });
      }
    }
  }, [locaDatas]);

  return (
    <div
      id="map"
      style={{
        //지도 크기
        width: "100%",
        height: "100%",
      }}
    />
  );
}

export default MapContainer;
