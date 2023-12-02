#!/bin/sh
set -e

host="$1"
shift
cmd="$@"

# Wait for Postgres to be available
until PGPASSWORD=$POSTGRES_PASSWORD pg_isready -h "$host" -p 5432 -q; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec $cmd