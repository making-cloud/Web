import React, { useState } from "react";
import Calendar from 'react-calendar';
import moment from 'moment';
import { css } from "@emotion/css";
import { LineChart, Line, XAxis, YAxis,
  CartesianGrid, Legend } from "recharts";
  

export default function CalendarSet(props) {
  const [value, onChange] = useState(new Date()); //현재날짜
  const [visible1, setVisible1] = useState(true);  //가리기
  const [visible2, setVisible2] = useState(false);
  const [smoke, setSmoke] = useState('1');           //흡연량
  const [day, setDay] = useState(moment(value).format("YYYY-MM-DD")); //선택날짜

  const handleSelect = (e) => { setSmoke(e.target.value); };

  const onCreate = () => {
    var marks = localStorage.getItem("marks");
    marks = JSON.parse(marks);
    var count = localStorage.getItem("count");
    count = JSON.parse(count);
    localStorage.setItem("count", count + Number(smoke));

    for(var i=0; i<marks.length; i++) {
      if (day === marks[i]) {
        var now = JSON.parse(localStorage.getItem(day));
        now = now + Number(smoke);
        localStorage.setItem(day, JSON.stringify(now));
      } else {
        localStorage.setItem(day, JSON.stringify(Number(smoke)));
      }
    }
    if(!marks.length) {
      localStorage.setItem(day, JSON.stringify(Number(smoke)));
    }
    
    marks.push(day);
    marks = new Set(marks);
    marks = [...marks];
    localStorage.setItem("marks", JSON.stringify(marks));
  };
/*
  const onRemove = () => {                         //삭제
    let delnum = JSON.parse(localStorage.getItem(id)).smoke;
    var count = localStorage.getItem("countNum");
    localStorage.setItem("countNum", count-Number(delnum));
    localStorage.removeItem(id);
  };*/
  const [data, setData] = useState([]); 


  return (
    <div>
      <Calendar
        onChange={onChange}    value={value}    className={calendar}
        formatDay={(locale,date) => moment(date).format("DD")}
        minDetail="month"       maxDetail="month"
        onClickDay= {(day) => setDay(moment(day).format("YYYY-MM-DD"))}
        showNeighboringMonth={false}
        calendarType="US"
        tileContent={({ date, view }) => {
          let html=[];
          var marks = JSON.parse(localStorage.getItem("marks"));
          if (marks?.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            html.push(<div className="dot"></div>);
          } return ( <><div className="flex">{html}</div></> );
        }}
      />
      <button onClick={()=>{
        localStorage.clear();
        localStorage.setItem("count", 0);
        localStorage.setItem("marks", JSON.stringify([]));
        }}>기록 삭제</button>
      <b className={counttext}>총 흡연량 : {localStorage.getItem("count")}</b>
      <button className={countbutton} onClick={()=>{
          setVisible2(!visible2);
          setVisible1(false);
      }}> {visible2 ? "통계 닫기" : "통계"}</button>
      <button className={button} onClick={()=>{
          setVisible1(!visible1);
          setVisible2(false);
      }}> {visible1 ? "기록 닫기" : "기록"}</button>

      { visible1 && (
        <div className={selectBox}>
          <button className={selectOpButton} onClick={onCreate}>+</button>
          <select className={selectOp}
                  onChange={handleSelect} value={smoke}>
              <option value='1'>1개비</option>
              <option value='2'>2개비</option>
              <option value='3'>3개비</option>
              <option value='4'>4개비</option>
          </select>
          <div>{}</div>
        </div>
      ) }

      { visible2 && (
        <div className={selectBox}>
          <LineChart width={500} height={200} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3" /> {/*점선*/}
                <XAxis dataKey="name" /> {/*x축 데이터종류*/}
                <YAxis allowDecimals="false" />
                <Legend /> {/*밑에 선 종류*/}
                <Line type="monotone" dataKey="흡연량" stroke="#82ca9d" />
            </LineChart>
        </div>
      ) }
      
    </div>
  );
}

const counttext = css`
  position : relative;
  left : 15%;
  top : 3px;
`;
const button = css`
  width: 10%;
  border : 2px solid #2b5682;
  border-radius: 5px;
  background-color: #bbddff;
  font-family: Arial, Helvetica, sans-serif;
  float: right;
  margin-right: 10px;
`;
const selectBox = css`
max-width: 70%;
border : 2px solid #2b5682;
border-radius: 5px;
margin-top: 15px;
padding-bottom : 5px;
`;
const selectOp = css`
width: 15%;
border : 2px solid #2b5682;
border-radius: 5px;
margin-top: 5px;
margin-left: 69%;
`;
const selectOpButton = css`
border : 2px solid #2b5682;
border-radius: 5px;
margin-left: 5px;
margin-top: 5px;
background-color: #bbddff;
float: right;
margin-right: 10%;
`;

const countbutton = css`
  width: 10%;
  border : 2px solid #2b5682;
  border-radius: 5px;
  background-color: #e8f1fb;
  font-family: Arial, Helvetica, sans-serif;
  float: right;
  margin-right: 15%;
`;

const calendar = css`
  max-width: 70%;
  background-color: #fff;
  border : 2px solid #222;
  border-radius: 5px;
  padding: 8px;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 3em;
  margin-bottom: 4px;

  .dot {
    height: 2.4px;
    width: 20px;
    background-color: #f87171;
    display: flex;
    margin: auto;
  }
 .react-calendar__navigation{
  background-color:#e8f1fb;
 }
 .react-calendar__navigation button {
  color: #2b5682;
  background: none;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  margin-right: 20px;
  min-width: 30px;
 }
 .react-calendar__navigation button:enabled:hover,
 .react-calendar__navigation button:enabled:focus {
  background-color: #fcfcfc;
 }
 abbr[title] { /*월화수*/
  text-decoration: none;
  font-size: 14px;
 }
 .react-calendar__tile {
  height: 30px;
  color: #2b5682;
  background: none;
  border: 30px;
  margin-bottom: 10px;
  border-radius: 6px;
  font-size: 16px;
 }
 .react-calendar__month-view__days__day--weekend {
  color: #f87171;
 }
 .react-calendar__tile:enabled:hover,
 .react-calendar__tile:enabled:focus { /*마우스*/
  background: #f8f8fa;
  color: #68b1fa;
  border-radius: 6px;
 }
 .react-calendar__tile--now {
  background: #68b1fa33;
  border-radius: 6px;
  font-weight: bold;
  color: #68b1fa;
 }
 .react-calendar__tile--now:enabled:hover,
 .react-calendar__tile--now:enabled:focus { /*오늘날짜에 댈때*/
  background: #68b1fa33;
  font-weight: bold;
  color: #68b1fa;
 }
 .react-calendar__tile--hasActive:enabled:hover,
 .react-calendar__tile--hasActive:enabled:focus {
  background: #f8f8fa;
 }
 .react-calendar__tile--active {
  background: #68b1fa;
  border-radius: 6px;
  font-weight: bold;
  color: white;
 }
 
 .react-calendar__tile--active:enabled:hover,
 .react-calendar__tile--active:enabled:focus { /*선택*/
  background: #68b1fa;
  color: white;
 }
 .react-calendar--selectRange .react-calendar__tile--hover {
  background-color: #f8f8fa;
 }
 .react-calendar__tile--range {
  background: #f8f8fa;
  color: #68b1fa;
  border-radius: 0;
 }
 .react-calendar__tile--rangeStart {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  background: #68b1fa;
  color: white;
 }
 .react-calendar__tile--rangeEnd { /*다른 날짜 누르고 다른날짜 누르는동안*/
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  background: #68b1fa;
  color: white;
 }
`;
