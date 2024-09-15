#!/usr/bin/env bash
sudo docker build . -t nerdy-novel
sudo docker run --rm -d -p 80:3000 nerdy-novel
