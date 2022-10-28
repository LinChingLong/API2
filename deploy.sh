#!/usr/bin/env sh
# 發生錯誤時執行終止命令
set -e
# 打包翻譯
npm run build
# 移動到打包資料夾下，若你有調整的話打包後的資料夾請務必調整
cd dist

git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/LinChingLong/API2.git master:gh-
pages

cd-