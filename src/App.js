import Navbar from './NavCom/Navbar';
import Footer  from './NavCom/footer';
import About from './Pages/About';
import './Styles/Style.css'

function App() {
  return (
    <>
      <div className="bg-inherit text-white min-h-screen">
        <Navbar />
        <About />
        <Footer />
      </div>
    </>
  );
}

export default App;
