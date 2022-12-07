

import { async } from "@firebase/util";
import {collection,doc,addDoc, setDoc, getDoc, getDocs, query,where, orderBy} from "firebase/firestore"
import db from "../../../Firebase/firebase"
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
    
export function Locate(title,La,ma,number){
    var name = "SiteName"+String(number)
    setDoc(doc(db,"location",name),{
       title: title,
       latitude: ma,
       longtitude: La
    })
    
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


