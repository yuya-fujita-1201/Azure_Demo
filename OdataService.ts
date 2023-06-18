import express from 'express';
import sql from 'mssql';
import { ODataServer, ODataController, Edm, odata, ODataQuery } from 'odata-v4-server';

@odata.type('DataModel')
class DataModel {
    @Edm.Key
    @Edm.Computed
    @Edm.Int32
    public Id: number = 0;

    @Edm.String
    public Name: string = "";
}

class DataController extends ODataController {
    @odata.GET
    public async get(@odata.query query: ODataQuery): Promise<DataModel[]> {
        const request = new sql.Request();
        const result = await request.query(`SELECT * FROM MyTable`);
        return result.recordset.map((record: any) => Object.assign(new DataModel(), record));
    }
}

class MyODataServer extends ODataServer {}

MyODataServer.addController(DataController, true);

const app = express();
app.use('/odata', MyODataServer.create());

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
