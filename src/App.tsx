import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import './styles/globals.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="*" element={<Navigate to="/products" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
