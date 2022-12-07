import React, { useRef, useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import { css } from "@emotion/css";
import UserList from "./List";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function MyPage(props) {
  const [visible1, setVisible1] = useState(true); //가리기
  const [visible_chart, set_chart] = useState(false);
  const [visible_warning, set_warning] = useState(false);
  const [visible_goal, set_goal] = useState(false);
  const [goalAdd_p, set_goalAdd_P] = useState(false);
  const [goalAdd, set_goalAdd] = useState(false);
  const [goalLog, set_goalLog] = useState(true);
  const [clearLog, setClearLog] = useState(false);
  const [nowLog, setNowLog] = useState(true);

  const [value, onChange] = useState(new Date()); //현재날짜
  const [day, setDay] = useState(moment(value).format("YYYY-MM-DD")); //선택날짜
  const [count, setCount] = useState(0);
  const [smoke, setSmoke] = useState("1");
  const handleSelect = (e) => {
    setSmoke(e.target.value);
  };

  const [term, setTerm] = useState("설정중..."); //목표 설정
  const [numterm, setNumTerm] = useState("1");
  const [strterm, setStrTerm] = useState("일");
  const [smokeGoal, setSmokeGoal] = useState("설정중...");
  const [numsmoke, setNumsmoke] = useState("1");
  const [strsmoke, setStrsmoke] = useState("개비");
  const [count_G, setCount_G] = useState(0);
  const handleSelect_term = (e) => {
    setNumTerm(e.target.value);
  };
  const handleSelect_term2 = (e) => {
    setStrTerm(e.target.value);
  };
  const handleSelect_smoke = (e) => {
    setNumsmoke(e.target.value);
  };
  const handleSelect_smoke2 = (e) => {
    setStrsmoke(e.target.value);
  };

  const [users, setUsers] = useState([]); //배열
  const [goals, setGoals] = useState([]);
  const [clears, setClears] = useState([]);
  const [data, setData] = useState([
    { month: "1월", SmokeCount: 0 },
    { month: "2월", SmokeCount: 0 },
    { month: "3월", SmokeCount: 0 },
    { month: "4월", SmokeCount: 0 },
    { month: "5월", SmokeCount: 0 },
    { month: "6월", SmokeCount: 0 },
    { month: "7월", SmokeCount: 0 },
    { month: "8월", SmokeCount: 0 },
    { month: "9월", SmokeCount: 0 },
    { month: "10월", SmokeCount: 0 },
    { month: "11월", SmokeCount: 0 },
    { month: "12월", SmokeCount: 0 },
  ]);

  const nextId_G = useRef(0);
  const onCreate_G = () => {
    const newG = {
      id: nextId_G.current,
      goalday: goalday,
      lastGoalD: lastGoalD,
      term: term,
      smokeGoal: smokeGoal,
    };
    setGoals([...goals, newG]);
    setCount_G(count_G + 1);
    nextId_G.current += 1;
  };
  const onRemove_G = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
    setCount_G(count_G - 1);
  };
  const nextId_C = useRef(0);
  const onClear = (id) => {
    var changeValue = goals.filter((goal) => goal.id === id);
    console.log(changeValue);
    const newC = {
      id: nextId_C.current,
      goalday: changeValue[0].goalday,
      lastGoalD: changeValue[0].lastGoalD,
      term: changeValue[0].term,
      smokeGoal: changeValue[0].smokeGoal,
    };
    console.log(newC);
    setClears([...clears, newC]);
    nextId_C.current += 1;
    setGoals(goals.filter((goal) => goal.id !== id));
    setCount_G(count_G - 1);
  };
  const onRemove_C = (id) => {
    setClears(goals.filter((clear) => clear.id !== id));
  };

  const nextId = useRef(0);
  const onCreate = () => {
    //기록 추가
    const newI = {
      id: nextId.current,
      day: day,
      smoke: Number(smoke),
    };
    var arr = users.filter((user) => user); //지금까지 데이터 불러오기
    setCount(count + newI.smoke); //추가
    setUsers([...users, newI]);
    for (let i = 1; i <= 12; i++) {
      //통계
      let mon = String(i);
      if (newI.day.substr(5, 2) === mon) {
        setData(
          data.map((data) =>
            data.month === mon + "월"
              ? { month: mon + "월", SmokeCount: data.SmokeCount + newI.smoke }
              : data
          )
        );
      }
    }
    for (let i = 0; i < arr.length; i++) {
      //같은 날짜면 누적
      if (newI.day === arr[i].day) {
        newI.smoke = arr[i].smoke + newI.smoke;
        setUsers(users.filter((user) => user.id !== nextId.id));
        setUsers(users.map((user) => (user.id === arr[i].id ? newI : user)));
        break;
      }
    }
    nextId.current += 1;
    /*정렬
    let users1 = users;
    users1.sort((a,b)=> a.day < b.day ? -1 : 1);
    localStorage.setItem("xxx",JSON.stringify(users1)); */
  };
  const onRemove = (id) => {
    //기록 삭제
    setUsers(users.filter((user) => user.id !== id));
    var delarr = users.filter((user) => user.id === id);
    setCount(count - delarr[0].smoke); //delarr=[{"id":0,"day":"2022-11-25","smoke":1}]

    for (let i = 1; i <= 12; i++) {
      //통계
      let mon = String(i);
      if (delarr[0].day.substr(5, 2) === mon) {
        setData(
          data.map((data) =>
            data.month === mon + "월"
              ? {
                  month: mon + "월",
                  SmokeCount: data.SmokeCount - delarr[0].smoke,
                }
              : data
          )
        );
      }
    }
  };
  const allClear = () => {
    localStorage.clear();
    setUsers([]);
    setCount(0);
    setData([
      { month: "1월", SmokeCount: 0 },
      { month: "2월", SmokeCount: 0 },
      { month: "3월", SmokeCount: 0 },
      { month: "4월", SmokeCount: 0 },
      { month: "5월", SmokeCount: 0 },
      { month: "6월", SmokeCount: 0 },
      { month: "7월", SmokeCount: 0 },
      { month: "8월", SmokeCount: 0 },
      { month: "9월", SmokeCount: 0 },
      { month: "10월", SmokeCount: 0 },
      { month: "11월", SmokeCount: 0 },
      { month: "12월", SmokeCount: 0 },
    ]);
    nextId.current = 0;
  };

  const [goalday, setGoalDay] = useState("설정중...");
  const lastday = new Date(
    value.getFullYear(),
    value.getMonth() + 1,
    0
  ).getDate();
  const [lastGoalD, setLastGoalD] = useState("");
  const handleGoal = () => {
    setGoalDay(moment(day).format("YY년MM월DD일"));
    setTerm(numterm + strterm);
    setSmokeGoal(numsmoke + strsmoke);
    caluDate();
  };
  const caluDate = () => {
    if (strterm === "일") {
      let result = Number(day.substr(-2, 2)) + Number(numterm);
      if (result > lastday) {
        let caluday = result - lastday;
        let calumonth = Number(day.substr(-5, 2)) + 1;
        if (calumonth > 12) {
          let caluyear = Number(day.substr(2, 2)) + 1;
          setLastGoalD(
            String(caluyear) +
              "년" +
              String(calumonth - 12) +
              "월" +
              String(caluday) +
              "일"
          );
        } else {
          setLastGoalD(
            day.substr(2, 2) +
              "년" +
              String(calumonth) +
              "월" +
              String(caluday) +
              "일"
          );
        }
      } else {
        setLastGoalD(
          day.substr(2, 2) +
            "년" +
            day.substr(5, 2) +
            "월" +
            String(result) +
            "일"
        );
      }
    } else if (strterm === "주") {
      let result = Number(day.substr(-2, 2)) + 7 * Number(numterm);
      if (result > lastday) {
        let caluday = result - lastday;
        let calumonth = Number(day.substr(-5, 2)) + 1;
        if (calumonth > 12) {
          let caluyear = Number(day.substr(2, 2)) + 1;
          setLastGoalD(
            String(caluyear) +
              "년" +
              String(calumonth - 12) +
              "월" +
              String(caluday) +
              "일"
          );
        } else {
          setLastGoalD(
            day.substr(2, 2) +
              "년" +
              String(calumonth) +
              "월" +
              String(caluday) +
              "일"
          );
        }
      } else {
        setLastGoalD(
          day.substr(2, 2) +
            "년" +
            day.substr(5, 2) +
            "월" +
            String(result) +
            "일"
        );
      }
    } else if (strterm === "달") {
      let result = Number(day.substr(5, 2)) + Number(numterm);
      let date_M = new Date(day.substr(0, 4) + "-" + result + "-01");
      var last_day = new Date(
        date_M.getFullYear(),
        date_M.getMonth() + 1,
        0
      ).getDate();
      if (result > 12) {
        let calumonth = result - 12;
        let caluyear = Number(day.substr(2, 2)) + 1;
        let date_calumonth = new Date(
          "20" + caluyear + "-" + calumonth + "-01"
        );
        var last_day = new Date(
          date_calumonth.getFullYear(),
          date_calumonth.getMonth() + 1,
          0
        ).getDate();
        setLastGoalD(
          String(caluyear) + "년" + String(calumonth) + "월" + last_day + "일"
        );
      } else {
        setLastGoalD(
          day.substr(2, 2) + "년" + String(result) + "월" + last_day + "일"
        );
      }
    }
  };

  const resetGoalSet = () => {
    setNumTerm("1");
    setStrTerm("일");
    setNumsmoke("1");
    setStrsmoke("개비");
    setGoalDay("설정중...");
    setGoalDay("");
    setTerm("설정중...");
    setSmokeGoal("설정중...");
  };

  return (
    <div className={page}>
      <Calendar
        onChange={onChange}
        value={value}
        className={calendar}
        formatDay={(locale, date) => moment(date).format("DD")}
        minDetail="month"
        maxDetail="month"
        onClickDay={(day) => {
          setDay(moment(day).format("YYYY-MM-DD"));
        }}
        showNeighboringMonth={false}
        calendarType="US"
        tileContent={({ date, view }) => {
          let html = [];
          let marks_day = users.map((user) => user.day);
          if (marks_day?.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            html.push(<div className="dot"></div>);
          }
          return (
            <>
              <div className="flex justify-center items-center absoluteDiv">
                {html}
              </div>
            </>
          );
        }} //>>>>>>>>>마크 변경
      />
      <div className={buttonspace}>
        <button
          className={removebutton}
          onClick={() => {
            set_warning(!visible_warning);
            setVisible1(false);
            set_chart(false);
            set_goal(false);
            set_goalAdd_P(false);
            set_goalLog(true);
          }}
        >
          모두 삭제
        </button>
        <button
          className={goalbutton}
          onClick={() => {
            set_goal(!visible_goal);
            set_goalAdd_P(false);
            set_goalLog(true);
            setVisible1(false);
            setClearLog(false);
            set_chart(false);
            set_warning(false);
          }}
        >
          {visible_goal ? "목표 닫기" : "목표 설정"}
        </button>
        <button
          className={listbutton}
          onClick={() => {
            setVisible1(!visible1);
            set_chart(false);
            set_warning(false);
            set_goal(false);
            set_goalAdd_P(false);
            set_goalLog(true);
          }}
        >
          {" "}
          {visible1 ? "기록 닫기" : "기록"}
        </button>
        <button
          className={chartbutton}
          onClick={() => {
            set_chart(!visible_chart);
            setVisible1(false);
            set_warning(false);
            set_goal(false);
            set_goalAdd_P(false);
            set_goalLog(true);
          }}
        >
          {" "}
          {visible_chart ? "통계 닫기" : "통계"}
        </button>
      </div>
      {visible1 && (
        <div className={selectBox}>
          <b className={counttext}>총 흡연량 : {count}</b>
          <button className={selectOpButton} onClick={onCreate}>
            +
          </button>
          <select className={selectOp} onChange={handleSelect} value={smoke}>
            <option value="1">1개비</option>
            <option value="2">2개비</option>
            <option value="3">3개비</option>
            <option value="4">4개비</option>
          </select>
          <UserList users={users} onRemove={onRemove} />
        </div>
      )}
      {visible_chart && (
        <div className={selectBox} width="100%" aspect={4 / 1}>
          <b>총 흡연량 : {count}</b>
          <LineChart
            width={400}
            height={200}
            data={data}
            margin={{ top: 5, right: 25, left: -35, bottom: 3 }}
          >
            <CartesianGrid strokeDasharray="2 5" /> {/*점선*/}
            <XAxis dataKey="month" interval={0} />
            <YAxis
              dataKey="SmokeCount"
              type="number"
              allowDecimals={false}
              interval={0}
            />
            <Tooltip />
            <Legend /> {/*밑에 선 종류*/}
            <Line
              name="흡연량"
              type="monotone"
              dataKey="SmokeCount"
              isAnimationActive={false}
              stroke="#82ca9d"
            />
          </LineChart>
        </div>
      )}
      {visible_warning && (
        <div className={selectBox}>
          <br />
          <p>기록을 모두 삭제하시겠습니까?</p>
          <p style={{ color: "grey" }}>* 목표는 유지됩니다</p>
          <br />
          <button
            className={yesbutton}
            onClick={() => {
              allClear();
              set_warning(!visible_warning);
              setVisible1(true);
            }}
          >
            YES
          </button>
          <button
            className={nobutton}
            onClick={() => {
              set_warning(!visible_warning);
              setVisible1(true);
            }}
          >
            NO
          </button>
        </div>
      )}
      {visible_goal && (
        <div className={selectBox}>
          <button
            className={addGoalbox}
            onClick={() => {
              set_goalAdd_P(!goalAdd_p);
              set_goalLog(!goalLog);
              set_goalAdd(false); /*>>>>>>>>>추가 도중 나가면 경고 문구 */
              resetGoalSet();
              setNowLog(true);
              setClearLog(false);
            }}
          >
            {" "}
            {goalAdd_p ? "목표 설정 닫기" : "목표 추가 버튼"}
          </button>
          <></>
          {goalAdd_p && (
            <div style={{ textalign: "left", lineheight: "1.5em" }}>
              <span style={{ position: "relative", left: "15%", top: "3px" }}>
                목표 설정중
              </span>
              <br />
              <br />
              <hr />
              <p>1. 달력에서 시작일을 설정해주세요</p>
              <p>- 시작일 : {moment(value).format("YY년 M월 D일")}</p>
              <br />
              <p>2. 목표 기간을 설정해주세요</p>{" "}
              {/* >>>>>>>달주일에 따른 수치변화*/}
              <select onChange={handleSelect_term}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
              </select>
              <select onChange={handleSelect_term2}>
                <option value="일">일</option>
                <option value="주">주</option>
                <option value="달">달</option>
              </select>
              <p>
                <br />
                3. 흡연량을 설정해주세요
              </p>
              <select onChange={handleSelect_smoke}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <select onChange={handleSelect_smoke2}>
                <option value="개비">개비</option>
                <option value="갑">갑</option>
              </select>
              <br />
              <button
                className={button}
                onClick={() => {
                  set_goalAdd(true);
                  handleGoal();
                }}
              >
                목표 설정
              </button>
              {goalAdd && (
                <div>
                  <hr />
                  <p>내 목표</p>
                  <br />
                  <p>
                    {goalday} ~ {lastGoalD}
                  </p>
                  <p>목표기간 : {term}</p>
                  <p>목표 흡연량 : {smokeGoal}</p>
                  <br />
                  <p>이 목표로 설정하시겠습니까?</p>
                  <button
                    className={button}
                    onClick={() => {
                      set_goalAdd_P(!goalAdd_p);
                      set_goalLog(!goalLog);
                      onCreate_G();
                      setNowLog(true);
                      setClearLog(false);
                    }}
                  >
                    YES
                  </button>
                  <button
                    className={button}
                    onClick={() => {
                      set_goalAdd(false);
                    }}
                  >
                    NO
                  </button>
                </div>
              )}
            </div>
          )}
          {goalLog && (
            <div>
              <button
                className={endGoalbox}
                onClick={() => {
                  setNowLog(!nowLog);
                  setClearLog(!clearLog);
                }}
              >
                {nowLog ? "달성한 목표" : "진행중인 목표"}
              </button>
              {nowLog && (
                <div>
                  <span style={{ position: "relative", top: "3px" }}>
                    현재 목표 내역
                  </span>
                  <br />
                  <br />
                  <hr />
                  <p style={{ margin: "5px" }}>진행중인 목표 수 : {count_G}</p>
                  <GoalList
                    goals={goals}
                    onRemove_G={onRemove_G}
                    onClear={onClear}
                  />
                </div>
              )}
              {clearLog && (
                <div>
                  <span style={{ position: "relative", top: "3px" }}>
                    완료된 목표 내역
                  </span>
                  <br />
                  <br />
                  <hr />
                  <ClearList clears={clears} onRemove_C={onRemove_C} />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
//////////////////////////////진행중인 목표
function Goal({ goal, onRemove_G, onClear }) {
  return (
    <div className={box}>
      <span>
        {goal.goalday} ~ {goal.lastGoalD}
      </span>
      <button className={boxbutton} onClick={() => onRemove_G(goal.id)}>
        삭제
      </button>
      <br />
      <span>
        목표 기간 : {goal.term} 흡연량 : {goal.smokeGoal}
      </span>
      <button className={boxbutton2} onClick={() => onClear(goal.id)}>
        목표 달성
      </button>
    </div>
  );
}
function GoalList({ goals, onRemove_G, onClear }) {
  return (
    <div>
      {goals.map((goal) => (
        <Goal
          goal={goal}
          key={goal.id}
          onRemove_G={onRemove_G}
          onClear={onClear}
        />
      ))}
    </div>
  );
}
///////////////////////////////완료된 목표
function Clear({ clear, onRemove_C }) {
  return (
    <div className={clearbox}>
      <span>
        {clear.goalday} ~ {clear.lastGoalD}
      </span>
      <button className={boxbutton} onClick={() => onRemove_C(clear.id)}>
        삭제
      </button>
      <pre>
        목표 기간 : {clear.term} 흡연량 : {clear.smokeGoal}
      </pre>
    </div>
  );
}
function ClearList({ clears, onRemove_C }) {
  return (
    <div>
      {clears.map((clear) => (
        <Clear clear={clear} key={clear.id} onRemove_C={onRemove_C} />
      ))}
    </div>
  );
}
////////////////////////////////CSS
const button = css`
  border: 2px solid #2b5682;
  border-radius: 5px;
  padding: 2px;
  margin: 2px;
  font-size: 15px;
`;
const box = css`
  max-width: 90%;
  text-align: left;
  line-height: 1.5em;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #fff;
  border: 1px solid #2b5682;
  border-radius: 5px;
  margin: 2px;
  padding-left: 10px;
`;
const addGoalbox = css`
  border: 2px solid #2b5682;
  border-radius: 5px;
  padding: 2px;
  font-size: 15px;
  float: right;
  margin-right: 3%;
`;
const endGoalbox = css`
  border: 2px solid #2b5682;
  border-radius: 5px;
  padding: 2px;
  font-size: 15px;
  float: left;
  margin-left: 3%;
`;
const boxbutton = css`
  font-size: 14px;
  width: 60px;
  height: 15px;
  border: 2px solid #2b5682;
  border-radius: 5px;
  padding: 2px;
  margin: 2px;
  text-align: center;
  line-height: 17px;
  position: relative;
  left: 10%;
  bottom: 50%;
`;
const boxbutton2 = css`
  font-size: 14px;
  width: 60px;
  height: 15px;
  border: 2px solid #2b5682;
  border-radius: 5px;
  padding: 2px;
  margin: 2px;
  text-align: center;
  line-height: 17px;
  position: relative;
  left: 10%;
`;
const clearbox = css`
  max-width: 90%;
  text-align: left;
  line-height: 1.2em;
  color: grey;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #fff;
  border: 1px solid #2b5682;
  border-radius: 5px;
  margin: 2px;
  padding-left: 10px;
`;

const buttonspace = css`
  max-width: 400px;
`;
const removebutton = css`
  font-size: 13px;
  width: 60px;
  height: 20px;
  border: 2px solid #822b2b;
  border-radius: 5px;
  background-color: #fbe8e8;
  font-family: Arial, Helvetica, sans-serif;
  float: left;
`;
const nobutton = css`
  width: 50px;
  border: 2px solid #822b2b;
  border-radius: 5px;
  background-color: #fbe8e8;
  font-family: Arial, Helvetica, sans-serif;
  margin-left: 5px;
`;
const yesbutton = css`
  width: 50px;
  border: 2px solid #2b5682;
  border-radius: 5px;
  background-color: #e8f1fb;
  font-family: Arial, Helvetica, sans-serif;
`;
const goalbutton = css`
  font-size: 13px;
  width: 60px;
  height: 20px;
  border: 2px solid #2b5682;
  border-radius: 5px;
  background-color: #e8f1fb;
  font-family: Arial, Helvetica, sans-serif;
  position: relative;
  right: 15%;
`;
const listbutton = css`
  font-size: 13px;
  width: 60px;
  height: 20px;
  border: 2px solid #2b5682;
  border-radius: 5px;
  background-color: #bbddff;
  font-family: Arial, Helvetica, sans-serif;
  position: relative;
  left: 15%;
`;
const chartbutton = css`
  font-size: 13px;
  width: 60px;
  height: 20px;
  border: 2px solid #2b5682;
  border-radius: 5px;
  background-color: #e8f1fb;
  font-family: Arial, Helvetica, sans-serif;
  float: right;
`;

const selectBox = css`
  max-width: 400px;
  border: 2px solid #2b5682;
  border-radius: 5px;
  margin-top: 5px;
  padding-top: 6px;
  padding-bottom: 5px;
`;
const counttext = css`
  position: relative;
  left: 10%;
`;
const selectOp = css`
  width: 70px;
  border: 2px solid #2b5682;
  border-radius: 5px;
  position: relative;
  left: 40px;
  margin-bottom: 5px;
`;
const selectOpButton = css`
  width: 20px;
  height: 18px;
  border: 2px solid #2b5682;
  border-radius: 5px;
  background-color: #bbddff;
  position: relative;
  left: 140px;
  top: 2px;
`;

const page = css`
  max-width: 90%;
`;
const calendar = css`
  max-width: 400px;
  background-color: #fff;
  border: 2px solid #222;
  border-radius: 5px;
  padding: 5px;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 3em;
  margin-bottom: 4px;

  .dot {
    height: 2.4px;
    width: 20px;
    background-color: #f87171;
    display: flex;
    margin: auto;
    position: relative;
    top: 4px;
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
    line-height: 10px;
    height: 30px;
    color: #2b5682;
    background: none;
    border: 30px;
    margin-bottom: 5px;
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
