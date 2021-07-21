#!/bin/bash

for i in 1
do
    git add .
    git commit -m "."
    git push
    sleep 2
done
