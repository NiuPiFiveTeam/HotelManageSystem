Ext.define('Admin.view.attence.AttenceGridPanel' , {
    extend : 'Ext.panel.Panel' ,
    id : 'attenceGridPanel' ,
    xtype : 'attenceGridPanel' ,
    cls: 'attenceGridPanel',
    requires: [
        'Ext.panel.Panel',
        'Ext.toolbar.Paging',
        'Ext.grid.column.Date',
        'Ext.selection.CheckboxModel',
        'Ext.layout.container.VBox',
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.form.field.Checkbox',
        'Ext.button.Button',
        'Ext.draw.Sprite',
        'Ext.draw.Container'
    ],
    title: '考勤打卡',
    layout: {
        type: 'vbox',
        align: 'center'
    },
    items: [{
            xtype: 'form',
            defaultButton : 'loginButton',
            defaultType: 'textfield',
            autoComplete: true,
            cls: 'auth-dialog-login',
            header: false,
            //width: 600,
            layout: {
                type: 'vbox'
                ,align: 'center'
            },

        items: [
        {
            xtype: 'image',
            height: 180,
            width:1400,
            //style: "width: 100%;",
            alt:'current user image',
            src: 'resources/images/attence.png'
        },
        {
            xtype: 'container',
            layout: 'hbox',
            
            //margin:'60',
            items: [
                {
                  xtype: 'container',
                  layout: 'vbox',
                  padding: '100 200 20 40',
                  items:[
                        {
                            xtype: 'draw',
                            //padding: '20 0 10 40',
                            height:200,
                            width:200,
                            
                            listeners: {
                                  render: 'beginHandler'
                              },
                            sprites:[
                             {
                                type: 'circle',
                                fillStyle: '#00FFFF',
                                fillOpacity: 0.5,
                                cx:100,
                                cy:100,
                                r: 80
                             },
                             {
                                type:'circle',
                                fill: '#F5F5DC',
                                cx: 100,
                                cy:100,
                                r:20
                             },
                             {
                                type: 'text',
                                text: '上班打卡',
                                x: 40,
                                y:110,
                                fontSize: 30,
                                fillStyle: '#000000'
                             }
                            ]
                        },
                        {
                          xtype: 'label',
                          id:'newPWD',
                          //html:''
                          text: 'Sign into your massage'
                        },
                        {
                          xtype: 'label',
                          text: 'Sign into your massage'
                        },
                        {
                          xtype: 'label',
                          text: 'Sign into your massage'
                        }

                  ]
                  
                },
                {
                  xtype: 'container',
                  layout: 'vbox',
                  padding: '100 200 20 100',
                  items:[
                        {
                            xtype: 'draw',
                            //padding: '20 0 10 40',
                            height:200,
                            width:200,
                            
                            listeners: {
                                  render: 'endWorkHandler'
                              },
                            sprites:[
                             {
                                type: 'circle',
                                fillStyle: '#00FFFF',
                                fillOpacity: 0.5,
                                cx:100,
                                cy:100,
                                r: 80
                             },
                             {
                                type:'circle',
                                fill: '#F5F5DC',
                                cx: 100,
                                cy:100,
                                r:20
                             },
                             {
                                type: 'text',
                                text: '下班打卡',
                                x: 40,
                                y:110,
                                fontSize: 30,
                                fillStyle: '#000000'
                             }
                            ]
                        },
                        {
                          xtype: 'label',
                          text: 'Sign into your massage'
                        },
                        {
                          xtype: 'label',
                          text: 'Sign into your massage'
                        },
                        {
                          xtype: 'label',
                          text: 'Sign into your massage'
                        }

                  ]
                  
                }

            ]
        }
    ]
    }]
});