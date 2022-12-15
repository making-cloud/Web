import { useHistory } from "react-router-dom";
import PageWrapper from "../component/Wrapper/PageWrapper";
import { useUserContext } from "../contexts/UserContext";

function SplashPage(props) {
  const history = useHistory();

  const {user} = useUserContext();
  if (!user)
  {
    history.push("/login");
  }


  return (
    <PageWrapper>
        로그인 여부를 확인중입니다.
    </PageWrapper>
  );
}

export default SplashPage;
