import {Games, Lobbies, GlobalFeed, LobbyFeed, HallOfFame, Nags, Events} from '../imports/collections';

Meteor.publish('globalFeed', function(limit) {
	const maxFeedResults = 200;
	if (limit > maxFeedResults)
		limit = maxFeedResults;

    // Show hidden chats for shadowbanned user, else show all non-hidden chats
	return GlobalFeed.find({
        $or: [
            { user: this.userId },
            { hidden: { $ne: true } }
        ]
    }, {sort: {timestamp: -1}, limit: limit});
});

Meteor.publish('lobbyFeed', function(lobbyId, limit) {
	const maxFeedResults = 200;

	if (!this.userId)
		return [];

	if (limit > maxFeedResults)
		limit = maxFeedResults;

    // Show hidden chats for shadowbanned user, else show all non-hidden chats
	return LobbyFeed.find({
	    lobbyId: lobbyId,
        $or: [
            { user: this.userId },
            { hidden: { $ne: true } }
        ]
	}, { sort: { timestamp: -1	}, limit: limit	});
});

Meteor.publish('lobbies', function() {
	return Lobbies.find({}, {fields: {
		players: true,
		displayName: true,
		official: true,
		type: true,
		currentGame: true,
		config: true,
		newGameStarting: true,
		endTime: true,
		lastUpdated: true
	}});
});

Meteor.publish('otherPlayers', function(playerIdList) {
	return Meteor.users.find({_id: {$in: playerIdList}}, {fields: {
		username: true,
		createdAt: true,
		profile: true,
		'status.online': true
	}});
});

Meteor.publish('allOnlinePlayers', function() {
	return Meteor.users.find({'status.online': true}, {fields: {
		username: true,
		createdAt: true,
		profile: true,
		'status.online': true
	}});
});

Meteor.publish('currentGame', function(currentGame) {
	if (!this.userId || !currentGame)
		return [];

	return Games.find({_id: currentGame});
});

Meteor.publish('hallOfFame', function(limit, userId) {
	const selector = {
		active: true
	};
	
	if (userId)
		selector.userId = userId;
	
	return HallOfFame.find(selector, { sort: { created: -1 }, limit: limit });
});

Meteor.publish('playerRankings', function(limit) {
    if (limit > 250)
        limit = 250;

	return Meteor.users.find({
		'profile.trueskill.rankedGames': {$gte: Meteor.settings.public.leaderboardMinimumGamesToBeVisible}
	}, {
		sort: {'profile.trueskill.skillEstimate': -1},
		limit: limit || 50,
		fields: {
			username: true,
			createdAt: true,
			profile: true,
			'status.online': true
		}
	});
});

Meteor.publish('nags', function(closedNags) {
	if (!this.userId)
		return [];

	if (closedNags)
		return Nags.find({active: true, _id: {$not: {$in: closedNags}}});
	else
		return Nags.find({active: true});
});

Meteor.publish('events', function() {
    const date = moment().subtract(1, 'h').toDate();
    return Events.find({ date: { $gte: date } }, { sort: {date: 1 }, limit: 3 });
});