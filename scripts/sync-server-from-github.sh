#!/usr/bin/env bash

# -----------------------------------------------------------------------------
#
#  This is a Bash Script that runs on the production server
#  [playground.dataformsjs.com] and is used to sync the latest changes
#  from GitHub. It runs manually from the author once published changes
#  are confirmed.
#
#  To run:
#      bash /var/www/dataformsjs-playground/scripts/sync-server-from-github.sh
#
#  For testing with [rsync] use [-n = --dry-run]
#  Example:
#      rsync -nrcv --delete ~/playground-master/app_data/template/ /var/www/dataformsjs-playground/app_data/template
#
# -----------------------------------------------------------------------------

wget https://github.com/dataformsjs/playground/archive/master.zip -O ~/master.zip
unzip -q ~/master.zip
rm ~/master.zip
rsync -rcv --delete ~/playground-master/app/ /var/www/dataformsjs-playground/app
rsync -rcv --delete ~/playground-master/app_data/template/ /var/www/dataformsjs-playground/app_data/template
rsync -rcv --delete ~/playground-master/scripts/ /var/www/dataformsjs-playground/scripts
rsync -rcv --delete --exclude sites ~/playground-master/html/ /var/www/dataformsjs-playground/public
rm -r ~/playground-master
