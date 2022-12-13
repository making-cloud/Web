import React, { useEffect, useState } from "react";
import { css } from "@emotion/css";
import { getComments, setComments, storage } from "../../../Firebase/firebase";
import { v4 } from "uuid";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import UserRatingInput from "./UserRatingInput";
import UserRatingHead from "./UserRatingHead";
import UserProfile from "./UserProfile";

const imagesRef = ref(storage, "/images");

function UserRating({ selectedLoc }) {
  const [localFiles, setLocalFiles] = useState(null);
  const [firebaseImgRef, setFirebaseImgRef] = useState([]);
  const [evalImgsUrl, setEvalImgsUrl] = useState([]);
  const [lastTextData, setLastTextData] = useState([]);
  const [textValue, setTextValue] = useState("");
  const [evalViewLen, setEvalViewLen] = useState(2);

  useEffect(() => {
    getImage();
    async function getCommentsValue() {
      const commentsObj = await getComments();
      const commentArr = commentsObj.map((commentObj) => commentObj.comments);
      setLastTextData(...commentArr);
    }
    getCommentsValue();
  }, []);

  useEffect(() => {
    if (firebaseImgRef.length === 0) return;
    async function getUrl() {
      const firebasePromise = firebaseImgRef.map((url) => getDownloadURL(url));
      //  const firebasePromise = getDownloadURL(imagesRef); -> 한번에 불러오기 안되는 듯
      const resultArray = await Promise.allSettled(firebasePromise);
      setEvalImgsUrl(resultArray);
    }
    getUrl();
  }, [firebaseImgRef]);

  const handleLocalUpload = ({ target: { files } }) => {
    setLocalFiles(files[0]);
  };

  function getImage() {
    listAll(imagesRef).then((res) => {
      res.prefixes.forEach((folderRef) => {
        // 폴더 ref
      });

      const nowImgRef = res.items.map((itemRef) => itemRef);
      setFirebaseImgRef([...nowImgRef]);
    });
  }

  const submitImg = () => {
    if (localFiles) {
      const imageRef = ref(storage, `images/${localFiles.name + v4()}`);
      uploadBytes(imageRef, localFiles).then(() => {
        console.log("image upload!");
        window.location.reload();
      });
      getImage();
    }
    if (textValue) {
      const sendData = [...lastTextData, textValue];
      setLastTextData(sendData);
      setComments("heom", sendData);
      setTextValue("");
    }
  };

  function ratingImg() {
    return evalImgsUrl.map((url, i) => {
      console.log(url);
      if (i > 2) return <></>;
      return (
        <img
          width={130}
          height={130}
          key={url.value + i}
          alt="eval img"
          src={url.value}
        />
      );
    });
  }

  return (
    <div className={userEvalBox}>
      <div>{evalImgsUrl && evalImgsUrl.length > 0 && ratingImg()}</div>
      <UserRatingHead
        ratingLen={lastTextData.length}
        imgLen={evalImgsUrl.length}
        selectedLoc={selectedLoc}
      />
      <div className={sectionDiv} />
      <section className={userEvalBody}>
        <table>
          <tbody>
            <tr>
              <td className={tableTd}>주소</td>
              <td className={tableTd}>서울 서초구 신반포로 222 (반포동)</td>
            </tr>
            <tr className={tableTr}>
              <td className={tableTd}>사용가능 시간</td>
              <td className={tableTd}>7:00 - 19:00</td>
            </tr>
            <tr className={tableTr}>
              <td className={tableTd}>주변 환경</td>
              <td className={tableTd}>의자 없음</td>
            </tr>
          </tbody>
        </table>
      </section>
      <div className={sectionDiv} />
      <section>
        {lastTextData.map((data, i) => {
          if (i >= evalViewLen) return <></>;
          return <UserProfile key={data} data={data} userInfo={null} />;
        })}
        {lastTextData.length > evalViewLen && (
          <button
            className={userRatingMore}
            onClick={() => setEvalViewLen(evalViewLen + 3)}
          >
            방문자 리뷰 더 보기
          </button>
        )}
      </section>
      <section>
        <UserRatingInput
          commentValue={textValue}
          setCommentValue={setTextValue}
          submitHandler={submitImg}
        />
        <input
          type="file"
          name="imgae_file"
          accept="image/png, image/jpeg, image/gif"
          onChange={handleLocalUpload}
        />
      </section>
    </div>
  );
}

const userEvalBox = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const userEvalBody = css`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;

  padding: 10px 10px;
`;

const tableTr = css`
  width: 100;
  border-top: 1px solid rgba(236, 240, 242, 1);
`;

const tableTd = css`
  padding: 12px 5px;
  font-size: 16px;
  line-height: 16.5px;
  text-align: left;
`;

const sectionDiv = css`
  background-color: #e2e5e8;
  height: 8px;
`;

const userRatingMore = css`
  width: 100%;
  height: 48px;

  background: rgba(244, 247, 248, 1);
  line-height: 48px;
  color: rgb(66, 66, 66);
  font-size: 16px;
`;

export default UserRating;
