// import React, { useContext, useEffect } from "react";
// import { Routes, Route, Link, useNavigate } from "react-router-dom";
// import Login from "../Login";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { Context } from "../..";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import "./AppRouter.css";
// import Messanger from "../Messanger";

// const AppRouter = () => {
//   const { auth } = useContext(Context);
//   let [user] = useAuthState(auth);
//   const navigate = useNavigate();

//   const login = async () => {
//     const provider = new GoogleAuthProvider();
//     user = await signInWithPopup(auth, provider);
//   };

//   useEffect(() => {
//     if (user) {
//       navigate("/chat");
//     }
//   }, [user]);

//   return user ? (
//     <>
//       <div className="navbar-container">
//         <Link to="/login">
//           <button className="navbar-button" onClick={() => auth.signOut()}>
//             Log Out
//           </button>
//         </Link>
//       </div>

//       <Routes>
//         <Route path={"/"} element={<Messanger />}></Route>
//         <Route path={"/chat"} element={<Messanger />} />
//       </Routes>
//     </>
//   ) : (
//     <>
//       <div className="navbar-container">
//         <button className="navbar-button" onClick={login}>
//           Login to the app with Google
//         </button>
//       </div>

//       <Routes>
//         <Route path={"/"} element={<Login />}></Route>
//         <Route path={"/login"} element={<Login />}></Route>
//       </Routes>
//     </>
//   );
// };

// export default AppRouter;
