import { Routes, Route } from 'react-router-dom'
import './App.css'
import RootPage from './pages/Root/RootPage'
import LoginPage from './pages/Login/LoginPage'
import SubscriptionsPage from './pages/Subscriptions/SubscriptionsPage'
import ForgotPasswordPage from './pages/ForgotPassword/ForgotPasswordPage'
import HomePage from './pages/Home/HomePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootPage />}>
        <Route index element={<HomePage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/subscriptions/new" element={<SubscriptionsPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    </Routes>
  )
}

export default App
