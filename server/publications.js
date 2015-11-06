Meteor.publish('globalChat', function() {
	if (!this.userId)
		return [];

	return GlobalChat.find({}, {sort: {created: -1}, limit: 100});
});

Meteor.publish('lobbyChat', function(lobbyId) {
	if (!this.userId)
		return [];
	
	return LobbyChat.find({lobbyId: lobbyId}, {sort: {created: -1}});
});

Meteor.publish('lobbies', function() {
	if (!this.userId)
		return [];
	
	return Lobbies.find({}, {fields: {
		players: true,
		name: true,
		official: true,
		type: true,
		currentGame: true,
		config: true
	}});
});

//Acro specific stuff
