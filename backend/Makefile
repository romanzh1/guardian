include .env
export

# go install github.com/daixiang0/gci@latest
# go install mvdan.cc/gofumpt@latest
fmt:
	gci write --skip-generated -s standard -s default -s "prefix(insert_project_name)" ./
	gofumpt -w .

lint: fmt
	golangci-lint run \
		--print-issued-lines=false \
		--out-format=colored-line-number \
		--issues-exit-code=1 \
		--timeout=5m \

run:
	go run ./cmd/guardian

build:
	go build -o ./build/guardian ./cmd/guardian

build_run:
	./build/guardian

.PHONY: run