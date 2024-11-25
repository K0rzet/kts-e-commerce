import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProductsPage from '@/pages/ProductsPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import './styles/globals.scss';
import React from 'react';
import Layout from '@/components/Layout';
import CartPage from '@/pages/CartPage';
import { RootStoreProvider } from '@/store/RootStoreContext';
import AuthPage from './pages/AuthPage';
import SocialAuthPage from './pages/SocialAuthPage';
import RedirectIfAuth from './pages/RedirectIfAuth';
import ProfilePage from './pages/ProfilePage';
import OrderPage from '@/pages/OrderPage';
import ThanksPage from '@/pages/ThanksPage/ThanksPage';
import { MetaProvider } from './context/MetaContext';

function App() {
  return (
    <RootStoreProvider>
      <BrowserRouter>
        <MetaProvider>
          <Layout>
            <Routes>
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route element={<RedirectIfAuth />}>
                <Route path="/login" element={<AuthPage isLogin={true} />} />
                <Route path="/register" element={<AuthPage isLogin={false} />} />
                <Route path="/social-auth" element={<SocialAuthPage />} />
              </Route>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/order" element={<OrderPage />} />
              <Route path="/thanks" element={<ThanksPage />} />
              <Route path="*" element={<Navigate to="/products" replace />} />
            </Routes>
          </Layout>
        </MetaProvider>
      </BrowserRouter>
    </RootStoreProvider>
  );
}

export default App;
