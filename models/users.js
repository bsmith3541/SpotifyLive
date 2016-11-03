const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/spotify_live';

module.exports.addUser = function(data) {
  let results = [];
  const client = new pg.Client(connectionString);
  client.connect();
  pg.connect(connectionString, (err, client, done) => {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // client.query('INSERT INTO users(name, email, location, top_artists, followed_artists, show_related, venue_radius, email_frequency) values($1, $2)',
    client.query(`select * from users where spotify_id='${data.id}'`, (err, result) => {
      if (result.rows.length == 0) {
        console.log(`Hey, "${data.display_name} (${data.id}) is a new user!"`);
        client.query('INSERT INTO users(name, spotify_id, email) values($1, $2, $3)', [data.display_name, data.id, data.email]);
        const query = client.query('SELECT * FROM users ORDER BY id ASC', (err, results) => {
          console.log(`Added: ${JSON.stringify(results.rows)} to Users table.`);
          done();
        });
      } else {
        done();
        console.log(`User, "${data.display_name}" already exists.`);
      }
    });
  });
}
