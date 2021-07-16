looker.plugins.visualizations.add({
create: function(element, config) {
  element.innerHTML = `
	<style>
	.sannith {
	min-width: 310px;
	height: 700px
	}
	</style>
	`;
	
    var container = element.appendChild(document.createElement("div"));
	container.className = "sannith";
    container.id = 'container';
		
  },

updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
// Clear any errors from previous updates:
this.clearErrors();

// Dump data and metadata to console:
console.log('updateAsync() data', data)
console.log('updateAsync() config', config)
console.log('updateAsync() queryResponse', queryResponse)
	
// get the names of the first dimension and measure available in data

//x  = config.query_fields.measures[0].name;     // recipients
//y  = config.query_fields.measures[1].name;     // opens
//z  = config.query_fields.measures[2].name;      // clicks
a  = config.query_fields.dimensions[0].name;     // measure 
b  = config.query_fields.dimensions[1].name;     // quantity 	
	
var ad = [];	
for(var row of data) {
	var cell = row[queryResponse.fields.dimensions[0].name]
	ad.push([{
		"name"  : row[a].value,
		"value" : row[b].value
	}]);
	}
	
//var xd = [];
//for(var row of data) {
//	var cell = row[queryResponse.fields.measures[0].name]
//	xd.push([
//		row[x].value 
//	]);
//}

//var yd = [];
//for(var row of data) {
//	var cell = row[queryResponse.fields.measures[1].name]
//	yd.push([
//		row[y].value 
//	]);
//}

//var zd = [];
//for(var row of data) {
//	var cell = row[queryResponse.fields.measures[2].name]
//	zd.push([
//		row[z].value 
//	]);
//}
 
 //var data_1 = [{
 //   "name": "Recipients",
 //   "value": row[x].value
//}, {
//    "name": "Opens",
 //   "value": row[y].value
//}, {
 //   "name": "Clicks",
 //   "value": row[z].value
//}];
	
// Themes begin
am4core.useTheme(am4themes_material);	
am4core.useTheme(am4themes_animated);
am4core.options.autoDispose = true;	
// Themes end
	
var chart = am4core.create("container", am4charts.SlicedChart);
chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
console.log(ad)
chart.data =ad ;

var series = chart.series.push(new am4charts.FunnelSeries());
series.colors.step = 2;
series.dataFields.value = "value";
series.dataFields.category = "name";
series.alignLabels = true;

series.labelsContainer.paddingLeft = 15;
series.labelsContainer.width = 200;

//series.orientation = "horizontal";
series.bottomRatio = 1;

chart.legend = new am4charts.Legend();
chart.legend.position = "left";
chart.legend.valign = "bottom";
chart.legend.margin(5,5,20,5); 	
 
doneRendering();
}
})
