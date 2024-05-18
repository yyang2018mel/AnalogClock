import "./App.css";
import ClockCombo from "./clock/ClockCombo";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ClockCombo clockSize={300} />
      </header>
    </div>
  );
}

export default App;
