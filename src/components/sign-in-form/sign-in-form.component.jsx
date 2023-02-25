import { useState, useContext } from "react";
import { UserContext, UserProvider } from "../../context/user.context";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocument,
  signInUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.component.scss";

const defaultFormFields = {
  email: "",
  password: "",
};
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  let { setCurrentUser } = useContext(UserContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetForm = () => {
    setFormFields(defaultFormFields);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let { user } = await signInUserWithEmailAndPassword(email, password);
      setCurrentUser(user);
      resetForm();
    } catch (e) {
      if (e.code === "auth/wrong-password") {
        alert("Invalid Password");
      }
      if (e.code === "auth/user-not-found") {
        alert("User not found");
      }
    }
  };
  return (
    <div className="sign-up-container">
      <h2>Already have a account?</h2>
      <h1>Sign in to your account</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button buttonType={"google"} type="button">
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
