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
        const customPosts = JSON.parse(localStorage.getItem("posts") || "[]");//get user created posts from the local storage
        setPosts([...customPosts, ...data]); // Show new posts first
      });
  }, []);// it will run only once because of empty array
  const handleDelete = (id: number) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
// updaing local storage only
    const customPosts = updatedPosts.filter((p) => p.isCustom);
    localStorage.setItem("posts", JSON.stringify(customPosts));//data was in array, converted into string
  };
return (
  <div style={{ maxWidth: "600px", margin: "20px auto", padding: "20px", background: "#355ba2ff", borderRadius: "8px" }}>
    <h2 style={{ textAlign: "center", color: "#333" }}>Posts</h2>

    <Link to="/createPost" style={{ display: "inline-block", marginBottom: "15px", textDecoration: "none", color: "white", background: "#007bff", padding: "8px 12px", borderRadius: "4px" }}>
      Create New Post
    </Link>

    <ul style={{ listStyle: "none", padding: 0 }}>
      {posts.map((post) => (
        <li key={post.id} style={{ background: "#6897cdff", marginBottom: "10px", padding: "10px", borderRadius: "5px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>
          
          <Link to={`/posts/${post.id}`} style={{ textDecoration: "none", color: "#007bff" }}>
            <h3>{post.title}</h3>
          </Link>
          <p>{post.body}</p>
          {post.isCustom && (
            <>
              <button onClick={() => navigate(`/edit/${post.id}`)} style={{ marginRight: "10px", padding: "5px 10px" }}>Edit</button>
              <button onClick={() => handleDelete(post.id)} style={{ padding: "5px 10px" }}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  </div>
);

}

export default Posts;
