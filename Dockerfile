FROM botpress/server:12.26.12
# Install tini to manage the processes correctly 
# I tried s6-overlay but it didn't work when QEmu is in the loop
RUN apt install -y tini
# Import the files
COPY --chmod=0644 admin-patch.js /botpress/data/assets/admin/ui/public/static/js/admin-patch.js
COPY --chmod=0644 studio-patch.css /botpress/data/assets/studio/ui/public/css/studio-patch.css
COPY --chmod=0700 ./patch.sh ./start.sh /botpress/
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD [ "/botpress/start.sh" ]