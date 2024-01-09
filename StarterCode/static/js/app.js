const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

function init() {
    let dropdownmenu = d3.select("#selDataset");
    //Retrieve Json data
        d3.json(url).then(function(Data) {
            console.log(Data);
    
            let namelist = Data.name;
    
            namelist.forEach((name) => {
                dropdownmenu.append("option").text(name).property("value", name);
    
            });
    
            let name = namelist[0];
    
            demographics(name);
            bar(name);
            bubble(name);
        });
    }
    
function demographics(options) {

    //Fetch Json Data
    d3.json(url).then((Data) => {
        console.log(`Data: ${Data}`);

        let metadatalist = Data.metadata;
        //Filter based on option
        let filteredmetaData = metadatalist.filter((meta) => meta.id == options);
        //Assign first object to variable
        let firstmetavalue = filteredmetaData[0]

        d3.select("#sample-metadata").html("");

        let enteredvalues = Object.entries(firstmetavalue);

        //Iterate through values
        enteredvalues.forEach(([key,value]) => {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);

        });

        // log entries
    
        console.log(enteredvalues);


    });
}

// Creating the Bar Chart

function bar(options) {

    // Fetch JSON data
    d3.json(url).then((Data) => {
        console.log(`Data: ${Data}`);

        let sampleset = Data.samples;

        let fiteredsampleset = sampleset.filter((sample) => sample.id == options);
        let firstset = fiteredsampleset[0];
        //Trace Data
        let trace = [{
            x : firstset.sample_values.slice(0,10).reverse(),
            y: firstset.otu_ids.slice(0,10).map((otu_id) => `otu ${otu_id}`).reverse(),
            type: "bar",
            marker: {
                color: "rgb(160,178,239"
            },
            orientation: "h"
        }];

        //Plot Chart using plotly
        Plotly.newPlot("bar", trace);
    });
}

// Creating Bubble Chart
function bubble(options) {
    d3.json(url).then((Data) => {

        let sampleset1 = Data.samples;

        let filteredsamset = sampleset1.filter((sample) => sample.id == options);

        let firstsamset = filteredsamset[0];

        let trace = [{
            x: firstsamset.otu_ids,
            y: firstsamset.sample_values,
            text: firstsamset.otu_labels,
            mode: "markers",
            marker: {
                size: firstsamset.sample_values,
                color: firstsamset.otu_ids,
                colorscale:"Sunset"

            }
    
        }];

        let layouts = {
            xaxis: {title: "OTU ID"}
        };

        //Plot bubble chart using plotly
        Plotly.newPlot("bubble", trace, layouts);
    });


}

function optionChanged(options) {
    demographics(options);
    bar(options);
    bubble(options);

}

init();