#!/bin/bash

# Create all React component files
mkdir -p client/src/{components,services,styles} client/public

# Copy existing component files if they exist, or we'll create them after
echo "React structure created"
ls -la client/src/
