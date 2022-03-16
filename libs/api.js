import { Suhu } from '../libs/suhu.js';

if (Meteor.isServer) {
	var Api = new Restivus({
    	prettyJson: true
  	});

  	Api.addRoute('suhu/:id', {authRequired: false}, {
	    get: function () {
	      	return {status:'success'}
	    },
	    post: function() {
	    	//console.log(this.bodyParams)
	    	const data = this.bodyParams
	    	Suhu.insert({suhu:parseInt(data.suhu), sensorId:data.sensorId, createdAt:new Date()})
	    	return {status:'success'}
	    }
	});

}