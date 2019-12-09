#!/usr/bin/env bash

# -----------------------------------------------------------------------------
#
#  This is a Bash Script that runs on the production server [dataformsjs.com]
#  and is used to sync the latest changes from GitHub. It runs manually from
#  the author once published changes are confirmed.
#
#  Only site templates are sync, any other code changes require manual updates.
#  This is due to the fact that the playground server uses a hard-coded
#  security key for authentication which only exists on the server. A 
#  hard-coded key is used over a [.env] file for performance (to avoid loading
#  extra classes and files).
#
#  To run:
#      bash /var/www/scripts/sync-server-from-github.sh
#
#  For testing with [rsync] use [-n = --dry-run]
#  Example:
#      rsync -nrcv --delete ~/playground-master/app_data/template/ /var/www/app_data/template
#
# -----------------------------------------------------------------------------

wget https://github.com/dataformsjs/playground/archive/master.zip -O /home/ubuntu/master.zip
unzip -q master.zip
rm master.zip
rsync -rcv --delete ~/playground-master/app_data/template/ /var/www/app_data/template
rm -r playground-master
