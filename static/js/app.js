

// Need to create intitial with default plot
function int() {
  d3.json("static/js/samples.json").then((data) => {
    console.log(data);

    data,names.forEach(row => {
      console.log(row);
        d3.select("#selDataset")
        .append("option")
        .text(row)
        .property("value");
    });
    getPlotforRequestID(data.names[0]);
    demographics(data.names[0]);
  });
};

function demographics(id) {
  d3.json("static/js/samples.json").then((data) => {
    var demographic = data.metadata.filter(meta=>meta.id.toString() === id)[0];
    console.log(demographic);
    d3.select("#sample-metadata").html("");
    Object.defineProperties(demographic).forEach((row)=>{
      d3.select("#sample-metadata")
      .append('h6')
      .text(row[0]+ ' ' +":" + " " +row[1] + "\n");
    });
  });
};


function displayPlot(id) {
  d3.json("static/js/samples.json").then((data) => {

  });


}

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
