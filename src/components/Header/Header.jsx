// This component renders the header for the application, displaying the main title.
// Accessibility: Includes ARIA label and semantic role for better screen reader support.

import "./Header.css";

const Header = () => (
  <header
    className="header-container"
    role="banner"
    aria-label="Application Header"
  >
    <h1 className="header-title">Contact Search</h1>
  </header>
);

export default Header;
