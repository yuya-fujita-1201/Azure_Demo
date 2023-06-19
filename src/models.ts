// models.ts
import { Edm, odata } from 'odata-v4-server';

@odata.type('MyTableType')  // Change 'mySampleDatabase.MyTableType' to 'MyTableType'
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
