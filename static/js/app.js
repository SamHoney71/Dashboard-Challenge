

// Need to create intitial with default plot
function int() {
  d3.json("static/js/samples.json").then((data) => {
    console.log(data);

    data.names.forEach(row => {
      console.log(row);
        d3.select("#selDataset")
        .append("option")
        .text(row)
        .property("value");
    });
    displayPlot(data.names[0]);
    demographics(data.names[0]);
  });
};

function demographics(id) {
  d3.json("static/js/samples.json").then((data) => {
    var metadata = data.metadata.filter(meta=>meta.id.toString() === id)[0];
    console.log(metadata);
    d3.select("#sample-metadata").html("");
    Object.entries(metadata).forEach((row)=>{
      d3.select("#sample-metadata")
      .append('h6')
      .text(row[0]+ ' ' +":" + " " +row[1] + "\n");
    });
  });
};


function displayPlot(id) {
  d3.json("static/js/samples.json").then((data) => {
    var metadata = data.metadata.filter(meta=>meta.id.toString() === id)[0];
    
    //filter samples by name id
    var sample_id = data.samples.filter(s => s.id.toString() === id)[0];

  
    // Get top 10 OTU ids and values
    top10otu_values = sample_id.sample_values.slice(0,10).reverse();
    top10otu_ids = sample_id.otu_ids.slice(0,10).reverse();
    console.log(top10otu_ids + " " + top10otu_values);

    var trace1 = {
      x: top10otu_values,
      y: top10otu_ids,
      type:'bar',
     orientation:'h'
    }

    var data = trace1;

    var layout = {
      title: "Top 10 OTU IDs for " + sample_id.id,
      height: 500,
      width: 500,
      bargap: 0.1,
      xaxis: {title: 'Top 10 Sample Values'},
    };

    var config = {
      scrollZoom : true,
      displaylogo: false,
      resposive: true,
    };

  Plotly.newPlot("bar", data, layout, config);
    
  });

  function optionChanged(id) {
    displayPlot(id);
    demographics(id);
  }
}

int();




// Call updatePlotly() when a change occurs
// d3.selectAll("#selDataset").on("change", updatePlotly);




// Build Demograpghic Table
// d3.json("static/js/samples.json").then(function(data) {
//   // console.log(data);
//   var patient_name = data.names;
//   // console.log(patient_name);
//   var Samples = data.samples;
//   // console.log(Samples);
//   var demographics = data.metadata;
//   //console.log(demographics);



// // Gets data from JSON file for Plots
// d3.json("static/js/samples.json").then(function(data) {
//     // console.log(data);

//     var patient_name = data.names;
//     // console.log(patient_name);
//     var Samples = data.samples;
//     // console.log(Samples);
//     var demographics = data.metadata;
//     //console.log(demographics);

//     function updatePlotly () {
//     // Use D3 to select the dropdown menu
//       var dropdownMenu = d3.select("#selDataset");
//   // Assign the value of the dropdown menu option to a variable
//       var selected_name = dropdownMenu.node().value;

//       // var CHART = d3.selectAll("#plot").node();





  // });
