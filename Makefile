build:
	cake build

watch:
	cake watch

doc:
	./node_modules/docco/bin/docco $(shell find src -name "*.coffee")

test: build
	npm test

release: test
	npm publish
