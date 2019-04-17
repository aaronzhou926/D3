// @TODO: YOUR CODE HERE!

function makeResponsive() {

    var svgArea = d3.select("body").select("svg");

    if (!svgArea.empty()) {
      svgArea.remove();
    }

    //size of canvas
    var svgWidth = 760;
    var svgHeight = 440;

    var margin = {
        top: 20,
        right: 40,
        bottom: 100,
        left: 100
      };
      
      //area for graph
      var width = svgWidth - margin.left - margin.right;
      var height = svgHeight - margin.top - margin.bottom;

        // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
     var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

    var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    //import data
    d3.csv('assets/data/data.csv').then(function(response){

        console.log(response);

        response.forEach(data =>{
            data.healthcare =+data.healthcare;
            data.poverty =+ data.poverty;
        });

        // Step 2: Create scale functions
        // ==============================
        var xLinearScale = d3.scaleLinear()
        .domain([7,d3.max(response,d=>d.poverty)+2])
        .range([0,width]);

        var yLinearScale = d3.scaleLinear()
        .domain([2,d3.max(response,d=>d.healthcare)+2])
        .range([height,0]);

      // Step 3: Create axis functions
      // ==============================
      var bottomAxis = d3.axisBottom(xLinearScale);
      var leftAxis = d3.axisLeft(yLinearScale);

      // Step 4: Append Axes to the chart
      // ==============================
      chartGroup.append('g')
      .attr('transform',`translate(0,${height})`)
      .call(bottomAxis);

      chartGroup.append('g')
      .call(leftAxis);

      // Step 5: Create Circles
      // ==============================
      var circlesGroup = chartGroup.selectAll('circle').data(response);

      circlesGroup
      .enter()
      .append('circle')
      .attr('class','bubble')
      .attr('cx',d=>xLinearScale(d.poverty))
      .attr('cy',d=>yLinearScale(d.healthcare+0.2))
      .attr('r','10')
      .attr('opacity','.5')
      .classed('stateCircle',true);

      circlesGroup
      .enter()
      .append('text')
      .attr('x',d=>xLinearScale(d.poverty))
      .attr('y',d=>yLinearScale(d.healthcare))
      .text(function(d){return d.abbr})
      .attr('fill','white')
      .classed('stateText',true);
      //.attr('text-anchor','middle');

       // Create axes labels
      chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .text("In Poverty (%)");

      chartGroup.append("text")
      .attr("transform", `translate(${margin.right-margin.left}, ${svgHeight/2})rotate(-90)`)
      .text("Lacks Heathcare (%)");

    });
}

makeResponsive();

d3.select(window).on("resize", makeResponsive);
