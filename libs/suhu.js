import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Suhu = new Mongo.Collection('suhu');

if (Meteor.isServer) {
  Meteor.methods({
    'Suhu.insert'(datas){
        check(datas.sensorId,String);
        check(datas.suhu,String);
        let data = {sensorId:datas.sensorId, suhu:datas.suhu}
        data.createdAt = new Date()
        const kol = Suhu.insert(data);
        return kol
    },
    'Suhu.count'(filter){
        let data = filter
        if (!Roles.userIsInRole(Meteor.userId(),['superadmin'])) {
          data.createdBy = Meteor.userId();
        }
        const count = Suhu.find(data).count()
        return count
    },
    'Suhu.maxmin'(){
        const max = Suhu.findOne({},{sort:{suhu:-1}})
        const min = Suhu.findOne({},{sort:{suhu:1}})
        return {max:max, min:min}
    }
  });

  Meteor.publish('Suhu', function vmss(ops,par) {
    console.log('subscribed Suhu');
    let data = ops
    return Suhu.find(ops,par);
  });
  
}