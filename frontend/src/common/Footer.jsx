import React from 'react';
import '../css/Footer.css'; // Import file CSS

const Footer = () => {
    return (
        <footer>
            <div className="text-center">
                <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;