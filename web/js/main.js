require.config({
    baseUrl: 'bower_components',
    paths: {
        backbone: 'backbone/backbone',
        underscore: 'underscore/underscore',
        jquery: 'jquery/dist/jquery',
        marionette: 'backbone.marionette/lib/backbone.marionette',
        wreqr: 'backbone.wreqr/lib/backbone.wreqr',
        text: 'text/text',
        babysitter: 'backbone.babysitter/lib/backbone.babysitter'
    },
    shim: {
        jquery: {
            exports: 'jQuery'
        },
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        wreqr: {
            deps: ['backbone'],
            exports: 'Backbone.Wreqr'
        },
        babysitter: {
            deps: ['backbone']
        },
        marionette: {
            deps: ['wreqr', 'text', 'babysitter'],
            exports: 'Marionette'
        }
    }
});

// Loading dependences and module to execute Marionette App
require(["marionette",
        "../modules/RouterModule",
        "../modules/ControllerModule",
        "../modules/EventAggregatorModule",
        "../views/HeaderView",
        "../views/FooterView",
        "../views/MainView",
    ],
    function (Marionette, RouterModule, ControllerModule, EventAggregatorModule, HeaderView, FooterView, MainView) {
        // set up the app instance
        var MyApp = new Marionette.Application();

        // Define regions
        MyApp.addRegions({
            headerRegion: "#header-region",
            mainRegion: "#main-region",
            footerRegion: '#footer-region'
        });


        // Initialize the app controller
        // Pass reference to Main Region to Controller
        //var controller = new ControllerModule({
        //    mainRegion: MyApp.mainRegion,
        //});
        //
        //// initialize the router
        //MyApp.router = new RouterModule({
        //    controller: controller
        //});

        // Initialize the app router if neccessary
        MyApp.addInitializer(function (options) {
        });



        MyApp.on("before:start", function () {

            // Creating a generic ItemView for Header
            var headerView = new HeaderView();

            // Add Header View to region to be render
            MyApp.headerRegion.show(headerView);

            // Creating a generic ItemView for Footer
            var footerView = new FooterView();

            // Add Header View to region to be render
            MyApp.footerRegion.show(footerView);

            var mainView = new MainView();
            MyApp.mainRegion.show(mainView);

            // Add Form to render to main region and avoid be replaced

            MyApp.vent.on("myapp:buddy", function (buddy) {
                MyApp.router.navigate('#hello/' + buddy, {trigger: true});
            });

        });

        MyApp.start({});
    });
