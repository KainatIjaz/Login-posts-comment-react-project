import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
  isCustom?: boolean; // to identify user-added comments
}

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const user = JSON.parse(localStorage.getItem("user") || "null"); // checking if user is logged in

  useEffect(() => {
    if (id) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
        .then((data) => setPost(data));

      fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        .then((response) => response.json())
        .then((data) => {
          const customComments = JSON.parse(localStorage.getItem(`comments-${id}`) || "[]");
          setComments([...customComments, ...data]);
        });
    }
  }, [id]);

  const saveCustomComments = (updatedComments: Comment[]) => {
    localStorage.setItem(
      `comments-${id}`,
      JSON.stringify(updatedComments.filter((c) => c.isCustom))
    );
  };

  const handleAddOrUpdateComment = () => {
    if (!name || !email || !body) return alert("All fields are required");

    if (editId) {
      const updatedComments = comments.map((comment) =>
        comment.id === editId ? { ...comment, name, email, body } : comment
      );
      setComments(updatedComments);
      saveCustomComments(updatedComments);
      setEditId(null);
    } else {
      const newComment: Comment = {
        id: Date.now(),
        name,
        email,
        body,
        isCustom: true,
      };
      const updatedComments = [newComment, ...comments];
      setComments(updatedComments);
      saveCustomComments(updatedComments);
    }

    setName("");
    setEmail("");
    setBody("");
  };

  const handleEdit = (comment: Comment) => {
    setEditId(comment.id);
    setName(comment.name);
    setEmail(comment.email);
    setBody(comment.body);
  };

  const handleDelete = (idToDelete: number) => {
    const updatedComments = comments.filter((comment) => comment.id !== idToDelete);
    setComments(updatedComments);
    saveCustomComments(updatedComments);
  };

  if (!post) return <p>Loading post</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>

      <h3>Comments</h3>

      {/* comment form will only be shown if user is logged in */}
      {user ? (
        <div>
          <h4>{editId ? "Edit Comment" : "Add a Comment"}</h4>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            placeholder="Your Comment"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <button onClick={handleAddOrUpdateComment}>
            {editId ? "Update Comment" : "Submit Comment"}
          </button>
        </div>
      ) : (
        <p>Please log in to add comments</p>
      )}

      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <strong>{comment.name}</strong> ({comment.email})
            <p>{comment.body}</p>
            {user && comment.isCustom && (
              <>
                <button onClick={() => handleEdit(comment)}>Edit</button>
                <button onClick={() => handleDelete(comment.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostDetails;
