import React, { useEffect, useState } from "react";
import { css } from "@emotion/css";
import { storage } from "../../../Firebase/firebase";
import { v4 } from "uuid";
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import UserRatingInput from "./UserRatingInput";
import UserRatingHead from "./UserRatingHead";
import UserProfile from "./UserProfile";
import { useUserContext } from "../../../contexts/UserContext";
import { getComments, setComments } from "../../../Firebase/locationDetails";
import dayjs from 'dayjs';

const imagesRef = ref(storage, "/images");

function UserRating({ selectedLoc }) {
  const [localFiles, setLocalFiles] = useState(null);
  const [firebaseImgRef, setFirebaseImgRef] = useState([]);
  const [evalImgsUrl, setEvalImgsUrl] = useState([]);
  const [lastTextData, setLastTextData] = useState([]);
  const [textValue, setTextValue] = useState("");
  const [evalViewLen, setEvalViewLen] = useState(2);
  const { user } = useUserContext();

  const userId = user.email.split("@")[0];
  useEffect(() => {
    getImage();
    async function getCommentsValue() {
      setLastTextData([]);
      const commentsObj = await getComments(selectedLoc.title);
      if (!commentsObj || commentsObj.length <= 0)
        return ;
      console.log(commentsObj);
      setLastTextData([...commentsObj]);
    }

    getCommentsValue();
  }, [selectedLoc.title]);

  //   useEffect(() => {
  //     if (!selectedLoc) return null;

  //     // async function getLoadAddr() {
  //     //   var geocoder = new kakao.maps.services.Geocoder();
  //     //   searchAddrFromCoords
  //     // }

  //     // getLoadAddr();
  //   }, [selectedLoc])

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

  const submitText = (imgUrl) => {
    const date = dayjs(new Date()).format('YYYY.MM.DD');
    const nowData = {
      date: date, auth: userId, 'comments': textValue, 'imgUrl': imgUrl
    }
    const sendData = [...lastTextData, nowData];
    setLastTextData(sendData);
    setComments(selectedLoc.title, sendData);
    setTextValue("");

    // if (imgUrl) window.location.reload();
  };

  const submitImg = () => {
    if (localFiles) {
      if (!textValue)
      {
        alert('댓글을 입력해주세요!');
        return ;
      }
      const imageRef = ref(storage, `images/${localFiles.name + v4()}`);
      const uploadTask = uploadBytesResumable(imageRef, localFiles);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // const progress =
          //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              // console.log("Upload is paused");
              break;
            case "running":
              // console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              break;
            case "storage/canceled":
              break;
            case "storage/unknown":
              break;
            default:
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log("File available at", downloadURL);
            submitText(downloadURL);
            getImage();
            // console.log("image upload!");
          });
        }
      );
    } else if (textValue) {
      submitText(null);
    }
    else {
      alert('댓글을 입력해주세요!');
    }
  };

  function ratingImg() {
    return evalImgsUrl.map((url, i) => {
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

  console.log(selectedLoc);

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
              <td className={tableTd}>설치 주체</td>
              <td className={tableTd}>{selectedLoc.circum["설치 주체"]}</td>
            </tr>
            <tr className={tableTr}>
              <td className={tableTd}>사용가능 시간</td>
              <td className={tableTd}>
                {selectedLoc.circum["time"] ?? "7:00 - 19:00"}
              </td>
            </tr>
            <tr className={tableTr}>
              <td className={tableTd}>주변 환경</td>
              <td className={tableTd}>
                {selectedLoc.circum["circum"] ?? "등록된 정보가 없습니다"}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <div className={sectionDiv} />
      <section>
        {lastTextData.length <= 0 &&  <UserProfile key='noData' data={{'date': '-', 'comments': '댓글이 없습니다.'}} userId={null} />}
        {lastTextData?.map((data, i) => {
          if (i >= evalViewLen) return <></>;
          return <UserProfile key={data} data={data} userId={data.auth} />;
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
