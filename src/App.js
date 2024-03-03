
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
				<Route path="/edau-farm-admin" element={<Dashboard/>} />
				<Route path="/shop/product/:id" element={<Product/>}/>
				<Route path="/shop/checkout" element={<Checkout/>}/>
				<Route path="*" element={<PageNotFound/>} />
				</Routes>
			
		</Router>
	</div>
		
	);
}

export default App;
