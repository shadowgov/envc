all: clean install test

install:
	@npm install

test:
	@node_modules/.bin/hydro

clean:
	@rm -rf node_modules

.PHONY: test
