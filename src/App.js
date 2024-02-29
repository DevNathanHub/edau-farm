
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
import Shop from "./Components/Shop/Shop";

function App() {

	return (
	 <div className="App">
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/shop" element={<Shop/>} />

				<Route path="*" element={<PageNotFound/>} />
				</Routes>
			
		</Router>
	</div>
		
	);
}

export default App;
