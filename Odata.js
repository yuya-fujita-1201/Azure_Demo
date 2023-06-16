const express = require('express');
const sql = require('mssql');
const ODataServer = require("simple-odata-server");

const app = express();

const model = {
    namespace: "mySampleDatabase",
    entityTypes: {
        "MyTableType": {
            "_id": {"type": "Edm.String", key: true},
            "Item1": {"type": "Edm.String"},
            "Item2": {"type": "Edm.String"},
            "Item3": {"type": "Edm.String"}
        }
    },   
    entitySets: {
        "MyTables": {
            entityType: "mySampleDatabase.MyTableType"
        }
    }
};

const odataServer = ODataServer().model(model);

const config = {
    server: 'yuya-test-2023.database.windows.net',
    database: 'mySampleDatabase',
    user: 'azureuser',
    password: 'Samyfx00',
    options: {
        encrypt: true
    }
};

app.use("/odata", function (req, res) {
    req.dbPool = sql.connect(config);
    odataServer.handle(req, res);
});

app.listen(process.env.PORT || 3000, function () {
    console.log('OData service is running on port 3000');
});
