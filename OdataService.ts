import express from 'express';
import sql from 'mssql';
import { ODataServer, ODataController, Edm, odata, ODataQuery } from 'odata-v4-server';

// SQL Server connection config
const sqlConfig = {
    user: 'azureuser',
    password: 'Samyfx00',
    server: 'yuya-test-2023.database.windows.net',
    database: 'mySampleDatabase',
    // other options...
};

// Make sure to connect to the database
sql.connect(sqlConfig).catch(err => console.error('Failed to connect to the database:', err));

@odata.type('MyTable')
class MyTable {
    @Edm.Key
    @Edm.Computed
    @Edm.Int32
    public KeyValue: number = 0;

    @Edm.String
    public Item1: string = "";

    @Edm.String
    public Item2: string = "";

    @Edm.String
    public Item3: string = "";
}

class MyTableController extends ODataController {
    @odata.GET
    public async get(@odata.query query: ODataQuery): Promise<MyTable[]> {
        const request = new sql.Request();
        const result = await request.query(`SELECT * FROM MyTable`);
        return result.recordset.map((record: any) => Object.assign(new MyTable(), record));
    }
}

class MyODataServer extends ODataServer {}

MyODataServer.addController(MyTableController, '/MyTable');

const app = express();
app.use('/odata', MyODataServer.create());

app.listen(80, () => {
    console.log('Server is running at http://localhost:80');
});
