
// Create intitial default plot
function int() {
  d3.json("static/js/samples.json").then((data) => {
    // console.log(data);

    data.names.forEach(row => {
      //console.log(row);
      d3.select("#selDataset")
      .append("option")
      .text(row)
      .property("value");
    });
    displayPlot(data.names[0]);
    demographics(data.names[0]);
  });
};

// function to create & populate demographic data
function demographics(id) {
  d3.json("static/js/samples.json").then((data) => {
    var metadata = data.metadata.filter(meta=>meta.id.toString() === id)[0];
    // console.log(metadata);
    
    d3.select("#sample-metadata").html("");
    Object.entries(metadata).forEach((row)=>{
      d3.select("#sample-metadata")
      .append('p')
      .text(row[0]+ ' ' +":" + " " +row[1] + "\n");
    });
  });
};

// function to generate graphs and display data
function displayPlot(id) {
  d3.json("static/js/samples.json").then((data) => {
    var metadata = data.metadata.filter(meta=>meta.id.toString() === id)[0];
    
    //filter samples by name id
    var sample_id = data.samples.filter(s => s.id.toString() === id)[0];

  
    // Get top 10 OTU ids and values
    top10otu_values = sample_id.sample_values.slice(0,10).reverse();
    top10otu_ids = sample_id.otu_ids.slice(0,10).reverse();
    // console.log(top10otu_ids);
    // console.log(top10otu_values);

    // convert OTU IDs to Strings for graphing
    otu_ids_name = top10otu_ids.map(d=> "OTU " + d);
    console.log(otu_ids_name)

    // Build bar chart
    var trace1 = {
      x: top10otu_values,
      y: otu_ids_name,
      type:"bar",
      text: otu_ids_name.map(String),
      textpostion: 'auto',
      hoverinfo: 'none',
      orientation: "h",
      marker: {
        color: 'blue',
        line: {
          color: 'black',
          width: 1.5
        }
      },
    }

    var data = [trace1];

    var layout = {
      title: "Top 10 OTU IDs for " + sample_id.id,
      height: 500,
      width: 1000,
      bargap: 0.1,
      xaxis: {title: 'Top 10 Sample Values'},
    };

// Build Bubble Chart
    var trace2 = {
      x: top10otu_ids,
      y: top10otu_values,
      text: otu_ids_name,
      mode: 'markers',
      marker: {
        size: top10otu_values,
        color: top10otu_ids,
      }    
    }

    var data1 = [trace2];

    var layout1 = {
      title: 'Bubble Chart for' +' ' + sample_id.id,
      height:500,
      xaxis:{title: 'Top 10 OTU IDs'},
      yaxis: {title: 'Top 10 Sample Values'},
    } 

  // Plot charts 
  Plotly.newPlot("bar", data, layout);
  Plotly.newPlot("bubble", data1, layout1);  
  });

}

//Function to refresh graphs with selected data
function optionChanged(id) {
  displayPlot(id);
  demographics(id);
}

int();


