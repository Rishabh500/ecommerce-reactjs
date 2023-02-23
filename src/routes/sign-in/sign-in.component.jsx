import {
  signInWithGooglePopup,
  createUserDocument,
} from "../../utils/firebase/firebase.utils";



const SignIn = () => {
  const logGoogleuser = async () => {
    const {user} = await signInWithGooglePopup();
    console.log(user);
    createUserDocument(user);
  };

  return (
    <>
      Sign in
      <br />
      <button onClick={logGoogleuser}>Sign In With Google</button>
    </>
  );
};

export default SignIn;
