#!/usr/bin/env sh

# @db
# Manages the database schema, migrations, and seeders using MikroORM.
#
# Usage: @db COMMAND [OPTIONS]

usage() {
  echo "Available @orm commands: $(green "$ORM_CMDS")"
}
red() {
  printf "\033[0;31m%s\033[0m\n" "$1"
}
green() {
  printf "\033[0;32m%s\033[0m\n" "$1"
}
reset() {
  echo $* | sed -r 's/\x1B\[([0-9]{1,3}(;[0-9]{1,2};?)?)?[mGK]//g'
}
wait_and_format() {
  TIMEOUT=10
  exit=0

  for f in $*; do
    elapsed=0
    start=$(date +%s)

    while [ $elapsed -lt $TIMEOUT ]; do
      if [ -f "$f" ]; then
        eslint --fix "$f" >/dev/null
        prettier --write "$f" >/dev/null
        exit=0
        break
      fi
      exit=1
      elapsed=$(($(date +%s) - start))
    done
  done

  return $exit
}

[ -z "$DB_PATH" ] && DB_PATH=src/db
[ -z "$MIGRATIONS_DIR" ] && MIGRATIONS_DIR=migrations
[ -z "$SEEDERS_DIR" ] && SEEDERS_DIR=seeders
[ -z "$SCHEMA" ] && SCHEMA=schema.json

MIGRATIONS_PATH="$DB_PATH/$MIGRATIONS_DIR"
SEEDERS_PATH="$DB_PATH/$SEEDERS_DIR"
SCHEMA_PATH="$MIGRATIONS_PATH/$SCHEMA"

ORM_CMDS="
  create
  drop
  fresh
  generate
  help
  migrate
  rollback
  seed
  setup"

cmd=$1
args=

if [ "$cmd" != "$*" ]; then
  args="$(printf "%s" "$*" | cut -d " " -f2-)"
fi

case $cmd in
  create)
    mikro-orm database:create $args
    ;;
  drop)
    mikro-orm schema:drop $args --drop-db -d
    ;;
  fresh)
    mikro-orm schema:fresh --drop-db &&
    wait_and_format $SCHEMA_PATH &&
    mikro-orm migration:fresh &&
    mikro-orm seeder:run
    ;;
  generate|g)
    opt=$2
    name=$3
    args="$(printf "%s" "$*" | cut -d " " -f4-)"

    case $opt in
      migration)
        migration=$(mikro-orm migration:create --name "$name" $args | sed -e 's/^\(.*\.ts\).*/\1/')
        exit=$?

        [ -z "$migration" ] && exit "$exit"

        if wait_and_format "$(reset $MIGRATIONS_PATH/$migration)" "$SCHEMA_PATH"; then
          echo "$migration successfully created"
        else
          echo "$migration"
        fi
        ;;
      seeder)
        seeder="$SEEDERS_PATH/${name}.ts"

        if mikro-orm seeder:create "$name" $args; then
          sed -i '' 's/em/_em/g' "$seeder"
          wait_and_format "$seeder" "$SCHEMA_PATH"
        fi
        ;;
      *)
        red "Unknown generator: $opt"
        echo ""
        echo "Available generators:"
        green "  migration"
        green "  seeder"
        exit 1
        ;;
    esac
    ;;
  migrate)
    mikro-orm migration:up $args
    ;;
  rollback)
    mikro-orm migration:down $args
    ;;
  seed)
    mikro-orm seeder:run $args
    ;;
  setup)
    mikro-orm database:create &&
    mikro-orm schema:create -d &&
    mikro-orm migration:up &&
    mikro-orm seeder:run
    ;;
  help|--help|-h)
    usage
    ;;
  *)
    if [ -z "$cmd" ]; then 
      red "No command provided"
    else
      red "Unknown command: $cmd"
    fi
    echo ""
    usage
    exit 1
    ;;
esac
