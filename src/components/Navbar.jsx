import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../css/Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { GiHidden } from 'react-icons/gi';
import AuthPage from '../pages/LoginPage.jsx';
import { UserContext } from '../contexts/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { FaUser, FaSignOutAlt, FaPlusCircle } from "react-icons/fa";

const mobileMenuVariants = {
  hidden: {
    x: '100%',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 35
    }
  },
  visible: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 35,
      staggerChildren: 0.05
    }
  }
};

const mobileItemVariants = {
  hidden: {
    opacity: 0,
    x: 50
  },
  visible: {
    opacity: 1,
    x: 0
  }
};

const TENANT_LINKS = [
  { path: '/find-room', label: 'Tìm trọ' },
  { path: '/find-roommate', label: 'Tìm bạn cùng phòng' },
];

const LANDLORD_LINKS = [
  { path: 'dashboard', label: 'Tổng quan' },
  { path: 'manage-post', label: 'Quản lý trọ' },
]

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const [isHidden, setIsHidden] = useState(false);

  const dropdownRef = useRef(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    console.log("Đã click vào Avatar! trạng thái cũ:", isDropdownOpen);
    setIsDropdownOpen(!isDropdownOpen);
  }

  const userRole = user?.role;
  const isLandlord = userRole === 'LANDLORD' || userRole === 'landlord';
  const navLinks = isLandlord ? LANDLORD_LINKS : TENANT_LINKS;

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 80 && currentScrollY > lastScrollY) setIsHidden(true);
      else setIsHidden(false);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  })

  useEffect (() => {
    const handleClickOutside = (event) => {
      // neu menu dang mo va click khong nam trong menu
      if(isDropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isDropdownOpen]); // chay khi trang thai isDropdownOpen thay doi

  const closeMenu = () => setIsOpen(false);

  // xu ly dang xuat
  const handleLogout =() => {
    // xoa user khoi context va localStorage
    localStorage.removeItem('user');
    setUser(null);
    // chuyen ve trang chu
    setIsDropdownOpen(false);
    closeMenu();
    navigate('/');
  }

  const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

  return (
    <motion.nav
      className={`navbar ${isOpen ? 'menu-open' : ''}`}
      animate={{ y: isHidden ? '-100%' : '0%'}}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className='navbar-container'>
        
        <NavLink to={isLandlord ? '/landlord-dashboard' : '/find-room'} className='navbar-logo' onClick={closeMenu}>
          RoomSafe
        </NavLink>

        <div className='menu-icon' onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className='nav-menu-desktop'>
          {navLinks.map((item) => (
            <li key={item.path}>
              <NavLink to={item.path} className='nav-links'>
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.span
                        className="magic-line"
                        layoutId='magic-line-desktop'
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
        
        {/* dang nhap / dang ky */}
        <div className='nav-auth-desktop'>
          {/* neu la chu tro thi hien nut dang tin */}
          { isLandlord && (
            <NavLink to="/post-room" className="btn-post-new">
              <FaPlusCircle style={{ marginRight: '5px' }} />Đăng tin
            </NavLink>
          )}
          {user ? (
            <div className="user-dropdown-container" ref={dropdownRef}>
              <div className="avatar-wrapper" onClick={toggleDropdown}>
                <img
                  src={user.avatar || defaultAvatar}
                  alt="Avatar"
                  className="user-avatar"
                />
                <span className="user-name">{user.name || user.username}</span>
              </div>

              {/* Dropdown menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    className="dropdown-menu"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <NavLink to="/profile" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                      <FaUser className="dropdown-icon" /> Thông tin cá nhân
                    </NavLink>
                    <div className="dropdown-item logout" onClick={handleLogout}>
                      <FaSignOutAlt className="dropdown-icon" /> Đăng xuất
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <NavLink to='/login' className='nav-button btn-login'>
              Đăng nhập
            </NavLink>
          )} 
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className='nav-menu-mobile'
            variants={mobileMenuVariants}
            initial='hidden'
            animate='visible'
            exit='hidden'
          >
            {navLinks.map((item) => (
              <motion.li key={item.path} variants={mobileItemVariants}>
                <NavLink to={item.path} className='nav-links' onClick={closeMenu}>
                  {item.label}
                </NavLink>
              </motion.li>
            ))}

            <motion.div variants={mobileItemVariants} className="mobile-divider"></motion.div>

            {/* login & logout*/}
            {user ? (
            <>
              <motion.li variants={mobileItemVariants}>
                <div className="mobile-user-info">
                  <img src={user.avatar || defaultAvatar} alt="Avatar" className="mobile-avatar" />
                  <span>Xin chào, {user.username}</span>
                </div>
              </motion.li>
              <motion.li variants="mobileItemVariants">
                <NavLink to="/profile" className="nav-links" onClick={closeMenu}>Thông tin cá nhân</NavLink>
              </motion.li>
              <motion.li variants="mobileItemVariants">
                <div className='nav-links' onClick={handleLogout} style={{ cursor: 'pointer'}}> Đăng xuất </div>
              </motion.li>
            </>
            ) : (
              <>
                <motion.li variants={mobileItemVariants}>
                  <NavLink to="/login" className="nav-button btn-login" onClick={closeMenu}>Đăng nhập</NavLink>
                </motion.li>
              </>
            )}
          </motion.ul>
        )}
      </AnimatePresence>

    </motion.nav>
  );
}

export default Navbar;