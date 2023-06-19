// server.ts
import express from 'express';
import { ODataServer, ODataController, odata, ODataQuery } from 'odata-v4-server';
import { connectToSql } from './OdataService';
import { MyTableType } from './models';
import sql from 'mssql';

// Define controller for the entity
class MyTableController extends ODataController {
    @odata.GET
    public async get(@odata.query query: ODataQuery): Promise<MyTableType[]> {
        const request = new sql.Request();
        const result = await request.query(`SELECT * FROM MyTable`);
        return result.recordset.map((record: any) => Object.assign(new MyTableType(), record));
    }
}

// Define the server
class MyODataServer extends ODataServer {}

// Add controller to the server
MyODataServer.addController(MyTableController, 'MyTable');

const app = express();

// Connect to SQL Server
connectToSql();

// Setup OData middleware
app.use('/odata', MyODataServer.create());

// Start the server
app.listen(80, () => {
    console.log('Server is running at http://localhost:80');
});
