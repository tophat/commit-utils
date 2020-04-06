ARTIFACT_DIR = artifacts

SHELL := /bin/bash
export PATH := $(shell yarn bin):$(PATH)

ifdef CI
    ESLINT_ARGS=--format junit --output-file $(ARTIFACT_DIR)/test_results/eslint/eslint.junit.xml
	JEST_ENV_VARIABLES=JEST_SUITE_NAME="Jest Tests" JEST_JUNIT_OUTPUT_DIR=$(ARTIFACT_DIR)/test_results/jest/ JEST_JUNIT_OUTPUT_NAME=jest.junit.xml
    JEST_EXTRA_ARGS=--reporters=default --reporters=jest-junit --coverageReporters=text-lcov
    YARN_ARGS=--frozen-lockfile
else
    ESLINT_ARGS=
    JEST_ENV_VARIABLES=
    YARN_ARGS=
endif


.PHONY: help
help:
	@echo "--------------------- Useful Commands for Development ----------------------"
	@echo "make help                            - show this help message"
	@echo "make install                         - install dependencies, blows up node_modules"
	@echo "make lint                            - runs eslint"
	@echo "make lint-fix                        - attempts to autofix linting errors"
	@echo "make watch                           - babelize locally for development"
	@echo "make package                         - package (babelize) commitwatch ready for distribution"

# ---- Installing, Building and Running ----

.PHONY: install
install: check-versions clean node_modules

.PHONY: commitwatch
commitwatch: package check-versions node_modules
	./lib/bin/index.js ${FLAGS}

ifndef CI
.PHONY: package
endif
package: check-versions node_modules ${ARTIFACT_DIR}
	rm -rf lib
	$(shell yarn bin)/babel src --out-dir=lib --copy-files --no-copy-ignored --ignore 'src/**/*.test.js'
	./scripts/version.sh
	npm pack
	mv *.tgz artifacts/

# -------------- Linting --------------

.PHONY: lint
lint: check-versions node_modules ${ARTIFACT_DIR}
	$(shell yarn bin)/eslint ${ESLINT_ARGS} .

.PHONY: lint-fix
lint-fix: check-versions node_modules
	$(shell yarn bin)/eslint --fix .

# -------------- Tests --------------

.PHONY: test
test:
	$(JEST_ENV_VARIABLES) $(shell yarn bin)/jest ${JEST_EXTRA_ARGS}

# --------------- CI Scripts -----------------

.PHONY: deploy
deploy: package
	./scripts/deploy.sh

# ----------------- Helpers ------------------

.PHONY: check-versions
check-versions:
	@./scripts/check-versions.sh

.PHONY: clean
clean:
	rm -rf ${ARTIFACT_DIR}
	rm -rf node_modules

${ARTIFACT_DIR}:
	mkdir -p ${ARTIFACT_DIR}/test_results/eslint

node_modules:
	yarn install ${YARN_ARGS}
	touch node_modules
