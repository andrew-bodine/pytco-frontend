# pytco-frontend
[![Build Status](https://travis-ci.com/andrew-bodine/pytco-frontend.svg?token=5BWXz1piH3SKhjk2JXW7&branch=master)](https://travis-ci.com/andrew-bodine/pytco-frontend)

PYTCo web application based on AngularJS framework.

## Contribute

You need Docker installed: [https://docs.docker.com/engine/installation](https://docs.docker.com/engine/installation)

This command should succeed before proceeding:
```
$ docker info
```

If it fails, and you are on using Docker Toolbox, (i.e. Windows) you need to init your cmd line shell environment
so it knows how to talk to Docker running in a virtual machine likely on VirtualBox:
```
$ docker-machine start default
$ docker-machine env default

# Copy the command at the end of that output and run it
```

Now your `$ docker info` should work.

To get a development environment up and running, first you need to install the 
Node.js dependencies we use to manage the project:
```
$ npm install -g grunt
$ npm install
```
You only need to do this once initially, and is a good idea to do after you `$ git pull ...`

Then run `grunt` to loop through the [tasks-local](tasks-local)
```
$ grunt
```

Now you have `pytco-frontend` Docker container running, and you can access it
in browser at http://localhost:8000

NOTE: If you are running Windows or Mac, you might be using `docker-machine` to run Docker in Virtualbox. If this is true then your container's ip will be `$ docker-machine ip $(docker-machine active)`. Should be something like `192.168.99.100`

NOTE: Everytime you make a change to one of the files under `app/` Grunt will
automatically build it into the Docker container and run it for you.

## Overview
TODO: Briefly explain the architecture

### Dockerfile
Allows us to easily build releases across different developer machines (Windows, MacOS, Linux).
Makes our development environment portable.

### Gruntfile.js
This file loads the Grunt tasks defined in [tasks](tasks) and [tasks-local](tasks-local)

#### tasks
NOTE: Don't run these on your local machine.
These tasks are used by the `Dockerfile` while building the `pytco-frontend` image.
They are focused on compiling/compressing/minifying assets like scss, css, and js
based on what type of release that is being created. See [Release](Release)

#### tasks-local
These tasks are meant to be executed from your local machine. They mostly interact
with Docker to: remove the existing `pytco-frontend` container, build your most
recent changes into the next version of `pytco-frontend`, and run new
container instances of `pytco-frontend`.

## Release
In production, ideally you want to delegate your static website content delivery to a
CDN service. This suites AngularJS applications well because all of the control logic
is running client-side (browser).
```
$ grunt release
$ docker copy pytco-frontend:// </output/path/app>
```
