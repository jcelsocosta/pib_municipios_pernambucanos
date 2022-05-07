<template>
  <div id="bar-chart"></div>
</template>
<script>
import * as d3 from 'd3';

export default {
  data() {
    return {
      data: [
        { name: 'Simon', score: 80, },
        { name: 'Mary', score: 90, },
        { name: 'Jhon', score: 60, },
        { name: 'Peter', score: 89, }],
      margin: { top: 50, bottom: 50, left: 50, right: 50, },
      width: 0,
      height: 0,
      svg: undefined,
      x: 0,
      y: 0,
    };
  },

  methods: {
    xAxis(g) {
      g.attr('transform', `translate(0, ${this.height - this.margin.bottom})`)
        .call(d3.axisBottom(this.x).tickFormat(i => this.data[i].name))
        .attr('font-size', '20px');
    },

    yAxis(g) {
      g.attr('transform', `translate(${this.margin.left}, 0)`)
        .call(d3.axisLeft(this.y).ticks(null, this.data.format))
        .attr('font-size', '20px');
    },

    gridSystemXAxis(g) {
      g.attr('class', 'grid')
        .attr('transform', `translate(0, ${this.height})`)
        .call(d3.axisBottom()
          .scale(this.x)
          .tickSize(this.height, 0, 0)
          .tickFormat(''));
    },

    gridSystemYAxis(g) {
      g.attr('class', 'grid')
        .call(d3.axisLeft()
          .scale(this.y)
          .tickSizeInner(-this.width)
          .tickFormat(''));
    },

    createChartBar() {
      this.svg = d3.select('#bar-chart')
        .append('svg')
        .attr('height', this.height - this.margin.top - this.margin.bottom)
        .attr('width', this.width - this.margin.left - this.margin.right)
        .attr('viewBox', [0, 0, this.width, this.height]);

      this.x = d3.scaleBand()
        .domain(d3.range(this.data.length))
        .range([this.margin.left, this.width - this.margin.right])
        .padding(0.1);

      this.y = d3.scaleLinear()
        .domain([0, 100])
        .range([this.height - this.margin.bottom, this.margin.top]);

      const tooldiv = d3.select('#bar-chart')
        .append('div')
        .style('visibilty', 'hidden')
        .style('position', 'absolute')
        .style('background-color', 'red');

      this.svg.append('g')
        .attr('fill', 'royalBlue')
        .selectAll('rect')
        .data(this.data.sort((a, b) => d3.ascending(a.score, b.score)))
        .join('rect')
        .attr('x', (d, i) => this.x(i))
        .attr('y', d => this.y(d.score))
        .attr('height', d => this.y(0) - this.y(d.score))
        .attr('class', 'rectangle')
        .attr('width', this.x.bandwidth())
        .on('mouseover', (e, d) => {
          tooldiv.style('visibility', 'visible')
            .text(`ola: ${d.score}`);
        })
        .on('mousemove', (e) => {
          tooldiv.style('top', `${e.pageY - 50}px`)
            .style('left', `${e.pageX - 50}px`);
        })
        .on('mouseout', () => tooldiv.style('visibility', 'hidden'));

      this.svg.append('g').call(this.xAxis);
      this.svg.append('g').call(this.yAxis);

      // this.svg.append('g').call(this.gridSystemXAxis);
      this.svg.append('g').call(this.gridSystemYAxis);
    },
  },

  mounted() {
    this.width = 800;
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
