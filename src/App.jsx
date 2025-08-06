import { Routes, Route } from 'react-router-dom'; 
import { PayPalScriptProvider } from "@paypal/react-paypal-js"; 
import "./Css/App.css"

import ScrollToTop from './Components/ScrollToTop'; 
import Header from './Components/Header';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Orders from './Pages/Orders';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout.jsx';
import New from './Pages/New';
import Men from './Pages/Men';
import Women from './Pages/Women';
import Kids from './Pages/Kids';
import Backtoschool from './Pages/Backtoschool';
import Shoes from './Pages/Shoes.jsx';
import Clothing from './Pages/Clothing.jsx';
import Accessories from './Pages/Accessories.jsx';
import Productview from './Pages/Productview';
import ProtectedRoute from './Pages/ProtectedRoute.jsx'; 
import OrderSuccess from './Pages/OrderSuccess.jsx';
import ContactUs from './Pages/Contactus.jsx';
import FAQ from './Pages/Faq.jsx';
import TrackOrder from './Pages/TrackOrder.jsx';
import FindStore from './Pages/FindStore.jsx';
import Ourpurpose from './Pages/Ourpurpose.jsx';
import MedicalTransparency from './Pages/MedicalTranceparency.jsx';
import IdeaSubmission from './Pages/IdeaSubmission.jsx';
import AccessibilityStatement from './Pages/AccessibilityStatement.jsx';
import "./Pages/Uploadproducts.jsx";
import './Pages/i18n';

function App() {
  return (
   
    <PayPalScriptProvider options={{ "client-id": "AYQvM04njqlCnB9v5lUu3uluUFg_zmwa_4ExDhw1WSxTuugHGcJLh38NtXBv-DcknoHYx-gokLO4nGP3" }}>
      <div className='App'>
        <ScrollToTop />
        <Header />
        <Navbar />


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/product/:id" element={<Productview />} />
          <Route path="/New" element={<New />} />
          <Route path="/Men" element={<Men />} />
          <Route path="/Women" element={<Women />} />
          <Route path="/Kids" element={<Kids />} />
          <Route path="/Backtoschool" element={<Backtoschool />} />
          <Route path="/Shoes" element={<Shoes />} />
          <Route path="/Accessories" element={<Accessories />} />
          <Route path="/Clothing" element={<Clothing />} />
          <Route path="/ProtecedRoute" element={<ProtectedRoute />} />
          <Route path="/OrderSuccess" element={<OrderSuccess />} />
          <Route path="/Contactus" element={<ContactUs />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/TrackOrder" element={<TrackOrder />} />
          <Route path="/FindStore" element={<FindStore />} />
          <Route path="/Ourporpose" element={<Ourpurpose />} />
          <Route path="/MedicalTranceparency" element={<MedicalTransparency />} />
          <Route path="/IdeaSubmission" element={<IdeaSubmission />} />
          <Route path="/AccessibilityStatement" element={<AccessibilityStatement />} />
        </Routes>

        <Footer />
      </div>
    </PayPalScriptProvider>
  );
}

export default App;
