#!/usr/bin/env bash
if [ "$TRAVIS_PULL_REQUEST" != "false" ] ; then
    RESULT="`cat $TRAVIS_BUILD_DIR/result.json`"
    curl -H "Authorization: token ${GITHUB_TOKEN}" -X POST  -d "{\"body\": ${RESULT}" "https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments"
fi
