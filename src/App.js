import "./App.css";
import "./sass/index.css"
import Add from "./components/Add";
import EnhancedTable from "./components/EnhancedTable";
import { handleRead } from "./services/fire_functions";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    handleRead()
  });

  return (
    <div className="App">
      <Add />
      <EnhancedTable />
    </div>
  );
}

export default App;
