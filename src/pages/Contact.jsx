const ContactPage = () => {
  return (
    <>
      {/* Header */}
      <section className="text-center py-5 contact-header">
        <h2 className="gradient-title">Let’s Connect</h2>
        <p className="text-muted mt-2">
          Have questions or ideas? We’re always here to listen and help you out.
        </p>
      </section>

      {/* Contact Section */}
      <main className="flex-grow-1">
        <section className="container my-5">
          <div className="row g-4">
            {/* Contact Form */}
            <div className="col-lg-6">
              <div className="contact-box shadow-sm rounded-4 p-4 h-100">
                <h4 className="fw-semibold mb-4" style={{ color: "#3D38C4" }}>
                  Send us a Message
                </h4>
                <form>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea
                      rows="4"
                      className="form-control"
                      placeholder="Write your message"
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-gradient w-100 send-btn">
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="col-lg-6">
              <div className="contact-box shadow-sm rounded-4 p-4 h-100 d-flex flex-column justify-content-between">
                <div>
                  <h4 className="fw-semibold mb-3" style={{ color: "#3D38C4" }}>
                    Reach Out To Us
                  </h4>
                  <p className="text-muted">
                    Our team is ready to assist with any inquiries about events, volunteering, or partnerships.
                  </p>
                  <p className="fw-medium">
                    <i className="fa-solid fa-phone me-2" style={{ color: "#3D38C4" }}></i>
                    +1 (555) 123-4567
                  </p>
                  <p className="fw-medium">
                    <i className="fa-solid fa-envelope me-2" style={{ color: "#3D38C4" }}></i>
                    info@eventmanagement.com
                  </p>
                  <p className="fw-medium">
                    <i className="fa-solid fa-location-dot me-2" style={{ color: "#3D38C4" }}></i>
                    123 Event Avenue, Suite 100, Metropolis, CA 90210
                  </p>
                </div>
                <div style={{ minHeight: "300px" }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d19680.29967123197!2d30.842387056901913!3d29.311137728586633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sar!2seg!4v1756154006336!5m2!1sar!2seg"
                    className="rounded-3 w-100 h-100"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Event Location"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ContactPage;
