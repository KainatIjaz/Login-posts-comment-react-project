import ReactDom from 'react-dom/client';
import {BrowserRouter,Routes, Route } from 'react-router-dom';
import Login from './pages/Login.tsx';
import PostDetails from './pages/PostDetails.tsx';
import Posts from './pages/Posts.tsx'
import EditPost from "./pages/EditPost";
import App from "./App.tsx";
import CreatePost from "./pages/createPost.tsx";
import './index.css';

ReactDom.createRoot(document.getElementById('root') as HTMLElement).render(
  //create everything inside the root
      //render app inside the root
  <BrowserRouter>
  <Routes>
<Route path='/' element={<App/>}>
<Route index element={<Login/>}/>
<Route path='posts' element={<Posts/>}/>
<Route path='posts/:id' element={<PostDetails/>}/>
<Route path='edit/:id' element={<EditPost/>}/>
<Route path='CreatePost' element={<CreatePost/>}/>

</Route>

  </Routes>
  </BrowserRouter>
)