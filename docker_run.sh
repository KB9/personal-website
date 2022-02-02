SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"

source "${SCRIPT_DIR}/docker_common.sh"

set_docker_build_target "$1"
if [[ "$?" -ne "0" ]]
then
  exit 1
fi

if [[ "${DOCKER_BUILD_TARGET}" == "${DOCKER_BUILD_TARGET_DEVELOPMENT}" ]]
then
  # To prevent the node_modules folder baked into the image being overwritten,
  # we mount only the required folders for a development build. Mounting the
  # root directory would hide the node_modules folder.
  docker run \
    -p 3000:3000 \
    --rm \
    --mount type=bind,source="${SCRIPT_DIR}/public",target="/app/public" \
    --mount type=bind,source="${SCRIPT_DIR}/src",target="/app/src" \
    --mount type=bind,source="${SCRIPT_DIR}/.env.development",target="/app/.env.development" \
    --mount type=bind,source="${SCRIPT_DIR}/jsconfig.json",target="/app/jsconfig.json" \
    "${DOCKER_IMAGE_TAG}:${DOCKER_BUILD_TARGET_DEVELOPMENT}"
elif [[ "${DOCKER_BUILD_TARGET}" == "${DOCKER_BUILD_TARGET_PRODUCTION}" ]]
then
  docker run \
    -p 3000:3000 \
    --rm \
    "${DOCKER_IMAGE_TAG}:${DOCKER_BUILD_TARGET_PRODUCTION}"
fi
