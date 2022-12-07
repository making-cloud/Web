

import { async } from "@firebase/util";
import { getTitle, getLatitude,getLongtitude } from "../component/Map/Map/DataLocation";
 async function Test(){
    let tester
    try{
        tester = await getTitle("서울특별시 용산구 서울역 광장 15번출구")
       if(tester === "서울특별시 용산구 서울역 광장 15번출구"){
            let hello = await getLatitude(tester)
            let goodbye = await getLongtitude(tester)
       }
        console.log(tester)
    }
    catch(e){
        console.log(e)
    }
  return tester
}


export default async function TEXT(){
       Test()
    }



