import "./footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return <nav className="footer">Copyright &copy; {year} </nav>;
};
export default Footer;
