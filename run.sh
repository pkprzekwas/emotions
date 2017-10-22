#!/bin/bash

set -xe

SRC="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/src"
FRONT_PATH="${SRC}/frontend/"
BACK_PATH="${SRC}/backend/"

cd ${FRONT_PATH} 
npm install
npm run-script build

cd ${BACK_PATH}
npm install
npm start

