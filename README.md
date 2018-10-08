# BIM Live API Workshop

This project is built with Angular and NodeJS.

## Introduction

Welcome to BIM Live API Workshop! This is the advanced session where we together (after a presentation) will try to go through
the code and talk about some pitfalls when it comes to implementing the API.

## Preparation

In order to make the workshop more efficient we want to ask you to prepare a couple of things.

* Make sure you have an account on https://www.bimobject.com and have requested access to become a developer on https://developer.bimobject.com, mark your request with "BIM LIVE WORKSHOP" or something similair.

* Download this reposotory, either by using `git` or by simply downloading it from [github](https://github.com/bimobject/bim-live-workshop/archive/master.zip).

* Have [NodeJS](www.nodejs.org) installed (`npm` comes with it)

* In the root of this project, run `npm install` in a terminal

* Any question? Please come a bit earlier to the workshop and I'll try to help you out.

## Developing

* Open two terminals:
  * run `yarn start` in one (this will launch the server)
   (if you do any changes to the code in the `server/` folder, restart the app by pressing CTRL+C)
  * run `yarn watch` in the other (this will build the front end and watch any changes)
  (if you do any changes to the code in the `src/app` folder, just reload your browser).

  Now you can access the site by navigating to http://localhost:9090

## Disclaimer

This code is not regarded in anyway as production ready, it is a project intended to be used in this Workshop.
However, all code is free to use and modify as you want.
