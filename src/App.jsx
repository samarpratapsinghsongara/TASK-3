import Footer from "./Footer";
import ResponsiveAppBar from "./NavBar";
import Home from "./Pages/Home";
import Author from "./Pages/Author";
import { Routes, Route } from "react-router-dom";
import Post from "./Pages/Post";
import AuthorProfile from "./Pages/AuthorProfile";
import PostDetails from "./Pages/PostDetails";

function App() {
  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/author" element={<Author />} />
        <Route path="/post" element={<Post />} />
        <Route path="/authors/:authorId" element={<AuthorProfile />} />
        <Route path="/posts/:postsId" element={<PostDetails/>}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
