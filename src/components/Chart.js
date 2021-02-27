import React from 'react';
import {Pie} from 'react-chartjs-2';

function Chart({ratings}) {
	const labels = ratings.map(rating => rating.title);
	const colors = ratings.map(rating => {
		switch (rating.title) {
			case 'exceptional':
				return '#4CAF50';
			case 'recommended':
				return '#00BCD4';
			case 'meh':
				return '#FFEB3B';
			default:
				return '#BDBDBD';
		}
	});
	const valueData = ratings.map(rating => rating.count);

	const data = {
		labels: labels,
		datasets: [
			{
				data: valueData,
				backgroundColor: ['#85929E', '#BFC9CA', '#D0D3D4', '#ECF0F1'],
				hoverBackgroundColor: colors,
			},
		],
	};

	return (
		<div
			style={{
				padding: 30,
				background: 'black',
				boxShadow: '0px 0px 10px gray',
			}}>
			<h2>Ratings</h2>
			<Pie data={data} width={500} />
		</div>
	);
}

export default Chart;
