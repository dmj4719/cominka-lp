Cominka様 Google広告LP（KPIコミット型 SEO/AIO支援）
=====================================================

■ ファイル構成
  index.html        … LP本体（PC／SP レスポンシブ）
  thanks.html       … サンクスページ（PC／SP レスポンシブ）
                      構成：お礼 → TimeRex日程予約（埋め込み） → 特典2つ → 動画2本。LPなど他ページへのリンクはなし
  css/style.css     … 共通スタイル（デザイントークンは :root に集約）
  js/main.js        … ロゴの横スクロール、シミュレーション計算、YouTube埋め込み、フォーム検証、SP追従CTA
  images/           … 画像

■ フォント
  Google Fonts から読み込み（Figmaと同一）
  ・Zen Kaku Gothic New 400 / 500 / 700 / 900
  ・DM Serif Display 400

■ ブレイクポイント
  1280px以上：PCデザイン（Figma 1440px準拠）
  1024〜1279px：小さめPC／タブレット横
  768〜1023px：タブレット
  767px以下：SP（下部に追従CTAを表示。FVとフォーム表示中は非表示）

■ 画像
  すべて支給素材・Figma素材で反映済みです。
  images/logo-cominka.png（Cominkaロゴ）／images/fv-team.jpg（FV写真）／images/ceo-shiraki.jpg（代表写真・高解像度版）
  images/case-*.jpg（事例写真3社）／images/illust-*.png（イラスト2点）
  images/logos/（導入企業ロゴ13社。index.html の <template id="logo-list"> の並び順で横に流れます）
  ※ロゴは188×105の枠内に自動で収まります（SPは120×64）。

■ 実装時に設定が必要な箇所
  1. フォーム送信（EmailJS 連携済み）
     js/main.js の EMAILJS（サービスID／テンプレートID／パブリックキー）で送信し、成功時に thanks.html へ遷移。
     送信に失敗した場合はフォーム下にエラーを表示します。テンプレート本文は emailjs_template.txt を参照。
  2. プライバシーポリシーのURL
     data-todo="プライバシーポリシーURLに差し替え" が付いたリンク（index.html／thanks.html）。
  3. 計測タグ
     GTM（GTM-ND9ZBPRL）を両ページの <head> 直後に設置済み。
     コンバージョンは thanks.html の表示で計測する想定です。
  4. noindex
     広告LPのため両ページ noindex にしています。不要なら meta robots を削除してください。

■ 要確認事項（クライアント確認待ち）
  ・代表経歴「創業3年で年商1億円を達成」の表記
  ・山元紙包装社様「お客様の声」の文言（yori-ai事例ページの発言を2行に要約したもの）
