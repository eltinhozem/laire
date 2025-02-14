import { BrowserRouter, Routes, Route } from 'react-router-dom';
import JewelryForm from './components/form/JewelryForm';
import Layout from './components/Layout';
import Info from './components/info';
import Login from './login/login';
import JewelrySearch from './components/search/JewelrySearch';

function App() {
  return (
    <BrowserRouter>
      <Routes>        
          <Route index element={<Login />} />
          <Route path="/" element={<Layout />}>
          <Route path="/search" element={<JewelrySearch />} />
          <Route path="/register" element={<JewelryForm />} />
          <Route path="/info" element={<Info />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
