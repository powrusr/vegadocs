#!/usr/bin/env bash

version="$(cat package.json | jq .version -r)"
doc_version="v$version"

echo "Pre-fixup: $doc_version"

echo "Swagger: Add version in"
sed -i -E "s/version not set/$version/g" "specs/$doc_version/trading_data_v1.swagger.json"

echo "Swagger: Destroy multi line summaries"
# These are some ugly sed lines, but it matches summaries with linebreaks and only includes what's before the first linebreak
sed -i -E 's/"summary": "\(.*[^\]\)\\n\(.*\)"/"summary": "\1"/g' "specs/$doc_version/trading_data_v1.swagger.json"
sed -i -E 's/"summary": "\(.*[^\]\)\\n\(.*\)"/"summary": "\1"/g' "specs/$doc_version/trading_data_v2.swagger.json"

echo "Swagger: Remove trailing punctuation from summaries"
# These are some ugly sed lines too, but removes trailing , or .
sed -i -E 's/"summary": "\(.*[^,.]\).*"/"summary": "\1"/g' "specs/$doc_version/trading_data_v1.swagger.json"
sed -i -E 's/"summary": "\(.*[^,.]\).*"/"summary": "\1"/g' "specs/$doc_version/trading_data_v2.swagger.json"

echo "Swagger: Give TradingDataService v1 a distinct name"
sed -i -E 's/TradingDataService/Trading Data Service (v1)/' "specs/$doc_version/trading_data_v1.swagger.json"

echo "Swagger: Give TradingDataService v2 a distinct name"
sed -i -E 's/TradingDataService/Trading Data Service (v2)/' "specs/$doc_version/trading_data_v2.swagger.json"

# Mac SED workaround - delete remnant files (not required with gsed)
find . -name "*-E" -exec rm -rf {} +


