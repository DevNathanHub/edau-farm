
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Navbar from "./Sections/Navbar/Navbar";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import PageNotFound from "./NotFound/PageNotFound";
import Home from "./Components/Home/Home";
import Shop from "./Components/Shop/Shop";
import Product from "./Components/Shop/Product";
import Checkout from "./Components/Shop/Checkout";
import Login from "./Auth/Login/Login";
import Signup from "./Auth/Signup/Signup";
import Dashboard from "./Admin/Dashboard/Dashboard";
import Contact from "./Components/Contact/Contact";
import FAQ from "./Components/FAQ/FAQ";
import AboutUs from "./Components/AboutUs/AboutUs";
import Success from "./Components/Success/success";

function App() {

	return (
	 <div className="App">
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/auth/login" element={<Login/>} />
				<Route path="/auth/signup" element={<Signup/>} />
				<Route path="/shop" element={<Shop/>} /> 
				<Route path="/success" element={<Success/>} /> 

				<Route path="/edau-farm-admin" element={<Dashboard/>} />
				<Route path="/shop/product/:id" element={<Product/>}/>
				<Route path="/shop/checkout" element={<Checkout/>}/>
				<Route path="/contact" element={<Contact/>} /> 
				<Route path="/faq" element={<FAQ/>} /> 
				<Route path="/about" element={<AboutUs/>} /> 

				<Route path="*" element={<PageNotFound/>} />
				</Routes>
			
		</Router>
	</div>
		
	);
}

export default App;
