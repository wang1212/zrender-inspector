import * as zrInspector from '../build/bundle.esm.js';
console.log(zrInspector, ThsDataVStandardChart);

const barNum = 4;

const chartIns = ThsDataVStandardChart.init('chart' /* 'mobile-app-light' */);

chartIns.play({
  option: {
    xAxis: {
      data: Array.from(Array(barNum), (_, i) => i)
    },
    yAxis: {},
    series: [
      {
        type: 'bar',
        data: Array.from(Array(barNum), () => 25 + Math.ceil(Math.random() * 100))
      }
    ]
  }
});
// console.log(chartIns);

chartIns.on('dv:afterinit', () => {
  // zrInspector.Inspector.highlightCSS = 'background-color: red;';
  const inspectorIns = zrInspector.Inspector.inspect(chartIns.getECharts().getZr(), {
    highlightCSS: 'background-color: yellow; opacity: 0.25;'
  });
  window.inspectorIns = inspectorIns;
  console.log('🚀 ~ file: index.js:29 ~ inspectorIns ~ inspectorIns:', inspectorIns);

  inspectorIns.hoverHighlightEnable = true;

  setTimeout(() => {
    inspectorIns.disableAllElementSilent();

    console.log('type=rect', inspectorIns.querySelectorAll('type=rect'));
    console.log(
      'style.fill=#5470c6,id=2370',
      inspectorIns.querySelectorAll('style.fill=#5470c6,id=2370')
    );
    console.log('id=2370', inspectorIns.getElementById(2370));
    console.log('name=item', inspectorIns.getElementsByName('item'));
  }, 1e3);
});
