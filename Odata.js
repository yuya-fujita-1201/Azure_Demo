const express = require('express');
const sql = require('mssql');
const JayData = require('jaydata');
const odata = require('jaydata/odata-server');
const cors = require('cors');

const app = express();
app.use(cors());

class MyTable extends JayData.Entity {
    constructor(initData) {
        super(initData);
    }
}

MyTable.prototype.KeyValue = { type: 'Edm.String', key: true };
MyTable.prototype.Item1 = { type: 'Edm.String' };
MyTable.prototype.Item2 = { type: 'Edm.String' };
MyTable.prototype.Item3 = { type: 'Edm.String' };

app.use("/odata", odata("odata", {
    MyTable: MyTable
}, function (req, res) {
    const config = {
        server: 'yuya-test-2023.database.windows.net',
        database: 'mySampleDatabase',
        user: 'azureuser',
        password: 'Samyfx00',
        options: {
            encrypt: true
        }
    };

    sql.connect(config).then(pool => {
        console.log('Connected to SQL Server successfully.');
        return pool.request().query('SELECT * FROM MyTable')
            .then(result => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(result.recordset);
            });
    }).catch(error => {
        console.error('Error connecting to SQL Server:', error);
        res.status(500).send('Error connecting to SQL Server: ' + error);
    });
}));

app.get('/', (req, res) => {
    res.status(200).send('OK');
});

app.get('/test', async (req, res) => {
    const config = {
        server: 'yuya-test-2023.database.windows.net',
        database: 'mySampleDatabase',
        user: 'azureuser',
        password: 'Samyfx00',
        options: {
            encrypt: true
        }
    };
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT * FROM MyTable`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

const port = process.env.PORT || 80;
app.listen(port, function () {
    console.log(`OData service is running on port ${port}`);
});
