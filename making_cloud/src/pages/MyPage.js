import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../component/Wrapper/PageWrapper";
import Calendar from "react-calendar";
import moment from "moment";
import { css } from "@emotion/css";
import UserList from "./List";

export default function MyPage(props) {
  const [value, onChange] = useState(new Date()); //현재날짜
  const [visible, setVisible] = useState(false); //가리기
  const [text, setText] = useState(""); //흡연량 입력
  const [day, setDay] = useState(moment(value).format("YYYY-MM-DD")); //선택날짜
  const [Daymarks, setDayMarks] = useState([]); //날짜만 배열
  const [users, setUsers] = useState([]); //배열

  const nextId = useRef(1);
  const onCreate = () => {
    //배열추가
    const newI = {
      id: nextId.current,
      day: day,
      text: text,
    };
    setDayMarks([...Daymarks, day]);
    setUsers([...users, newI]);
    nextId.current += 1;
  };

  const onRemove = (id) => {
    //삭제
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <PageWrapper>
      <Calendar
        onChange={onChange}
        formatDay={(locale, date) => moment(date).format("DD")}
        value={value}
        minDetail="month"
        maxDetail="month"
        onClickDay={(day) => setDay(moment(day).format("YYYY-MM-DD"))}
        showNeighboringMonth={false}
        calendarType="US"
        className={calendar}
        tileContent={({ date, view }) => {
          let html = [];
          if (Daymarks.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            html.push(<div className="dot"></div>);
          }
          return (
            <>
              <div className="flex">{html}</div>
            </>
          );
        }}
      />
      <button
        className={button}
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {" "}
        {visible ? "닫기" : "흡연량"}
      </button>
      {visible && (
        <div>
          <input
            value={text}
            placeholder={"흡연량 : "}
            className={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <button onClick={onCreate}>+</button>
          <UserList users={users} onRemove={onRemove} />
          <Link to="/details">해당 장소 더 자세히 보기</Link>
        </div>
      )}
    </PageWrapper>
  );
}

const button = css`
  border: 2px solid #2b5682;
  border-radius: 5px;
  background-color: #bbddff;
  font-family: Arial, Helvetica, sans-serif;
  float: right;
  margin-right: 150px;
`;
const calendar = css`
  max-width: 70%;
  background-color: #fff;
  border: 2px solid #222;
  border-radius: 5px;
  padding: 8px;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 3em;

  .dot {
    height: 2.4px;
    width: 20px;
    background-color: #f87171;
    display: flex;
    margin: auto;
  }
  .react-calendar__navigation {
    background-color: #e8f1fb;
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
  abbr[title] {
    /*월화수*/
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
  .react-calendar__tile:enabled:focus {
    /*마우스*/
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
  .react-calendar__tile--now:enabled:focus {
    /*오늘날짜에 댈때*/
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
  .react-calendar__tile--active:enabled:focus {
    /*선택*/
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
  .react-calendar__tile--rangeEnd {
    /*다른 날짜 누르고 다른날짜 누르는동안*/
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    background: #68b1fa;
    color: white;
  }
`;
