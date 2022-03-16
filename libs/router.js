import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

FlowRouter.route( '/', {
  name: 'charts',
  action() {
    BlazeLayout.render('layout', {main: 'suhu'});
  }
});