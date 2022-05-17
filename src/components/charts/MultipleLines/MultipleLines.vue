<template>
  <div id="multipleLines-chart"></div>
</template>
<script>
import * as d3 from 'd3';

export default {
  data() {
    return {
      margin: { top: 20, bottom: 30, left: 50, right: 20, },
      svg: undefined,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      xScale: 0,
      yScale: 0,
      data: [
        { date: '1-May-12', close: 68.13, open: 34.12, },
        { date: '30-Apr-12', close: 63.98, open: 45.56, },
        { date: '27-Apr-12', close: 67.00, open: 67.89, },
        { date: '26-Apr-12', close: 89.70, open: 78.54, },
        { date: '25-Apr-12', close: 99.00, open: 89.23, },
        { date: '24-Apr-12', close: 130.28, open: 99.23, },
        { date: '23-Apr-12', close: 166.70, open: 101.34, },
        { date: '20-Apr-12', close: 234.98, open: 122.34, },
        { date: '19-Apr-12', close: 345.44, open: 134.56, },
        { date: '18-Apr-12', close: 443.34, open: 160.45, },
        { date: '17-Apr-12', close: 543.70, open: 180.34, },
        { date: '16-Apr-12', close: 580.13, open: 210.23, },
        { date: '13-Apr-12', close: 605.23, open: 223.45, },
        { date: '12-Apr-12', close: 622.77, open: 201.56, },
        { date: '11-Apr-12', close: 626.20, open: 212.67, },
      ],
    };
  },

  methods: {
    createChartMultiplesLines() {
      const parseTime = d3.timeParse('%d-%b-%y');

      this.x = d3.scaleTime().range([0, this.width]);

      this.y = d3.scaleLinear().range([this.height, 0]);

      const valueLine = d3.line()
        .x(d => this.x(d.date))
        .y(d => this.y(d.close));

      const valueLine2 = d3.line()
        .x(d => this.x(d.date))
        .y(d => this.y(d.open));

      this.svg = d3.select('#multipleLines-chart')
        .append('svg')
        .attr('height', this.height + this.margin.left + this.margin.right)
        .attr('width', this.width + this.margin.top + this.margin.bottom)
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
        .attr('viewBox', [100, -100, this.width - 200, this.height + 200]);

      this.data.forEach((d) => {
        d.date = parseTime(d.date);
        d.close = +d.close;
        d.open = +d.open;
      });

      this.x.domain(d3.extent(this.data, d => d.date));

      this.y.domain([0, d3.max(this.data, d => Math.max(d.close, d.open))]);

      this.svg.append('path')
        .data([this.data])
        .attr('class', 'line')
        .attr('d', valueLine);

      this.svg.append('path')
        .data([this.data])
        .attr('class', 'line')
        .style('stroke', 'red')
        .attr('d', valueLine2);

      this.svg.append('g')
        .attr('transform', `translate(0, ${this.height})`)
        .call(d3.axisBottom(this.x));

      this.svg.append('g')
        .call(d3.axisLeft(this.y));
    },
  },

  mounted() {
    this.width = 960 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;

    this.createChartMultiplesLines();
  },
};
</script>
<style>
.line {
  fill: none;
  stroke: steelblue;
  stroke-width: 2px;
}
</style>
