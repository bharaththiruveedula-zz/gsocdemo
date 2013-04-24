Ext.define('gsocdemo.view.Viewport',{
    extend: 'Ext.form.Panel',
    requires:[
        'Ext.MessageBox'
    ],
    config:{
        layout: {
            type: 'vbox'
        },
        fullscreen: true,
        items:[
            {
                xtype: 'fieldset',
                id: "myform",
                items: [
                    {
                        xtype: 'textfield',
                        label: 'First Name',
                        name:"firstname",
                        id:'firstname'
                    },
                    {
                        xtype: 'textfield',
                        label: 'Family Name',
                        id:"familyname"
                    },
                    {
                        xtype: 'textfield',
                        id: 'gender',
                        label:'Gender',
                    },
                    {
                        xtype: 'textfield',
                        id:'age',
                        label: 'Age',
                    },
                    {
                        xtype: 'button',
                        ui: 'confirm',
                        text: 'submit',
                        action: 'submit'
                    }
                ]
            }
        ]
    }
});
