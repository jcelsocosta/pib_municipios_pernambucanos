<template>
  <div id="pie-chart"></div>
</template>
<script>
import * as d3 from 'd3';

export default {
  data() {
    return {
      height: 0,
      width: 0,
      radius: 200,
      svg: undefined,
      tooltip: undefined,
      data: [
        { name: 'Alex', share: 20.70, },
        { name: 'Shelly', share: 30.82, },
        { name: 'Clark', share: 15.42, },
        { name: 'Matt', share: 13.65, },
        { name: 'Jolene', share: 19.31, }
      ],
    };
  },

  methods: {
    createPieChart() {
      this.svg = d3.select('#pie-chart')
        .append('svg')
        .attr('id', 'svg-pie-chart')
        .attr('width', this.width)
        .attr('height', this.height);

      const g = this.svg.append('g')
        .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

      const ordScale = d3.scaleOrdinal()
        .domain(this.data)
        .range(['#ffd384', '#94ebcd', '#fbaccc', '#d3e0ea', '#fa7f72']);

      const pie = d3.pie().value(d => d.share);

      const arc = g.selectAll('arc')
        .data(pie(this.data))
        .enter();

      const path = d3.arc()
        .outerRadius(this.radius)
        .innerRadius(0);

      const tooldiv = d3.select('#pie-chart')
        .append('div')
        .style('visibilty', 'hidden')
        .style('position', 'absolute')
        .style('background-color', 'red');

      arc.append('path')
        .attr('d', path)
        .attr('fill', d => ordScale(d.data.name))
        .attr('stroke', 'white')
        .on('mouseover', (e, d) => {
          tooldiv.style('visibility', 'visible')
            .text(d.data.share);
        })
        .on('mousemove', (e) => {
          tooldiv.style('top', `${e.pageY - 50}px`)
            .style('left', `${e.pageX - 50}px`);
        })
        .on('mouseout', () => tooldiv.style('visibility', 'hidden'));

      const label = d3.arc()
        .outerRadius(this.radius)
        .innerRadius(0);

      arc.append('text')
        .attr('transform', d => `translate(${label.centroid(d)})`)
        .text(d => d.data.name)
        .style('font-family', 'arial')
        .style('font-size', 15);
    },
  },

  mounted() {
    this.width = 500;
    this.height = 400;
    this.createPieChart();
  },
};
</script>
