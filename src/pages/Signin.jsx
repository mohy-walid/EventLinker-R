import ThreeBackground from "../components/ThreeBackground";
import LogLayout from "../Layouts/Log";

function LoginPage() {
  return (
    <>
      <ThreeBackground />
      <div className="log">
        <div className="log-box">
          <div className="log-head">
            Event<span>Linker</span>
            <p className="text-primary fs-5">Welcome back!</p>
          </div>
          <div className="log-body">
            <h2 className="form-title">Sign <span>In</span></h2>
            <LogLayout />
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;