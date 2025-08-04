import { useState, useEffect } from "react";
import { Link ,useNavigate} from "react-router-dom";

interface Post {
  id: number;
  title: string;
  body: string;
  isCustom?: boolean;
}

function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
    const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        const customPosts = JSON.parse(localStorage.getItem("posts") || "[]");
        setPosts([...customPosts, ...data]); // Show new posts first
      });
  }, []);
  const handleDelete = (id: number) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
// updaing local storage only
    const customPosts = updatedPosts.filter((p) => p.isCustom);
    localStorage.setItem("posts", JSON.stringify(customPosts));
  };
  return (
    <div>
      <h2>Posts</h2>
      <Link to="/createPost">Create New Post</Link>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <h3>{post.title}</h3>
            </Link>
            <p>{post.body}</p>
              <>
                <button onClick={() => navigate(`/edit/${post.id}`)}>Edit</button>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
              </>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
