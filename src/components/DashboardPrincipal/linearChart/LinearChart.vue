<template>
  <div id="linear-chart"></div>
</template>

<script>
import moment from 'moment';
import * as d3 from 'd3';
import dataAux from '../../../data/pibpeformated.json';
import data from './data/data.json';

export default {
  data() {
    return {
      margin: { top: 50, right: 30, bottom: 30, left: 60, },
      width: 0,
      height: 0,
      parseTime: d3.timeParse('%d/%m/%Y'),
      anoFormat: moment().format('YYYY'),
      x: 0,
      y: 0,
      svg: undefined,
      tooltip: undefined,
      dataSelected: undefined,
    };
  },

  methods: {
    readFile() {
      let pibAno2010 = 0;
      let pibAno2011 = 0;
      let pibAno2012 = 0;
      let pibAno2013 = 0;
      let pibAno2014 = 0;
      let pibAno2015 = 0;
      let pibAno2016 = 0;
      let pibAno2017 = 0;
      let pibAno2018 = 0;
      let pibAno2019 = 0;

      dataAux.forEach((el) => {
        if (el.Ano === 2010) {
          pibAno2010 += el.ProdutoInternoBrutoPrecosCorrentesMilReais;
        }

        if (el.Ano === 2011) {
          pibAno2011 += el.ProdutoInternoBrutoPrecosCorrentesMilReais;
        }

        if (el.Ano === 2012) {
          pibAno2012 += el.ProdutoInternoBrutoPrecosCorrentesMilReais;
        }

        if (el.Ano === 2013) {
          pibAno2013 += el.ProdutoInternoBrutoPrecosCorrentesMilReais;
        }

        if (el.Ano === 2014) {
          pibAno2014 += el.ProdutoInternoBrutoPrecosCorrentesMilReais;
        }

        if (el.Ano === 2015) {
          pibAno2015 += el.ProdutoInternoBrutoPrecosCorrentesMilReais;
        }

        if (el.Ano === 2016) {
          pibAno2016 += el.ProdutoInternoBrutoPrecosCorrentesMilReais;
        }

        if (el.Ano === 2017) {
          pibAno2017 += el.ProdutoInternoBrutoPrecosCorrentesMilReais;
        }

        if (el.Ano === 2018) {
          pibAno2018 += el.ProdutoInternoBrutoPrecosCorrentesMilReais;
        }

        if (el.Ano === 2019) {
          pibAno2019 += el.ProdutoInternoBrutoPrecosCorrentesMilReais;
        }
      });
      // eslint-disable-next-line
      console.log('PIBs', pibAno2010, pibAno2011, pibAno2012, pibAno2013,
        pibAno2014, pibAno2015, pibAno2016, pibAno2017, pibAno2018, pibAno2019);
      // eslint-disable-next-line
      // console.log('PIB formatado', pibAno2010.toLocaleString('pt-br', { minimumFractionDigits: 2 }));
    },
    createSvg() {
      this.svg = d3.select('#linear-chart').append('svg')
        .attr('id', 'svg-linear-chart')
        .attr('width', this.width + 200)
        .attr('height', this.height + this.margin.top + this.margin.bottom)
        .attr('viewBox', [+10, 0, this.width + this.margin.left + this.margin.right, this.height + this.margin.top + this.margin.bottom])
        .append('g')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

      this.svg.append('text')
        .attr('x', (this.width / 2))
        .attr('y', (0 - (this.margin.top / 2)))
        .attr('text-anchor', 'middle')
        .style('fill', '#5a5a5a')
        .style('font-family', 'Raleway')
        .style('font-weight', '300')
        .style('font-size', '24px')
        .text('PIB acumulado entre os anos de 2010 à 2019');

      this.axiosAndLine();
    },

    addTooltip() {
      this.tooltip = this.svg.append('g')
        .attr('id', 'tooltip')
        .style('display', 'none');

      this.tooltip.append('circle')
        .attr('fill', '#CCE5F6')
        .attr('r', 10);

      this.tooltip.append('circle')
        .attr('fill', '#3498db')
        .attr('stroke', '#fff')
        .attr('stroke-width', '1.5px')
        .attr('r', 4);

      this.tooltip.append('polyline')
        .attr('points', '0, 0, 0, 40, 55, 40, 60, 45, 65, 40, 120, 40, 120, 0, 0, 0')
        .style('fill', '#fafafa')
        .style('stroke', '#3498db')
        .style('opacity', '0.9')
        .style('stroke-width', '1')
        .attr('transform', 'translate(-60, -55)');

      const text = this.tooltip.append('text')
        .style('font-size', '9px')
        .style('font-family', 'Segoe UI')
        .style('color', '#333333')
        .style('fill', '#333333')
        .attr('transform', 'translate(-50, -40)');

      text.append('tspan')
        .style('fill', '#3498db')
        .attr('dx', '0')
        .attr('dy', '10')
        .text('●');

      text.append('tspan')
        .attr('dx', '2')
        .text('PIB : ');

      text.append('tspan')
        .attr('id', 'tooltip-pib')
        .style('font-weight', 'bold');

      const bisectano = d3.bisector(d => d.ano).left;

      this.svg.append('rect')
        .attr('class', 'overlay')
        .attr('width', this.width)
        .attr('height', this.height + this.margin.top)
        .on('mouseover', () => {
          this.tooltip.style('display', null);
        })
        .on('mouseout', () => {
          this.tooltip.style('display', 'none');
        })
        .on('mousemove', () => {
          const x0 = this.x.invert(d3.pointer(event)[0]);
          const i = bisectano(data, x0);
          const d = data[i];
          this.tooltip.attr('transform', `translate(${this.x(d.ano)}, ${this.y(d.pib)})`);
          d3.select('#tooltip-pib')
            .text(`R$: ${d.pib.toLocaleString('pt-br', { minimumFractionDigits: 0, })}`);
        });
    },

    axiosAndLine() {
      data.forEach((d) => {
        d.ano = moment(`${d.ano}`, 'YYYY');
        d.pib = +d.pib;
      });

      // data.sort((a, b) => a.ano - b.ano);
      // eslint-disable-next-line
      // console.log('this.data', data)
      this.x.domain(d3.extent(data, d => d.ano));

      this.y.domain(d3.extent(data, d => parseFloat(d.pib)));

      const line = d3.line()
        .x(d => this.x(d.ano))
        .y(d => this.y(d.pib));

      const area = d3.area()
        .x(d => this.x(d.ano))
        .y0(this.height)
        .y1(d => this.y(d.pib));

      this.svg.append('g')
        .attr('transform', `translate(0, ${this.height})`)
        .call(d3.axisBottom(this.x));

      this.svg.append('g')
        .call(d3.axisLeft(this.y).tickFormat(d => d.toLocaleString('pt-br', { minimumFractionDigits: 0, })))
        .append('text')
        .attr('fill', '#yellow')
        .attr('transform', 'rotate(-90)')
        .attr('y', 5)
        .attr('dy', '0.51em')
        .style('text-anchor', 'end');

      this.svg.selectAll('y axis')
        .data(this.y.ticks(10))
        .enter()
        .append('line')
        .attr('class', 'horizontalGrid')
        .attr('x1', 0)
        .attr('y1', d => this.y(d.pib))
        .attr('y2', d => this.y(d.pib));

      this.svg.append('path')
        .datum(data)
        .style('fill', 'none')
        .style('stroke', '#3498db')
        .style('stroke-width', '1px')
        .style('opacity', '0.6')
        .attr('d', line);

      this.svg.append('linearGradient')
        .attr('id', 'areachart-gradient')
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', this.y(d3.min(data, d => d.pib)))
        .attr('y2', this.y(d3.max(data, d => d.pib)))
        .selectAll('stop')
        .data([
          { offset: '0%', color: '#F7FBFE', },
          { offset: '100%', color: '#3498DB', }
        ])
        .enter()
        .append('stop')
        .attr('offset', d => d.offset)
        .attr('stop-color', d => d.color);

      this.svg.append('path')
        .datum(data)
        .style('fill', 'url(#areachart-gradient)')
        .style('opacity', '0.6')
        .attr('d', area);

      this.addTooltip();
    },
  },

  mounted() {
    this.width = 900;
    this.height = 400 - this.margin.top - this.margin.bottom;
    this.x = d3.scaleTime().range([1, this.width]);
    this.y = d3.scaleLinear().range([this.height, 0]);

    this.createSvg();
  },
};
</script>
<style>
#svg {
    display: block;
    margin: auto;
}

#chart {
    margin-top: 20px;
    border: 1px solid #DEDEDE;
}

.axis path, .axis line {
    fill: none;
    stroke: #000;
    shape-rendering: crispEdges;
}

.horizontalGrid {
    fill : none;
    shape-rendering : crispEdges;
    stroke : lightgrey;
    stroke-width : 1px;
}

.overlay {
    fill: none;
    pointer-events: all;
}
</style>
