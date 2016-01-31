
// CLIENT ONLY

Meteor.ClientCall._clientIdDep = new Deps.Dependency();

Meteor.ClientCall._clientId = null;

Meteor.ClientCall.setClientId = function(clientId) {
  if (Meteor.ClientCall._clientId){
  	Meteor.ClientCall._ids.remove({clientId : Meteor.ClientCall._clientId});
  }
  Meteor.ClientCall._clientId = clientId;
  Meteor.ClientCall._clientIdDep.changed();
  Meteor.ClientCall._ids.insert({clientId : clientId}); 
}

Meteor.ClientCall.getClientId = function() {
  Meteor.ClientCall._clientIdDep.depend();
  return Meteor.ClientCall._clientId;
}

Deps.autorun(function() {
  Meteor.subscribe('meteor-clientCall-channel', Meteor.ClientCall.getClientId());
});


