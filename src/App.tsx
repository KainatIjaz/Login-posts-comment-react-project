import { Outlet, Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <h1>Welcome to My App</h1>

      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Login</Link>
        <Link to="/posts">Posts</Link>
        <Link to='/CreatePost'>Create Post</Link>
      </nav>

      <Outlet />
    </div>
  );
}

export default App;
