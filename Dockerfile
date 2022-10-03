FROM botpress/server:12.30.2
USER root
# Install tini to manage the processes correctly 
# I tried s6-overlay but it didn't work when QEmu is in the loop
RUN apt install -y tini
# Import the files
COPY --chmod=0644 --chown=botpress:botpress admin-patch.js /botpress/data/assets/admin/ui/public/static/js/admin-patch.js
COPY --chmod=0644 --chown=botpress:botpress no-close-button.css /botpress/data/assets/modules/channel-web/no-close-button.css
COPY --chmod=0700 --chown=botpress:botpress ./patch.sh ./start.sh /botpress/
USER botpress
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD [ "/botpress/start.sh" ]