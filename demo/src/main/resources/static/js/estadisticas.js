$(function() {

		$.ajax({
			url : '/estat',
			type : "GET",
			dataType : "json",
			success : onDataReceived
		});

		function onDataReceived(data) {

            // 1
            Highcharts.chart('container-line', {
                title: {
                    text: 'Grafico 1 : Cantidades de actividades por dia'
                },
                yAxis: {
                    title: {
                        text: 'Cantidad de actividades'
                    }
                },
                xAxis: {
                    categories: ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'],
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },
                series: data[0],

                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }

            });

            // 2
			Highcharts.chart("container-pie", {
                chart: {
                    type: "pie",
                    zooming: {
                    type: "xy",
                    },
                    panning: {
                    enabled: true,
                    type: "xy",
                    },
                    panKey: "shift",
                },
                title: {
                    text: "Grafico 2 : Total de actividades por tipo",
                },
                tooltip: {
                    valueSuffix: "%",
                },
                plotOptions: {
                    pie: {
                    allowPointSelect: true,
                    cursor: "pointer",
                    dataLabels: [
                        {
                        enabled: true,
                        distance: 20,
                        },
                        {
                        enabled: true,
                        distance: -40,
                        format: "{point.percentage:.1f}%",
                        style: {
                            fontSize: "1.2em",
                            textOutline: "none",
                            opacity: 0.7,
                        },
                        filter: {
                            operator: ">",
                            property: "percentage",
                            value: 10,
                        },
                        },
                    ],
                    },
                },
                series: [
                    {
                    name: "Percentage",
                    colorByPoint: true,
                    data: data[1],
                    },
                ],
                })

            // 3
            Highcharts.chart('container-chart', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Grafico 3 : total de actividades por mes y por parte del dia'
                },
                
                xAxis: {
                    categories: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
                    crosshair: true,
                    accessibility: {
                        description: 'Countries'
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Cantidad  de  actividades'
                    }
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: data[2]
            });
		}
	});

   
