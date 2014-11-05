PACKAGE_VERSION = $(shell node -e 'console.log(require("./package.json").version);')

develop:
	npm install
	npm install -g coffee-script

build:
	cake build

watch:
	cake watch

doc:
	npm install docco
	./node_modules/docco/bin/docco $(shell find src -name "*.coffee")

tag:
	git commit -am "v$(PACKAGE_VERSION)"
	git tag v$(PACKAGE_VERSION)
	git push
	git push --tags

test: build
	npm test

release: test
	npm publish
