
// SERVER ONLY

// TODO: add `call` method!
// TODO: implement callbacks!


Meteor.ClientCall._callbacks = {};

Meteor.ClientCall.apply = function(clientId, method, arguments, callback) {
  var messageId = Meteor.ClientCall._messages.insert({
    clientId: clientId,
    method: method,
    arguments: arguments,
    time: new Date().getTime(),
  });

  if(callback) Meteor.ClientCall._callbacks[messageId] = callback;
};

Meteor.ClientCall.callAll = function(method,arguments,callback) {
  var arr = new Array();
  Meteor.ClientCall._ids.find().forEach(function(data){
    arr.push(data);    
  });
  arr.forEach(function(item,i,arr){
    Meteor.ClientCall._messages.insert({
      clientId: item.id,
      method: method,
      arguments: arguments,
      time: new Date().getTime(),
    });
  });

  if (callback) Meteor.ClientCall._callbacks[messageId] = callback;
}

Meteor.methods({

  'meteor-clientCall-received': function(messageId, error, result) {
    Meteor.ClientCall._messages.remove(messageId);
    
    if(Meteor.ClientCall._callbacks[messageId]) {
      Meteor.ClientCall._callbacks[messageId].call(null, error, result);
      delete Meteor.ClientCall._callbacks[messageId];
    }
  },

  'setClientId' : function(id){
    Meteor.ClientCall._ids.insert({id : id});
  },

  'deleteClientId' : function(id){
    Meteor.ClientCall._ids.remove({id : id});
  }
});
