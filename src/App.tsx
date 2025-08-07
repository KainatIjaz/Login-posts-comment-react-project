import { Outlet, Link, useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("You have been logged out");
    navigate("/"); // Redirect to login
  };

  // Redirect to login if user tries to access restricted pages
  const handleProtectedNavigation = (path: string) => {
    if (user) {
      navigate(path);
    } else {
      alert("Please log in to access this page");
      navigate("/");
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>React Project</h1>

      <nav
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          background: '#333',
          padding: '10px 0',
          borderRadius: '5px',
        }}
      >
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>

        {/* Protect Posts and Create Post */}
        <button
          onClick={() => handleProtectedNavigation('/posts')}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          Posts
        </button>

        <button
          onClick={() => handleProtectedNavigation('/CreatePost')}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          Create Post
        </button>

        {/* Show Logout only if logged in */}
        {user && (
          <button
            onClick={handleLogout}
            style={{
              background: 'red',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '5px 10px',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        )}
      </nav>

      <div style={{ marginTop: '20px' }}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
