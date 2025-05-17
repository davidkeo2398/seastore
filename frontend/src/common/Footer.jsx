import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-4 flex justify-center items-center shadow-md fixed bottom-0 left-0 w-full z-50">
            <div className="text-center">
                <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;