
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css";
import Navbar from "./Sections/Navbar/Navbar";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import Home from "./pages/LandingPage/home";
import About from "./pages/AboutUs/about";
import AnnualReport from "./pages/AnnualReport/annual";
import Teams from "./pages/CommunityTeam/team";
import Blogs from "./pages/Blogs/blogs";
import SignUp from "./components/Signup/Signup";
import Enroll from "./components/Enroll/Enroll";
import Login from "./components/Login/Login";
import Success from "./components/Success/success";
import Logout from "./components/Logout/Logout";
import Footer from "./Sections/Footer/footer";
import Contact from "./pages/ContactUs/contact";

function App() {
	
  
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				
				<Route
					path="/annual"
					element={<AnnualReport />}
				/>
				<Route path="/team" element={<Teams />} />
				<Route path="/blogs" element={<Blogs />} />
				<Route
					path="/enroll"
					element={<Enroll />}
				/>
				<Route
					path="/sign-up"
					element={<SignUp />}
				/>
        		<Route
					path="/log-in"
					element={<Login />}
				/>
				<Route
					path="/logout"
					element={<Logout/>}
				/>
       			<Route
					path="/success"
					element={<Success />}
				/>
				<Route
					path="/contact"
					element={<Contact/>}
				/>
				
				</Routes>
			<Footer/>
			
		</Router>
		
	);
}

export default App;
