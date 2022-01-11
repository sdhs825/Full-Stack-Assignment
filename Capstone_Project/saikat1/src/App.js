import {Routes, Route,} from "react-router-dom";
import Auth from "./Components/Auth/auth.js";
import Calendar from "./Components/Calendar/calendar.js";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route exact path="/auth" element={<Auth />} />
        <Route exact path="/calendar" element={<Calendar />} />
      </Routes>
    </div>
  );
}

export default App;
