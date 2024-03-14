import { Route, Routes } from 'react-router-dom';
import About from '../Pages/About';
import Welcome from '../Pages/Welcome';
import ProfilePage from '../Pages/ProfilePage';
import Home from '../Pages/News';
import Contact from '../Pages/Contact';
import Register from '../Elements/Register';
import Chart from '../Pages/Chart';
import Booking from '../Pages/Booking';
import LoginForm from '../Elements/Login';
import SignIn from '../Elements/Signin';


export default function Routing() {
    return (
        <div>
            <Routes>
              <Route path="/About" element={<About />} />
              <Route path="/Welcome" element={<Welcome />} />
              <Route path="/ProfilePage" element={<ProfilePage />} />
              <Route path="/News" element={<Home />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Chart" element={<Chart />} />
              <Route path="/Booking" element={<Booking />} />
              <Route path="/Login" element={<LoginForm />} />
              <Route path="/Signin" element={<SignIn />} />
            </Routes>
        </div>
    )
}