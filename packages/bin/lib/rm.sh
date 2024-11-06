#!/usr/bin/env sh

# @rm
# Removes the specified folders recursively.
#
# Usage: @rm FOLDERS...

usage() {
  echo "Usage: @rm FOLDERS..."
  echo "Remove the specified folders recursively."
}
warn() {
  printf "\n\033[1;43m @RM \033[0m %b\n\n" "$1"
}
error() {
  printf "\033[1;41m @RM \033[0m \033[1;31m%b\033[0m\n" "$1"
}
error_and_usage() {
  error "$1"
  usage
  if [ $2 = "--exit" ]; then
    [ -n "$3" ] && exit $3 || exit 1
  fi
}

folders=$*

if [ -z "$folders" ]; then
  error_and_usage "No folders specified" --exit
fi

for folder in $folders; do
  paths="$(find . -name "$folder" -type d -prune -print)"

  if [ -z "$paths" ]; then
    warn "Can't find any folder named $folder"
  else
    for path in $paths; do
      rm -rf "$path"
    done
  fi
done
