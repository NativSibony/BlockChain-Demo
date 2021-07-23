#!/bin/bash

for i in 1
do
    git push heroku main
    sleep 2
done
