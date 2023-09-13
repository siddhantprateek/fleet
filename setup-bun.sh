#!/bin/bash

if ! command -v bun &> /dev/null
then
    echo "bun is not installed. Installing bun..."
    curl -fsSL https://bun.sh/install | bash
    if [ $? -ne 0 ]; then
        echo "Failed to install bun. Exiting."
        exit 1
    fi
    echo "bun installed successfully."
fi
cd client
echo "Installing client dependencies..."
bun install
if [ $? -ne 0 ]; then
    echo "Failed to install client dependencies. Exiting."
    exit 1
fi
cd ..
cd comm_svc
echo "Installing comm_svc dependencies..."
bun install
if [ $? -ne 0 ]; then
    echo "Failed to install comm_svc dependencies. Exiting."
    exit 1
fi
cd ..
cd rest_svc
echo "Installing rest_svc dependencies..."
bun install
if [ $? -ne 0 ]; then
    echo "Failed to install rest_svc dependencies. Exiting."
    exit 1
fi
cd ..