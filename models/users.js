const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/spotify_live';

module.exports.addUser = function(data) {
  const results = [];
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
    // client.query('INSERT INTO users(name, email, location, top_artists, followed_artists, show_related, venue_radius, email_frequency) values($1, $2)',
    console.log(`inside UsersModel: received ${JSON.stringify(data)}`);
    client.query('INSERT INTO users(name, email) values($1, $2)',
    [data.display_name, data.email]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM users ORDER BY id ASC');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return results;
    });
  });
}
