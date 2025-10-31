function ProfileCard({title , num}){
    return(
        <>
        <div className="col-md-4">
              <div className="card shadow-sm p-3">
                <h6>{title}</h6>
                <h4>{num}</h4>
              </div>
            </div>
        </>
    )
}

export default ProfileCard