DOCKER_IMAGE_TAG="personal-website"
DOCKER_BUILD_TARGET_DEVELOPMENT="development"
DOCKER_BUILD_TARGET_PRODUCTION="production"
DOCKER_BUILD_TARGET_DEFAULT="${DOCKER_BUILD_TARGET_DEVELOPMENT}"

is_valid_build_target () {
  if [[ "${DOCKER_BUILD_TARGET}" == "${DOCKER_BUILD_TARGET_DEVELOPMENT}" ]]
  then
    return 0
  elif [[ "${DOCKER_BUILD_TARGET}" == "${DOCKER_BUILD_TARGET_PRODUCTION}" ]]
  then
    return 0
  else
    return 1
  fi
}

set_docker_build_target () {
  DOCKER_BUILD_TARGET="${1:-"${DOCKER_BUILD_TARGET_DEFAULT}"}"
  is_valid_build_target
  IS_VALID="$?"
  if [[ "${IS_VALID}" -ne "0" ]]
  then
    echo "Invalid build target: ${DOCKER_BUILD_TARGET}"
  fi
  echo "Build target: ${DOCKER_BUILD_TARGET}"
  return "${IS_VALID}"
}
