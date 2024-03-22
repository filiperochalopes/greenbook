#!/bin/sh

# Start the first process
node src/server.js &

# Start the second process
npx prisma studio &

# Wait for any process to exit
wait -n

# Exit with status of process that exited first
exit $?