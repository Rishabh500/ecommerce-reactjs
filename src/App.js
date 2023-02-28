import "./App.css";
import "./categories.styles.scss";
import Home from "./routes/home/home.component";
import { Route, Routes } from "react-router-dom";

import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./components/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { useEffect, useState } from "react";
import {
  createUserDocument,
  onAuthStateChangedListner,
} from "./utils/firebase/firebase.utils";
import { setCurrentUser } from "./store/user/user-action";
import { useDispatch } from "react-redux";

const App = () => {
  // const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListner((user) => {
      if (user) {
        createUserDocument(user);
      }
      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/shop/*" element={<Shop />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
