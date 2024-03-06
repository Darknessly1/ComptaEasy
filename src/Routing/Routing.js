import { Route, Routes } from 'react-router-dom';
import About from '../Pages/About';
import Welcome from '../Pages/Welcome';
import ProfilePage from '../Pages/ProfilePage';
import Home from '../Pages/Home';


export default function Routing() {
    return (
        <div>
            <Routes>
              <Route path="/About" element={<About />} />
              <Route path="/Welcome" element={<Welcome />} />
              <Route path="/ProfilePage" element={<ProfilePage />} />
              <Route path="/Home" element={<Home />} />
            </Routes>
        </div>
    )
}