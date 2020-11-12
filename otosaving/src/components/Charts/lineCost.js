import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class LineChart extends Component {
	constructor(props){
		super(props);
	}
	render() {
		const data = this.props.data.map(e=>({
			x: new Date(e._id),
			y: e.cost
		}));
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", // "light1", "dark1", "dark2"
			title:{
				text: "Doanh thu theo tuần"
			},
			axisY: {
				title: "$",
				includeZero: false,
			},
			axisX: {
				title: "Date",
				valueFormatString: "DD-MM",
				interval: 2
			},
			data: [{
				type: "line",
				toolTipContent: "Week {x}: {y}%",
				dataPoints: data
			}]
		}
		
		return (
		<div>
			<CanvasJSChart options = {options} />
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default LineChart;                           