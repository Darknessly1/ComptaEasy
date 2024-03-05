import Navbar from './NavCom/Navbar';
import Footer  from './NavCom/footer';
import About from './Pages/About';
import './Styles/Style.css'
import Welcome from './Pages/Welcome';

function App() {
  return (
    <>
      <div className="bg-inherit text-white min-h-screen">
        <Navbar />
        <Footer />
      </div>
    </>
  );
}

export default App;
