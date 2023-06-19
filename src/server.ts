// server.ts
import express from 'express';
import { ODataServer, ODataController, odata, ODataQuery } from 'odata-v4-server';
import { connectToSql } from './OdataService';
import { MyTableType, UserDetails } from './models';  // Import UserDetails
import sql from 'mssql';

// Define controller for the MyTable entity
class MyTableController extends ODataController {
    @odata.GET
    public async get(@odata.query query: ODataQuery): Promise<MyTableType[]> {
        const request = new sql.Request();
        const result = await request.query(`SELECT * FROM MyTable`);
        return result.recordset.map((record: any) => Object.assign(new MyTableType(), record));
    }
}

// Define controller for the UserDetails entity
class UserDetailsController extends ODataController {
    @odata.GET
    public async get(@odata.query query: ODataQuery): Promise<UserDetails[]> {
        const request = new sql.Request();
        const result = await request.query(`SELECT * FROM UserDetails`);
        return result.recordset.map((record: any) => Object.assign(new UserDetails(), record));
    }
}

@odata.namespace('mySampleDatabase')  // Add this line
class MyODataServer extends ODataServer {}

// Add controllers to the server
MyODataServer.addController(MyTableController, 'MyTableType');  // Change 'MyTable' to 'MyTableType'
MyODataServer.addController(UserDetailsController, 'UserDetails');  // Add UserDetails controller

const app = express();

// Connect to SQL Server
connectToSql();

// Setup OData middleware
app.use('/odata', MyODataServer.create());

// Start the server
app.listen(80, () => {
    console.log('Server is running at http://localhost:80');
});
