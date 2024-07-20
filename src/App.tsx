import LineChart from "./components/LineChart";
import { CANVAS_DIMENSIONS } from "./utils/constants";

function App(): JSX.Element {
  return (
    <div>
      <h1>Pixel Demo Alpha-Release</h1>
      <LineChart
        canvasHeight={CANVAS_DIMENSIONS.standardWeb2Column.height}
        canvasWidth={CANVAS_DIMENSIONS.standardWeb2Column.width}
        margin={{ top: 64, right: 32, bottom: 42, left: 18 }}
        footerText="Source: John's dream"
        series={[
          {
            data: [1.8, 1.1, 1.1, 1.1, 1.1, 3.2],
            color: "#379A8B",
            label: "John",
            strokeWidth: 4,
          },
          {
            data: [1.1, 1.1, 1.1, 1.1, 1.8, 0.9],
            color: "#006BA2",
            label: "Jane",
            strokeWidth: 2,
          },
        ]}
        xAxis={{
          type: "date",
          data: ["2020", "2021", "2022", "2023", "2024", "2025"],
        }}
        title="John's grit & determination pay off after 5 years"
        subtitle="Bonus (months)"
        primaryAccentColor="#379A8B"
      />
      <LineChart
        canvasHeight={CANVAS_DIMENSIONS.standardWeb1Column.height}
        canvasWidth={CANVAS_DIMENSIONS.standardWeb1Column.width}
        margin={{ top: 64, right: 32, bottom: 42, left: 18 }}
        footerText="Source: John's dream"
        series={[
          {
            data: [1.8, 1.1, 1.1, 1.1, 1.1, 3.2],
            color: "#379A8B",
            label: "John",
            strokeWidth: 4,
          },
          {
            data: [1.1, 1.1, 1.1, 1.1, 1.8, 0.9],
            color: "#006BA2",
            label: "Jane",
            strokeWidth: 2,
          },
        ]}
        xAxis={{
          type: "date",
          data: ["2020", "2021", "2022", "2023", "2024", "2025"],
        }}
        title="John's performance grind"
        subtitle="Bonus (months)"
        primaryAccentColor="#379A8B"
      />
    </div>
  );
}

export default App;
