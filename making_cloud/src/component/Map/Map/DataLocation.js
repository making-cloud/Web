

import {collection,doc, setDoc, getDocs, query,where} from "firebase/firestore"
import db from "../../../Firebase/firebase"
    
export function setLocation(title,latitude,longtitude,circum){
    setDoc(doc(db,"location",title),{
       'title': title,
       'latitude': latitude,
       'longtitude': longtitude,
       'circum':circum 
    })
    
}

export const getLocation = async() => {
    const rawDatas = await getDocs(collection(db,"location"));

    let datas = []
    rawDatas.forEach((doc) => {
        datas = [...datas, doc.data()];
    })
    return datas;
}

export const getTitle= async(Title) => {
    const title = query(collection(db,"location"),where("title","==",Title))
    const P = await getDocs(title)
    let Text = ""
    P.forEach((doc)=>{
        Text = Text + doc.data().title
    })
    return Text
}

export const getLongtitude = async(Title) =>{
    const title = query(collection(db,"location"),where("title","==",Title))
    const P = await getDocs(title)
    let Text = ""
    P.forEach((doc)=>{
        Text = Text + doc.data().longtitude
    })
    return Text
}
export const getLatitude= async(Title) =>{
    const title = query(collection(db,"location"),where("title","==",Title))
    const P = await getDocs(title)
    let Text = ""
    P.forEach((doc)=>{
        Text = Text + doc.data().latitude
    })
    return Text
}


