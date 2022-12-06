import { css } from "@emotion/css";

function User({ user, onRemove }) {
  return (
    <div className={box}>
      <b>{user.day} ) 흡연량 : {user.smoke}개비</b>
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
  max-width: 80%;
  text-align: left;
  background-color: #fff;
  border : 1px solid #2b5682;
  border-radius: 5px;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 2em;
  margin : 2px;
  padding-left: 10px;
`;
const del = css`
  width: 50px;
  height: 20px;
  line-height : 10px;
  text-align : center;
  border : 1px solid #2b5682;
  border-radius: 5px;
  background-color: #bbddff;
  font-family: Arial, Helvetica, sans-serif;
  float: right;
  margin-top: 5px;
  margin-left: -10px;
  margin-right: 10px;
`;