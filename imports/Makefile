NODE_ENV?=development
NODE_OPTIONS?=''
APP_ENV=development
PORT?=3100
CLUSTER_DISCOVERY_URL?=mongodb://localhost:27017/cluster
CLUSTER_SERVICE?=imports
TAG?=
SERVER=$(shell curl ipecho.net/plain)

start:
	NODE_OPTIONS=$(NODE_OPTIONS) \
	CLUSTER_DISCOVERY_URL=$(CLUSTER_DISCOVERY_URL) \
	CLUSTER_SERVICE=$(CLUSTER_SERVICE) \
	CLUSTER_PUBLIC_SERVICES=$(CLUSTER_PUBLIC_SERVICES) \
	meteor -p $(PORT) --settings ./config/$(APP_ENV)/settings.json

start-public:
	NODE_OPTIONS=$(NODE_OPTIONS) \
	CLUSTER_DISCOVERY_URL=$(CLUSTER_DISCOVERY_URL) \
	CLUSTER_SERVICE=$(CLUSTER_SERVICE) \
	CLUSTER_PUBLIC_SERVICES=$(CLUSTER_PUBLIC_SERVICES) \
	SERVER=$(SERVER) \
	meteor -p $(PORT) --settings ./config/$(APP_ENV)/settings.json --mobile-server $(SERVER):$(PORT)

debug-public:
	NODE_OPTIONS='--debug' \
	CLUSTER_DISCOVERY_URL=$(CLUSTER_DISCOVERY_URL) \
	CLUSTER_SERVICE=$(CLUSTER_SERVICE) \
	CLUSTER_PUBLIC_SERVICES=$(CLUSTER_PUBLIC_SERVICES) \
	SERVER=$(SERVER) \
	meteor debug -p $(PORT) --settings ./config/$(APP_ENV)/settings.json --mobile-server $(SERVER):$(PORT)

debug:
	NODE_OPTIONS='--debug' \
	CLUSTER_DISCOVERY_URL=$(CLUSTER_DISCOVERY_URL) \
	CLUSTER_SERVICE=$(CLUSTER_SERVICE) \
	CLUSTER_PUBLIC_SERVICES=$(CLUSTER_PUBLIC_SERVICES) \
	meteor debug -p $(PORT) --settings ./config/$(APP_ENV)/settings.json

start-prod:
	NODE_OPTIONS=$(NODE_OPTIONS) \
	CLUSTER_DISCOVERY_URL=$(CLUSTER_DISCOVERY_URL) \
	CLUSTER_SERVICE=$(CLUSTER_SERVICE) \
	CLUSTER_PUBLIC_SERVICES=$(CLUSTER_PUBLIC_SERVICES) \
	meteor -p $(PORT) --production --settings ./config/production/settings.json

ddp:
	ddp-analyzer-proxy

start-ddp:
	DDP_DEFAULT_CONNECTION_URL=http://localhost:3030 \
	meteor

tag:
	git tag -a $(TAG) -m 'tagging release'
	git push origin $(TAG)
