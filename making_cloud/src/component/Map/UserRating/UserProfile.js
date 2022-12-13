import { css } from "@emotion/css";

function UserProfile({ userInfo, data }) {
  if (!userInfo) {
    userInfo = {
      id: "홍길동",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0aRz9tTn6Wo4PtQDYge6IbGvi--lR7NMH4hCUopc&s",
      date: "2022.12.10",
    };
  }

  return (
    <div className={userRatingText}>
      <div className={userProfileBox}>
        <img className={userProfileImg} src={userInfo.img} alt={userInfo.id} />
        <div className={userProfileInfo}>
          <div className={userId}>{userInfo.id}</div>
          <div className={userCommentDate}>{userInfo.date}</div>
        </div>
      </div>
      <div className={commentContents}>{data}</div>
    </div>
  );
}

export default UserProfile;

const userProfileBox = css`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const userProfileImg = css`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  margin-right: 8px;
`;

const userProfileInfo = css`
  height: 100%;
  text-align: left;
`;

const userId = css`
  font-size: 16px;
  line-height: 20px;
  font-weight: bold;
  letter-spacing: -0.2px;
  color: rgba(36, 36, 36, 1);
`;

const userCommentDate = css`
  font-size: 13px;
  line-height: 16px;
  height: 16px;
  margin-top: 3px;
  color: rgba(154, 154, 154, 1);
`;

const userRatingText = css`
  padding: 24px 18px 26px;
  border-top: 1px solid rgb(236, 240, 242);
`;

const commentContents = css`
  margin-top: 5px;
  font-size: 15px;
  line-height: 22px;
  text-align: left;
`;
