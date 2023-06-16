const sql = require('mssql')

async function testConnection() {
    const config = {
        server: 'yuya-test-2023.database.windows.net', // replace with your server name
        database: 'mySampleDatabase', // replace with your database name
        user: 'azureuser', // replace with your username
        password: 'Samyfx00', // replace with your password
        options: {
            encrypt: true // for Azure SQL Database
        }
    }

    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config)
        const result = await sql.query`SELECT TOP 1 * FROM MyTable`
        console.dir(result)
    } catch (err) {
        console.error(err)
    }
}

testConnection()
