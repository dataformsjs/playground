<?php

// This file runs from a development environment and simply
// redirects to the [html] directory which is used as the
// public root directory on the production web server.

// Or to test on an actual server use a cloud server and follow instructions
// from the file [docs\Playground Server Setup.txt].

// To run from a command line or terminal program you can use the following:
//     cd {root-directory}
//     php -S localhost:8888
//
// Then open your web browser to:
//     http://localhost:8888/playground/html/
//
// This assume the following folder structure:
//   - [dataformsjs] "Root Directory"
//     - [website] Repository
//     - [playground] Repository (this project)

header('Location: html/');
