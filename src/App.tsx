import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import JewelryForm from './components/form/JewelryForm';
import JewelrySearch from './components/search/JewelrySearch';
import Layout from './components/Layout';
import Info from './components/info';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<JewelrySearch />} />
          <Route path="/register" element={<JewelryForm />} />
          <Route path="/info" element={<Info />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
