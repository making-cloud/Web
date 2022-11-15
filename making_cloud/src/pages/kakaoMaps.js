import React, { useEffect } from 'react';



const MapContainer = () => {
    
    const { kakao } = window;

    useEffect(() => {  //지도 표시 시작
        const container = document.getElementById('myMap');
		const options = {
			center: new kakao.maps.LatLng(37.553149, 126.968881), // 지도의 중심좌표
			level: 6
		};
        const map = new kakao.maps.Map(container, options); //지도 생성

        var zoomControl = new kakao.maps.ZoomControl(); //지도 줌 설정
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT); //지도 줌 설정
        

        var positions = [   // 마커를 표시할 위치
            {
                title: '서울특별시 용산구 서울역 광장 15번출구', 
                latlng: new kakao.maps.LatLng(37.553149, 126.968881)
            },
            {
                title: ' 서울특별시 용산구 서울역 광장 1번출구', 
                latlng: new kakao.maps.LatLng(37.553760, 126.969662)
            },
            {
                title: '서울특별시 용산구 용산역 광장', 
                latlng: new kakao.maps.LatLng(37.528404, 126.965569)
            },
            {
                title: '서울특별시 용산구 용산구청 옥상',
                latlng: new kakao.maps.LatLng(37.532709, 126.990000)
            },
            {
                title: '서울특별시 용산구 용산구청 2층 외부', 
                latlng: new kakao.maps.LatLng(37.532709,126.990000)
            },
            {
                title: '서울특별시 용산구 용산경찰서 1층 외부', 
                latlng: new kakao.maps.LatLng(37.541169, 126.967650)
            },
            {
                title: '서울특별시 용산구 원효지구대 방범순찰대(옛 용산구청)', 
                latlng: new kakao.maps.LatLng(37.538716, 126.965890)
            }
            
        ];

        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";   //마커 이미지 지정
        for (var i = 0; i < positions.length; i ++) {
            var imageSize = new kakao.maps.Size(24, 35); //마커 사이즈
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); //마커 생성
        
            var marker = new kakao.maps.Marker({    // 마커를 생성
                map: map, // 마커를 표시할 지도
                position: positions[i].latlng, // 마커를 표시할 위치
                title : positions[i].title,
                 image:markerImage //이미지 못 골라서 임시 주석
            });
        }
        

    
    }, []);


    return (
        <div id='myMap' style={{    //지도 크기
            width: '790px', 
            height: '550px'
        }}></div>
    );
    
}

export default MapContainer; 