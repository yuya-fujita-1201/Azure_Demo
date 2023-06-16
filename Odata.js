const express = require('express');
const sql = require('mssql');
const ODataServer = require("simple-odata-server");
const cors = require('cors');

const app = express();
app.use(cors());

const model = {
    namespace: "mySampleDatabase",
    entityTypes: {
        "MyTableType": {
            "KeyValue": {"type": "Edm.String", key: true},
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

app.get('/', (req, res) => { // <-- 追加
  res.status(200).send('OK');
});

const port = process.env.PORT || 80;
app.listen(port, function () {
    console.log(`OData service is running on port ${port}`);
});
