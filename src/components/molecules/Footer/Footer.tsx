import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-logo">
          <p>© 2023 OurSpace</p>
        </div>
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact Us</a>
          <a href="/faq">FAQ</a>
        </div>
        <div className="footer-social">
          <a href="https://www.facebook.com"><i className="fab fa-facebook"></i></a>
          <a href="https://www.twitter.com"><i className="fab fa-twitter"></i></a>
          <a href="https://www.instagram.com"><i className="fab fa-instagram"></i></a>
          <a href="https://www.linkedin.com"><i className="fab fa-linkedin"></i></a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
