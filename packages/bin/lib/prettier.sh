#!/usr/bin/env sh

# @prettier
# Extends the prettier CLI with additional commands.
#
# Usage: @prettier [check|write|COMMAND] [OPTIONS]

cmd=$1
args=

if [ "$cmd" != "$*" ]; then
  args="$(printf "%s" "$*" | cut -d " " -f2-)"
fi

case $cmd in
  check)
    prettier --check $args . !**/*.{js,mjs,cjs,jsx,ts,tsx} 1>/dev/null
    ;;
  write)
    prettier --write $args . 1>/dev/null
    ;;
  *)
    prettier "$@"
    ;;
esac
