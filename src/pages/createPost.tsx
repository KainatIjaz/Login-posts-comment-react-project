import {useState} from 'react';
import {useNavigate} from 'react-router-dom'


interface Post {
  id: number;
  title: string;
  body: string;
}

function CreatePost(){
const [title,setTitle]=useState("");
const [body, setBody]=useState("");
const navigate=useNavigate();
const handleSubmit=(event:React.FormEvent)=>{
    event.preventDefault();
const storedPosts = localStorage.getItem("posts");
const existingPosts: Post[] = storedPosts ? JSON.parse(storedPosts) as Post[] : [];

 const newPost: Post = {
      id: existingPosts.length + 1,
      title,
      body,
    };

    const updatedPosts = [...existingPosts, newPost];
    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    alert("Post created");
    navigate('/posts');
    //to restart the form
    setTitle("");
    setBody("");
}

    return(
        <div style={{maxWidth:'400px',margin:'20px aoto'}}>
            <h2>Create New Post</h2>
            <form onSubmit={handleSubmit}>

                <div>
                    <label>Post Title:</label>
                    <input 
                    type='text'
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label>Post Body:</label>
                    <textarea
                    value={body}
                    onChange={(e)=> setBody(e.target.value)} required>
                    </textarea>
                </div>
                <button type='submit'>Create Post</button>
            </form>
        </div>
    );
}

export default CreatePost