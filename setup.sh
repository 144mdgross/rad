dropdb rad --if-exists
dropdb rad_test --if-exists

createdb reddit-clone
createdb reddit-clone-test

knex migrate:latest --knexfile app/knexfile.js
knex migrate:latest --env test --knexfile app/knexfile.js

knex seed:run --knexfile app/knexfile.js
