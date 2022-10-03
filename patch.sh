#!/bin/bash

# We run the patch after botpress has started because botpress has a bit unusual behaviour
# for a contairnerised application. It will extract resource files from its big binary at
# startup everytime and override the existing files. Therefore we cannot easily, without
# spending a bit too much human time, create a container image with the already patched files.

# Wait for service to be available by doing a http request every 3 seconds using wget
# until it is successful.
# url is http://localhost:3000/admin/
url="http://localhost:3000/admin/"
until $(wget --spider --quiet --tries=20 --timeout=2 $url >/dev/null 2>&1); do
  echo "Waiting for $url to start..."
  sleep 3
done

echo "Patching $url"
sed -i 's/<div id="root"><\/div>/<div id="root"><\/div><script src="admin\/static\/js\/admin-patch\.js"><\/script>/' /botpress/data/assets/admin/ui/public/index.html

