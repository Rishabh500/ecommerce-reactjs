import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocument,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-up.component.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

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
      let { user } = await createAuthUserWithEmailAndPassword(email, password);

      await createUserDocument(user, { displayName });
      resetForm();
    } catch (e) {
      if (e.code === "auth/email-already-in-use") {
        alert("Email Already in Use");
      }
    }
  };
  return (
    <div className="sign-up-container">
      <h2>Don't have a account?</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

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

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
