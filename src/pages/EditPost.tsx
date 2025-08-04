import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  body: string;
  isCustom?: boolean;
}

function EditPost() {
  const { id } = useParams(); // it will extract the id from the url
  const navigate = useNavigate();// using navigate to go back to the post page after updating
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const customPosts: Post[] = JSON.parse(localStorage.getItem("posts") || "[]");
    const postToEdit = customPosts.find((p) => p.id === Number(id));//filtering post with particular id

    if (postToEdit) {
      setTitle(postToEdit.title);
      setBody(postToEdit.body);
    }
  }, [id]);
//updaing the post in the local storage
  const handleUpdate = () => {
    const customPosts: Post[] = JSON.parse(localStorage.getItem("posts") || "[]");
    const updatedPosts = customPosts.map((p) =>
      p.id === Number(id) ? { ...p, title, body } : p
    );
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    navigate("/posts"); // go back to posts page
  };

  return (
    <div>
      <h2>Edit Post</h2>
      <input
        type="text"
        placeholder="Edit Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Edit Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button onClick={handleUpdate}>Update Post</button>
    </div>
  );
}

export default EditPost;
