const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const ODataServer = require("simple-odata-server");

let model = {
    namespace: "AzureDB",
    entityTypes: {
        "MyTableType": {
            "KeyValue": {"type": "Edm.String", key: true},
            "Item1": {"type": "Edm.String"},
            "Item2": {"type": "Edm.String"},
            "Item3": {"type": "Edm.String"}
        }
    }, 
    entitySets: {
        "myTable": {
            entityType: "AzureDB.MyTableType"
        }
    }
};


let odataServer = ODataServer().model(model);

odataServer.onMongo(function(cb) {
    let config = {
        authentication: {
            options: {
                userName: 'azureuser', // replace with your username
                password: 'Samyfx00'  // replace with your password
            },
            type: 'default'
        },
        server: 'yuya-test-2023.database.windows.net', // replace with your server name
        options: {
            database: 'mySampleDatabase', // replace with your database name
            encrypt: true
        }
    };

    let connection = new Connection(config);
    connection.on('connect', function(err) {
        if(err) {
            console.log('Error: ', err)
        }
        else {
            cb(null, connection);
        }
    });
});

odataServer.listen(3000, function() {
    console.log('OData server listening at http://localhost:3000');
});
