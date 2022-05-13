import data from '../../../../data/PIBFILTRADOPE.json';

const pibs = [];

function year2010() {
  let sum = 0;
  const PIBByYear = {
    ano: '',
    pib: 0,
  };
  for (let i = 0; i < data.length; i += 1) {
    if (data[i].Ano === '2010') {
      sum += parseFloat(data[i].ProdutoInternoBrutoPrecosCorrentesMilReais);

      PIBByYear.ano = '2010';
      PIBByYear.pib = sum;
    }
  }
  return PIBByYear;
}

function year2011() {
  let sum = 0;
  const PIBByYear = {
    ano: '',
    pib: 0,
  };
  data.forEach((element) => {
    if (element.Ano === '2011') {
      sum += parseFloat(element.ProdutoInternoBrutoPrecosCorrentesMilReais);

      PIBByYear.ano = '2011';
      PIBByYear.pib = sum;
    }
  });
  return PIBByYear;
}

function year2012() {
  let sum = 0;
  const PIBByYear = {
    ano: '',
    pib: 0,
  };
  data.forEach((element) => {
    if (element.Ano === '2012') {
      sum += parseFloat(element.ProdutoInternoBrutoPrecosCorrentesMilReais);

      PIBByYear.ano = '2012';
      PIBByYear.pib = sum;
    }
  });
  return PIBByYear;
}

function year2013() {
  let sum = 0;
  const PIBByYear = {
    ano: '',
    pib: 0,
  };
  data.forEach((element) => {
    if (element.Ano === '2013') {
      sum += parseFloat(element.ProdutoInternoBrutoPrecosCorrentesMilReais);

      PIBByYear.ano = '2013';
      PIBByYear.pib = sum;
    }
  });
  return PIBByYear;
}

function year2014() {
  let sum = 0;
  const PIBByYear = {
    ano: '',
    pib: 0,
  };
  data.forEach((element) => {
    if (element.Ano === '2014') {
      sum += parseFloat(element.ProdutoInternoBrutoPrecosCorrentesMilReais);

      PIBByYear.ano = '2014';
      PIBByYear.pib = sum;
    }
  });
  return PIBByYear;
}

function year2015() {
  let sum = 0;
  const PIBByYear = {
    ano: '',
    pib: 0,
  };
  data.forEach((element) => {
    if (element.Ano === '2015') {
      sum += parseFloat(element.ProdutoInternoBrutoPrecosCorrentesMilReais);

      PIBByYear.ano = '2015';
      PIBByYear.pib = sum;
    }
  });
  return PIBByYear;
}

function year2016() {
  let sum = 0;
  const PIBByYear = {
    ano: '',
    pib: 0,
  };
  data.forEach((element) => {
    if (element.Ano === '2016') {
      sum += parseFloat(element.ProdutoInternoBrutoPrecosCorrentesMilReais);

      PIBByYear.ano = '2016';
      PIBByYear.pib = sum;
    }
  });
  return PIBByYear;
}

function year2017() {
  let sum = 0;
  const PIBByYear = {
    ano: '',
    pib: 0,
  };
  data.forEach((element) => {
    if (element.Ano === '2017') {
      sum += parseFloat(element.ProdutoInternoBrutoPrecosCorrentesMilReais);

      PIBByYear.ano = '2017';
      PIBByYear.pib = sum;
    }
  });
  return PIBByYear;
}

function year2018() {
  let sum = 0;
  const PIBByYear = {
    ano: '',
    pib: 0,
  };
  data.forEach((element) => {
    if (element.Ano === '2018') {
      sum += parseFloat(element.ProdutoInternoBrutoPrecosCorrentesMilReais);

      PIBByYear.ano = '2018';
      PIBByYear.pib = sum;
    }
  });
  return PIBByYear;
}

function year2019() {
  let sum = 0;
  const PIBByYear = {
    ano: '',
    pib: 0,
  };
  data.forEach((element) => {
    if (element.Ano === '2019') {
      sum += parseFloat(element.ProdutoInternoBrutoPrecosCorrentesMilReais);

      PIBByYear.ano = '2019';
      PIBByYear.pib = sum;
    }
  });
  return PIBByYear;
}

pibs.push(year2010());
pibs.push(year2011());
pibs.push(year2012());
pibs.push(year2013());
pibs.push(year2014());
pibs.push(year2015());
pibs.push(year2016());
pibs.push(year2017());
pibs.push(year2018());
pibs.push(year2019());

export default {
  pibs,
};
