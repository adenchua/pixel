import * as d3 from "d3";
import _ from "lodash";
import { Series } from "../interfaces/charts";

function getMaxDataPoint(arr: Array<number | undefined>): number | undefined {
  const arrayCopy = [...arr];
  const filteredArray = arrayCopy.filter((value) => value !== undefined);

  return _.max(filteredArray);
}

function getMinDataPoint(arr: Array<number | undefined>): number | undefined {
  const arrayCopy = [...arr];
  const filteredArray = arrayCopy.filter((value) => value !== undefined);

  return _.min(filteredArray);
}

export function getMinMaxValues(series: Series[]): { min: number; max: number } {
  const dataValues = series
    .map((eachSeries) => eachSeries.data)
    .reduce((accumulator, current) => {
      return accumulator.concat(current);
    }, []);
  const min = getMinDataPoint(dataValues) ?? -Infinity;
  const max = getMaxDataPoint(dataValues) ?? Infinity;

  return { min, max };
}

export function addStylingBlock(
  d3Selection: d3.Selection<SVGGElement, unknown, null, undefined>,
  marginTop: number,
  color: string,
): d3.Selection<SVGRectElement, unknown, null, undefined> {
  return d3Selection
    .append("rect")
    .attr("x", 0)
    .attr("y", 0 - marginTop)
    .attr("width", 30)
    .attr("height", 10)
    .attr("fill", color);
}

export function addTitle(
  d3Selection: d3.Selection<SVGGElement, unknown, null, undefined>,
  marginTop: number,
  title: string,
): d3.Selection<SVGTextElement, unknown, null, undefined> {
  return d3Selection
    .append("text")
    .attr("class", "title")
    .attr("y", 0 - marginTop + 30)
    .attr("text-anchor", "start")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text(title);
}

export function addSubtitle(
  d3Selection: d3.Selection<SVGGElement, unknown, null, undefined>,
  marginTop: number,
  subtitle: string,
): d3.Selection<SVGTextElement, unknown, null, undefined> {
  return d3Selection
    .append("text")
    .attr("class", "subtitle")
    .attr("y", 0 - marginTop + 48)
    .attr("text-anchor", "start")
    .style("font-size", "14px")
    .text(subtitle);
}

export function addFooterText(
  d3Selection: d3.Selection<SVGGElement, unknown, null, undefined>,
  chartHeight: number,
  marginBottom: number,
  footerText: string,
): d3.Selection<SVGTextElement, unknown, null, undefined> {
  return d3Selection
    .append("text")
    .attr("class", "footer")
    .attr("y", chartHeight + marginBottom - 12)
    .attr("text-anchor", "start")
    .style("font-size", "10px")
    .attr("fill", "#333333")
    .text(footerText);
}
