import { createContext, useState, useEffect} from "react";
import { onAuthStateChangedListner } from "../utils/firebase/firebase.utils";

//It is the actual value that we want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

// User Provider is the actual component that we need 
// It will wrap around the component that we need context to access to.
export const UserProvider= ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};
   
    useEffect(()=>{
        const unsubscribe = onAuthStateChangedListner((res)=>{
            console.log('State Changed',res);
        });

        return unsubscribe;
    },[]);
    // Now this current user value will be available to all the components
    //of the child.
    return <UserContext.Provider value={value}> {children} </UserContext.Provider>

}