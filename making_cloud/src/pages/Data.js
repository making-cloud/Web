

import {collection,doc,addDoc, setDoc, getDoc, getDocs} from "firebase/firestore"
import db from "../Firebase/firebase"
class site{
    constructor(title,latitude,longtitude){
        this.title=title;
        this.latitude=latitude;
        this.longtitude=longtitude;
    }
    toString(){
        return this.title+','+this.latitude+","+this.longtitude;
    }
}
function Locate(){
 setDoc(doc(db,"locate","site1"),{
    title: '서울특별시 용산구 서울역 광장 15번출구',
    latitude:37.553149,
    longtitude:126.968881
})
setDoc(doc(db,"locate","site2"),{
    title: '서울특별시 용산구 서울역 광장 1번출구',
    latitude:37.553760,
    longtitude:126.969662
})
setDoc(doc(db,"locate","site2"),{
    title: '서울특별시 용산구 서울역 광장 1번출구',
    latitude:37.553760,
    longtitude:126.969662
})
setDoc(doc(db,"locate","site3"),{
    title: '서울특별시 용산구 용산역 광장',
    latitude:37.528404,
    longtitude:126.965569
})
setDoc(doc(db,"locate","site4"),{
    title: '서울특별시 용산구 용산구청 옥상',
    latitude:37.532709,
    longtitude:126.990000
})
setDoc(doc(db,"locate","site5"),{
    title: '서울특별시 용산구 용산구청 2층 외부', 
    latitude:37.532709,
    longtitude:126.990000
})
setDoc(doc(db,"locate","site6"),{
    title: '서울특별시 용산구 용산경찰서 1층 외부', 
    latitude:37.541169,
    longtitude:126.990000
})
setDoc(doc(db,"locate","site7"),{
    title: '서울특별시 용산구 원효지구대 방범순찰대(옛 용산구청)', 
    latitude:37.538716,
    longtitude:126.965890
})
 Seeingsite()
 
}
async function Seeingsite(){
    const quertSnapshot = await getDocs(collection(db,"locate"));
   
    quertSnapshot.forEach((doc)=>{
        console.log(doc.id,"=>",doc.get("title"))
    })
    
}
export default Locate
