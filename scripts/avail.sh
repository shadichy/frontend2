#!/bin/bash

timecalc(){
	echo $(( $1 * 60 + $2 ))
}

export DIALOGRC=./dialog.conf

day=$(dialog --date-format "%m/%d/%Y" --calendar "Schedule server open date" 0 0 3>&1 1>&2 2>&3)
if [[ -z "${day}" ]]; then
	exit 1
fi

time=$(dialog --timebox "Schedule server open time" 0 30 3>&1 1>&2 2>&3)
if [[ -z "${time}" ]]; then
	exit 1
fi

len=$(dialog --time-format "%H %M" --timebox "Server will be opened for (hours:minutes)" 0 60 2 0 0 3>&1 1>&2 2>&3)
if [[ -z "${len}" ]]; then
	exit 1
fi

srvopn="[$(date --date="${day} ${time}" +"%s"),$(timecalc ${len})]"

echo -e $srvopn

echo $srvopn > src/avail.json
