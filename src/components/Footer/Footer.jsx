// This component renders the footer for the application, displaying copyright information.
// Accessibility: Includes ARIA label and semantic role for better screen reader support.

import "./Footer.css";

const Footer = () => (
  <footer className="footer-container" role="contentinfo" aria-label="Application Footer">
    <p className="footer-text">© 2024 Assignment - Gail Lobo</p>
  </footer>
);

export default Footer;
