
clean:
	docker rm -fv pytco-frontend || true
	docker ps -a | grep pytco-frontend || true

build: clean
	docker build -t pytco/frontend --force-rm .

run: build
	docker run --name pytco-frontend -d -p 8000:8000 pytco/frontend
