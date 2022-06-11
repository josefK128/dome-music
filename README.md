# Pathfinder indoor navigation assistant 
Note: v1.0.0
Note: requires Nodejs >=12.2


## Install

To install first clone the repository, and then install dependencies
```sh
git clone github/infovision/pathfinder.git
```

```sh
npm install
```





## Usage

First, from the root directory run the script to start a local http server which uses port=3000:

```sh
npm run dev
```

Finally open a browser to url localhost:3000/


Note: the http server (vite) will restart pathfinder after any edit&save of src/main.js

## Features
Responsive device-independent WebAR browser application using typescript/javascript and three.js
#### Interactive Map
all locations have transitory name-labels which become visible on cursor hover
all locations are also greyed on cursor hover to pinpoint which polygon the label refers to
clicking on a location-polygon turns it red for three seconds for quick map-id reading while in greyed state
there is an interactive 'camera' - currently it dollies in the XY-plane, but could also zoom and tilt the map
the upper left menu switches levels in a multi-story environment (in this case lower and upper levels)
#### Blue Dot position tracking
See blue dot (stationary at present) in the lower right corner at entrance to parking lots D and E
complex indoor position sensing using WIFI and Apple IDMF grid for ios, and browser geolocation for android
With WIFI triangulation algorithm (2D => 3 beacons, 3D => 4 beacons) aandroid can be made equivalent
#### A->B path finding
currently uses A (Cleo) and B (American Eagle) and paints an animated path from A to B
With a UI or voice-assistant path finding could be used to show an arbitrary animated path from any A to any B
