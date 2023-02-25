import SignUpForm from "../sign-up-form/sign-up.component";
import SignInForm from "../sign-in-form/sign-in-form.component";
import "./authentication.component.styles.scss";

const Authentication = () => {
  return (
    <>
      <div className="authentication-container">
        <SignUpForm />
        <SignInForm />
      </div>
    </>
  );
};

export default Authentication;
