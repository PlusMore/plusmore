# APP MAKEFILE

NODE_ENV?=development
NODE_OPTIONS?=''
APP_ENV?=development
HOST?=$(shell ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1' | awk '{print $1}')
PORT?=3040
APP_OPTIONS?=
SUBDOMAIN?=onboard
TAG?=
SERVER=$(shell curl ipecho.net/plain)
APP_NAME=onboard
PROJECT_DIR=$(shell pwd)
MONGO_URL?=mongodb://localhost:27017/plusmore
MONGO_OPLOG_URL?=mongodb://localhost:27017/local
CLUSTER_DISCOVERY_URL?=mongodb://localhost:27017/cluster
CLUSTER_SERVICE?=onboard

start:
	NODE_OPTIONS=$(NODE_OPTIONS) \
	HOST=$(HOST) \
	PORT=$(PORT) \
	MONGO_URL=$(MONGO_URL) \
	MONGO_OPLOG_URL=$(MONGO_OPLOG_URL) \
	CLUSTER_DISCOVERY_URL=$(CLUSTER_DISCOVERY_URL) \
	CLUSTER_SERVICE=$(CLUSTER_SERVICE) \
	meteor -p $(PORT) --settings ./config/$(APP_ENV)/settings.json --mobile-server $(HOST):$(PORT) $(APP_OPTIONS)

debug:
	NODE_OPTIONS='--debug' \
	HOST=$(HOST) \
	PORT=$(PORT) \
	MONGO_URL=$(MONGO_URL) \
	MONGO_OPLOG_URL=$(MONGO_OPLOG_URL) \
	CLUSTER_DISCOVERY_URL=$(CLUSTER_DISCOVERY_URL) \
	CLUSTER_SERVICE=$(CLUSTER_SERVICE) \
	meteor debug -p $(PORT) --settings ./config/$(APP_ENV)/settings.json --mobile-server $(HOST):$(PORT) $(APP_OPTIONS)

deploy:
	meteor deploy https://$(APP_NAME).meteor.com --settings ./config/$(APP_ENV)/settings.json

mongo:
	meteor mongo

# runs code concat, minification, etc.
start-prod:
	NODE_OPTIONS=$(NODE_OPTIONS) \
	HOST=$(HOST) \
	PORT=$(PORT) \
	MONGO_URL=$(MONGO_URL) \
	MONGO_OPLOG_URL=$(MONGO_OPLOG_URL) \
	CLUSTER_DISCOVERY_URL=$(CLUSTER_DISCOVERY_URL) \
	CLUSTER_SERVICE=$(CLUSTER_SERVICE) \
	meteor -p $(PORT) --production --settings ./config/$(APP_ENV)/settings.json

tag:
	git tag -a $(TAG) -m 'tagging release'
	git push origin $(TAG)
