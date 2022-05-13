<template>
  <div id="bar-chart"></div>
</template>
<script>
import * as d3 from 'd3';

export default {
  data() {
    return {
      data: [
        { country: 'United States', value: 12394, },
        { country: 'Russia', value: 6148, },
        { country: 'Germany (FRG)', value: 1653, },
        { country: 'United Kingdom', value: 1214, },
        { country: 'China', value: 1131, },
        { country: 'Spain', value: 814, },
        { country: 'Netherlands', value: 1167, },
        { country: 'Italy', value: 660, },
        { country: 'Israel', value: 1263, }],
      margin: { top: 50, bottom: 50, left: 50, right: 50, },
      width: 0,
      height: 0,
      svg: undefined,
      x: 0,
      y: 0,
    };
  },

  methods: {
    createChartBar() {
      this.svg = d3.select('#bar-chart')
        .append('svg')
        .attr('height', this.height - this.margin.top - this.margin.bottom)
        .attr('width', this.width - this.margin.left - this.margin.right)
        .attr('viewBox', [0, 0, this.width, this.height]);

      this.x = d3.scaleLinear()
        .domain([0, 13000])
        .range([0, this.width]);

      this.svg.append('g')
        .attr('transform', `translate(0, ${this.height - this.margin.top - this.margin.bottom})`)
        .call(d3.axisBottom(this.x))
        .selectAll('text')
        .attr('transform', 'translate(-10, 0)rotate(-45)')
        .style('text-anchor', 'end');

      this.y = d3.scaleBand()
        .range([0, this.height - this.margin.top - this.margin.bottom])
        .domain(this.data.map(d => d.country))
        .padding(0.1);

      this.svg.append('g')
        .call(d3.axisLeft(this.y));

      const tooldiv = d3.select('#bar-chart')
        .append('div')
        .style('visibilty', 'hidden')
        .style('position', 'absolute')
        .style('background-color', 'red');

      this.svg.append('g')
        .attr('fill', 'royalBlue')
        .selectAll('rect')
        .data(this.data.sort((a, b) => d3.ascending(a.value, b.value)))
        .join('rect')
        .attr('x', (d, i) => this.x(i))
        .attr('y', d => this.y(d.country))
        .attr('height', this.y.bandwidth())
        .attr('class', 'rectangle')
        .attr('width', d => this.x(d.value))
        .on('mouseover', (e, d) => {
          tooldiv.style('visibility', 'visible')
            .text(`value: ${d.value}`);
        })
        .on('mousemove', (e) => {
          tooldiv.style('top', `${e.pageY - 50}px`)
            .style('left', `${e.pageX - 50}px`);
        })
        .on('mouseout', () => tooldiv.style('visibility', 'hidden'));
    },
  },

  mounted() {
    this.width = 900;
    this.height = 400;

    this.createChartBar();
  },
};
</script>
<style>
#div_title {
  text-align: center;
}

svg {
  border: 1px solid lightgray;
}

.rectangle:hover {
  opacity: 0.5;
}

.grid path {
    stroke-width: 0;
}

.grid .tick line {
    stroke: #9FAAAE;
    stroke-opacity: 0.2;
}
</style>
