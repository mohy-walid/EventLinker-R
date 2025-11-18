import ThreeBackground from "../components/ThreeBackground";
import SignupLayout from "../Layouts/SignupLay";

function SignupPage() {
  return (
    <>
      <ThreeBackground />
      <div className="sign">
        <div className="sign-box">
          <div className="sign-head">
            Event<span>Linker</span>
            <p className="text-primary fs-5">Create your account</p>
          </div>
          <div className="sign-body">
            <h2 className="form-title-signup">Sign <span>Up</span></h2>
            <SignupLayout/>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupPage;