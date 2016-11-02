// this file will contain all the method for CRUD operations on artists
// we'll also use this file to obtain the id's of different artists by name

const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/spotify_live';


modules.export.addArtists = function() {
  const client = new pg.Client(connectionString);
  client.connect();
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO artists(name, related_artists) values($1, $2)',
    [data.text, data.complete]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM artists ORDER BY id ASC');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
}
