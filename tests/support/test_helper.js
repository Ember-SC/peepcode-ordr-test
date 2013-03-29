var testing = function(app){
    var container = app.__container__,
        appController = container.lookup('controller:application'),
        router = container.lookup("router:main");

    var helper = {
        path: function(){
            return appController.get('currentPath');
        },
        routeName: function(){
            return helper.path().split('.').pop();
        },
        route: function(){
            return container.lookup('route:' + helper.routeName());
        },
        controller: function(){
            return helper.route().get('controller');
        },
        model: function(){
            return helper.route().get('currentModel');
        },
        transitionTo: function(){
            return router.transitionTo.apply(router, arguments);
        },
        send: function(){
            return router.send.apply(router, arguments);
        },
        lookup: function(path) {
            return container.lookup(path);
        },
        activeView: function(name) {
            return router._lookupActiveView(name);
        },
        lastSetURL: function(){
            return router.location.lastSetURL;
        },
        navigateTo: function(url){
            return router.handleURL(url);
        }
    };
    return helper;
};