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
            "KeyValue": { "type": "Edm.String", key: true },
            "Item1": { "type": "Edm.String" },
            "Item2": { "type": "Edm.String" },
            "Item3": { "type": "Edm.String" }
        }
    },
    entitySets: {
        "MyTable": {
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

app.use("/odata", async function (req, res, next) {
    try {
        const pool = await sql.connect(config);
        console.log('Connected to SQL Server successfully.');
        req.dbPool = pool;
        odataServer.query(async (sql, sqlParams) => {
            const result = await pool.request().query(sql);
            console.log('SQL query result:', result.recordset);
            return result.recordset;
        });
        try {
            await odataServer.handle(req, res);
        } catch (error) {
            console.error('Error handling OData request:', error);
            res.status(500).send(error.message);
        }
    } catch (error) {
        console.error('Error connecting to SQL Server:', error);
        res.status(500).send(error.message);
    }
});

const port = process.env.PORT || 80;
app.listen(port, function () {
    console.log(`OData service is running on port ${port}`);
});
