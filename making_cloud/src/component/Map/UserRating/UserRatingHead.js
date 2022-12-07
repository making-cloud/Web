import { css } from "@emotion/css";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

function UserRatingHead({ratingLen, imgLen, nowPath}) {
  const [isLikedButton, setIsLikedButton] = useState(false);

  return (
    <div className={userEvalHead}>
      <div>
        <p className={headTitle}>{nowPath}</p>
        <button
          className={likeButton}
          onClick={() => setIsLikedButton(!isLikedButton)}
        >
          {isLikedButton ? (
            <AiFillHeart size={24} color="hotpink" />
          ) : (
            <AiOutlineHeart size={24} color="pink" />
          )}
        <p className={likeNum}>+10</p>
        </button>
      </div>
      <div className={sideButtonFont}>
        <button>방문자리뷰 {ratingLen}</button>
        <button>사진 {imgLen}</button>
      </div>
    </div>
  );
}

const userEvalHead = css`
  position: relative;
  padding: 10px 20px 30px;
  border-bottom: 1px solid rgb(236, 240, 242);
`;

const headTitle = css`
  font-size: 21px;
  font-weight: 700;
  font-family: -apple-system, BlinkMacSystemFont, helvetica,
    "Apple SD Gothic Neo", sans-serif;
`;

const likeNum = css`
    font-size: 13px;
    font-weight: 700;
    padding-right: 4px;
    color: hotpink;
`;

const likeButton = css`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const sideButtonFont = css`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  font-size: 14px;
  color: rgba(0,104,195, 1);
`;

export default UserRatingHead;
