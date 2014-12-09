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


Add jasmine and velocity packages for tests

```bash
meteor add sanjo:jasmine
meteor add velocity:html-reporter
```

setup mongod server

```bash
brew install mongodb
sudo mkdir -p /data/db/
sudo chown `id -u` /data/db
```


### TODO

- [ ] meteor less files
- [ ] groups for advanced rules
- [ ] Set advanced or basic rules
- [ ] Create game object that keeps track of turns and also for game history.
- [ ] AI Api
- [ ] Player object could be human or AI