/* REACT ROUTES */

import React from 'react';
import {mount} from 'react-mounter';

import {Layout} from '../imports/views/Layout';
import {HomeView} from '../imports/views/Home';
import {PlayView} from '../imports/views/Play';
import {LobbyView} from '../imports/views/Lobby';
import {HallOfFameView} from '../imports/views/HallOfFame';
import {LeaderboardView} from '../imports/views/Leaderboard';
import {ProfileView} from '../imports/views/Profile';
import {FriendsView} from '../imports/views/Friends';
import {PageNotFound} from '../imports/views/PageNotFound';
import {AdminMain, AdminHome, AdminHallOfFame, AdminNags, AdminEvents, AdminCategories} from '../imports/views/Admin';
import {ModeratorMain} from '../imports/views/Moderators';

FlowRouter.route('/', {
    name: 'home',
    action: function() {
        mount(Layout, {
            content: () => (<HomeView />)
        });
    }
});

const lobbyRoutes = FlowRouter.group({
    prefix: '/play',
    name: 'lobbies'
});

lobbyRoutes.route('/', {
    name: 'play',
    action: function() {
        mount(Layout, {
            content: () => (<PlayView />)
        });
    }
});

lobbyRoutes.route('/:lobbyId', {
    name: 'lobby',
    triggersEnter: [AccountsTemplates.ensureSignedIn],
    action: function(params) {
        mount(Layout, {
            content: () => (<LobbyView lobbyId={params.lobbyId}/>)
        });
    }
});

FlowRouter.route('/halloffame', {
    name: 'halloffame',
    action: function() {
        mount(Layout, {
            content: () => (<HallOfFameView />)
        });
    }
});

FlowRouter.route('/leaderboard', {
    name: 'leaderboard',
    action: function() {
        mount(Layout, {
            content: () => (<LeaderboardView />)
        });
    }
});

FlowRouter.route('/profile/:userId', {
    name: 'profile',
    action: function(params) {
        mount(Layout, {
            content: () => (<ProfileView userId={params.userId}/>)
        });
    }
});

FlowRouter.route('/friends', {
    name: 'friends',
    triggersEnter: [AccountsTemplates.ensureSignedIn],
    action: function() {
        mount(Layout, {
            content: () => (<FriendsView />)
        });
    }
});

FlowRouter.notFound = {
    action: function() {
        mount(Layout, {
            content: () => (<PageNotFound />)
        });
    }
};

/* BLAZE ROUTES */

const moderatorRoutes = FlowRouter.group({
    prefix: '/moderators',
    name: 'moderators',
    triggersEnter: [AccountsTemplates.ensureSignedIn]
});

moderatorRoutes.route('/', {
    name: 'moderatorHome',
    action: function() {
        mount(Layout, {
            content: () => (<ModeratorMain />)
        });
    }
});

moderatorRoutes.route('/categories', {
    name: 'moderatorCategories',
    action: function() {
        mount(Layout, {
            content: () => (<ModeratorMain subComponentString="categories" />)
        });
    }
});

moderatorRoutes.route('/halloffame', {
    name: 'moderatorHallOfFame',
    action: function() {
        mount(Layout, {
            content: () => (<ModeratorMain subComponentString="halloffame" />)
        });
    }
});

const adminRoutes = FlowRouter.group({
    prefix: '/admin',
    name: 'admin',
    triggersEnter: [AccountsTemplates.ensureSignedIn]
});

adminRoutes.route('/', {
    name: 'adminHome',
    action: function() {
        const subContent = <AdminHome />;
        mount(Layout, {
            content: () => (<AdminMain subContent={subContent} />)
        });
    }
});

adminRoutes.route('/halloffame', {
    name: 'adminHallOfFame',
    action: function() {
        const subContent = <AdminHallOfFame />;
        mount(Layout, {
            content: () => (<AdminMain subContent={subContent} />)
        });
    }
});

adminRoutes.route('/nags', {
    name: 'adminNags',
    action: function() {
        const subContent = <AdminNags />;
        mount(Layout, {
            content: () => (<AdminMain subContent={subContent} />)
        });
    }
});

adminRoutes.route('/events', {
    name: 'adminEvents',
    action: function() {
        const subContent = <AdminEvents />;
        mount(Layout, {
            content: () => (<AdminMain subContent={subContent} />)
        });
    }
});

adminRoutes.route('/categories', {
    name: 'adminCategories',
    action: function() {
        const subContent = <AdminCategories />;
        mount(Layout, {
            content: () => (<AdminMain subContent={subContent} />)
        })
    }
});

AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');