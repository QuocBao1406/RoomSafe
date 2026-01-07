import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { toast, Toaster } from 'react-hot-toast';
import { 
    FaWallet, FaHistory, FaCopy, FaQrcode, FaCheckCircle, 
    FaMoneyBillWave, FaArrowRight, FaInfoCircle, FaSpinner 
} from 'react-icons/fa';
import '../css/DepositPage.css';

const DepositPage = () => {
    // Lấy setUser để cập nhật số dư ngay lập tức khi tiền về
    const { user, setUser } = useContext(UserContext);
    
    // --- CẤU HÌNH NGÂN HÀNG (Sửa thông tin của bạn) ---
    const MY_BANK = {
        BANK_ID: 'MB', 
        ACCOUNT_NO: '0862997728',  // Số tài khoản của bạn
        ACCOUNT_NAME: 'NGUYEN HUU QUOC BAO', 
        TEMPLATE: 'compact2' 
    };

    const [amount, setAmount] = useState(0);
    const [qrUrl, setQrUrl] = useState('');
    const [transferContent, setTransferContent] = useState('');
    const [history, setHistory] = useState([]);
    
    // State xử lý luồng tự động kiểm tra
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [receivedAmount, setReceivedAmount] = useState(0);
    
    // Dùng ref để giữ giá trị khi component render lại
    const intervalRef = useRef(null);
    const initialHistoryLength = useRef(0);

    const quickAmounts = [20000, 50000, 100000, 200000, 500000];
    const formatMoney = (num) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num || 0);

    // 1. Hàm gọi API lấy lịch sử
    const fetchHistory = async () => {
        if (!user?.token) return [];
        try {
            const res = await axios.get('http://localhost:5000/api/payment/history', {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            if(res.data.error === 0) return res.data.data;
        } catch (error) {
            console.error("Lỗi tải lịch sử");
        }
        return [];
    };

    // 2. Load lịch sử lần đầu
    useEffect(() => {
        console.log("DATA USER HIỆN TẠI:", user);
        const init = async () => {
            const data = await fetchHistory();
            setHistory(data);
            initialHistoryLength.current = data.length; // Lưu mốc số lượng ban đầu
        };
        init();

        // Cleanup: Xóa bộ đếm khi thoát trang
        return () => stopChecking();
    }, [user]);

    // 3. Khi có mã QR -> Bắt đầu kiểm tra định kỳ (3s/lần)
    useEffect(() => {
        if (qrUrl) {
            startChecking();
        } else {
            stopChecking();
        }
    }, [qrUrl]);

    const startChecking = () => {
        if (intervalRef.current) return;
        
        intervalRef.current = setInterval(async () => {
            const newData = await fetchHistory();
            
            // Nếu có giao dịch mới (số lượng tăng lên)
            if (newData.length > initialHistoryLength.current) {
                const latestTx = newData[0]; // Lấy giao dịch mới nhất
                
                // Chỉ xử lý nếu là Nạp tiền (DEPOSIT)
                if (latestTx.type === 'DEPOSIT') {
                    handleSuccess(latestTx);
                }
                
                setHistory(newData);
                initialHistoryLength.current = newData.length;
            }
        }, 3000); // 3 giây gọi 1 lần
    };

    const stopChecking = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const handleSuccess = (transaction) => {
        stopChecking(); // Dừng check
        setQrUrl('');   // Ẩn QR
        setAmount(0);   // Reset ô nhập
        setReceivedAmount(transaction.amount);
        setShowSuccessPopup(true); // Hiện Popup

        // CẬP NHẬT SỐ DƯ NGAY LẬP TỨC
        setUser(prev => ({
            ...prev,
            account_balance: parseFloat(prev.account_balance || 0) + parseFloat(transaction.amount)
        }));
    };

    // Tạo mã QR
    useEffect(() => {
        if (amount >= 10000 && user?.id) {
            const content = `NAP${user.id}`; 
            setTransferContent(content);
            const url = `https://img.vietqr.io/image/${MY_BANK.BANK_ID}-${MY_BANK.ACCOUNT_NO}-${MY_BANK.TEMPLATE}.png?amount=${amount}&addInfo=${content}&accountName=${encodeURIComponent(MY_BANK.ACCOUNT_NAME)}`;
            setQrUrl(url);
        } else {
            setQrUrl('');
        }
    }, [amount, user]);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Đã sao chép!");
    };

    return (
        <div className="deposit-wrapper">
            <Toaster position="top-center" />
            
            {/* --- POPUP THÀNH CÔNG --- */}
            {showSuccessPopup && (
                <div className="success-overlay">
                    <div className="success-modal">
                        <div className="success-icon"><FaCheckCircle /></div>
                        <h2>Thanh toán thành công!</h2>
                        <p>Tài khoản của bạn đã được cộng tiền.</p>
                        <div className="success-amount">+{formatMoney(receivedAmount)}</div>
                        <button className="btn-close-popup" onClick={() => setShowSuccessPopup(false)}>
                            Tuyệt vời
                        </button>
                    </div>
                </div>
            )}

            <div className="deposit-container">
                <div className="deposit-header">
                    <div>
                        <h1>Nạp tiền tài khoản</h1>
                        <p>Hệ thống tự động cộng tiền sau 30s</p>
                    </div>
                    <div className="balance-badge">
                        <span className="label">Số dư khả dụng</span>
                        <div className="value">
                            <FaWallet /> {user?.account_balance ? formatMoney(user.account_balance) : '0 đ'}
                        </div>
                    </div>
                </div>

                <div className="deposit-grid">
                    {/* CỘT TRÁI */}
                    <div className="deposit-left">
                        <div className="deposit-card main-card">
                            <div className="card-title"><FaMoneyBillWave /> Chọn số tiền nạp</div>
                            <div className="amount-grid">
                                {quickAmounts.map(amt => (
                                    <button key={amt} className={`btn-amount ${amount === amt ? 'active' : ''}`} onClick={() => setAmount(amt)}>
                                        {formatMoney(amt)}
                                    </button>
                                ))}
                                <input type="number" className={`input-custom-amount ${amount > 0 && !quickAmounts.includes(amount) ? 'active' : ''}`} placeholder="Nhập số khác..." onChange={(e) => setAmount(Number(e.target.value))} />
                            </div>

                            {amount < 10000 ? (
                                <div className="info-box"><FaInfoCircle /> Nhập tối thiểu 10.000đ để lấy mã QR.</div>
                            ) : (
                                <div className="qr-container fade-in">
                                    <div className="qr-box">
                                        <div className="bank-logo">{MY_BANK.BANK_ID}</div>
                                        <img src={qrUrl} alt="VietQR" className="qr-image" />
                                        <div className="checking-status">
                                            <FaSpinner className="spin" /> Đang chờ thanh toán...
                                        </div>
                                    </div>
                                    <div className="transfer-details">
                                        <div className="detail-row"><span className="lbl">Chủ tài khoản:</span><span className="val bold">{MY_BANK.ACCOUNT_NAME}</span></div>
                                        <div className="detail-row"><span className="lbl">Số tài khoản:</span><span className="val copyable" onClick={() => handleCopy(MY_BANK.ACCOUNT_NO)}>{MY_BANK.ACCOUNT_NO} <FaCopy className="icon-copy"/></span></div>
                                        <div className="detail-row highlight"><span className="lbl">Nội dung CK:</span><span className="val copyable" onClick={() => handleCopy(transferContent)}>{transferContent} <FaCopy className="icon-copy"/></span></div>
                                        <div className="alert-success"><FaCheckCircle /><span>Giữ nguyên <b>Nội dung chuyển khoản</b> để hệ thống tự động xử lý.</span></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* CỘT PHẢI */}
                    <div className="deposit-right">
                        <div className="deposit-card history-card">
                            <div className="card-title"><FaHistory /> Giao dịch gần đây</div>
                            <div className="history-list">
                                {history.map(item => (
                                    <div key={item.transaction_id} className="history-item">
                                        <div className={`history-icon ${item.amount >= 0 ? 'bg-green' : 'bg-red'}`}>
                                            {item.amount >= 0 ? <FaArrowRight style={{transform:'rotate(45deg)'}}/> : <FaArrowRight style={{transform:'rotate(-45deg)'}}/>}
                                        </div>
                                        <div className="history-info">
                                            <div className="history-desc">{item.description}</div>
                                            <div className="history-time">{new Date(item.created_at).toLocaleString()}</div>
                                        </div>
                                        <div className={`history-amount ${item.amount >= 0 ? 'text-green' : 'text-red'}`}>
                                            {item.amount > 0 ? '+' : ''}{formatMoney(item.amount)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DepositPage;