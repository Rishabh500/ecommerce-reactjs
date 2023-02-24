import {
    auth,
  signInWithGooglePopup,
  createUserDocument,
  signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils";

import { useEffect } from "react";
import { getRedirectResult } from "@firebase/auth";
import SignUpForm from "../../components/sign-up/sign-up.component";
import SignInForm from "../../components/sign-in-form/sign-in.component";

const SignIn = () => {
  

  const logGoogleuser = async () => {
    const { user } = await signInWithGooglePopup();
    console.log(user);
    createUserDocument(user);
  };


  return (
    <>
      
      <br />
      <button onClick={logGoogleuser}>Sign In With Google</button>
   <div style={{'display':'flex'}}>
   <SignUpForm />
   </div>
      
    </>
  );
};

export default SignIn;
