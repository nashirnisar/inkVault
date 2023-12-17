import "./App.css";
import { Footer, Header, ShowNotes } from "./components";
import Modal from "./components/Modal/Modal";
import paperbgd from "./assets/paper-background.jpg";

function App() {
  return (
    <div className="main">
      <Header />
      <div
        className="pt-4 pl-4"
        style={{ backgroundImage: `url(${paperbgd})` }}
      >
        <ShowNotes />
        <Modal />
      </div>
      <Footer />
    </div>
  );
}

export default App;
