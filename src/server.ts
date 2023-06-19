// server.ts
import express from 'express';
import { ODataServer, ODataController, odata, ODataQuery } from 'odata-v4-server';
import { connectToSql } from './OdataService';
import { MyTableType, UserDetails } from './models';
import sql from 'mssql';

@odata.type(MyTableType)
class MyTableController extends ODataController {
    // ...
}

@odata.type(UserDetails)
class UserDetailsController extends ODataController {
    @odata.GET
    public async get(@odata.query query: ODataQuery): Promise<UserDetails[]> {
        const request = new sql.Request();
        const result = await request.query(`SELECT * FROM UserDetails`);
        return result.recordset.map((record: any) => Object.assign(new UserDetails(), record));
    }
}

@odata.namespace('mySampleDatabase')
class MyODataServer extends ODataServer {}

MyODataServer.addController(MyTableController, 'MyTableType');
MyODataServer.addController(UserDetailsController, 'UserDetails');

// Remaining code...

const app = express();

// Connect to SQL Server
connectToSql();

// Setup OData middleware
app.use('/odata', MyODataServer.create());

// Start the server
app.listen(80, () => {
    console.log('Server is running at http://localhost:80');
});
