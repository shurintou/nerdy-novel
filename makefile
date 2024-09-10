up:
	docker-compose -f ./dev/docker-compose.yml up

build:
	docker build . -t nerdy-novel

run: build
	docker run --rm -d -p 8080:3000 nerdy-novel
