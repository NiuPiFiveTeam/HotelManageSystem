Ext.define('Admin.view.companyWork.workChart.EmpworkYearchart', {
    extend: 'Ext.Panel',
    xtype: 'empworkYearchart',
    requires: ['Ext.chart.theme.Muted'],
    controller: 'empworkYearchartController',
    // controller: 'employViewController',
    viewModel: {type: 'workchartYearViewModel'},
    width: 650,

    items: [{
    dockedItems:[{
        xtype:'toolbar',
        dock:'top',
        items:[{
                xtype: 'combobox',
                fieldLabel:'选择年份',
                //hideLabel: true,
                reference:'searchFieldName',
                store:Ext.create("Ext.data.Store", {
                    fields: ["name", "value"],
                    data: [

                        { name: '1', value: '2018' },
                        { name: '2', value: '2017' },
                        { name: '3', value: '2016' },
                        { name: '4', value: '2015' },
                        { name: '5', value: '2014' }

                    ]
                }),
                displayField: 'value',
                valueField:'value',
                value:'2018',
                editable: false,
                queryMode: 'local',
                triggerAction: 'all',
                
                width: 250,
                listeners:{
                    select: 'searchComboboxSelect'
                }
            }]
    }




    ]



  },{
        xtype: 'cartesian',
        width: '100%',
        height: 600,
        captions: {
            title: {
                text: '公司出勤状态表',
                alignTo: 'chart'
            },
            subtitle: {
                text: '各项考勤指标',
                alignTo: 'chart'
            }
        },
        theme: 'Muted',
        interactions: ['itemhighlight'],
        animation: {
            duration: 200
        },
        // store: {
        //     xtype:'workyearempStore'
        // },
        bind: '{WorkyearempchartStoreList}',
        
        legend: {
            type: 'dom',
            docked: 'bottom'
        },
        axes: [{
            type: 'numeric3d',
            position: 'left',
            fields: ['late', 'leaveEarly', 'lackcard', 'leave', 'travel'],
            grid: true,
            title: '次数状态',
            renderer: 'onAxisLabelRender'
        }, {
            type: 'category3d',
            position: 'bottom',
            fields: 'quarter',
            title: {
                text: 'Quarter',
                translationX: -30
            },
            grid: true
        }],
        series: {
            type: 'bar3d',
            stacked: false,
            title: ['迟到人数', '早退人数', '缺卡人数', '请假人数', '出差人数'],
            xField: 'quarter',
            yField: ['late', 'leaveEarly', 'lackcard', 'leave', 'travel'],
            label: {
                field: ['late', 'leaveEarly', 'lackcard', 'leave', 'travel'],
                display: 'insideEnd',
                renderer: 'onSeriesLabelRender'
            },
            highlight: true,
            style: {
                inGroupGapWidth: -7
            }
        }
    }, {
        style: 'margin-top: 10px;',
        xtype: 'container',
        
        layout: {
            type: 'hbox',
            pack: 'center'
        },
        width: '100%',
        items: [{
            xtype: 'gridpanel',
            bind: '{WorkyearempchartStoreList}',
            width: 600,
            columns : {
                defaults: {
                    sortable: false,
                    menuDisabled: true,
                    renderer: 'onGridColumnRender'
                },
                items: [
                    { text: '月份', dataIndex: 'quarter', renderer: Ext.identityFn },
                    { text: '迟到', dataIndex: 'late' },
                    { text: '缺卡', dataIndex: 'lackcard' },
                    { text: '迟到', dataIndex: 'leave' },
                    { text: '出差', dataIndex: 'travel' },
                    { text: '早退', dataIndex: 'leaveEarly' }
                ]
            },
            
        }]
        //</example>
    }
        

    ]

});