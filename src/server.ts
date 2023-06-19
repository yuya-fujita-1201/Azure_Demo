// server.ts
import express from 'express';
import { ODataServer, ODataController, odata, ODataQuery } from 'odata-v4-server';
import { connectToSql } from './OdataService';
import { MyTableType, UserDetails } from './models';
import sql from 'mssql';

class MyTableController extends ODataController {
    // ...
}

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

app.get('/odata/$metadata', (req, res) => {
    res.type('application/xml');
    res.send(`
    <edmx:Edmx xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx" Version="4.0">
        <edmx:DataServices>
            <Schema xmlns="http://docs.oasis-open.org/odata/ns/edm" Namespace="Trippin">
                <EntityType Name="Person">
                    <Key>
                        <PropertyRef Name="UserName"/>
                    </Key>
                    <Property Name="UserName" Type="Edm.String" Nullable="false"/>
                    <Property Name="FirstName" Type="Edm.String" Nullable="false"/>
                    <Property Name="LastName" Type="Edm.String" MaxLength="26"/>
                    <Property Name="MiddleName" Type="Edm.String"/>
                    <Property Name="Gender" Type="Trippin.PersonGender" Nullable="false"/>
                    <Property Name="Age" Type="Edm.Int64"/>
                    <Property Name="Emails" Type="Collection(Edm.String)"/>
                    <Property Name="AddressInfo" Type="Collection(Trippin.Location)"/>
                    <Property Name="HomeAddress" Type="Trippin.Location"/>
                    <Property Name="FavoriteFeature" Type="Trippin.Feature" Nullable="false"/>
                    <Property Name="Features" Type="Collection(Trippin.Feature)" Nullable="false"/>
                    <NavigationProperty Name="Friends" Type="Collection(Trippin.Person)"/>
                    <NavigationProperty Name="BestFriend" Type="Trippin.Person"/>
                    <NavigationProperty Name="Trips" Type="Collection(Trippin.Trip)"/>
                </EntityType>
            </Schema>
        </edmx:DataServices>
    </edmx:Edmx>
    `);
});

// Setup OData middleware
app.use('/odata', MyODataServer.create());

// Start the server
app.listen(80, () => {
    console.log('Server is running at http://localhost:80');
});
