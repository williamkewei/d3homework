function buildData (sampleId) {
    d3.json("samples.json").then((data)=>{
        var metadata = data.metadata;
        var resultarray =metadata.filter(sampleObject =>sampleObject.id ==sampleId);
        var resultitem = resultarray[0]
        var Panel = d3.select("#sample-metadata");
        Panel.html("");
        Object.entries(resultitem).forEach(([key,value]) => {
            Panel.append("h6").text(`${key}: ${value}`);
        })
    })
}

function buildcharts(sampleId) {
    d3.json("samples.json").then((data)=>{
        var sampledata = data.samples;
        var resultarray =sampledata.filter(sampleObject =>sampleObject.id ===sampleId);
        var resultitem = resultarray[0]
        var ids = resultitem.otu_ids;
        var labels = resultitem.otu_labels;
        var values = resultitem.sample_values;

        var LayourtBubble = {
            margin : { t: 0},
            xaxis: {title: "Id's"},
            hovermode: "closest",
        };
        var DataBubble = [{
            x: ids,
            y: values,
            text : labels,
            mode : "markers",
            marker:{
                color:ids,
                size:values,
            }
        }];
        Plotly.plot("bubble",DataBubble,LayourtBubble);

        var barData =[{
            y: ids.slice(0,10).map(X =>`OTU ${X}`).reverse(),
            x: values.slice(0,10).reverse(),
            text: labels.slice(0,10).reverse(),
            type: "bar",
            orientation:"h"

        }

        ];
        var barLayout = {
            title : "Top ten Bacteria Cultures ",
            margin :{ t:30, l:150}
        };
        Plotly.newPlot("bar",barData, barLayout);
        
 });

}

function driver() {
    var selector = d3.select("#selDataset");
    d3.json("samples.json").then((data)=>{
        var sampleNames = data.names;
        sampleNames.forEach((sample) =>{
            selector
            .append("option")
            .text(sample)
            .property("value",sample);
    });
    const firstSampleID= sampleNames[0];
    buildcharts(firstSampleID);
    buildData(firstSampleID);
})

}

    function optionChanged(newSampleID){
    buildcharts(newSampleID);
    buildData(newSampleID);
    }

    driver();
    



