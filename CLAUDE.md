## 共通スキル
以下の共通スキルを参照すること：
- 「KPI分析して」→ ~/projects/shared-skills/kpi-analysis.md を読んで実行
- 「CR分析して」→ ~/projects/shared-skills/cr-analysis.md を読んで実行
- 「バナー作って」→ ~/projects/shared-skills/banner-prompt-template.md を読んで実行
- 「新規バナー作って」→ ~/projects/shared-skills/new-banner-creation.md を読んで実行
- 「CDチェック」→ ~/projects/shared-skills/creative-director.md を読んで実行
- 「コピー書いて」→ ~/projects/shared-skills/copywriter.md を読んで実行
- 「戦略を立てて」→ ~/projects/shared-skills/strategist.md を読んで実行
- 「縦型リサイズして」→ ~/projects/shared-skills/vertical-resize.md を読んで実行

## バナー制作時の参照
バナー制作時は必ず ./banner-patterns.md を読んでから制作すること

## 案件情報
- クライアント: Cominka
- 業種: SEOツール
- LP: 未定（これから作成）
- 月予算: ¥1,500,000
- KPI目標: リード単価 ¥15,000
- ロゴ: 未定（./assets/ に配置予定）

## レポートURL
- 広告レポート: 未定

## 画像生成ルール
- 画像生成には Codex CLI の組み込み image_gen ツールを使うこと
- コマンド: codex exec --dangerously-bypass-approvals-and-sandbox --cd "$PWD" "image_gen: [プロンプト]"
- Pythonスクリプトを書いてAPI経由で生成してはいけない（従量課金が発生するため）
- APIキーは使わない。ChatGPTサブスクリプション認証（OAuth）を使用する
- 画像サイズは必ず正方形（1080x1080px）で生成すること。ユーザーから明示的に縦長・横長の指定がない限り例外なし
- スマホ画面風（iPhone/Android）、メモアプリ風、チャット画面風などのデザインでも必ず正方形で生成すること。縦長にしない
- Codexへのプロンプトに必ず「square 1080x1080px, 1:1 aspect ratio」を含めること
- 画像生成後、生成されたファイルを ~/Downloads/ にコピーすること
- 以下のUGC系・第三者風バナーの場合はロゴを合成しないこと：
  - 背景グラデ＋文字のみ
  - LINE風トーク画面
  - ChatGPT風会話画面
  - Chatwork風チャット画面
  - Slack風メッセージ画面
  - X（Twitter）投稿風
  - レビュー・口コミ投稿風
  - その他、第三者の投稿・会話を模したフォーマット全般

## セキュリティルール
- ファイルを削除する前は必ず確認すること
- 知らないコマンドを実行する前に、日本語でそのコマンドの内容を説明すること

## ツール実行時の許可ルール
- ツール実行の許可を求めるときは、必ず日本語で説明・確認を行うこと
- 許可を求める際、以下のセキュリティリスクをパーセンテージ(%)で提示すること
  - パスワードや秘密鍵が外に漏れる可能性
  - 外部サーバーにデータが送られる可能性
  - 悪意あるコードが勝手に動く可能性
  - PCの設定が書き換わる可能性
