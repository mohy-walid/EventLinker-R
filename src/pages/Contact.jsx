import { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState(''); // 'sending', 'success', 'error'
  const [statusMessage, setStatusMessage] = useState('');

  // REPLACE THIS WITH YOUR WEB APP URL FROM STEP 2
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyrGUPhPL_Ta5bkL1Yd1FVSeI9cmwGp_UxfBUd4rboKFlGqSvbXCUg2Zm7q16nYJjZG/exec';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setStatusMessage('Please fill in all required fields.');
      return;
    }

    setStatus('sending');
    setStatusMessage('');

    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Important for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      // With no-cors mode, we can't read the response
      // So we assume success if no error is thrown
      setStatus('success');
      setStatusMessage('Message sent successfully! We\'ll get back to you soon.');
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });

      // remove success message after 5 seconds
      setTimeout(() => {
        setStatus('');
        setStatusMessage('');
      }, 5000);

    } catch (error) {
      setStatus('error');
      setStatusMessage('Failed to send message. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <>
      {/* Header */}
      <section className="text-center py-5 contact-header">
        <h2 className="gradient-title">Let's Connect</h2>
        <p className="mt-2" style={{ fontSize: '1.1rem' }}>
          Have questions or ideas? We're always here to listen and help you out.
        </p>
      </section>

      {/* Contact Section */}
      <main className="flex-grow-1 bg-light">
        <section className="container my-5">
          <div className="row g-4">
            {/* Contact Form */}
            <div className="col-lg-6">
              <div className="contact-box shadow-sm rounded-4 p-4 h-100">
                <h4 className="fw-semibold mb-4" style={{ color: "#3D38C4" }}>
                  Send us a Message
                </h4>

                {/* Status Messages */}
                {status === 'success' && (
                  <div className="alert alert-success">
                    <i className="fa-solid fa-check-circle me-2"></i>
                    {statusMessage}
                  </div>
                )}
                {status === 'error' && (
                  <div className="alert alert-error">
                    <i className="fa-solid fa-exclamation-circle me-2"></i>
                    {statusMessage}
                  </div>
                )}

                <div>
                  <div className="mb-3">
                    <label className="form-label" style={{ color: "#3D38C4", fontWeight: 500 }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" style={{ color: "#3D38C4", fontWeight: 500 }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" style={{ color: "#3D38C4", fontWeight: 500 }}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" style={{ color: "#3D38C4", fontWeight: 500 }}>
                      Message *
                    </label>
                    <textarea
                      name="message"
                      rows="4"
                      className="form-control"
                      placeholder="Write your message"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <button 
                    onClick={handleSubmit}
                    className="btn w-100 send-btn btn-gradient"
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-paper-plane me-2"></i>
                        Send Message
                      </>
                    )}
                  </button>
                </div>
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
                  <p className="fw-medium text-dark mb-2">
                    <i className="fa-solid fa-phone me-2" style={{ color: "#3D38C4" }}></i>
                    +1 (555) 123-4567
                  </p>
                  <p className="fw-medium text-dark mb-2">
                    <i className="fa-solid fa-envelope me-2" style={{ color: "#3D38C4" }}></i>
                    info@eventmanagement.com
                  </p>
                  <p className="fw-medium text-dark mb-4">
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
