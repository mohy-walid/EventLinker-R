function EventDetails(){
    return (
        <>
        <section className="hero-section d-flex align-items-center justify-content-center text-center">
    <div className="overlay"></div>
    <div className="content text-white">
      <h1 className="fw-bold">Annual Tech Summit 2024</h1>
    </div>
  </section>

  {/* <!--Learn section--> */}
  <section className="py-5 " data-aos="fade-right" data-aos-delay="200">
    <div className="container">
      <div className="row align-items-stretch justify-content-center ">
        {/* <!-- (Event Info) --> */}
        <div className="col-md-4 mb-4 animate-fadeInUp">
          <div className="p-4 bg-white shadow rounded h-100">
            <p><i className="fa-regular fa-calendar-days" style="color: #000b58;"></i> October 26-28, 2024</p>
            <p><i className="fa-regular fa-clock" style="color: #000b58;"></i> 9:00 AM - 5:00 PM (Daily)</p>
            <p><i className="fa-solid fa-location-dot" style="color: #000b58;"></i> Convention Center, Downtown</p>
            <a href="#" className="btn btn-primary">Register Now</a>
          </div>
        </div>

        {/* <!-- (Countdown Timer) --> */}
        <div className="col-md-6 mb-4 ">
          <div className="p-4 count-s shadow rounded h-100 text-center">
            <h5>Event Starts In:</h5>
            <div id="countdown" className="d-flex justify-content-center gap-3 fs-4 fw-bold"></div>
          </div>
        </div>
      </div>
    </div>
  </section>


  {/* <!--Details--> */}
  <section className="py-5 bg-light" data-aos="fade-up" data-aos-delay="200">
  <div className="container p-4 shadow rounded bg-white">
    <h3 className="mb-3 border-start border-4 border-primary ps-3 fw-bold">About the Summit</h3>
    <p className="text-muted fs-6 lh-lg">
      The Annual Tech Summit 2024 is the premier gathering for technology enthusiasts, innovators, and industry leaders. Join us for three days of cutting-edge discussions, insightful workshops, and unparalleled networking opportunities. Discover the latest trends in AI, blockchain, cybersecurity, and sustainable technology. Our diverse speaker lineup includes visionaries from global tech giants and groundbreaking startups, ensuring a rich and inspiring experience for all attendees. This year, we focus on 'Innovation for Impact,' exploring how technology can drive positive change in society and address critical global challenges.
    </p>

    <h3 className="mt-4 mb-3 border-start border-4 border-success ps-3 fw-bold">Key Speakers & Sessions</h3>
    <p className="text-muted fs-6 lh-lg">
      Prepare to be inspired by an incredible roster of speakers, including Dr. Anya Sharma, CEO of Quantum Leap Innovations, discussing the future of quantum computing; Mr. Ben Carter, lead AI ethicist at Synapse AI, on responsible AI development; and Ms. Clara Diaz, founder of EcoTech Solutions, presenting on sustainable smart city initiatives. Sessions will cover a range of topics from advanced machine learning and data privacy to the role of technology in global health and education. Interactive Q&A sessions and panel discussions will allow for direct engagement with thought leaders, fostering a dynamic learning environment.
    </p>

    <h3 className="mt-4 mb-3 border-start border-4 border-warning ps-3 fw-bold">Networking Opportunities</h3>
    <p className="text-muted fs-6 lh-lg">
      Connect with peers, potential collaborators, and industry veterans at our dedicated networking events. The summit includes structured networking sessions, an exclusive exhibitor hall featuring leading tech companies showcasing their latest innovations, and informal meet-and-greets during breaks. Don't miss our evening gala, a perfect opportunity to build lasting professional relationships in a relaxed and engaging atmosphere. Whether you're looking for new partnerships, career opportunities, or simply to expand your professional circle, the Annual Tech Summit provides the perfect platform.
    </p>

    <h3 className="mt-4 mb-3 border-start border-4 border-danger ps-3 fw-bold">Who Should Attend?</h3>
    <p className="text-muted fs-6 lh-lg">
      This summit is designed for software developers, data scientists, IT professionals, startup founders, entrepreneurs, researchers, students, and anyone with a passion for technology and its impact on the world. Whether you are a seasoned expert or just starting your journey in the tech industry, you will find valuable insights, practical knowledge, and a community that shares your enthusiasm for innovation.
    </p>
  </div>
</section>


  {/* <!--Speakers--> */}
 <section className="py-5">
  <div className="container">
    <h3 className="mb-4 text-center text-sp" data-aos="zoom-in" data-aos-delay="200">Our Speakers</h3>

    <div className="row flex-nowrap overflow-auto g-4 pb-3">
      
      <div className="col-10 col-sm-6 col-md-3 d-flex">
        <div className="card text-center shadow-sm h-100 " data-aos="zoom-in" data-aos-delay="100">
          <img src="./../details-img/Selectionn.png" className="card-img-top rounded-circle p-3" alt="Speaker 1"/>
          <div className="card-body d-flex flex-column">
            <h4 className="card-title">Dr. Anya Sharma</h4>
            <p className="text-primary fs-5">CEO, Quantum Leap Innovations</p>
            <p className="flex-grow-1">Renowned expert in neural networks and machine learning, driving innovation in AI-powered solutions.</p>
          </div>
        </div>
      </div>

      <div className="col-10 col-sm-6 col-md-3 d-flex">
        <div className="card text-center shadow-sm h-100" data-aos="zoom-in" data-aos-delay="200">
          <img src="./../details-img/Selection (1).png" className="card-img-top rounded-circle p-3" alt="Speaker 2"/>
          <div className="card-body d-flex flex-column">
            <h4 className="card-title">Prof. Ben Carter</h4>
            <p className="text-primary fs-5">Lead Researcher, Global Innovations</p>
            <p className="flex-grow-1">Pioneer in sustainable technology and quantum mechanics, advocating for eco-friendly tech advancements.</p>
          </div>
        </div>
      </div>

      <div className="col-10 col-sm-6 col-md-3 d-flex">
        <div className="card text-center shadow-sm h-100" data-aos="zoom-in" data-aos-delay="300">
          <img src="./../details-img/Selection (2).png" className="card-img-top rounded-circle p-3" alt="Speaker 3"/>
          <div className="card-body d-flex flex-column">
            <h4 className="card-title">Sarah Jenson</h4>
            <p className="text-primary fs-5">CEO, InnovateX</p>
            <p className="flex-grow-1">Innovator in product development and user experience, specializing in cutting-edge software solutions.</p>
          </div>
        </div>
      </div>

      <div className="col-10 col-sm-6 col-md-3 d-flex">
        <div className="card text-center shadow-sm h-100" data-aos="zoom-in" data-aos-delay="400">
          <img src="./../details-img/Selection (3).png" alt="Speaker 4" className="card-img-top rounded-circle p-3"/>
          <div className="card-body d-flex flex-column">
            <h4 className="card-title">Michael Chen</h4>
            <p className="text-primary fs-5">Head of Product, FutureLink</p>
            <p className="flex-grow-1">Innovator in product development and user experience, specializing in cutting-edge software solutions.</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

        </>
    )
}

export default EventDetails