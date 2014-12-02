# Quarto 

This is my quick take on the boardgame Quarto. The main purpose of this project is to learn more javascript in general and how meteor works in particular.


## Usage

run `meteor` from console and go to localhost:3000 and the game should be on.


### Dependencies

All installation instructions are for MacOs X.

#### node.js

#### meteor.js

```bash
curl https://install.meteor.com/ | sh
```

### Test framework


install laika for tests

```bash
sudo npm install -g laika
```

setup phantomjs dependency for laika

```bash
brew update && brew install phantomjs
```

setup mongod server

```bash
brew install mongodb
sudo mkdir -p /data/db/
sudo chown `id -u` /data/db
```


### Run tests

Start a mongodb server

```bash
mongod
```

Run tests

```bash
laika
```