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

interface LineChartTimeSeriesProps {
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
  x: Date;
  y: number;
}

function LineChartTimeSeries(props: LineChartTimeSeriesProps): JSX.Element {
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
      .scaleUtc()
      .domain(d3.extent(xAxis.data, (d) => new Date(d)) as [Date, Date])
      .range([0, chartWidth]);

    const { min: yMin, max: yMax } = getMinMaxValues(series);
    const yScale = d3.scaleLinear().domain([yMin, yMax]).range([chartHeight, 0]);

    const lineGenerator = d3
      .line<DataPoint>()
      .x((d) => xScale(new Date(d.x)))
      .y((d) => yScale(d.y));

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
      const parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%SZ");
      const transformedData: DataPoint[] = data.map((dataPoint, index) => {
        return {
          x: parseTime(xAxis.data[index]) || new Date(),
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
      .call(d3.axisBottom(xScale).ticks(xAxis.data.length));

    // add y-axis
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

export default LineChartTimeSeries;
