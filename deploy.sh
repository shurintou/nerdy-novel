#!/usr/bin/env bash
docker build . -t nerdy-novel
docker run --rm -d -p 80:3000 nerdy-novel
