import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext.jsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast, Toaster } from 'react-hot-toast';
import '@fortawesome/fontawesome-free/css/all.min.css';

import '../css/LoginPage.css';

// cau hinh schema validation su dung zod
const loginSchema = z.object({
  username: z.string().min(1, 'Vui lòng nhập tên đăng nhập'),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
});

const registerSchema = z.object({
  username: z.string().min(6, 'Tên đăng nhập phải có ít nhất 6 ký tự'),
  email: z.string().email('Vui lòng nhập email hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  role: z.enum(['TENANT', 'LANDLORD'], { errorMap: () => ({ message: " Vui lòng chọn vai trò người dùng" }) }),
});

// cau hinh API co ban
const api = axios.create({
  baseURL: 'http://localhost:5000/api/auth',
  headers: { 'Content-Type': 'application/json' }
});

function LoginPage() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  // State chuyen slide giua dang nhap va dang ky
  const [ isActive, setIsActive ] = useState(false);

  // kiem tra neu da dang nhap thi chuyen huong ve trang chu
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) navigate('/');
  }, [navigate]);

  // setup form login
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin, isSubmitting: isSubmittingLogin }
  } = useForm({ resolver: zodResolver(loginSchema)});

  // setup form register
  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    formState: { errors: errorsSignUp, isSubmitting: isSubmittingSignUp }
  } = useForm({ resolver: zodResolver(registerSchema)});

  // xu ly dang nhap
  const onLoginSubmit = async (data) => {
    try {
      const res = await api.post('/login', data);

      toast.success('Đăng nhập thành công!');

      const userData = res.data;

      // tao object luu user vao localStorage
      const localUser = {
        id: userData.id,
        username: userData.username || data.username,
        name: userData.name || userData.username,
        email: userData.email || '',
        provider: 'local',
        avatar: userData.avatar || null,
        role: userData.role || userData.user_role || 'TENANT',
      };

      localStorage.setItem('user', JSON.stringify(localUser));
      setUser(localUser);

      // doi 1s roi chuyen trang
      setTimeout(() => {
        if ( localUser.role === 'LANDLORD') {
          navigate('/post-room');
        } else {
          navigate('/find-room');
        }
      }, 1000);
    } catch (error) {
      const msg = error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại!';
      if (msg.includes("NO EXISTING")) toast.error('Tài khoản không tồn tại!');
      else if (msg.includes("WRONG PASSWORD")) toast.error('Mật khẩu không đúng!');
      else toast.error(msg);
    }
  };

  // xu ly dang ky
  const onSignUpSubmit = async (data) => {
    try {
      await api.post('/register', data);

      toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
      setIsActive(false); // chuyen ve form dang nhap
    } catch (error) {
      toast.error(error.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại!');
    }
  };

  return (
    <div className="login-page-wrapper">
    <div className={`login-register-container ${isActive ? 'active' : ''}`}>
      {/* component hien thi thong bao */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* form dang nhap */}
      <div className="form-box login">
        <form onSubmit={handleSubmitLogin(onLoginSubmit)}>
          <h1>Đăng nhập</h1>

          <div className="input-box">
            <input
              type="text"
              placeholder="Tên đăng nhập"
              {...registerLogin('username')}
            />
            <i className="fa-solid fa-user"></i>

            {/* hien thi loi neu co */}
            {errorsLogin.username && <span style={{ color: 'red', fontSize: '13px', display:'block', textAlign:'left', marginTop:'5px' }}>{errorsLogin.username.message}</span>}
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Mật khẩu"
              {...registerLogin('password')}
            />
            <i className="fa-solid fa-lock"></i>
            {errorsLogin.password && <span style={{ color: 'red', fontSize: '13px', display:'block', textAlign:'left', marginTop:'5px' }}>{errorsLogin.password.message}</span>}
          </div>

          <div className='forgot-link'>
            <a href="#">Quên mật khẩu?</a>
          </div>

          <button type="submit" className="btn" disabled={isSubmittingLogin}>
            {isSubmittingLogin ? <span className="spinner-btn" /> : "Đăng nhập"}
          </button>

          <p>Hoặc đăng nhập với</p>
          <div className="social-icons">
            <a href="http://localhost:5000/api/auth/google"><i className="fa-brands fa-google"></i></a>
            <a href="http://localhost:5000/api/auth/facebook"><i className="fa-brands fa-facebook"></i></a>
            <a href="http://localhost:5000/api/auth/github"><i className="fa-brands fa-github"></i></a>
          </div>
        </form>
      </div>

      {/* form dang ky */}
      <div className="form-box register">
        <form onSubmit={handleSubmitSignUp(onSignUpSubmit)}>
          <h1>Đăng ký</h1>

          <div className="input-box">
            <input
              type="text"
              placeholder="Tên đăng nhập"
              {...registerSignUp('username')}
            />
            <i className="fa-solid fa-user"></i>
            {errorsSignUp.username && <span style={{ color: 'red', fontSize: '13px', display:'block', textAlign:'left', marginTop:'5px' }}>{errorsSignUp.username.message}</span>}
          </div>

          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              {...registerSignUp('email')}
            />
            <i className="fa-solid fa-envelope"></i>
            {errorsSignUp.email && <span style={{ color: 'red', fontSize: '13px', display:'block', textAlign:'left', marginTop:'5px' }}>{errorsSignUp.email.message}</span>}
          </div>

          <div className="input-box">
            <select
              {...registerSignUp('role')}
              defaultValue=""
              style={{ color: '#333' }}
            >
              <option value="" disabled hidden>Chọn vai trò của bạn</option>
              <option value="TENANT">Người tìm trọ</option>
              <option value="LANDLORD">Chủ trọ</option>
            </select>
            <i className="fa-solid fa-user-tag"></i>
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Mật khẩu"
              {...registerSignUp('password')}
            />
            <i className="fa-solid fa-lock"></i>
            {errorsSignUp.password && <span style={{ color: 'red', fontSize: '13px', display:'block', textAlign:'left', marginTop:'5px' }}>{errorsSignUp.password.message}</span>}
          </div>

          <button type="submit" className="btn" disabled={isSubmittingSignUp}>
            {isSubmittingSignUp ? <span className="spinner-btn" /> : "Đăng ký"}
          </button>

          <p>Hoặc đăng ký với</p>
          <div className="social-icons">
             <a href="http://localhost:5000/api/auth/google"><i className="fa-brands fa-google"></i></a>
            <a href="http://localhost:5000/api/auth/facebook"><i className="fa-brands fa-facebook"></i></a>
            <a href="http://localhost:5000/api/auth/github"><i className="fa-brands fa-github"></i></a>
          </div>
        </form>
      </div>

      {/* nut chuyen doi giua dang nhap va dang ky */}
      <div className="toggle-box">
        <div className="toggle-panel toggle-right">
          <h1>Chào mừng trở lại</h1>
          <p>Nhập thông tin cá nhân để sử dụng tất cả tính năng của RoomSafe</p>
          <button className="btn register-btn" onClick={() => setIsActive(false)}>
            Đăng nhập
          </button>
        </div>

        <div className="toggle-panel toggle-left">
          <h1>Xin chào, bạn mới đến đây?</h1>
          <p>Nhập thông tin cá nhân để bắt đầu hành trình cùng RoomSafe</p>
          <button className="btn login-btn" onClick={() => setIsActive(true)}>
            Đăng ký
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default LoginPage;