
Dependencies
====


Test framework
===

install laika for tests
$ sudo npm install -g laika

setup phantomjs dependency for laika
$ brew update && brew install phantomjs

setup mongod server
$ brew install mongodb
$ sudo mkdir -p /data/db/
$ sudo chown `id -u` /data/db