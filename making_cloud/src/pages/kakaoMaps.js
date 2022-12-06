import React, { Component, useEffect, useState } from 'react';
import db from '../Firebase/firebase';
import { collection,setDoc,doc, getDocs, query,getDoc } from 'firebase/firestore';
import { async } from '@firebase/util';

const MapContainer = () => {    
    const { kakao } = window;

    useEffect(() => {  //지도 표시 시작
        const container = document.getElementById('myMap');
		const options = {
			center: new kakao.maps.LatLng(37.539237,126.979590), // 지도의 중심좌표
			level: 6, //지도 확대 레벨
            mapTypeId : kakao.maps.MapTypeId.ROADMAP // 지도종류
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
            },
            {
                title: '서울특별시 용산구 서울지방보훈청 실외', 
                latlng: new kakao.maps.LatLng(37.534923, 126.974192)
            },
            {
                title: '서울특별시 용산구 용산세무서 1층 외부', 
                latlng: new kakao.maps.LatLng(37.523302, 126.968680)
            },
            {
                title: '서울특별시 용산구 국방부 컨벤스 1층 외부', 
                latlng: new kakao.maps.LatLng(37.533237,126.978590 )
            },
            {
                title: '서울특별시 용산구 순천향대학교 서울병원 장례식장 외부',
                latlng: new kakao.maps.LatLng(37.534466,127.004585 )
            },
            {
                title: '서울특별시 용산구 순천향대학교 서울병원 신관 옥상', 
                latlng: new kakao.maps.LatLng(37.534009,127.004334 )
            },
            {
                title: '서울특별시 용산구 1층 외부 주차장 가는길 휴식장소', 
                latlng: new kakao.maps.LatLng(37.539372, 126.997264)
            },
            {
                title: '서울특별시 용산구 아이파크몰 달 주차장 4.5층', 
                latlng: new kakao.maps.LatLng(37.529492, 126.964318)
            },
            {
                title: '서울특별시 용산구 아이파크몰 해 주차장 4.5층', 
                latlng: new kakao.maps.LatLng(37.529492, 126.964318)
            },
            {
                title: '서울특별시 용산구 아이파크몰 8층 옥상', 
                latlng: new kakao.maps.LatLng(37.529492, 126.964318)
            },
            {
                title: '서울특별시 용산구 선인상가 21동 1층 외부', 
                latlng: new kakao.maps.LatLng(37.533068,126.963521 )
            },
            {
                title: '서울특별시 용산구 선인상가 21동 옥상', 
                latlng: new kakao.maps.LatLng(37.533068,126.963521 )
            },
            {
                title: '서울특별시 용산구 1층 공유지', 
                latlng: new kakao.maps.LatLng(37.533417,126.967360 )
            },
            {
                title: '서울특별시 용산구 주차장 지하 1층', 
                latlng: new kakao.maps.LatLng(37.532818, 126.958895)
            },
            {
                title: '서울특별시 용산구 아모레퍼시픽 10층 테라스', 
                latlng: new kakao.maps.LatLng(37.529110,126.968532 )
            },
            {
                title: '서울특별시 용산구 제일기획 1층 외부 주차장', 
                latlng: new kakao.maps.LatLng(37.535103,126.998616 )
            },
            {
                title: '서울특별시 용산구 건물 옥상', 
                latlng: new kakao.maps.LatLng(37.536678,126.961147 )
            },
            {
                title: '서울특별시 용산구 충영빌딩 옥상', 
                latlng: new kakao.maps.LatLng(37.538329,126.959979 )
            },
            {
                title: '서울특별시 용산구 e테크밸리 공개공지, 옥상', 
                latlng: new kakao.maps.LatLng(37.533234,126.957656 )
            },
            {
                title: '서울특별시 용산구 삼원빌딩 옥상', 
                latlng: new kakao.maps.LatLng(37.534626,126.959002 )
            },
            {
                title: '서울특별시 용산구 대교빌딩 옥상', 
                latlng: new kakao.maps.LatLng(37.533918,126.957630 )
            },
            {
                title: '서울특별시 용산구 현대자동차사옥 옥상', 
                latlng: new kakao.maps.LatLng(37.531999,126.953751 )
            },
            {
                title: '서울특별시 용산구 진성빌딩 옥상', 
                latlng: new kakao.maps.LatLng(37.534610,126.966177 )
            },
            {
                title: '서울특별시 용산구 미성상사㈜ 1층 외부', 
                latlng: new kakao.maps.LatLng(37.538839,126.968402 )
            },
            {
                title: '서울특별시 용산구 미성상사 공장 옥상', 
                latlng: new kakao.maps.LatLng(37.538839,126.968402 )
            },
            {
                title: '서울특별시 용산구 조양빌딩 옥상', 
                latlng: new kakao.maps.LatLng(37.536223,126.963549 )
            },
            {
                title: '서울특별시 용산구 하나실업빌딩 옥상', 
                latlng: new kakao.maps.LatLng(37.534709,126.960734 )
            },
            {
                title: '서울특별시 용산구 오리온제과 옥상', 
                latlng: new kakao.maps.LatLng(37.535767,126.969873 )
            },
            {
                title: '서울특별시 용산구 오리온제과 공장 옥상, 주차장', 
                latlng: new kakao.maps.LatLng(37.536202,126.969268 )
            },
            {
                title: '서울특별시 용산구 우경빌딩 옥상, 1층 외부', 
                latlng: new kakao.maps.LatLng(37.534231,126.961404)
            },
            {
                title: '서울특별시 용산구 POBA 지방행정공제회 건물 1층 주차장', 
                latlng: new kakao.maps.LatLng(37.531685,126.970651 )
            },
            {
                title: '서울특별시 용산구 넥서스밸리 1층 외부', 
                latlng: new kakao.maps.LatLng(37.534144,126.964859 )
            },
            {
                title: '서울특별시 용산구 GS한강에끌라트 1층 외부', 
                latlng: new kakao.maps.LatLng(37.531399,126.955431 )
            },
            {
                title: '서울특별시 용산구 한강그랜드오피스 주차장 옆', 
                latlng: new kakao.maps.LatLng(37.531222,126.955055 )
            },
            {
                title: '서울특별시 용산구 용산전자오피스텔 옥상, 건물옆', 
                latlng: new kakao.maps.LatLng(37.532207,126.956792)
            },
            {
                title: '서울특별시 용산구 NH농협은행 용산별관(하나로마트) 옥상', 
                latlng: new kakao.maps.LatLng(37.533197,126.964645)
            },
            {
                title: '서울특별시 용산구 대우아이빌 16층 옥상, 1층 외부', 
                latlng: new kakao.maps.LatLng(37.531695,126.968805)
            },
            {
                title: '서울특별시 용산구 유베이스 1층 외부', 
                latlng: new kakao.maps.LatLng(37.538001,126.967147)
            },
            {
                title: '서울특별시 용산구 대원빌딩 1층 현관옆', 
                latlng: new kakao.maps.LatLng(37.535201,126.963618)
            },
            {
                title: '서울특별시 용산구 기독교대한감리회여선교회관 1층 외부', 
                latlng: new kakao.maps.LatLng(37.535109,127.011499)
            },
            {
                title: '서울특별시 용산구 일각빌딩 5층', 
                latlng: new kakao.maps.LatLng(37.540322,126.989802)
            },
            {
                title: '서울특별시 용산구 한남빌딩 5층 외부', 
                latlng: new kakao.maps.LatLng(37.535022,126.997224)
            },
            {
                title: '서울특별시 용산구 남영비비안 1층 외부(정자)', 
                latlng: new kakao.maps.LatLng(37.528894,126.964038)
            },
            {
                title: '서울특별시 용산구 서울역 풍림 아이원플러스 공개공지', 
                latlng: new kakao.maps.LatLng(37.554920,126.968415)
            },
            {
                title: '서울특별시 용산구 세광음악사 옥상', 
                latlng: new kakao.maps.LatLng(37.553965,126.965964)
            },
            {
                title: '서울특별시 용산구 한화빌딩 1층 외부', 
                latlng: new kakao.maps.LatLng(37.552032,126.968943)
            },
            {
                title: '서울특별시 용산구 보은개발빌딩 옥상', 
                latlng: new kakao.maps.LatLng(37.551185,126.969220)
            },
            {
                title: '서울특별시 용산구 애전빌딩 옥상', 
                latlng: new kakao.maps.LatLng(37.541750,126.970388)
            },
            {
                title: '서울특별시 용산구 한진중공업 빌딩 5층 외부', 
                latlng: new kakao.maps.LatLng(7.540529,126.972721)
            },
            {
                title: '서울특별시 용산구 KCC IT빌딩 옥상', 
                latlng: new kakao.maps.LatLng(37.548507,126.972205)
            },
            {
                title: '서울특별시 용산구 금강토탈패션할인매장 주차장', 
                latlng: new kakao.maps.LatLng(37.543561,126.971505)
            },
            {
                title: '서울특별시 용산구 용산빌딩 1층 외부(건물뒤편)', 
                latlng: new kakao.maps.LatLng(37.542611,126.972137)
            },
            {
                title: '서울특별시 용산구 청룡빌딩 주차장', 
                latlng: new kakao.maps.LatLng(37.541424,126.972679)
            },
            {
                title: '서울특별시 용산구 롯데지알에스 옥상, 주차장', 
                latlng: new kakao.maps.LatLng(37.541540,126.971791)
            },
            {
                title: '서울특별시 용산구 금강빌딩 주차장', 
                latlng: new kakao.maps.LatLng(37.544739,126.973179)
            },
            {
                title: '서울특별시 용산구 수빌딩 옥상', 
                latlng: new kakao.maps.LatLng(37.532824,126.970666)
            },
            {
                title: '서울특별시 용산구 우리빌딩 주차장', 
                latlng: new kakao.maps.LatLng(37.540960,126.973516)
            },
            {
                title: '서울특별시 용산구 기업은행용산지점 2층 베란다', 
                latlng: new kakao.maps.LatLng(37.541995,126.973179)
            },
            {
                title: '서울특별시 용산구 진흥빌딩 옥상', 
                latlng: new kakao.maps.LatLng(37.548500,126.977574)
            },
            {
                title: '서울특별시 용산구 한치과의원 건물 주차장', 
                latlng: new kakao.maps.LatLng(37.545890,126.976959)
            },
            {
                title: '서울특별시 용산구 LS용산타워 주차장', 
                latlng: new kakao.maps.LatLng(37.528002,126.967632)
            },
            {
                title: '서울특별시 용산구 한국폴리텍대학 정수캠퍼스', 
                latlng: new kakao.maps.LatLng(37.529136,126.996483)
            },
            {
                title: '서울특별시 용산구 한국폴리텍대학 정수캠퍼스', 
                latlng: new kakao.maps.LatLng(37.528710,126.996226)
            },
            {
                title: '서울특별시 용산구 한국폴리텍대학 정수캠퍼스', 
                latlng: new kakao.maps.LatLng(37.529323,126.995976)
            },
            {
                title: '서울특별시 용산구 한국폴리텍대학 정수캠퍼스', 
                latlng: new kakao.maps.LatLng(37.529799,126.996498)
            }
            
        ];        

        var content = 'gg';

        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";   //마커 이미지 지정
        
        for (var i = 0; i < positions.length; i ++) {
            var imageSize = new kakao.maps.Size(21, 33); //마커 사이즈
            var imageOption={offset:new kakao.maps.Point(27,69)};
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize,imageOption); //마커 이미지 생성
        
            var marker = new kakao.maps.Marker({    // 마커를 생성
                map: map, // 마커를 표시할 지도
                position: positions[i].latlng, // 마커를 표시할 위치
                title : positions[i].title,
                 image:markerImage //이미지 못 골라서 임시 주석
            })
          Locate(positions[i].title,positions[i].latlng.La,positions[i].latlng.Ma,i)
        }
         Seeingsite()  
       

    
    },[]);
   
    async function Seeingsite(){
        
            const quertSnapshot = await getDocs(collection(db,"location"));
           
            quertSnapshot.forEach((doc)=>{
              
              
              document.getElementById("information").insertAdjacentHTML(
                "afterend",`<li>${doc.get("title")}</li>`
              );
            }
            )
    }
       
    
    function Locate(title,La,ma,number){
        var name = "SiteName"+String(number)
        setDoc(doc(db,"location",name),{
           title: title,
           latitude: ma,
           longtitude: La
        })
        
        }

    return (
        <>
        <div id='myMap' style={{    //지도 크기
            width: '900px', 
            height: '700px'
        }}></div>
        <ol id="information">

        </ol>
             
        </>
    );
    
}

export default MapContainer; 


