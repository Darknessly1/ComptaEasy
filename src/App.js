import Navbar from './NavCom/Navbar';
import Footer  from './NavCom/footer';
import './Styles/Style.css'

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
