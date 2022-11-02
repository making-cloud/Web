import React, { useEffect, useState } from "react";
import { css } from "@emotion/css";
import { getComments, setComments, storage } from "../../../Firebase/firebase";
import { v4 } from "uuid";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";

const imagesRef = ref(storage, "/images");

function UserRating() {
  const [localFiles, setLocalFiles] = useState(null);
  const [firebaseImgRef, setFirebaseImgRef] = useState([]);
  const [evalImgsUrl, setEvalImgsUrl] = useState([]);
  const [lastTextData, setLastTextData] = useState([]);
  const [textValue, setTextValue] = useState("");

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


  function getImage()
  {
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

  // console.log(getComments());

  function handleTextChange(e) {
    setTextValue(e.target.value);
  }

  return (
    <div className={userEvalBox}>
      <div>
        {evalImgsUrl &&
          evalImgsUrl.length > 0 &&
          evalImgsUrl.map((url) => {
            return (
              <img
                width={100}
                height={100}
                key={url.value}
                alt="eval img"
                src={url.value}
              />
            );
          })}
      </div>
      <div className={userEvalHead}>
        <textarea
          className={userEvalText}
          placeholder="user.name님의 의견은 어떠신가요?"
          onChange={handleTextChange}
          value={textValue}
        />
        <button className={evalAddButton} onClick={submitImg}>
          나의 후기 추가하기
        </button>
      </div>
      <div>
        <input
          type="file"
          name="imgae_file"
          accept="image/png, image/jpeg, image/gif"
          onChange={handleLocalUpload}
        />
      </div>
      <div>
        {lastTextData.map((data, i) => {
          return <div key={i}>{data}</div>;
        })}
      </div>
    </div>
  );
}

const userEvalBox = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px;
`;

const userEvalHead = css`
  display: flex;
  justify-content: center;
`;

const userEvalText = css`
  padding: 8px 12px;
  min-width: 300px;
  min-height: 40px;
  border-radius: 10px;
  border: none;
  background-color: #f0f2f5;
`;

const evalAddButton = css``;

export default UserRating;
