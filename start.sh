#!/bin/bash
/botpress/bp serve &
botpress_pid=$!
/botpress/patch.sh &
wait $botpress_pid