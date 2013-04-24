Ext.define('gsocdemo.controller.Main',{
    extend: 'Ext.app.Controller', 
    views: ['Viewport'],    
    models: ['Main'],
    init: function(){
        check= function(){
            Ext.Ajax.request({
                url: 'http://pycutter.uphero.com/gsocdemo.php',
                useDefaultXhrHeader:false,
                success: function(response) {
                    gsocdemo.app.online=true;
                    if(localStorage.getItem("gsoc-demo")!==''){
                        syncOfflineData();
                     }
                },
                failure: function(a){
                    gsocdemo.app.online=false;
                    
                }
            });
        };
        syncOfflineData= function() {
            var ids = localStorage.getItem("gsoc-demo").split(",");
            console.log(ids);
            for(var i in ids) {
                console.log(localStorage.getItem(ids[i]));
                console.log(localStorage.getItem("gsoc-demo-"+ids[i]));
                var offlinedata = JSON.parse(localStorage.getItem("gsoc-demo-"+ids[i]));
                var parsedData =  {
                        "names":[{
                            "givenName":offlinedata.firstname,
                            "familyName":offlinedata.familyname
                        }],
                        "age":offlinedata.age,
                        "gender":offlinedata.gender
                };
                sendData(parsedData);
            }
            var offlinestore = Ext.create('Ext.data.Store',{
                model: 'gsocdemo.model.Main',
            }); 
            offlinestore.getProxy().clear();
        };

        setInterval("check()",10000);
        this.control({
            'button[action=submit]':{
                tap: function(){
                    var firstname = Ext.getCmp('firstname').getValue();
                    var familyname = Ext.getCmp('familyname').getValue();
                    var age = Ext.getCmp('age').getValue();
                    var gender = Ext.getCmp('gender').getValue();
                    var data =  {
                        "names":[{
                            "givenName":firstname,
                            "familyName":familyname
                        }],
                        "age":age,
                        "gender":gender
                    };
                    if(gsocdemo.app.online === true) {
                        sendData(data);
                    }
                    else{
                        var offlinestore = Ext.create('Ext.data.Store',{
                            model: 'gsocdemo.model.Main',
                        }); 
                        offlinestore.add({"firstname":firstname,"familyname":familyname,"age":age,"gender":gender});
                        offlinestore.sync();
                        //offlinestore.remove(offlinestore.getRange());
                    }
                }
            }
        });
        sendData= function(data) {
            var data = JSON.stringify(data);
            console.log(data);
            Ext.Ajax.request({
                url: 'http://raxa.io:8080/openmrs/ws/rest/v1/raxacore/patient',
                useDefaultXhrHeader: false,
                headers: {
                    "Authorization" : "Basic YmhhcmF0aDpIZWxsbzEyMw==",
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                params: data,
                success: function(response) {
                    console.log("great");
                },
                failure: function(a){
                    console.log("No");
                    var offlinestore = Ext.create('Ext.data.Store',{
                        model: 'gsocdemo.model.Main',
                    }); 
                    offlinestore.add({"firstname":firstname,"familyname":familyname,"age":age,"gender":gender});
                    offlinestore.sync();
 
                }
            });
        };
    
    }
});
