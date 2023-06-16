# ベースとなるDockerイメージを指定します。この例ではNode.js 14を使用します。
FROM node:18

# コンテナ内で作業を行うディレクトリを指定します。
WORKDIR /app

# プロジェクトのpackage.jsonとpackage-lock.jsonをコンテナにコピーします。
COPY package*.json ./

# package.jsonにリストされた依存パッケージをインストールします。
RUN npm install

# アプリケーションのソースコードをコンテナにコピーします。
COPY . .

# アプリケーションが使用するポートを公開します。この例では、アプリケーションがポート 3000でリッスンすると仮定しています。
EXPOSE 80

# コンテナが起動する際に実行されるコマンドを指定します。
CMD [ "node", "Odata.js" ]
