/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'Admin.Application',

    name: 'Admin',

    requires: [
        // This will automatically load all classes in the Admin namespace
        // so that application classes do not need to require each other.
        'Admin.*',
        'Ext.chart.*'
        
    ],

    // The name of the initial view to create.
    mainView: 'Admin.view.main.Main'
});
