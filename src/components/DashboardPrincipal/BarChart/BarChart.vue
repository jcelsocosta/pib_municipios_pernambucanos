<template>
  <div>
    <h3>Top 10 PIB's de Pernambuco</h3>
    <select v-model="selected">
      <option disabled value>Selecione um ano</option>
      <option v-for="option in options" :value="option.value" :key="option.value">
        {{ option.value }}</option>
    </select>
    <div id="bar-chart"></div>
  </div>
</template>
<script>
import * as d3 from 'd3';
import data from '../../../data/pibpeformated.json';

export default {
  data() {
    return {
      dataAux: [],
      margin: { top: 50, bottom: 50, left: 50, right: 50, legendBottom: 25, legendBottomTwo: 5, },
      width: 0,
      height: 0,
      maxValue: 0,
      svg: undefined,
      x: 0,
      y: 0,
      selected: 2010,
      options: [
        { value: 2010, },
        { value: 2011, },
        { value: 2012, },
        { value: 2013, },
        { value: 2014, },
        { value: 2015, },
        { value: 2016, },
        { value: 2017, },
        { value: 2018, },
        { value: 2019, },
      ],
    };
  },

  methods: {
    filterArray() {
      this.dataAux = [];
      let cont = 0;
      this.maxValue = 0;

      data.sort((a, b) => (b.ProdutoInternoBrutoPrecosCorrentesMilReais
        - a.ProdutoInternoBrutoPrecosCorrentesMilReais));

      data.forEach((el) => {
        if (el.Ano === this.selected && cont < 10) {
          this.dataAux.push(el);
          cont += 1;
        }
      });
      this.maxValue = parseFloat(this.dataAux[0].ProdutoInternoBrutoPrecosCorrentesMilReais * 1000);
    },

    createSvg() {
      this.svg = d3.select('#bar-chart')
        .append('svg')
        .attr('height', this.height - this.margin.top - this.margin.bottom)
        .attr('width', this.width)
        .attr('viewBox', [0, 0, this.width, this.height + 55]);
    },

    createChartBar() {
      this.x = d3.scaleLinear()
        .domain([0, this.maxValue])
        .range([0, this.width]);

      this.svg.append('g')
        .attr('transform', `translate(0, ${this.height - this.margin.top - this.margin.bottom})`)
        .call(d3.axisBottom(this.x).tickFormat(d => d.toLocaleString('pt-br', { minimumFractionDigits: 2, })))
        .selectAll('text')
        .attr('transform', 'translate(-10, 0)rotate(-45)')
        .style('text-anchor', 'end');

      this.y = d3.scaleBand()
        .range([0, this.height - this.margin.top - this.margin.bottom])
        .domain(this.dataAux.map(d => d.NomeDoMunicipio))
        .padding(0.1);

      this.svg.append('g')
        .call(d3.axisLeft(this.y));

      const tooldiv = d3.select('#bar-chart')
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

      this.svg.append('g')
        .attr('id', 'rect-chart')
        .selectAll('rect')
        .data(this.dataAux)
        .join('rect')
        .attr('fill', (d) => {
          let color = '';

          if (d.NomeDaMesorregiao === 'São Francisco Pernambucano') {
            color = '#4289cd';
          } else if (d.NomeDaMesorregiao === 'Sertão Pernambucano') {
            color = '#cd8642';
          } else if (d.NomeDaMesorregiao === 'Mata Pernambucana') {
            color = '#44cd42';
          } else if (d.NomeDaMesorregiao === 'Agreste Pernambucano') {
            color = '#dba88b';
          } else if (d.NomeDaMesorregiao === 'Metropolitana de Recife') {
            color = '#c33a38';
          }
          return color;
        })
        .attr('x', (d, i) => this.x(i))
        .attr('y', d => this.y(d.NomeDoMunicipio))
        .attr('height', this.y.bandwidth())
        .attr('class', 'rectangle')
        .attr('width', d => this.x(
          parseFloat(d.ProdutoInternoBrutoPrecosCorrentesMilReais * 1000)))
        .on('mouseover', (e, d) => {
          tooldiv.style('visibility', 'visible')
            .text(`PIB: R$ ${parseFloat(d.ProdutoInternoBrutoPrecosCorrentesMilReais * 1000)
              .toLocaleString('pt-br', { minimumFractionDigits: 2, })}`);
        })
        .on('mousemove', (e) => {
          tooldiv.style('top', `${e.pageY - 50}px`)
            .style('left', `${e.pageX - 50}px`);
        })
        .on('mouseout', () => tooldiv.style('visibility', 'hidden'));

      this.svg.append('circle')
        .attr('cx', 200)
        .attr('cy', this.height + this.margin.legendBottom)
        .attr('r', 6)
        .style('fill', '#c33a38');

      this.svg.append('text')
        .attr('x', 215)
        .attr('y', this.height + this.margin.legendBottom)
        .text('Região Metropolitana do Recife')
        .style('font-size', '15px')
        .attr('alignment-baseline', 'middle');

      this.svg.append('circle')
        .attr('cx', 470)
        .attr('cy', this.height + this.margin.legendBottom)
        .attr('r', 6)
        .style('fill', '#dba88b');

      this.svg.append('text')
        .attr('x', 485)
        .attr('y', this.height + this.margin.legendBottom)
        .text('Agreste Pernambucano')
        .style('font-size', '15px')
        .attr('alignment-baseline', 'middle');

      this.svg.append('circle')
        .attr('cx', 200)
        .attr('cy', this.height + this.margin.legendBottomTwo)
        .attr('r', 6)
        .style('fill', '#44cd42');

      this.svg.append('text')
        .attr('x', 215)
        .attr('y', this.height + this.margin.legendBottomTwo)
        .text('Mata Pernambucana')
        .style('font-size', '15px')
        .attr('alignment-baseline', 'middle');

      this.svg.append('circle')
        .attr('cx', 470)
        .attr('cy', this.height + this.margin.legendBottomTwo)
        .attr('r', 6)
        .style('fill', '#cd8642');

      this.svg.append('text')
        .attr('x', 485)
        .attr('y', this.height + this.margin.legendBottomTwo)
        .text('Sertão Pernambucano')
        .style('font-size', '15px')
        .attr('alignment-baseline', 'middle');

      this.svg.append('circle')
        .attr('cx', 670)
        .attr('cy', this.height + this.margin.legendBottomTwo)
        .attr('r', 6)
        .style('fill', '#4289cd');

      this.svg.append('text')
        .attr('x', 685)
        .attr('y', this.height + this.margin.legendBottomTwo)
        .text('São Francisco Pernambucano')
        .style('font-size', '15px')
        .attr('alignment-baseline', 'middle');
    },
  },

  mounted() {
    this.width = 900;
    this.height = 450;
    // eslint-disable-next-line
    this.filterArray();
    this.createSvg();
    this.createChartBar();
  },

  watch: {
    selected() {
      this.svg.selectAll('*').remove();
      this.filterArray();
      this.createChartBar();
    },
  },
};
</script>
<style>
#div_title {
  text-align: center;
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
