import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();//to navigate to posts

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // saved user data in local storage
    const user = { name, email };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Login successful!");
    navigate("/posts"); 
  };

  return (
  <div style={{ maxWidth: "500px", margin: "50px auto", padding: "20px", background: "#355ba2ff", borderRadius: "10px", textAlign: "center" }}>
    <h2>Sign In / Sign Up</h2>
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "10px" }}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ display: "block", width: "90%", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: "block", width: "90%", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", width: "90%", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <button type="submit" style={{ padding: "8px 12px", background: "#007bff", color: "white", border: "none", borderRadius: "4px" }}>
        Login
      </button>
    </form>
  </div>
);

}

export default Login;
