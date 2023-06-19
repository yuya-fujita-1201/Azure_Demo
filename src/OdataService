// OdataService.ts
import sql from 'mssql';

// SQL Server connection config
const sqlConfig = {
    user: 'azureuser',
    password: 'Samyfx00',
    server: 'yuya-test-2023.database.windows.net',
    database: 'mySampleDatabase',
    // other options...
};

// Make sure to connect to the database
export const connectToSql = () => sql.connect(sqlConfig).catch(err => console.error('Failed to connect to the database:', err));
