import { Route, Routes } from 'react-router-dom';
import About from '../Pages/About';
import Welcome from '../Pages/Welcome';


export default function Routing() {
    return (
        <div>
            <Routes>
              <Route path="/About" element={<About />} />
              <Route path="/Welcome" element={<Welcome />} />
            </Routes>
        </div>
    )
}