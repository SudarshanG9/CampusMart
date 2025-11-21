import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Header.css'; // We will create this CSS file

const Header = ({ title, onCartClick }) => {
    const { logout } = useAuth();
    const { cartCount } = useCart();

    return (
        <header className="dashboard-header">
            <h1>{title}</h1>
            <div className="header-actions">
                <div className="cart-icon" onClick={onCartClick}>
                    🛒 {/* You can replace this with an icon library later */}
                    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </div>
                <button onClick={logout} className="logout-button">Logout</button>
            </div>
        </header>
    );
};

export default Header;