import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import ForceDirectedGraph from "./components/ForceDirectedGraph";
import { CANVAS_DIMENSIONS } from "./utils/constants";

function App(): JSX.Element {
  return (
    <div>
      <h1>Pixel Demo Alpha-Release</h1>
      <ForceDirectedGraph />
    </div>
  );
}

export default App;
