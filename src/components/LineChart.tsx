import * as d3 from "d3";
import { useEffect, useRef } from "react";

import { ChartMargin, Series, XAxis } from "../interfaces/charts";
import { getMinDataPoint, getMaxDataPoint } from "../utils/chartHelpers";

interface LineChartProps {
  canvasHeight: number;
  canvasWidth: number;
  title: string;
  subtitle: string;
  margin: ChartMargin;
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

function LineChart(props: LineChartProps): JSX.Element {
  const {
    canvasHeight,
    canvasWidth,
    footerText,
    margin,
    series,
    subtitle,
    title,
    xAxis,
    canvasBackgroundColor = "#EBE9E0",
    primaryAccentColor = "#E3120B",
  } = props;
  const canvasRef = useRef(null);

  function getMinMaxValues(): { min: number; max: number } {
    let min = 0;
    let max = 0;

    series.forEach((eachSeries) => {
      const { data } = eachSeries;
      max = Math.max(max, getMaxDataPoint(data) || 0);
      min = Math.min(min, getMinDataPoint(data) || 0);
    });

    return { min, max };
  }

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

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(xAxis.data, (d) => new Date(+d, 0, 1)) as [Date, Date])
      .range([0, chartWidth]);

    const { min: yMin, max: yMax } = getMinMaxValues();
    const yScale = d3.scaleLinear().domain([yMin, yMax]).range([chartHeight, 0]);

    const lineGenerator = d3
      .line<DataPoint>()
      .x((d) => xScale(new Date(+d.x, 0, 1)))
      .y((d) => yScale(d.y));

    // add styling block
    svgCanvas
      .append("rect")
      .attr("x", 0)
      .attr("y", 0 - margin.top)
      .attr("width", 30)
      .attr("height", 10)
      .attr("fill", primaryAccentColor);

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
      const {
        data,
        label,
        color,
        strokeWidth = 1,
        labelYOffset = 0,
        labelXOffset = 0,
      } = eachSeries;
      const transformedData: DataPoint[] = data.map((dataPoint, index) => {
        return {
          x: xAxis.data[index],
          y: dataPoint ?? 0,
        };
      });

      // add line
      svgCanvas
        .append("path")
        .attr("d", lineGenerator(transformedData))
        .attr("class", "line")
        .attr("stroke", color)
        .attr("stroke-width", strokeWidth)
        .attr("fill", "none");

      // add label to line
      svgCanvas
        .append("text")
        .attr(
          "transform",
          // eslint-disable-next-line @stylistic/max-len
          `translate(${chartWidth - margin.right + labelXOffset},${yScale(transformedData[transformedData.length - 1].y) + labelYOffset})`,
        )
        .attr("text-anchor", "start")
        .style("font-size", "12px")
        .style("fill", color)
        .text(label);
    });

    // add x-axis
    svgCanvas
      .append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .style("font-size", 14)
      .call(
        d3
          .axisBottom(xScale)
          .ticks(xAxis.data.length)
          .tickFormat((d, index) => {
            const date = new Date(String(d));
            const year = date.getFullYear();

            // first axis year or a whole millennium
            if (index === 0 || year % 1000 === 0) {
              return year.toString();
            }

            return year.toString().slice(2, 4);
          }),
      );

    // add y-axis
    svgCanvas
      .append("g")
      .attr("transform", `translate(${chartWidth + margin.right},-6)`)
      .style("font-size", 14)
      .call(d3.axisLeft(yScale))
      .selectAll("path,line")
      .remove();

    // add title
    svgCanvas
      .append("text")
      .attr("class", "title")
      .attr("y", 0 - margin.top / 2)
      .attr("text-anchor", "start")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text(title);

    // add sub-title
    svgCanvas
      .append("text")
      .attr("class", "subtitle")
      .attr("y", 0 - margin.top / 8)
      .attr("text-anchor", "left")
      .style("font-size", "14px")
      .text(subtitle);

    // add footer text
    svgCanvas
      .append("text")
      .attr("class", "footer")
      .attr("y", chartHeight + margin.top + margin.bottom - 72)
      .attr("text-anchor", "left")
      .style("font-size", "10px")
      .attr("fill", "#333333")
      .text(footerText);
  }

  useEffect(() => {
    buildChart();
  }, []);

  return <div ref={canvasRef} />;
}

export default LineChart;
