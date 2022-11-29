import { css } from "@emotion/css";
import { useState } from "react";

function UserRatingInput({commentValue, setCommentValue, submitHandler}) {
  const [textAreaHeight, setTextAreaHeight] = useState(60);

  function textAreaClickHandler(e)
  {
    const text = e.target.value
    const lines = text?.split(/\r|\r\n|\n/);
    const count = lines?.length;

    setCommentValue(text);
    if (count > 2)
        setTextAreaHeight(60 + ((count - 2) * 14));
  }

//   function submitHandler(e)
//   {
//     alert('전송 되었습니다');
//     setCommentValue('');
//   }

  return (
    <div className={container}>
      <div className={commentsFrame(textAreaHeight)}>
        <textarea className={textArea} onChange={textAreaClickHandler} value={commentValue} placeholder="댓글을 남겨보세요." />
        <button type='submit' className={confirmButton(commentValue)} onClick={submitHandler}>전송하기</button>
      </div>
    </div>
  );
}

const container = css`
  position: relative;
`;

const commentsFrame = (textAreaHeight) => css`
  border: 1px solid #dae1e6;
  border-radius: 10px;
  padding: 10px 87px 10px 10px;
  width: 100%;
  height: ${textAreaHeight}px;
`;

const textArea = css`
  width: 100%;
  height: 100%;
  font-size: 12px;
`

const confirmButton = (commentValue) => css`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 70px;
  height: 40px;
  background-color: ${commentValue !== '' ? '#88b7c6' : '#e4e6eb' };
  border-radius: 10px;
  text-align: center;
  font-size: 12px;
  color: ${commentValue !== '' ? 'white' : '#bcc0c4'};
  &:hover {
    background-color: #88b7c6e8;
    color: white;
  }
`;

export default UserRatingInput;
