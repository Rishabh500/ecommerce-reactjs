import {
    auth,
  signInWithGooglePopup,
  createUserDocument,
  signInWithGoogleRedirect,  
} from "../../utils/firebase/firebase.utils";

import { useEffect } from "react";
import { getRedirectResult } from "@firebase/auth";
import SignUpForm from "../sign-up/sign-up.component";
import SignInForm from "../sign-in-form/sign-in-form.component";
import "./authentication.component.styles.scss";

const Authentication = () => {


  const logGoogleuser = async () => {
    const { user } = await signInWithGooglePopup();
    console.log(user);
    createUserDocument(user);
  };


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
