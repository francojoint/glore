#!/usr/bin/env sh

# @fastify
# Extends the fastify CLI with additional commands.
#
# Usage: @fastify [dev|build|start|COMMAND] [OPTIONS]

usage() {
  echo "@fastify"
  echo "Extends the fastify CLI with additional commands."
  echo
  echo "Usage: @fastify [dev|build|start|COMMAND] [OPTIONS]"
  exit 0
}
error() {
  printf "\033[1;41m @FASTIFY \033[0m \033[1;31m%b\033[0m\n" "$1"
  exit 1
}

FASTIFY_APP_DEFAULT="build/src/app.js"
FASTIFY_SERVER_DEFAULT="src/server.ts"
TSCONFIG_DEFAULT="tsconfig.build.json"

[ -z "$FASTIFY_APP" ] && FASTIFY_APP="$FASTIFY_APP_DEFAULT"
[ -z "$FASTIFY_SERVER" ] && FASTIFY_SERVER="$FASTIFY_SERVER_DEFAULT"
[ -z "$TSCONFIG" ] && TSCONFIG="$TSCONFIG_DEFAULT"

cmd=$1
args=

if [ -z "$cmd" ]; then
  usage
fi

if [ "$cmd" != "$*" ]; then
  args="$(printf "%s" "$*" | cut -d " " -f2-)"
fi

case $cmd in
  dev)
    [ ! -f "$FASTIFY_SERVER" ] && error "Invalid value for FASTIFY_SERVER: $FASTIFY_SERVER"
    command -v tsx >/dev/null || error "tsx is not installed."
    NODE_ENV=development tsx --watch $FASTIFY_SERVER $args
    ;;
  build)
    [ ! -f "$TSCONFIG" ] && error "Invalid value for TSCONFIG: $TSCONFIG"
    tsc --build $TSCONFIG $args &&
    mikro-orm cache:generate --combined
    ;;
  start)
    [ ! -f "$FASTIFY_APP" ] && error "Invalid value for FASTIFY_APP: $FASTIFY_APP"
    @fastify build &&
    NODE_ENV=production fastify start $FASTIFY_APP $args
    ;;
  -h|--help|help)
    usage
    ;;
  *)
    fastify $cmd $args
    ;;
esac
