const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/spotify_live';

module.exports.initializeDb = function() {
  const client = new pg.Client(connectionString);
  client.connect();
  pg.connect(connectionString, (err, client) => {
    if(err) {
      done();
      console.log(err);
    }

    const query = client.query(
      'CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, name text not null, spotify_id text not null, email text not null)'
    );
    query.on('end', () => {
      client.end();
    });
  });
}
