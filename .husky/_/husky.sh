#!/bin/sh

if [ -z "$husky_skip_init" ]; then
  debug () {
    [ "$HUSKY_DEBUG" = "1" ] && echo "husky: $*"
  }

  readonly hook_name="$(basename "$0")"
  debug "starting $hook_name..."
  if [ -z "$HUSKY" ]; then
    echo "husky: not a Husky-managed repo, skipping $hook_name hook" >&2
    exit 0
  fi
fi

export PATH="$PATH:./node_modules/.bin"

npm run -s -s lint-staged
