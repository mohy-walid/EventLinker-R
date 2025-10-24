import ThreeBackground from "../components/ThreeBackground";
import SignupLayout from "../layout/signupLay";

function SignupPage() {
  return (
    <>
      <ThreeBackground />
      <div className="sign">
        <div className="sign-box">
          <div className="sign-head">
            Event<span>Linker</span>
            <p className="text-primary fs-6">Join your events journey.</p>
          </div>
          <div className="sign-body">
            <SignupLayout />
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
