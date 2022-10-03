#!/bin/bash
/botpress/bp serve --autoMigrate &
botpress_pid=$!
/botpress/patch.sh &
wait $botpress_pid