import { Route, Routes } from 'react-router-dom';
import About from '../Pages/About';
import Welcome from '../Pages/Welcome';
import ProfilePage from '../Pages/ProfilePage';
import Home from '../Pages/News';
import Contact from '../Pages/Contact';
import Booking from '../Pages/Booking';
import LoginForm from '../Elements/Login';
import SignIn from '../Elements/Signin';
import Calc from '../Pages/Calc';



export default function Routing() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/About" element={<About />} />
                <Route path="/ProfilePage" element={<ProfilePage />} />
                <Route path="/News" element={<Home />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/Booking" element={<Booking />} />
                <Route path="/Login" element={<LoginForm />} />
                <Route path="/Signin" element={<SignIn />} />
                <Route path="/Calc" element={<Calc />} /> 
            </Routes>
        </div>
    )
}