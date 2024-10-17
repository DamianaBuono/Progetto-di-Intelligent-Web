import React from 'react';
import './Footer.css'; // Crea questo file per personalizzare lo stile del footer
import { FaFacebook, FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="contact-info">
        <p>Contatti: info@giapponeapp.com | Telefono: +81-XXX-XXXX</p>
      </div>
      <div className="social-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
      </div>
    </footer>
  );
}

export default Footer;
