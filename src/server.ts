import express from 'express';
import { ODataServer, ODataController, odata, ODataQuery } from 'odata-v4-server';
import { connectToSql } from './OdataService';
import { MyTableType, UserDetails } from './models';
import sql from 'mssql';

class MyTableController extends ODataController {
    @odata.GET
    public async get(@odata.query query: ODataQuery): Promise<MyTableType[]> {
        await connectToSql();
        const request = new sql.Request();
        const result = await request.query(`SELECT * FROM MyTableType`);
        return result.recordset.map((record: any) => Object.assign(new MyTableType(), record));
    }
}

class UserDetailsController extends ODataController {
    @odata.GET
    public async get(@odata.query query: ODataQuery): Promise<UserDetails[]> {
        await connectToSql();
        const request = new sql.Request();
        const result = await request.query(`SELECT * FROM UserDetails`);
        return result.recordset.map((record: any) => Object.assign(new UserDetails(), record));
    }
}

@odata.namespace('mySampleDatabase')
@odata.container('myContainer')
class MyODataServer extends ODataServer {}

MyODataServer.addController(MyTableController, '/MyTableType');
MyODataServer.addController(UserDetailsController, '/UserDetails');

const app = express();

app.use('/odata', MyODataServer.create());

app.listen(80, () => {
    console.log('Server is running at http://localhost:80');
});
