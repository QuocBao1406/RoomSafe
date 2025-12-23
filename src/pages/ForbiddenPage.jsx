import React from 'react';
import { Link } from 'react-router-dom';
import { FaBan } from 'react-icons/fa';

const ForbiddenPage = () => {
    return (
        <div style={{
            height: '80vh', display: 'flex', flexDirection: 'column', 
            alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: '#334155'
        }}>
            <FaBan size={80} color="#ef4444" style={{ marginBottom: 20 }} />
            <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>403 - Không có quyền truy cập</h1>
            <p style={{ maxWidth: 500, lineHeight: 1.6, marginBottom: 30 }}>
                Bạn không có quyền truy cập vào trang này. <br/>
                Vui lòng kiểm tra lại tài khoản hoặc quay về trang chủ.
            </p>
            <Link to="/" style={{
                padding: '10px 24px', background: '#2563eb', color: 'white', 
                borderRadius: '8px', textDecoration: 'none', fontWeight: 600
            }}>
                Về trang chủ
            </Link>
        </div>
    );
};

export default ForbiddenPage;