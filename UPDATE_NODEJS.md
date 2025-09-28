# Node.js アップデート手順

## Windowsでのアップデート方法

### 方法1: 公式インストーラー（推奨）
1. https://nodejs.org にアクセス
2. **LTS版（20.18.1以降）** をダウンロード
3. ダウンロードしたインストーラーを実行
4. インストール完了後、新しいターミナルを開く
5. `node -v` でバージョン確認

### 方法2: nvm-windows を使用
1. https://github.com/coreybutler/nvm-windows/releases
2. `nvm-setup.exe` をダウンロード・実行
3. インストール後、新しいターミナルで：
```bash
nvm install 20.18.1
nvm use 20.18.1
node -v
```

### 方法3: winget を使用
```bash
winget upgrade OpenJS.NodeJS
```

## macOS/Linuxでのアップデート方法

### 方法1: nvm を使用（推奨）
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20.18.1
nvm use 20.18.1
node -v
```

### 方法2: Homebrew (macOS)
```bash
brew update
brew upgrade node
```

## アップデート後の確認
```bash
node -v  # v20.18.1 以上
npm -v   # 10.x.x
```

## トラブルシューティング
- 古いバージョンが残っている場合は、システムを再起動
- PATHの設定を確認
- 管理者権限で実行