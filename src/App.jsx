
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header.jsx';
import Content from './Content.jsx';

function Home() {
  return (
    <>
    <div className="main">

    <Header />
    <Content />
     
      </div>
      
   
    </>
  );
}

export default Home;
