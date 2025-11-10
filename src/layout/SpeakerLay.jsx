import speaker1 from "../assets/img/Selectionn.png"
import speaker2 from "../assets/img/Selection (1).png"
import speaker3 from "../assets/img/Selection (2).png"
import speaker4 from "../assets/img/Selection (3).png"



function SpeakerLay() {
  return (
    <>
      <section className="py-5">
        <div className="container">
          <h3
            className="mb-4 text-center text-sp"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            Our Speakers
          </h3>

          <div className="row flex-nowrap overflow-auto g-4 pb-3">
            {/* --- Speaker 1 --- */}
            <div className="col-10 col-sm-6 col-md-3 d-flex">
              <div
                className="card text-center shadow-sm h-100"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <img
                  src={speaker1}
                  className="rounded-circle p-3"
                  alt="Speaker 1"
                />
                <div className="card-body d-flex flex-column">
                  <h4 className="text-sp card-title">Dr. Anya Sharma</h4>
                  <p className="text-primary fs-5">
                    CEO, Quantum Leap Innovations
                  </p>
                  <p className="flex-grow-1">
                    Renowned expert in neural networks and machine learning,
                    driving innovation in AI-powered solutions.
                  </p>
                </div>
              </div>
            </div>

            {/* --- Speaker 2 --- */}
            <div className="col-10 col-sm-6 col-md-3 d-flex">
              <div
                className="card text-center shadow-sm h-100"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <img
                  src={speaker2}
                  className="rounded-circle p-3"
                  alt="Speaker 2"
                />
                <div className="card-body d-flex flex-column">
                  <h4 className="text-sp card-title">Prof. Ben Carter</h4>
                  <p className="text-primary fs-5">
                    Lead Researcher, Global Innovations
                  </p>
                  <p className="flex-grow-1">
                    Pioneer in sustainable technology and quantum mechanics,
                    advocating for eco-friendly tech advancements.
                  </p>
                </div>
              </div>
            </div>

            {/* --- Speaker 3 --- */}
            <div className="col-10 col-sm-6 col-md-3 d-flex">
              <div
                className="card text-center shadow-sm h-100"
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                <img
                  src={speaker3}
                  className="rounded-circle p-3"
                  alt="Speaker 3"
                />
                <div className="card-body d-flex flex-column">
                  <h4 className="text-sp card-title">Sarah Jenson</h4>
                  <p className="text-primary fs-5">CEO, InnovateX</p>
                  <p className="flex-grow-1">
                    Innovator in product development and user experience,
                    specializing in cutting-edge software solutions.
                  </p>
                </div>
              </div>
            </div>

            {/* --- Speaker 4 --- */}
            <div className="col-10 col-sm-6 col-md-3 d-flex">
              <div
                className="card text-center shadow-sm h-100"
                data-aos="zoom-in"
                data-aos-delay="400"
              >
                <img
                  src={speaker4}
                  alt="Speaker 4"
                  className="rounded-circle p-3"
                />
                <div className="card-body d-flex flex-column">
                  <h4 className="text-sp card-title">Michael Chen</h4>
                  <p className="text-primary fs-5">
                    Head of Product, FutureLink
                  </p>
                  <p className="flex-grow-1">
                    Innovator in product development and user experience,
                    specializing in cutting-edge software solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SpeakerLay;
