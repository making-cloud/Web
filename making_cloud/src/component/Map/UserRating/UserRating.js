import React, { useEffect, useState } from "react";
import { css } from "@emotion/css";
import { storage } from "../../../Firebase/firebase";
import { v4 } from "uuid";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";

function UserRating(props) {
  const [localFiles, setLocalFiles] = useState(null);
  const [firebaseImgRef, setFirebaseImgRef] = useState([]);
  const [evalImgsUrl, setEvalImgsUrl] = useState([]);

  const imgesRef = ref(storage, "/images");

  useEffect(() => {
    console.log('한번');
    pageImgList();
  }, []);

  async function pageImgList() {
    if (!imgesRef) return;
    listAll(imgesRef).then((res) => {
      res.prefixes.forEach((folderRef) => {
        // 폴더 ref
      });

      setFirebaseImgRef(res.items.map((itemRef) => itemRef))
    });
  }

  useEffect(() => {
    if (firebaseImgRef.length === 0) return;

    firebaseImgRef.map((imageRef) => {
      getDownloadURL(imageRef).then((url) => {

      });
    });
    setEvalImgsUrl()
  }, [firebaseImgRef]);

  const handleLocalUpload = ({ target: { files } }) => {
    setLocalFiles(files[0]);
  };

  const submitImg = () => {
    if (!localFiles) return;
    const imageRef = ref(storage, `images/${localFiles.name + v4()}`);
    uploadBytes(imageRef, localFiles).then(() => {
      console.log("image upload!");
    });
  };

  console.log(evalImgsUrl);
  
  return (
    <div className={userEvalBox}>
      <div>
        {evalImgsUrl &&
          evalImgsUrl.length > 0 &&
          evalImgsUrl.map((url) => {
            console.log(url);
            return (
              <img
                width={100}
                height={100}
                key={url}
                alt="eval img"
                src={url}
              />
            );
          })}
      </div>
      <div className={userEvalHead}>
        <textarea
          className={userEvalText}
          placeholder="user.name님의 의견은 어떠신가요?"
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
