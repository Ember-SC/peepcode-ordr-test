var testing = function(app){

    var helper = {
        container: function(){
            return app.__container__;
        },
        appController: function(){
            return helper.container().lookup('controller:application');
        },
        router: function(){
            return helper.container().lookup('router:main');
        },
        path: function(){
            return helper.appController().get('currentPath');
        },
        routeName: function(){
            return helper.path().split('.').pop();
        },
        route: function(){
            return helper.container().lookup('route:' + helper.routeName());
        },
        controller: function(){
            return helper.route().get('controller');
        },
        model: function(){
            return helper.route().get('currentModel');
        },
        transitionTo: function(){
            return helper.router().transitionTo.apply(helper.router(), arguments);
        },
        send: function(){
            return helper.router().send.apply(helper.router(), arguments);
        },
        lookup: function(path) {
            return helper.container().lookup(path);
        },
        activeView: function(name) {
            return helper.router()._lookupActiveView(name);
        },
        lastSetURL: function(){
            return helper.router().location.lastSetURL;
        },
        navigateTo: function(url){
            return helper.router().handleURL(url);
        }
    };

    return helper;
};
