import ApexCharts from 'apexcharts';
import moment from 'moment';
import { Session } from 'meteor/session';

import './suhu.html';

import { Suhu } from '../../libs/suhu.js';

Template.suhu.onRendered(function helloOnCreated() {
  	// counter starts at 0
  	this.counter = new ReactiveVar(0);
  	Meteor.subscribe('Suhu',{},{sort:{createdAt:-1},limit:20});
  	Meteor.call('Suhu.maxmin',(err,suc)=>{
  		if(suc){
  			console.log(suc)
  			Session.set('minmax',suc)
  		}
  	})
});

Template.suhu.helpers({
	suhulist(){
		const data = Suhu.find({},{sort:{createdAt:-1},limit:20});
		console.log(data);
		let dat = []
		let lbl = []
		if(data){
			data.forEach(x=>{
				dat.push(x.suhu)
				lbl.push(moment(x.createdAt).format('D/M hh:mm'))
			});

			setTimeout(function() {
				console.log(dat)
				console.log(lbl)
				createChart(dat, lbl);
			}, 1000);
		}
		
	},
  	minMax() {
  		const mim = Session.get('minmax')
    	if(mim){
    		return mim
    	}
  	},
});

Template.suhu.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

function createChart(data, label){
	if ( document.querySelector("#charts-demo-1").hasChildNodes() ) {
        document.querySelector("#charts-demo-1").innerHTML = '';
    }
	var options = {
        series: [{
	          name: 'Suhu',
	          data: data
	        }, {
	          name: 'Kembapan',
	          data: [11, 32, 45, 32, 34, 52]
	        }],
          chart: {
          height: 350,
          type: 'area'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          categories: label
        },
        
    };
	
	var chart = new ApexCharts(document.querySelector('#charts-demo-1'), options)
	chart.render()
	
}