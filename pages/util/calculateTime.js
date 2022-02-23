import moment from "moment";
import Moment from "react-moment";

const calculateTime = (createdAt) => {
  const today = moment(Date.now());
  const postDate = moment(createdAt);
  const diffInHours = today.diff(postDate, "hours");

  if (diffInHours < 24) {
    return (
      <>
        today at <Moment format="hh:mm A">{createdAt}</Moment>
      </>
    );
  } else if (diffInHours < 48) {
    return (
      <>
        yesterday at <Moment format="hh:mm A">{createdAt}</Moment>
      </>
    );
  } else {
    return <Moment format="DD/MM/YYYY hh:mm A">{createdAt}</Moment>;
  }
};

export default calculateTime;
