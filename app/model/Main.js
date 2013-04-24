Ext.define('gsocdemo.model.Main',{
    extend: 'Ext.data.Model',
    config: {
        identifier:'uuid',
        fields: ['firstname','familyname','age','gender'],
        proxy: {
            type: 'localstorage',
            id:"gsoc-demo",
        }
    }
});
