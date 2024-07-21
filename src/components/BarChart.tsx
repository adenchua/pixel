import * as d3 from "d3";
import { useEffect, useRef } from "react";

import { ChartMargin, Series, XAxis } from "../interfaces/charts";
import {
  addFooterText,
  addStylingBlock,
  addSubtitle,
  addTitle,
  getMinMaxValues,
} from "../utils/chartHelpers";

interface BarChartProps {
  canvasHeight: number;
  canvasWidth: number;
  margin: ChartMargin;
  title: string;
  subtitle: string;
  footerText: string;
  series: Series[];
  xAxis: XAxis;
  canvasBackgroundColor?: string;
  primaryAccentColor?: string;
}

interface DataPoint {
  x: string;
  y: number;
}

function BarChart(props: BarChartProps): JSX.Element {
  const {
    canvasHeight,
    canvasWidth,
    margin,
    title,
    subtitle,
    footerText,
    series,
    xAxis,
    canvasBackgroundColor = "#EBE9E0",
    primaryAccentColor = "#E3120B",
  } = props;
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
      .style("background-color", canvasBackgroundColor)
      .style("border-top", `1px solid ${primaryAccentColor}`)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleBand().domain(xAxis.data).range([0, chartWidth]).padding(0.3);

    const { min: yMin, max: yMax } = getMinMaxValues(series);
    const yScale = d3.scaleLinear().domain([yMin, yMax]).range([chartHeight, 0]);

    // add grid lines
    svgCanvas
      .append("g")
      .attr("class", "grid")
      .attr("stroke", "red")
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(-chartWidth)
          .tickFormat(() => ""),
      );

    series.forEach((eachSeries) => {
      const { data, color = primaryAccentColor } = eachSeries;

      const transformedData: DataPoint[] = data.map((dataPoint, index) => {
        return {
          x: xAxis.data[index],
          y: dataPoint ?? 0,
        };
      });

      // add bars
      svgCanvas
        .selectAll(".bar")
        .data(transformedData)
        .enter()
        .append("rect")
        .attr("fill", color)
        .attr("x", (d) => xScale(d.x) as unknown as string)
        .attr("width", xScale.bandwidth())
        .attr("y", (d) => yScale(d.y))
        .attr("height", (d) => chartHeight - yScale(d.y));
    });

    // add x-axis
    svgCanvas
      .append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .style("font-size", 14)
      .call(d3.axisBottom(xScale));

    // add y-Axis
    svgCanvas
      .append("g")
      .attr("transform", `translate(${chartWidth + margin.right},-6)`)
      .style("font-size", 14)
      .call(d3.axisLeft(yScale))
      .selectAll("path,line")
      .remove();

    // add styling block
    addStylingBlock(svgCanvas, margin.top, primaryAccentColor);

    // add title
    addTitle(svgCanvas, margin.top, title);

    // add sub-title
    addSubtitle(svgCanvas, margin.top, subtitle);

    // add footer text
    addFooterText(svgCanvas, chartHeight, margin.bottom, footerText);
  }

  useEffect(() => {
    buildChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={canvasRef} />;
}

export default BarChart;
