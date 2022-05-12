<template>
  <div id='stacked-bar'></div>
</template>
<script>
import * as d3 from 'd3';

export default {
  data() {
    return {
      height: 0,
      width: 0,
      margin: { top: 20, right: 160, bottom: 35, left: 70, },
      svg: undefined,
      data: [
        { month: 'Jan', apples: 3840, bananas: 1920, cherries: 960, dates: 400, },
        { month: 'Feb', apples: 1600, bananas: 1440, cherries: 960, dates: 400, },
        { month: 'March', apples: 640, bananas: 960, cherries: 640, dates: 400, },
        { month: 'Apr', apples: 3120, bananas: 1480, cherries: 640, dates: 400, }
      ],
      x: 0,
      y: 0,
    };
  },

  methods: {
    async createStackedBar() {
      this.svg = d3.select('#stacked-bar')
        .append('svg')
        .attr('width', this.width + this.margin.left + this.margin.right)
        .attr('height', this.height + this.margin.top + this.margin.bottom)
        .append('g')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

      const fruit = Object.keys(this.data[0]).filter(d => d !== 'month');

      const months = this.data.map(d => d.month);

      const stackedData = d3.stack()
        .keys(fruit)(this.data);

      const xMax = d3.max(stackedData[stackedData.length - 1], d => d[1]);

      this.x = d3.scaleLinear()
        .domain([0, xMax]).nice()
        .range([0, this.width]);

      this.y = d3.scaleBand()
        .domain(months)
        .range([0, this.height])
        .padding(0.25);

      const color = d3.scaleOrdinal()
        .domain(fruit)
        .range(d3.schemeTableau10);

      const xAxis = d3.axisBottom(this.x).ticks(5, '~s');
      const yAxis = d3.axisLeft(this.y);

      this.svg.append('g')
        .attr('transform', `translate(0, ${this.height})`)
        .call(xAxis)
        .call(g => g.select('.domain').remove());

      this.svg.append('g')
        .call(yAxis)
        .call(g => g.select('.domain').remove());

      const tooldiv = d3.select('#stacked-bar')
        .append('div')
        .style('visibilty', 'hidden')
        .style('position', 'absolute')
        .style('background-color', 'red');

      const layers = this.svg.append('g')
        .selectAll('g')
        .data(stackedData)
        .join('g')
        .attr('fill', d => color(d.key));

      layers.selectAll('rect')
        .data(d => d)
        .join('rect')
        .attr('x', d => this.x(d[0]))
        .attr('y', d => this.y(d.data.month))
        .attr('height', this.y.bandwidth())
        .attr('width', d => this.x(d[1]) - this.x(d[0]))
        .on('mouseover', (e, d) => {
          tooldiv.style('visibility', 'visible')
            .text(`ola: ${d.data.month}`);
        })
        .on('mousemove', (e) => {
          tooldiv.style('top', `${e.pageY - 50}px`)
            .style('left', `${e.pageX - 50}px`);
        })
        .on('mouseout', () => tooldiv.style('visibility', 'hidden'));
    },
  },

  mounted() {
    this.width = 800 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;

    this.createStackedBar();
  },
};
</script>
