import { css } from "@emotion/css";

function User({ user, onRemove }) {
    return (
      <div className={box}>
        <b>{user.day} ) 흡연량 : {user.text}</b>
        <button className={del} onClick={() => onRemove(user.id)}>삭제</button>
      </div>
    );
  }
  
export default function UserList({ users, onRemove }) {
return (
    <div>
    {users.map(user => (
        <User user={user} key={user.id} onRemove={onRemove} />
    ))}
    </div>
);
}

const box = css`
max-width: 60%;
background-color: #fff;
border : 1px solid #2b5682;
border-radius: 5px;
font-family: Arial, Helvetica, sans-serif;
line-height: 2em;
margin : 2px
`;
const del = css`
border : 1px solid #2b5682;
border-radius: 5px;
background-color: #bbddff;
font-family: Arial, Helvetica, sans-serif;
float: right;
margin-top: 3.5px;
margin-left: -10px;
margin-right: 10px;
`;


