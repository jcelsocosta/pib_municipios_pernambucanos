<template>
  <div id="pie-chart"></div>
</template>
<script>
import * as d3 from 'd3';
import dataTotal from '../../../data/pibpeformated.json';

export default {
  data() {
    return {
      height: 0,
      width: 0,
      radius: 200,
      svg: undefined,
      margin: { top: 50, bottom: 50, left: 50, right: 50, legendBottom: 50, legendBottomTwo: 5, },
      data: [
        { name: 'Região Metropolitana de Recife', percentagem: 8.1, },
        { name: 'Agreste Pernambucano', percentagem: 38.3, },
        { name: 'Mata Pernambucana', percentagem: 23.4, },
        { name: 'Sertão Pernambucano', percentagem: 22.1, },
        { name: 'São Francisco Pernambucano', percentagem: 8.1, }
      ],
    };
  },

  methods: {
    filteredDataTotal() {
      let regMetrop = 0;
      let agrPernam = 0;
      let mataPernam = 0;
      let sertPernam = 0;
      let saoFranPernam = 0;
      let sumTotal = 0;

      dataTotal.forEach((el) => {
        if (el.Ano === 2010) {
          if (el.NomeDaMesorregiao === 'São Francisco Pernambucano') {
            saoFranPernam += 1;
          } else if (el.NomeDaMesorregiao === 'Sertão Pernambucano') {
            sertPernam += 1;
          } else if (el.NomeDaMesorregiao === 'Mata Pernambucana') {
            mataPernam += 1;
          } else if (el.NomeDaMesorregiao === 'Agreste Pernambucano') {
            agrPernam += 1;
          } else if (el.NomeDaMesorregiao === 'Metropolitana de Recife') {
            regMetrop += 1;
          }
        }
      });
      sumTotal = regMetrop + agrPernam + mataPernam + sertPernam + saoFranPernam;
      // eslint-disable-next-line
      console.log(regMetrop, agrPernam, mataPernam, sertPernam, saoFranPernam, sumTotal);
    },
    createPieChart() {
      this.svg = d3.select('#pie-chart')
        .append('svg')
        .attr('id', 'svg-pie-chart')
        .attr('width', this.width + 300)
        .attr('height', this.height + 50);

      const g = this.svg.append('g')
        .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

      const ordScale = d3.scaleOrdinal()
        .domain(this.data)
        .range(['#c33a38', '#dba88b', '#44cd42', '#cd8642', '#4289cd']);

      const pie = d3.pie().value(d => d.percentagem);

      const arc = g.selectAll('arc')
        .data(pie(this.data))
        .enter();

      const path = d3.arc()
        .outerRadius(this.radius)
        .innerRadius(0);
      /*
      const tooldiv = d3.select('#pie-chart')
        .append('div')
        .style('visibilty', 'hidden')
        .style('position', 'absolute')
        .style('background-color', '#fafafa')
        .style('stroke', '#3498db')
        .style('opacity', '0.9')
        .style('stroke-width', '1')
        .style('font-weight', 'bold')
        .style('border', '1px solid #3498db')
        .style('padding', '5px');

        .on('mouseover', (e, d) => {
          tooldiv.style('visibility', 'visible')
            .text(d.data.percentagem);
        })
        .on('mousemove', (e) => {
          tooldiv.style('top', `${e.pageY - 50}px`)
            .style('left', `${e.pageX - 50}px`);
        })
        .on('mouseout', () => tooldiv.style('visibility', 'hidden'));
      */
      arc.append('path')
        .attr('d', path)
        .attr('fill', d => ordScale(d.data.name))
        .attr('stroke', 'white');


      const label = d3.arc()
        .outerRadius(this.radius)
        .innerRadius(this.radius - 100);

      arc.append('text')
        .attr('transform', d => `translate(${label.centroid(d)})`)
        .text(d => `${d.data.percentagem}%`)
        .style('font-family', 'arial')
        .style('font-size', 15);

      this.svg.append('circle')
        .attr('cx', 500)
        .attr('cy', this.margin.legendBottom)
        .attr('r', 6)
        .style('fill', '#c33a38');

      this.svg.append('text')
        .attr('x', 515)
        .attr('y', this.margin.legendBottom)
        .text('Região Metropolitana do Recife')
        .style('font-size', '15px')
        .attr('alignment-baseline', 'middle');

      this.svg.append('circle')
        .attr('cx', 500)
        .attr('cy', 2 * this.margin.legendBottom)
        .attr('r', 6)
        .style('fill', '#44cd42');

      this.svg.append('text')
        .attr('x', 515)
        .attr('y', 2 * this.margin.legendBottom)
        .text('Mata Pernambucana')
        .style('font-size', '15px')
        .attr('alignment-baseline', 'middle');

      this.svg.append('circle')
        .attr('cx', 500)
        .attr('cy', 3 * this.margin.legendBottom)
        .attr('r', 6)
        .style('fill', '#dba88b');

      this.svg.append('text')
        .attr('x', 515)
        .attr('y', 3 * this.margin.legendBottom)
        .text('Agreste Pernambucano')
        .style('font-size', '15px')
        .attr('alignment-baseline', 'middle');

      this.svg.append('circle')
        .attr('cx', 500)
        .attr('cy', 4 * this.margin.legendBottom)
        .attr('r', 6)
        .style('fill', '#cd8642');

      this.svg.append('text')
        .attr('x', 515)
        .attr('y', 4 * this.margin.legendBottom)
        .text('Sertão Pernambucano')
        .style('font-size', '15px')
        .attr('alignment-baseline', 'middle');

      this.svg.append('circle')
        .attr('cx', 500)
        .attr('cy', 5 * this.margin.legendBottom)
        .attr('r', 6)
        .style('fill', '#4289cd');

      this.svg.append('text')
        .attr('x', 515)
        .attr('y', 5 * this.margin.legendBottom)
        .text('São Francisco Pernambucano')
        .style('font-size', '15px')
        .attr('alignment-baseline', 'middle');

        this.svg.append("g")
               .attr("transform", "translate(" + (this.width / 2 - 5) + "," + 20 + ")")
               .append("text")
               .text("PIB por Mesorregiões de Pernambuco")
               .attr("class", "title")
    },
  },

  mounted() {
    this.width = 500;
    this.height = 500;
    this.createPieChart();
    this.filteredDataTotal();
  },
};
</script>
