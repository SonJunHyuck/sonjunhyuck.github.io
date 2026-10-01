#!/bin/sh

set -eu

PROJECT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
cd "$PROJECT_DIR"

node_is_compatible() {
  "$1" -e '
    const [major, minor] = process.versions.node.split(".").map(Number);
    const supported =
      (major === 20 && minor >= 19) ||
      (major === 22 && minor >= 12) ||
      major >= 23;
    process.exit(supported ? 0 : 1);
  '
}

NODE_BIN=$(command -v node 2>/dev/null || true)
BUNDLED_NODE="$HOME/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"

if [ -n "$NODE_BIN" ] && node_is_compatible "$NODE_BIN"; then
  :
elif [ -x "$BUNDLED_NODE" ] && node_is_compatible "$BUNDLED_NODE"; then
  NODE_BIN="$BUNDLED_NODE"
else
  echo "Node.js 20.19 이상 또는 22.12 이상 버전이 필요합니다."
  echo "현재 Node.js를 업그레이드한 후 다시 실행해 주세요."
  exit 1
fi

export PATH="$(dirname "$NODE_BIN"):$PATH"
export ASTRO_TELEMETRY_DISABLED=1

PNPM_BIN=$(command -v pnpm 2>/dev/null || true)
BUNDLED_PNPM="$HOME/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/pnpm"

if [ -z "$PNPM_BIN" ] && [ -x "$BUNDLED_PNPM" ]; then
  PNPM_BIN="$BUNDLED_PNPM"
fi

if [ -z "$PNPM_BIN" ]; then
  echo "pnpm을 찾을 수 없습니다. pnpm 11을 설치한 후 다시 실행해 주세요."
  exit 1
fi

echo "Node.js: $(node --version)"
echo "pnpm: $("$PNPM_BIN" --version)"

if [ ! -d node_modules ]; then
  echo "의존성을 설치합니다..."
  "$PNPM_BIN" install --frozen-lockfile
fi

DEV_PORT=${PORT:-4321}
echo "로컬 서버를 시작합니다: http://127.0.0.1:$DEV_PORT/"
echo "종료하려면 Control-C를 누르세요."

exec "$PNPM_BIN" dev --host 127.0.0.1 --port "$DEV_PORT"
