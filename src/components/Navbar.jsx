import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../css/Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { GiHidden } from 'react-icons/gi';

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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const [isHidden, setIsHidden] = useState(false);

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

  const closeMenu = () => setIsOpen(false);

  return (
    <motion.nav
      className={`navbar ${isOpen ? 'menu-open' : ''}`}
      animate={{ y: isHidden ? '-100%' : '0%'}}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className='navbar-container'>
        
        <NavLink to='/' className='navbar-logo' onClick={closeMenu}>
          RoomSafe
        </NavLink>

        <div className='menu-icon' onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className='nav-menu-desktop'>

          <li>
            <NavLink to='/find-room' className='nav-links'>
              {({ isActive }) => (
                <>
                  Tìm Phòng
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

          <li>
            <NavLink to='/find-roommate' className='nav-links'>
              {({ isActive }) => (
                <>
                  Tìm bạn cùng Phòng
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

          <li>
            <NavLink to='/post-listing' className='nav-links'>
              {({isActive}) => (
                <>
                  Đăng tin
                  {isActive && (
                    <motion.span
                      className='magic-line'
                      layoutId='magic-line-desktop'
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          </li>
        </ul>

        <div className='nav-auth-desktop'>
          <NavLink to='/login' className='nav-button btn-login'>
            Đăng nhập
          </NavLink>
          <NavLink to='/register' className='nav-button btn-signup'>
            Đăng ký
          </NavLink>
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
            <motion.li variants={mobileItemVariants}>
              <NavLink to='/find-room' className='nav-links' onClick={closeMenu}>Tìm phòng</NavLink>
            </motion.li>
            <motion.li variants={mobileItemVariants}>
              <NavLink to='find-roommate' className='nav-links' onClick={closeMenu}>Tìm bạn cùng phòng</NavLink>
            </motion.li>
            <motion.li variants={mobileItemVariants}>
              <NavLink to='/post-listing' className='nav-links' onClick={closeMenu}>Đăng tin</NavLink>
            </motion.li>
            <motion.div variants={mobileItemVariants} className='mobile-divider'></motion.div>
            <motion.li variants={mobileItemVariants}>
              <NavLink to='/login' className='nav-button btn-login' onClick={closeMenu}>Đăng nhập</NavLink>
            </motion.li>
            <motion.li variants={mobileItemVariants}>
              <NavLink to='/register' className='nav-button btn-signup' onClick={closeMenu}>Đăng ký</NavLink>
            </motion.li>
          </motion.ul>
        )}
      </AnimatePresence>

    </motion.nav>
  );
}

export default Navbar;