all: clean install test

install:
	@npm install

test:
	@NODE_ENV=test node_modules/.bin/hydro

test-ci: test

clean:
	@rm -rf node_modules

.PHONY: test
