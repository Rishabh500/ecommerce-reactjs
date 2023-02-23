import "./App.css";
import "./categories.styles.scss";
import Home from "./routes/home/home.component";
import { Outlet, Route, Routes } from "react-router-dom";

import Navigation from "./routes/navigation/navigation.component";
import SignIn from "./routes/sign-in/sign-in.component";

const Shop = () =>{
  return <h1>Shop</h1>
}


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route  index element={<Home />}/>
        <Route path="/shop" element={<Shop />}/>
        <Route path="/sign-in" element={<SignIn />}/>

      </Route>
    </Routes>
  );
};

export default App;