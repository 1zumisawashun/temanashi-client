# Getting Started with Create React App

採用している技術スタック

```
言語： TypeScript
CSSアーキテクチャ： ITCSS, RSCSS
ライブラリ： React
ホスティング： Firebase Hosting
DB： Firestore
認証： Firebase Authentication
トークン： JsonWebToken
APIサーバー： Cloud Functions, Express
ストレージ： Cloud Storage
決済： Firebase Stripe Extention
E2Eテスト： Cypress
```

# Available Scripts

### `npm install`

clone した後にパッケージをインストールする

### `npm run start`

local の開発環境を実行する

### `npm run build:firebase`

root ディレクトリで指定のコマンドを実行する。  
Cloud Functions の TypeScript をコンパイルし作成した関数のみのデプロイを実行する。

### `npm run deploy:firebase`

root ディレクトリで指定のコマンドを実行する。  
src ディレクトリをビルドして Firebase Hosting へのデプロイを実行する
