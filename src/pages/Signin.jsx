import LogLayout from "../layout/Log"

function LoginPage(){
    return(
        <>
        <div className="log">
            <div className="log-head">EventLinker</div>
            <div className="log-body">
                <LogLayout/>
            </div>
        </div>
        </>
    )
}

export default LoginPage