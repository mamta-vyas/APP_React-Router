import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter, NavLink, Route, Routes, useParams } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));

const About = () => {
  return(
<div>
  <h1>About Component</h1>
</div>
      )
}

const Home = () => {
  const[post , setPost] = useState([]);
  useEffect(() =>{
       fetch('https://jsonplaceholder.typicode.com/posts').then((data) =>
     data.json()).then((data) => setPost(data));
      },[])


  return(
<div>
  {post.map((item) => (
    <NavLink to={`/post/${item.id}`} key={item.id}>{item.title}</NavLink>
  ))}
</div>

      )
}

const Profile = () => {
return (
  <div>
    <h2>Profile Component</h2>
  </div>
)
}

const Settings = () => {
return(
  <div>
     <h3>Settings Component</h3>
  </div>
)
}

const User = () => {
  const params = useParams();
  return(
    <div>
      <h1>User Name is : - {params.userName}</h1>
    </div>
  )
}

const Post = () => {
  const params = useParams();
const[data , setData] = useState(null);
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`).then((data)=> data.json()).then((data)=>setData(data));
  },[]);
  if(data===null) return <p>Loading.....</p>
  return(
    <div>
     <h1>{data.title}</h1>
     <p>{data.body}</p>
    </div>
  );
}


root.render(
  <React.StrictMode>
   <BrowserRouter>
      <Routes>
<Route path="/" element={<Home/>}/>
<Route path="/post/:postId" element={<Post/>}/>
<Route  path="/about" element={<About/>}/>
   <Route path="account">
<Route path="profile" element={< Profile/>}/>
<Route path="settings" element={< Settings/>}/>
   </Route>

<Route path = "/user/:userName" element={<User/>}/>
      </Routes>
   </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
