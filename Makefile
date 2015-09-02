APP_NAME=plusmore

mongod:
	mkdir -p db
	mongod --replSet $(APP_NAME) --dbpath ./db --port 27017

mongo:
	mongo --port 27017

mongo-compose:
	mongo candidate.0.mongolayer.com:10412/plusmore -u plusmore -p

get-compose-data:
	mongodump --host candidate.0.mongolayer.com:10412 --db plusmore -u plusmore -o /data/backup/plusmore
	mongorestore -host localhost --port 27017 --drop /data/backup/plusmore

backup-prod:
	mongodump --host candidate.0.mongolayer.com:10412 --db plusmore -u plusmore -p -o /data/backup/

backup-to-qa:
	mongorestore --db plusmore -u plusmore -p --host c817.candidate.14.mongolayer.com --port 10817 --drop /data/backup/plusmore/
