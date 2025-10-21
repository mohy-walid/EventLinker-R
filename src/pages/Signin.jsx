import ThreeBackground from "../components/ThreeBackground";
import LogLayout from "../layout/Log";

function LoginPage() {
  return (
    <>
      <ThreeBackground />
      <div className="log">
        <div className="log-box">
          <div className="log-head">Event<span>Linker</span>
          <p className="text-white fs-5">Welcome back!</p>
          </div>
          <div className="log-body">
            <LogLayout />
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
