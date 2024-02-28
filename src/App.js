
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Navbar from "./Sections/Navbar/Navbar";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import PageNotFound from "./PageNotFound";
import Home from "./Components/Home/Home";

function App() {

	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="*" element={<PageNotFound/>} />
				</Routes>
			
		</Router>
		
	);
}

export default App;
