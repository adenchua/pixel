import * as d3 from "d3";
import { useRef, useEffect } from "react";

const canvasHeight = 800;
const canvasWidth = 1600;
const margin = { top: 10, left: 10, right: 10, bottom: 10 };

const graph = {
  nodes: [
    {
      name: "Alice",
      age: 34,
      group: 1,
    },
    {
      name: "Bob",
      age: 24,
      group: 1,
    },
    {
      name: "Chen",
      age: 14,
      group: 1,
    },
    {
      name: "Ethan",
      age: 44,
      group: 1,
    },
    {
      name: "George",
      age: 21,
      group: 1,
    },
    {
      name: "Fang",
      age: 56,
      group: 1,
    },
    {
      name: "Hanks",
      age: 28,
      group: 1,
    },
    {
      name: "Jeremy",
      age: 19,
      group: 2,
    },
    {
      name: "Kelvin",
      age: 31,
      group: 2,
    },
    {
      name: "Lorain",
      age: 55,
      group: 2,
    },
  ],
  links: [
    {
      source: "Alice",
      target: "Bob",
    },
    {
      source: "Chen",
      target: "Bob",
    },
    {
      source: "Ethan",
      target: "Bob",
    },
    {
      source: "Fang",
      target: "Bob",
    },
    {
      source: "Hanks",
      target: "Bob",
    },
    {
      source: "Bob",
      target: "Chen",
    },
    {
      source: "Chen",
      target: "Ethan",
    },
    {
      source: "Fang",
      target: "Hanks",
    },
    {
      source: "Lorain",
      target: "Kelvin",
    },
  ],
};

function ForceDirectedGraph(): JSX.Element {
  const canvasRef = useRef(null);

  function buildChart(): void {
    const chartWidth = canvasWidth - margin.left - margin.right;
    const chartHeight = canvasHeight - margin.top - margin.bottom;

    const svgCanvas = d3
      .select(canvasRef.current)
      .append("svg")
      .attr("width", canvasWidth)
      .attr("height", canvasHeight)
      .style("font-family", "sans-serif")
      .style("background-color", "#EBE9E0")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // link
    const link = svgCanvas
      .append("g")
      .selectAll("line")
      .data(graph.links)
      .enter()
      .append("line")
      .attr("stroke-width", 3)
      .style("stroke", "salmon");

    // node
    const node = svgCanvas
      .append("g")
      .selectAll("circle")
      .data(graph.nodes)
      .enter()
      .append("circle")
      .attr("r", (d) => d.age)
      .on("click", (event, data) => console.log("clicked", data.name))
      .attr("fill", "orange")
      .call(d3.drag().on("start", dragStarted).on("drag", dragged).on("end", dragEnded));

    function ticked(): void {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    }

    const simulation = d3
      .forceSimulation(graph.nodes)
      .force(
        "link",
        d3
          .forceLink()
          .id((d) => d.name)
          .links(graph.links)
          .distance(110),
      )
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(chartWidth / 2, chartHeight / 2))
      .force("collide", d3.forceCollide(100).strength(0.3))
      .on("tick", ticked);

    function dragStarted(event, d) {
      simulation.alphaTarget(0.3).restart();
      d.fx = event.x;
      d.fy = event.y;
    }
    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragEnded(d) {
      simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }

  useEffect(() => {
    buildChart();
  }, []);

  return <div ref={canvasRef} />;
}

export default ForceDirectedGraph;
