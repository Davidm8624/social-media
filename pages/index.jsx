import axios from "axios";
import { Card, Divider, Segment } from "semantic-ui-react";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { baseURL } from "./util/auth";
import { NoPost } from "./components/layout/NoData";
import CreatePost from "./components/post/CreatePost";
import CardPost from "./components/post/CardPost";

const index = ({ user, postData, errorLoading }) => {
  const [posts, setPosts] = useState(postData);
  const [showToastr, setShowToastr] = useState(false);
  //useeffects``````````````````````~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  useEffect(() => {
    document.title = `welcome, ${user.name.split(" ")[0]}`;
  }, []);

  useEffect(() => {
    showToastr && setTimeout(() => setShowToastr(false), 3000);
  }, [showToastr]);

  return (
    <>
      {/* show toastr stuff */}
      <Segment>
        <CreatePost user={user} setPosts={setPosts} />
        {!posts || errorLoading ? (
          <noPosts />
        ) : (
          posts.map((post) => (
            <CardPost
              key={post._id}
              post={post}
              user={user}
              setPosts={setPosts}
              setShowToastr={setShowToastr}
            />
          ))
        )}
      </Segment>
    </>
  );
};

index.getInitialProps = async (ctx) => {
  try {
    const { token } = parseCookies(ctx);
    const res = await axios.get(`${baseURL}/api/v1/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { postData: res.data };
  } catch (error) {
    console.log(error);
    return { errorLoading: true };
  }
};
// const index = ({ posts, token }) => {
//   return (
//     <>
//     <h1>{token}</h1>
//       {posts.map((post) => {
//         return (
//           <div key={post.id}>
//             <h1>{post.title}</h1>
//             <p>{post.body}</p>
//             <Divider/>
//           </div>
//         );
//       })}
//     </>
//   );
// };

// index.getInitialProps = async (ctx) => {
//   const cookie = parseCookies(ctx)
//   const res = await axios.get(
//     "https://jsonplaceholder.typicode.com/posts"
//   );
//   // console.log(ctx);
//   return { posts: res.data, token: cookie.token };
// };

export default index;
