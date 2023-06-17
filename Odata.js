const express = require('express');
const sql = require('mssql');
const odataServer = require('odata-server');
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
        "MyTable": {
            entityType: "mySampleDatabase.MyTableType"
        }
    }
};

const config = {
    server: 'yuya-test-2023.database.windows.net',
    database: 'mySampleDatabase',
    user: 'azureuser',
    password: 'Samyfx00',
    options: {
        encrypt: true
    }
};

let odataInstance = new odataServer().model(model);
app.use("/odata", async function (req, res) {
    try {
        const pool = await sql.connect(config);
        console.log('Connected to SQL Server successfully.');
        req.sql = pool;
        odataInstance.query(async function(sql, sqlParams) {
            const request = pool.request();
            sqlParams.forEach((param, i) => {
                request.input(`p${i}`, param);
            });
            return await request.query(sql);
        });
        await odataInstance.handle(req, res);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send(error.message);
    }
});

app.get('/', (req, res) => {
    res.status(200).send('OK');
});

app.get('/test', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query('SELECT * FROM MyTable');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

const port = process.env.PORT || 80;
app.listen(port, function () {
    console.log(`OData service is running on port ${port}`);
});
