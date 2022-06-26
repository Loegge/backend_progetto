const pg = require('pg');
const database = new pg.Pool({
    connectionString: 'postgres://jaxredixfjghva:21d49b7f1639eb2126e6f260a628d643edbf7e75d92df1f854414821a5406fa1@ec2-34-207-12-160.compute-1.amazonaws.com:5432/dnr4abkmqmale',
    ssl: {rejectUnauthorized: false}
});

module.exports = {database}
