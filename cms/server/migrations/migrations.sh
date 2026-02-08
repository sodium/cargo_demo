#!/bin/sh
cd /opt/app/
npm run strapi import -- -f /tmp/migration-1.tar --force 
# Then start the main application process (passed via CMD)
exec "$@"