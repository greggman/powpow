# Setup #

  * download, build, install node.js (http://nodejs.org/).
    * On Mac/Linux It's the typical
      * ./configure
      * make
      * sudo make install
    * On Windows it's
      * Download 0.4.4 binaries from here (http://node-js.prcn.co.cc/)
      * Unzip and double clicked on bin/shell.cmd
  * download powpow
    * install Mercurial (http://mercurial.selenic.com/)
    * type `hg clone https://powpow.googlecode.com/hg/ powpow`
  * cd to powpow
  * type "node server/server.js"
  * in one browser go to "http://address:8080/gameview.html" where address is the machine's IP address
  * In other browsers go to "http://address:8080/"
    * Chrome 15+ should work
    * Other browsers might work if they've been updated to support the current version of the WebSockets spec.

## How to look up your IP address ##

On windows, open a command prompt and type `ipconfig`. On linux and OSX open a shell or terminal and type `ifconfig`


# Runtime Options #

You can set various options in the game by adding to the url in the form of
```
http://address:8080/gameview.html?settings={name1:value1,name2:value2, ...}
```

| **Setting** | **Description** | **Default** |
|:------------|:----------------|:------------|
| msg | Message to display at the top. Must be quoted | URL |
| maxActivePlayers | The number of players in the playfield. | 6 |
| playerVelocity | The speed of player in pixels per second. | 200 |
| playerTurnVelocity | The speed players turn in radians per second. | 1.57 |
| invincibilityDuration | Number of seconds a player is invincible when launching. | 3 |
| maxShots | The number of shots each player is allowed on the screen at once. | 2 |
| shotDuration | The number of seconds each shot lasts. | 3 |
| shotVelocity | The speed of shots in pixels per second. | 300 |



# How it works #

  * gameview.html is the game server. it runs and displays the game
  * server/server.js is the relay server. It passes messages from clients to the game server and back
  * index.html is the client. It sends input events to the game and receives messages from the game