import { Component, OnInit } from '@angular/core';
import { Chart, registerables  } from 'chart.js';
Chart.register(...registerables);


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  ngOnInit(): void {
    this.createChart();
  }

  public chart: any;


  createChart() {

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
	       datasets: [
          {
            label: "Sales",
            data: ['167','376', '52', '79', '92',
								 '574', '673', '546'],
            backgroundColor: 'green'
          }, 
          {
            label: "Issues",
            data: ['380','76', '872', '479', '92',
								 '574', '573', '576'],
            backgroundColor: 'blue'
          }, 
          {
            label: "Building",
            data: ['467','776', '572', '79', '92',
								 '374', '53', '76'],
            backgroundColor: 'rgba(128,255,219,0.5)'
          }, 
          {
            label: "Equipment",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'pink'
          }  
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });


  }

}