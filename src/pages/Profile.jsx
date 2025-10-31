
function ProfilePage() {
    return (
    <>
      <div className="container-fluid">
        <div className="row content">
            {/* <!-- Main content --> */}
            <main className="col-md-9 col-lg-10 px-md-4">
                <div className="hero-sec row rounded mt-3 p-3 align-items-center bg-light shadow-sm">
                    <div className="col-12 col-md-8 d-flex flex-column flex-md-row align-items-center mb-3 mb-md-0">
                        <img src="../../public/img/profile pic.png" className="rounded-circle mb-3 mb-md-0 me-md-3"
                        style={{ width: "120px", height: "120px", objectFit: "cover" }} />

                        <div className="text-center text-md-start">
                            <h2 className="mb-1">Eleanor Vance</h2>
                            <p className="mb-1">Community Outreach Manager</p>
                            <p className="mb-1 text-break">
                                <i className="fa-regular fa-envelope"></i>
                                eleanor.vance@connectsphere.com
                            </p>
                            <p className="mb-0">
                                <i className="fa-solid fa-phone"></i> +1 (555) 987-6543
                            </p>
                        </div>
                    </div>

                    <div className="col-12 col-md-4 text-md-end text-center">
                        <button type="button" className="btn btn-light rounded-5 px-4">
                            Edit Profile
                        </button>
                    </div>
                </div>

                <div className="row g-3">
                    <div className="col-12 col-sm-6 col-lg-4 ">
                        <div className="card-custom border rounded p-4 mt-4 h-100">
                            <div className="row mb-3">
                                <div className="col-9">
                                    <h5 className="mb-4">My Events</h5>
                                    <p className="mb-1">Annual Volunteer Summit</p>
                                    <p className="mb-0 fw-light">
                                        October 26, 2024 • 9:00 AM - 5:00 PM • Community Center
                                        Main Hall
                                    </p>
                                </div>
                                <div className="col-3 d-flex justify-content-end align-items-end">
                                    <button className="btn btn-sm btn-outline-secondary me-2">
                                        <i className="fa-regular fa-pen-to-square"></i>
                                    </button>
                                    <button className="btn btn-sm btn-outline-danger">
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                            <hr />

                            <div className="row mb-3">
                                <div className="col-9">
                                    <p className="mb-1">Neighborhood Clean-up Drive</p>
                                    <p className="mb-0 fw-light">
                                        November 10, 2024 • 10:00 AM - 2:00 PM • Riverside Park
                                    </p>
                                </div>
                                <div className="col-3 d-flex justify-content-end align-items-end">
                                    <button className="btn btn-sm btn-outline-secondary me-2">
                                        <i className="fa-regular fa-pen-to-square"></i>
                                    </button>
                                    <button className="btn btn-sm btn-outline-danger">
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                            <hr />
                            <div className="row mb-3">
                                <div className="col-9">
                                    <p className="mb-1">Workshop: Digital Literacy for Seniors</p>
                                    <p className="mb-0 fw-light">
                                        December 5, 2024 • 1:00 PM - 4:00 PM • Public Library
                                    </p>
                                </div>
                                <div className="col-3 d-flex justify-content-end align-items-end">
                                    <button className="btn btn-sm btn-outline-secondary me-2">
                                        <i className="fa-regular fa-pen-to-square"></i>
                                    </button>
                                    <button className="btn btn-sm btn-outline-danger">
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-4">
                        <div className="card-custom border rounded p-4 mt-4 h-100">
                            <div className="row mb-3">
                                <div className="col-9">
                                    <h5 className="mb-4">Registered Events</h5>
                                    <p className="mb-1">Local Charity Gala</p>
                                    <p className="mb-0 fw-light">
                                        September 15, 2024 • 7:00 PM • Grand Ballroom Hotel
                                    </p>
                                </div>
                                <div className="col-3 d-flex justify-content-end align-items-end">
                                    <button className="btn btn-sm btn-outline-secondary me-2">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                            <hr />

                            <div className="row mb-3">
                                <div className="col-9">
                                    <p className="mb-1">Sustainable Living Fair</p>
                                    <p className="mb-0 fw-light">
                                        October 1, 2024 • 11:00 AM - 6:00 PM • Exhibition Grounds
                                    </p>
                                </div>
                                <div className="col-3 d-flex justify-content-end align-items-end">
                                    <button className="btn btn-sm btn-outline-secondary me-2">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                            <hr />
                            <div className="row mb-3">
                                <div className="col-9">
                                    <p className="mb-1">Art & Culture Festival</p>
                                    <p className="mb-0 fw-light">
                                        November 22, 2024 • 10:00 AM - 7:00 PM • Downtown Arts
                                        District
                                    </p>
                                </div>
                                <div className="col-3 d-flex justify-content-end align-items-end">
                                    <button className="btn btn-sm btn-outline-secondary me-2">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card-custom border rounded p-4 mt-4 h-100">
                            <h5 className="mb-4">Volunteering Programs</h5>

                            {/* <!-- Item 1 --> */}
                            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                                <div>
                                    <p className="mb-1">Youth Mentorship Program <span className="badge rounded-pill bg-success">Active</span></p>
        
                                    <p className="mb-0 fw-light">
                                        Future Leaders for Org. • Mentor • Ongoing
                                    </p>
                                </div>

                                <div className="d-flex flex-shrink-0 mt-2 mt-md-0 py-2"> 
                                                        
                                     <button className="btn btn-sm btn-outline-danger">
                                        Withdraw
                                    </button>
                                </div>
                            </div>
                            <hr />

                            {/* <!-- Item 2 --> */}
                            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                                <div>
                                    <p className="mb-1">Animal Shelter Support <span className="badge rounded-pill bg-warning">Pending</span></p>
                                    <p className="mb-0 fw-light">
                                        Hopeful Paws • Animal Care Assistant • 6 Months
                                    </p>
                                </div>
                                <div className="d-flex flex-shrink-0 mt-2 mt-md-0 py-2">
                                    <button className="btn btn-sm btn-outline-danger">
                                        Withdraw
                                    </button>
                                </div>
                            </div>
                            <hr />

                            {/* <!-- Item 3 --> */}
                            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                                <div>
                                    <p className="mb-1">Environmental Restoration <span className="badge rounded-pill bg-secondary">Completed</span></p>
                                    <p className="mb-0 fw-light">
                                        Green Earth Foundation • Team Lead • Summer 2023
                                    </p>
                                </div>
                                <div className="d-flex flex-shrink-0 mt-2 mt-md-0 py-2">
                                    <button className="btn btn-sm btn-outline-danger">
                                        Withdraw
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>

    </>
  );
}

export default ProfilePage;
