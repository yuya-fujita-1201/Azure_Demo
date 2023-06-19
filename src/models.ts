// models.ts
import { Edm, odata } from 'odata-v4-server';

@odata.type('MyTableType')
export class MyTableType {
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

@odata.type('UserDetails')
export class UserDetails {
    @Edm.Key
    @Edm.String
    public SFID: string = "";

    @Edm.String
    public FirstName: string = "";

    @Edm.String
    public LastName: string = "";

    @Edm.String
    public Address: string = "";

    @Edm.String
    public Comment: string = "";
}
