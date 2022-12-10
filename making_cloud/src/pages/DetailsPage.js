import { useParams } from "react-router-dom";
import UserRating from "../component/Map/UserRating/UserRating";
import PageWrapper from "../component/Wrapper/PageWrapper";

function DetailsPage() {
  const {id: nowPath} = useParams();
  console.log('nowPath');
  return (
    <PageWrapper>
      <UserRating nowPath={nowPath}/>
    </PageWrapper>
  );
}

export default DetailsPage;
