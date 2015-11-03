NODE_ENV?=development
NODE_OPTIONS?=''
APP_ENV=development
PORT?=3002
CLUSTER_DISCOVERY_URL?=mongodb://localhost:27017/cluster
CLUSTER_SERVICE?=emailService
TAG?=
SETTINGS?=/Users/danvoinea/Development/galaxy

start:
	NODE_OPTIONS=$(NODE_OPTIONS) \
	CLUSTER_DISCOVERY_URL=$(CLUSTER_DISCOVERY_URL) \
	CLUSTER_SERVICE=$(CLUSTER_SERVICE) \
	meteor -p $(PORT) --settings $(SETTINGS)/config/$(APP_ENV)/settings.json


deploy-qa:
	DEPLOY_HOSTNAME=galaxy.meteor.com meteor --settings $(SETTINGS)/config/qa/settings.json deploy qa-email-service.plusmoretablets.com
deploy:
	DEPLOY_HOSTNAME=galaxy.meteor.com meteor --settings $(SETTINGS)/config/production/settings.json deploy email-service.plusmoretablets.com

debug:
	NODE_OPTIONS='--debug' \
	MONGO_URL=$(MONGO_URL) \
	MONGO_OPLOG_URL=$(MONGO_OPLOG_URL) \
	CLUSTER_DISCOVERY_URL=$(CLUSTER_DISCOVERY_URL) \
	CLUSTER_SERVICE=$(CLUSTER_SERVICE) \
	meteor -p $(PORT) --settings $(SETTINGS)/config/$(APP_ENV)/settings.json

prod:
	NODE_OPTIONS=$(NODE_OPTIONS) \
	MONGO_URL=$(MONGO_URL) \
	MONGO_OPLOG_URL=$(MONGO_OPLOG_URL) \
	CLUSTER_DISCOVERY_URL=$(CLUSTER_DISCOVERY_URL) \
	CLUSTER_SERVICE=$(CLUSTER_SERVICE) \
	meteor -p $(PORT) --production --settings $(SETTINGS)/config/$(APP_ENV)/settings.json
