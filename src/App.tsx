import { Outlet, Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>React Project</h1>

      <nav
        style={{
          display: 'flex',
          justifyContent: 'center', 
          gap: '20px',              // ddd spacing between links
          background: '#333',       // dark background
          padding: '10px 0',        // add padding
          borderRadius: '5px',
        }}
      >
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
        <Link to="/posts" style={{ color: 'white', textDecoration: 'none' }}>Posts</Link>
        <Link to="/CreatePost" style={{ color: 'white', textDecoration: 'none' }}>Create Post</Link>
      </nav>

      <div style={{ marginTop: '20px' }}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
