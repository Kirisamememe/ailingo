## 環境

### ライブラリ

- フレームワーク
  - [Next.js](https://nextjs.org/docs)
- CSS
  - [Tailwind](https://tailwindcss.com/)
- その他のツール
  - [Plop](https://plopjs.com/)

### 動作環境

- volta: 2.0.2
- Node: 22.15.x
- npm: 10.9.x

### エディタ

- Cursor

## 環境構築

```bash
git clone git@github.com:Kirisamememe/ailingo.git
cd ailingo
npm install
```

## 自動生成

### コンポーネント

以下のコマンドを実行した後、次の質問に答えるとコンポーネントの雛形が自動生成される

- コンポーネントの名前を入力してください
  - ここでの入力がそのままファイルやコンポーネントの名前に適用される
- コンポーネントを作成するディレクトリを選択してください
  - `src`直下のどのディレクトリに作成するかを選択
- ファイル構造を選択してください
  - `フォルダー＋index.tsx`で作成するか、`ファイル名.tsx`で作成するかを選択

```bash
npm run plop
```

## ビルド

```bash
npm run build

# ビルド結果の動作確認
npm run start
```

## Gitルール

### コミット時に走るツール

- Prettier
  - ファイル保存時、コミット時に自動で全ファイルをフォーマット
  - 全てのファイルをフォーマットする場合は`npm run format:write`で可能
- ESLint
  - コミット時に自動でファイルを解析
  - 対象ファイルは`.js`, `.ts`, `.tsx`
  - エラーを解消しないとコミットできない
  - `npm run lint`を実行すると任意のタイミングで解析可能(推奨)
- commitlint
  - コミット時にコミットメッセージを解析
  - コミットメッセージのルールは後述

### コミットメッセージの形式

```none
[type]: [subject]

例1） feat: ボタンコンポーネントを実装
例2） fix: スマホ画面でメニューが表示されないバグを解消
```

- `type`は次のいずれか
  - `feat`: 新規実装
  - `fix`: バグの修正
  - `refactor`: リファクタリング
  - `chore`: ライブラリの導入やドキュメントの更新など上記以外

### ブランチの運用ルール

-

## ディレクトリ構成

```bash
[プロジェクト]
├── .husky/                # Git hooks設定
├── .vscode/               # VSCode設定
├── configs/               # 設定ファイル
├── node_modules/          # 依存パッケージ
├── plop/                  # コード自動生成テンプレート
├── public/                # 静的ファイル
├── src/                   # ソースコード
│   ├── app/               # Next.jsアプリケーション
│   ├── components/        # コンポーネント
│   │   └── ui/            # UIコンポーネント
│   └── lib/               # ユーティリティなど
├── .gitignore             # Gitの除外設定
├── components.json        # shadcn/ui設定
├── commitlint.config.mjs  # コミットメッセージ検証設定
├── eslint.config.ts       # ESLint設定
├── next.config.ts         # Next.js設定
├── next-env.d.ts          # Next.js型定義
├── package.json           # 依存関係と設定
├── package-lock.json      # 依存関係のロック
├── plopfile.ts            # Plop設定
├── postcss.config.mjs     # PostCSS設定
├── tsconfig.json          # TypeScript設定
└── README.md              # 本ドキュメント
```
