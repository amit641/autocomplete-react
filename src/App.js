import logo from "./logo.svg";
import "./App.css";
import Autocomplete from "./components/Autocomplete";
const SUGGESTIONS = [
  "Apple",
  "Orange",
  "Amit",
  "Aakash",
  "Open",
  "Original",
  "Customer",
  "Custured",
  "Cute",
  "Hello",
  "Hola",
  "Hi",
];

function App() {
  return (
    <div className="App">
      <Autocomplete suggestions={SUGGESTIONS} />
    </div>
  );
}

export default App;
