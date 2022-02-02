SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"

source "${SCRIPT_DIR}/docker_common.sh"

set_docker_build_target "$1"
if [[ "$?" -ne "0" ]]
then
  exit 1
fi

export DOCKER_BUILDKIT=1
docker build \
  --target "${DOCKER_BUILD_TARGET}" \
  -t "${DOCKER_IMAGE_TAG}:${DOCKER_BUILD_TARGET}" .
