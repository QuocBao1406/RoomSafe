import React from 'react';
// IMPORT THÊM Link TỪ REACT ROUTER
import { Link } from 'react-router-dom'; 
import '../css/Footer.css';
import { FaFacebook, FaInstagram, FaGithub } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className='footer-section'>
      <div className='footer-container'>
        <div className='footer-links-grid'>

          <div className='footer-column'>
            <Link to='/' className='footer-logo'>RoomSafe</Link>
            <p className='footer-tagline'>Với RoomSafe, việc tìm trọ và kết nối bạn cùng phòng trở nên nhanh chóng, an toàn và minh bạch, nhờ công nghệ xác thực và hệ thống đánh giá đáng tin cậy.</p>
          </div>

          <div className='footer-column'>
            <h4>Khám phá</h4>
            <Link to='/find-room'>Tìm phòng trọ</Link>
            <Link to='find-roommate'>Tìm bạn cùng phòng</Link>
            <Link to='/post-listing'>Đăng tin</Link>
          </div>

          <div className='footer-column'>
            <h4>Về RoomSafe</h4>
            <Link to='/about'>Về chúng tôi</Link>
            <Link to='/safety'>Trung tâm an toàn</Link>
            <Link to='/contact'>Liên hệ</Link>
          </div>

          <div className='footer-column'>
            <h4>Theo dõi chúng tôi</h4>
            <div className='footer-social-media'>
              <a href='https://facebook.com' aria-label='Facebook' target='_blank' rel='noopener noreferrer'><FaFacebook /></a>
              <a href='https://instagram.com' aria-label='Instagram' target='_blank' rel='noopener noreferrer'><FaInstagram /></a>
              <a href='https://github.com' aria-label='GitHub' target='_blank' rel='noopener noreferrer'><FaGithub /></a>
              <a href='mailto:support@roomsafe.com' aria-label='Email'><MdEmail /></a>
            </div>
          </div>

        </div>

        <hr className='footer-divider' />

        <div className='footer-bottom-bar'>
          <div className='footer-copyright'>
            <p>@{new Date().getFullYear()} RoomSafe. All right reserved.</p>
          </div>
          <div className='footer-legal-links'>
            <Link to='/terms'>Điều khoản dịch vụ</Link>
            <Link to='/privacy'>Chính sách bảo mật</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;