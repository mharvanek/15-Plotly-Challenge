function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  var url = `/metadata/${sample}`;
  d3.json(url).then(function(response) {

    var metadata = response;

   // console.log(metadata);


    // Use d3 to select the panel with id of `#sample-metadata`
    var metadata_list = d3.select("#metadata-list");
    // Use `.html("") to clear any existing metadata
    metadata_list.html("");

    // Use `Object.entries` to add each key and value pair to the panel

    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(metadata).forEach(([key, value]) => {
      // Log the key and value
      console.log(`Key: ${key} and Value ${value}`);
      var li = metadata_list.append("li").text(`${key}: ${value}`);
    });    

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
  });
  }

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var url = `/samples/${sample}`;
  d3.json(url).then(function(response) {

    var samples = response;

    console.log(samples);  

    // @TODO: Build a Bubble Chart using the sample data
    var bubbleTrace = {
      type: "scatter",
      mode: "markers",
      name: "",
      x: samples.otu_ids.slice(0,10),
      y: samples.sample_values.slice(0,10),
      marker: {
        size: samples.sample_values.slice(0,10)
      }
    };

    var bubbleData = [bubbleTrace];

    var layout = {
      title: "",
      xaxis: {
        type: "date"
      },
      yaxis: {
        autorange: true,
        type: "linear"
      }
    };

    Plotly.newPlot("bubble", bubbleData, layout);

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    var pieTrace = {
      labels: samples.otu_ids.slice(0,10),
      values: samples.sample_values.slice(0,10),
      type: 'pie'
    };
    
    var pieData = [pieTrace];
    
    Plotly.newPlot("pie", pieData);
  });
  }

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
