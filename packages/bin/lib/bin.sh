#!/usr/bin/env sh

# @bin
# Launches the specified script from BIN (defaults to ./bin).
#
# Usage: @bin SCRIPT [ARGS...]

error() {
  printf "\033[1;41m @BIN \033[0m \033[1;31m%b\033[0m\n" "$1"
  exit 1
}

BIN_DEFAULT="./bin"

[ -z "$BIN" ] && BIN=$BIN_DEFAULT

script=$1

if [ -z "$script" ]; then
  error "No script specified."
fi


if [ ! -f "$BIN/$script" ]; then
  error "Script not found."
fi

shift

$* . "$BIN/$script"
