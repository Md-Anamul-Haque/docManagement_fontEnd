import axios from 'axios'
import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Card from './components/Card'
import Admin from './pages/admin'
import AdminDoc from './pages/admin.doc'
import Doc from './pages/doc'
import Home from './pages/home'
import SignIn from './pages/signIn'

function App() {
  const token = localStorage.getItem('my-auth-token') || '';
  // alert(token)
  if (token) {
    // Add a request interceptor
    axios.interceptors.request.use(function (config) {
      config.headers.authorization = token;

      return config;
    });
  }
  useEffect(() => {

  }, [useNavigate()])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/:doc_id" element={<Doc />} />
      <Route path="/admin/:doc_id" element={<AdminDoc />} />
      <Route path="*" element={<Card>NOt Found - 404</Card>} />
    </Routes>
  )
}

export default App
