
function Footer() {
  return (
    <footer className="mt-5 py-3" style={{ backgroundColor: "#5B59EC" }}>
      <div className="container text-white">
        <div className="row align-items-center">
          {/* Links Section */}
          <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-start gap-4 mb-3 mb-md-0">
            <p className="mb-0">Company</p>
            <p className="mb-0">Resources</p>
            <p className="mb-0">Legal</p>
          </div>

          {/* Social Icons */}
          <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end gap-3 fs-5">
            <i className="fa-brands fa-facebook-f"></i>
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-linkedin-in"></i>
            <i className="fa-brands fa-youtube"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
