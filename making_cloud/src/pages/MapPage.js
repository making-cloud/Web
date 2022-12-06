import React, { useEffect, useState } from "react";
import { sendGetdRequest } from "../component/Hooks/sendGetdRequest";
import PageWrapper from "../component/Wrapper/PageWrapper";
import axios from 'axios';
import MapContainer from "./kakaoMaps";



const MapPage=()=>{
  
    const [lists1,setLists]=useState([]);
    
  
  useEffect(()=>{   //api 불러오기
      axios
      .all(
        [axios.get('https://api.odcloud.kr/api/15073796/v1/uddi:17fbd06c-45bb-48aa-9be7-b26dbc708c9c?page=1&perPage=72&serviceKey=%2FQWCPnc%2F3l84xQe0ii7xaN5QUwH5zCG1J0a9UgUeHfLVzPq2HEQ0GBnTIqfUvdpJnqpg8CoWe37h%2F2%2F7pAJHbQ%3D%3D')])
      .then(axios.spread((response1)=>{
        setLists(response1.data.data);
        
        console.log(response1);

      }))
      
  },[]);

    
  return(
      <div>
        {lists1.map(list => {
                      
           return (
            
           <div key={list.용산}>
            
                {/* {list.위도}
               ,{list.경도}
               <br></br>  {list['서울특별시 용산구 설치 위치']} */}
                
               
           </div>);
           

       })}
          
       <PageWrapper><MapContainer/></PageWrapper>
   </div>
  );
  
};


export default MapPage;
