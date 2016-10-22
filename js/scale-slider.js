(function() {
  var id = '#range',
    w = 800,
    h = 30
    scaleDomain = [0, 100],
    scaleRange = [0, w];

  var scale = d3.scaleLinear() //v3: d3.scale.linear()
    .domain(scaleDomain)
    .range(scaleRange);

  var svg = d3.select(id)
    .attr('width', w)
    .attr('height', h);

  svg.append('rect')
    .style('fill', '#ddd')
    .attr('width', w)
    .attr('height', h)
    .attr('x', 0)
    .attr('y', 0);

  var bar = svg.append('rect')
    .attr('width', 0)
    .attr('height', h)
    .attr('x', 0)
    .attr('y', 0);

  var input = d3.select('#input');
  var output = d3.select('#output');
  var scaleDomainEl = d3.select('#scaleDomain');
  var scaledValue = d3.select('#scaledValue');

  function update(d) {
    bar.attr('width', scale(d));
    input.text(d);
    var val = Math.round(scale(d));
    console.log('percent: ' + (val/scaleRange[1]) * 100)
    output.text(scaleRange[1]);
    scaledValue
    .style('margin-left', getPadding(val))
    .text(val);
  }

  update(50);


  // event listeners
  d3.select('#domainInput').on('change', function() {
    var arr = this.value.split(',');
    scaleDomain = arr.map(function(val){
      return +val;
    });

    scaleDomainEl
    .attr('min', scaleDomain[0])
    .attr('max', scaleDomain[1]);

    // update scale domain
    scale.domain(scaleDomain)
    .range(scaleRange);

  });

  scaleDomainEl.on('input', function() {
    update(this.value);
  });


  function getPadding(val){
    if(val - 40 > 0){
      return (val - 40) +'px';
    }
    return '0px';
  }
})();
