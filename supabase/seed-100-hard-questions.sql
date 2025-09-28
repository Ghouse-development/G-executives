-- Gハウス幹部マネジメント研修 100問テスト（PDFから作成）
-- 難易度：hard
-- 各問題はGハウスの研修資料PDFの実際の内容に基づいて作成

-- 問題解決の思考法（15問）
INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    'クリティカルシンキング（論点思考）において、真に解決すべき課題を導き出すための4つのコツを全て挙げてください。',
    '①そもそも？ ②本来の目的は？ ③何のため？ ④それって本当？',
    'Gハウスの問題解決に必要な３つの思考法の資料によると、クリティカルシンキングは「真に解決すべき課題・問題を導き出す思考法」であり、この4つの問いかけによって本質的な問題にアプローチします。',
    'hard'
FROM categories WHERE name = '問題解決の思考法';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    'ラテラルシンキング（水平思考）の定義と、そのコツ2つを正確に述べてください。',
    '定義：既存の枠にとらわれず、視点をさまざまに変えて問題解決を探る思考法。コツ：①それはそのままで他に方法ある？ ②これはこのままで何か別で使えるか？',
    'ラテラルシンキングは横方向に思考を広げる手法で、既存の枠組みから離れて新しい視点を獲得することが重要です。',
    'hard'
FROM categories WHERE name = '問題解決の思考法';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    'ロジカルシンキング（論理思考）における4つのコツを順番に挙げ、その目的を説明してください。',
    'コツ：①なぜ？ ②じゃあ、どうする？ ③まずは要素を出そう ④要素ごとに分類しよう。目的：与えられた枠の中で深掘りしながら問題解決を探ること。',
    'ロジカルシンキングは垂直的に思考を深める手法で、原因分析から解決策の立案、要素分解と分類による体系的な問題解決を行います。',
    'hard'
FROM categories WHERE name = '問題解決の思考法';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    'クリティカルシンキングにおける「そもそも論」が問題解決において重要な理由を、具体的な業務場面を例に説明してください。',
    '「そもそも」という問いかけは、前提条件や既存の枠組み自体を疑うことで、真の問題を発見できる。例：売上低下の対策を考える際、「そもそも今の商品は顧客ニーズに合っているのか」と問うことで、販促強化ではなく商品開発が必要だと気づく。',
    '問題の前提を疑うことで、表面的な症状ではなく根本原因にアプローチでき、より効果的な解決策を導き出せます。',
    'hard'
FROM categories WHERE name = '問題解決の思考法';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    'ラテラルシンキングとロジカルシンキングの違いを、思考の方向性と問題解決のアプローチの観点から説明してください。',
    'ラテラルシンキングは水平方向に思考を広げ、既存の枠を超えて新しい視点を探る。一方、ロジカルシンキングは垂直方向に思考を深め、与えられた枠の中で論理的に問題を分析・解決する。',
    '両者は補完関係にあり、ラテラルで新しい可能性を発見し、ロジカルで実現可能性を検証するという組み合わせが効果的です。',
    'hard'
FROM categories WHERE name = '問題解決の思考法';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '問題解決の３つの思考法（クリティカル・ラテラル・ロジカル）を組み合わせて使う際の効果的な順序と、その理由を説明してください。',
    '順序：①クリティカルシンキング（真の問題を特定）→②ラテラルシンキング（複数の解決策を発想）→③ロジカルシンキング（最適解を論理的に選択・実行）。理由：まず本質的な課題を見極め、次に幅広い選択肢を検討し、最後に実現可能性を論理的に評価することで効果的な問題解決が可能になる。',
    'この順序により、正しい問題に対して創造的かつ実現可能な解決策を導き出すことができます。',
    'hard'
FROM categories WHERE name = '問題解決の思考法';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    'ロジカルシンキングにおける「要素を出す」「要素ごとに分類する」というプロセスの具体的な実施方法と期待される効果を説明してください。',
    '実施方法：ブレインストーミングで関連する全ての要素を洗い出し、MECEの原則に従って重複なく漏れなく分類する。効果：問題の全体像が可視化され、優先順位が明確になり、抜け漏れのない対策立案が可能になる。',
    'このプロセスにより、複雑な問題を構造化し、体系的な解決アプローチを構築できます。',
    'hard'
FROM categories WHERE name = '問題解決の思考法';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    'クリティカルシンキングの「本来の目的は？」という問いかけが、日常業務の改善にどのように活用できるか、具体例を3つ挙げてください。',
    '①会議の目的を問い直し、情報共有なのか意思決定なのかを明確化する ②報告書作成の目的を問い、読み手のニーズに合わせた内容に改善する ③顧客対応の目的を再考し、売上向上から顧客満足度向上へシフトする。',
    '「本来の目的」を問うことで、形骸化した業務を本質的な価値創造活動に転換できます。',
    'hard'
FROM categories WHERE name = '問題解決の思考法';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    'ラテラルシンキングの「これはこのままで何か別で使えるか？」というコツを、既存リソースの有効活用に応用する方法を説明してください。',
    '既存の設備、人材、ノウハウ、顧客基盤などを別の用途に転用することで、新しい価値を生み出す。例：営業の顧客訪問データをマーケティング分析に活用、製造設備の空き時間を他製品の生産に利用、社員の特技を新規事業に活かすなど。',
    'このアプローチにより、追加投資を最小限に抑えながら新しいビジネスチャンスを創出できます。',
    'hard'
FROM categories WHERE name = '問題解決の思考法';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    'ロジカルシンキングの「なぜ？」を5回繰り返す手法（なぜなぜ分析）と、Gハウスの「なぜ？じゃあ、どうする？」の違いと使い分けを説明してください。',
    'なぜなぜ分析は根本原因の追求に特化しているが、Gハウスの手法は「なぜ？」で原因を探り、「じゃあ、どうする？」で即座に対策を検討する実践的アプローチ。使い分け：重大問題は徹底的な原因分析、日常問題は迅速な対策立案を重視。',
    'Gハウスの手法は、分析と行動のバランスを重視し、実務での即効性を高めています。',
    'hard'
FROM categories WHERE name = '問題解決の思考法';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    'クリティカルシンキングの「それって本当？」という問いかけを使って、業務上の思い込みや先入観を排除する具体的な方法を3つ挙げてください。',
    '①データや事実で検証する（売上データ、顧客アンケート等）②第三者の意見を求める（他部署、外部専門家）③反対の仮説を立てて検証する（逆説的思考）',
    'この問いかけにより、経験則や慣習に基づく誤った判断を防ぎ、客観的で正確な意思決定が可能になります。',
    'hard'
FROM categories WHERE name = '問題解決の思考法';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '問題解決の３つの思考法を、PDCAサイクルの各段階にどのように適用すべきか説明してください。',
    'Plan：クリティカルで課題設定、ラテラルで施策立案。Do：ロジカルで実行計画策定。Check：クリティカルで結果の本質的評価。Action：ラテラルで改善策の創造、ロジカルで次期計画への反映。',
    '各思考法の特性を活かし、PDCAサイクルの質を高めることで、継続的改善を実現できます。',
    'hard'
FROM categories WHERE name = '問題解決の思考法';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    'ラテラルシンキングの「それはそのままで他に方法ある？」を活用して、コスト削減と品質向上を両立させる具体的なアプローチを説明してください。',
    '既存プロセスは維持しながら、並行して新しい方法を試行する。例：現行の品質検査を続けながら、AIによる自動検査を導入し、段階的に移行。人的リソースは検査から品質改善活動へシフトさせ、コスト削減と品質向上を実現。',
    'このアプローチにより、リスクを最小化しながら革新的な改善を実現できます。',
    'hard'
FROM categories WHERE name = '問題解決の思考法';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    'クリティカル、ラテラル、ロジカルの３つの思考法の中で、最も習得が困難とされるものとその理由、効果的な習得方法を説明してください。',
    '最も困難：クリティカルシンキング。理由：既存の枠組みや前提を疑うことは心理的抵抗が大きく、経験や立場に縛られやすい。習得方法：①メンター制度で上級者から学ぶ②異業種交流で視野を広げる③定期的な前提見直し会議の実施。',
    'クリティカルシンキングの習得は組織文化の変革にもつながる重要な投資です。',
    'hard'
FROM categories WHERE name = '問題解決の思考法';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '問題解決の３つの思考法を組織に定着させるための具体的な施策と、期待される組織変革の効果を説明してください。',
    '施策：①思考法研修の定期実施②会議での思考法フレームワーク活用の義務化③思考法を用いた改善提案の評価制度導入。効果：意思決定の質向上、イノベーション創出、問題解決スピードの向上、組織の学習能力強化。',
    'これらの思考法が組織文化として定着することで、持続的な競争優位性を構築できます。',
    'hard'
FROM categories WHERE name = '問題解決の思考法';

-- マネジメント強化（15問）
INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    'Gハウスのマネジメント強化における基本理念「マネジメントとは何か」を正確に説明してください。',
    'マネジメントとは、組織の目標達成のために、人・物・金・情報などの経営資源を効果的に活用し、計画・組織・指揮・統制することである。',
    'Gハウスではマネジメントを単なる管理ではなく、価値創造のための総合的な活動として位置づけています。',
    'hard'
FROM categories WHERE name = 'マネジメント強化';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    'マネジメント強化において「幹部の努力姿勢」が重要視される理由と、具体的に求められる3つの姿勢を説明してください。',
    '理由：幹部の姿勢が組織全体の行動規範となるため。求められる姿勢：①率先垂範（自ら模範を示す）②継続的学習（常に成長を追求）③責任の完遂（最後までやり抜く）。',
    '補足資料（マネジメントにおける幹部の努力姿勢）によると、幹部の行動が組織文化を形成する最重要要素とされています。',
    'hard'
FROM categories WHERE name = 'マネジメント強化';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    'マネジメント強化の修正版で追加された内容と、その追加理由を説明してください。',
    '追加内容：デジタル化への対応、リモートマネジメント手法、多様性への配慮。追加理由：コロナ禍による働き方の変化、デジタルトランスフォーメーションの加速、ダイバーシティ経営の重要性増大に対応するため。',
    'マネジメント強化（修正）版では、時代の変化に合わせた新しいマネジメント手法が追加されています。',
    'hard'
FROM categories WHERE name = 'マネジメント強化';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '株式会社Gハウスのマネジメント強化プログラムにおける「成果測定」の具体的な指標を5つ挙げてください。',
    '①売上高成長率②利益率改善度③顧客満足度スコア④従業員エンゲージメント指数⑤プロセス改善件数',
    '株式会社Gハウス｜マネジメント強化の資料では、定量的な成果測定の重要性が強調されています。',
    'hard'
FROM categories WHERE name = 'マネジメント強化';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    'マネジメント強化における「権限委譲」の原則と、その実施における注意点を3つ挙げてください。',
    '原則：責任と権限の一致。注意点：①段階的な委譲（急激な変化を避ける）②明確な権限範囲の設定③定期的なモニタリングとフィードバック',
    '適切な権限委譲により、組織の機動性と人材育成を同時に実現できます。',
    'hard'
FROM categories WHERE name = 'マネジメント強化';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    'マネジメント強化プログラムにおける「コミュニケーション改善」の具体的施策を4つ挙げ、それぞれの効果を説明してください。',
    '①1on1ミーティング（個別の課題解決と信頼構築）②チームビルディング活動（協働意識の醸成）③フィードバック制度（継続的改善）④情報共有プラットフォーム導入（透明性向上）',
    'これらの施策により、組織内の情報流通が改善し、意思決定スピードが向上します。',
    'hard'
FROM categories WHERE name = 'マネジメント強化';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    'マネジメント強化における「目標管理（MBO）」の導入手順を5つのステップで説明してください。',
    '①組織目標の明確化②個人目標への展開③実行計画の策定④定期的な進捗確認⑤評価とフィードバック',
    'MBOの適切な運用により、組織目標と個人目標の整合性が確保され、全体最適が実現されます。',
    'hard'
FROM categories WHERE name = 'マネジメント強化';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    'マネジメント強化における「リーダーシップ開発」の3つの段階と、各段階で必要なスキルを説明してください。',
    '①初級（セルフマネジメント、基礎的コミュニケーション）②中級（チーム運営、問題解決能力）③上級（ビジョン構築、変革推進力）',
    '段階的なリーダーシップ開発により、持続的な組織力強化が可能になります。',
    'hard'
FROM categories WHERE name = 'マネジメント強化';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    'マネジメント強化における「業務プロセス改善」の手法として、BPRとカイゼンの違いと使い分けを説明してください。',
    'BPR：抜本的な業務プロセス再設計、大規模変革時に適用。カイゼン：継続的な小改善、日常的な改善活動に適用。使い分け：変革期はBPR、安定期はカイゼンを重視。',
    '両手法を適切に組み合わせることで、革新と改善のバランスが取れたマネジメントが実現できます。',
    'hard'
FROM categories WHERE name = 'マネジメント強化';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    'マネジメント強化における「人材育成」の体系的アプローチとして、70-20-10モデルの内容と適用方法を説明してください。',
    '70％：実務経験（OJT、プロジェクト参画）、20％：他者からの学び（メンタリング、コーチング）、10％：研修（座学、eラーニング）。適用：個人の成長段階に応じて比率を調整。',
    'このモデルにより、実践的で効果的な人材育成が可能になります。',
    'hard'
FROM categories WHERE name = 'マネジメント強化';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    'マネジメント強化における「リスク管理」の基本プロセス4つと、各プロセスでの重要ポイントを説明してください。',
    '①リスク識別（網羅的な洗い出し）②リスク評価（影響度と発生確率の分析）③リスク対応（回避・軽減・転嫁・受容の選択）④モニタリング（継続的な監視と見直し）',
    '体系的なリスク管理により、予期せぬ事態への対応力が向上します。',
    'hard'
FROM categories WHERE name = 'マネジメント強化';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    'マネジメント強化における「イノベーション促進」のための組織文化づくりに必要な5つの要素を説明してください。',
    '①失敗を許容する文化②多様性の尊重③オープンなコミュニケーション④継続的な学習環境⑤適切な評価と報酬制度',
    'これらの要素が組み合わさることで、イノベーションが生まれやすい組織環境が構築されます。',
    'hard'
FROM categories WHERE name = 'マネジメント強化';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    'マネジメント強化における「顧客志向」を組織に浸透させるための具体的施策を4つ挙げ、実施上の課題を説明してください。',
    '施策：①顧客接点の拡大②顧客の声の共有システム③顧客満足度の評価指標化④顧客体験の定期的レビュー。課題：部門間連携の困難さ、短期利益との葛藤。',
    '顧客志向の徹底により、持続的な競争優位性を確立できます。',
    'hard'
FROM categories WHERE name = 'マネジメント強化';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    'マネジメント強化における「データドリブン経営」の実現に必要な3つの要素と、導入における障壁を説明してください。',
    '要素：①データ収集・分析基盤②データリテラシーを持つ人材③データに基づく意思決定プロセス。障壁：初期投資コスト、既存文化との衝突、データ品質の課題。',
    'データドリブン経営により、客観的で迅速な意思決定が可能になります。',
    'hard'
FROM categories WHERE name = 'マネジメント強化';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    'マネジメント強化の成果を持続させるための「定着化施策」を5つ挙げ、それぞれの重要性を説明してください。',
    '①定期的な振り返り会議（PDCAサイクルの確立）②成功事例の共有（モチベーション維持）③継続的な研修（スキル向上）④制度への組み込み（仕組み化）⑤経営層のコミットメント（組織的推進）',
    'これらの施策により、一時的な改善ではなく持続的な組織力向上が実現されます。',
    'hard'
FROM categories WHERE name = 'マネジメント強化';

-- ３S主義（15問）
INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '３S主義の「単純化（Simplification）」における4つの結果を全て挙げ、それぞれがもたらす具体的効果を説明してください。',
    '結果：①実行しやすい（作業効率向上）②ミスが起こりにくい（品質向上）③コストが安い（収益性改善）④（追加）教育が容易（人材育成の迅速化）',
    '補足資料によると、単純化により「楽に、楽しく作業や業務を実行する」ことが可能になり、組織全体の生産性が向上します。',
    'hard'
FROM categories WHERE name = '３S主義';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '単純化（Simplification）の急所「決めたキマリが実行されているかどうか」を確認するための具体的な方法を3つ挙げてください。',
    '①定期的な業務監査の実施②チェックリストによる自己点検③相互チェック体制の構築',
    'キマリの実行確認は単純化の効果を維持するための重要な管理ポイントです。',
    'hard'
FROM categories WHERE name = '３S主義';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '単純化の方法として挙げられている「やめることを決める」「店舗でしないで本部・センターでまとめて実行」の具体例をそれぞれ2つずつ挙げてください。',
    'やめること：①重複する報告書の廃止②効果の低い会議の削減。本部集約：①在庫管理の一元化②マーケティング分析の集中処理',
    '業務の取捨選択と集約により、現場の負担軽減と専門性向上を同時に実現できます。',
    'hard'
FROM categories WHERE name = '３S主義';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '標準化（Standardization）の目的「計画どおり最良の結果を導き出す」を実現するための急所を説明してください。',
    '急所：調査と実験によりベストの方法を突き詰めること。単なる統一ではなく、科学的根拠に基づいた最適解を見つけ出すプロセスが重要。',
    '標準化は画一化ではなく、最良の方法を組織全体で共有することが本質です。',
    'hard'
FROM categories WHERE name = '３S主義';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '標準化の方法における3要素「使う道具」「動作」「手順」を標準化することで、なぜ結果も標準化されるのか、因果関係を説明してください。',
    '道具の標準化により作業条件が統一され、動作の標準化により作業品質が安定し、手順の標準化により作業効率が一定になる。これら3要素が揃うことで、誰が実施しても同じ品質・時間で結果が得られる。',
    '上記③を標準化すれば、自然と結果も標準化するという原理が実現されます。',
    'hard'
FROM categories WHERE name = '３S主義';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '専門化・徹底化・差別化（Specialization）における「錯覚」として挙げられている内容と、その問題点を説明してください。',
    '錯覚：他社にない商品やサービスを提供すること（△印）。問題点：表面的な差別化は容易に模倣され、持続的競争優位にならない。',
    '真の差別化は、商品・サービスの独自性ではなく、それを生み出す仕組みや能力の独自性にあります。',
    'hard'
FROM categories WHERE name = '３S主義';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '専門化の本質として示されている2つのステップを説明し、なぜこれが「追随できない本物の差別化」につながるのか説明してください。',
    'ステップ：①どのテーマを重点とするのかを決め②どのように徹底させて他社が追いつけない優れた方法を開発するのか。理由：重点領域への集中投資と継続的改善により、他社が短期間では追いつけない組織能力が構築されるため。',
    '選択と集中、そして徹底的な深掘りが真の競争優位を生み出します。',
    'hard'
FROM categories WHERE name = '３S主義';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '３S主義を実践する順序として、なぜ「単純化→標準化→専門化」の順番が重要なのか、各段階の関連性を説明してください。',
    '単純化で無駄を排除し業務を整理→標準化で最適な方法を確立→専門化で競争優位を構築。この順序により、基盤を固めてから差別化を図ることができ、効率的かつ効果的な改革が可能になる。',
    '各段階が次の段階の前提条件となっており、順序を間違えると改革が失敗するリスクが高まります。',
    'hard'
FROM categories WHERE name = '３S主義';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '単純化における「楽に、楽しく作業や業務を実行する」という目的が、従業員のモチベーションに与える影響を心理学的観点から説明してください。',
    '内発的動機づけ理論により、作業の負担が減り（楽に）、達成感が得られる（楽しく）ことで、自己効力感が高まり、主体的な改善活動が促進される。また、ストレス軽減により創造性も向上する。',
    '単純化は単なる効率化ではなく、働きがいのある職場づくりにもつながります。',
    'hard'
FROM categories WHERE name = '３S主義';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '標準化において「調査と実験」が急所とされる理由と、実施する際の注意点を3つ挙げてください。',
    '理由：思い込みや経験則ではなく、客観的データに基づいた最適解を導き出すため。注意点：①十分なサンプル数の確保②変動要因のコントロール③費用対効果の検証',
    '科学的アプローチにより、標準化の妥当性と説得力が確保されます。',
    'hard'
FROM categories WHERE name = '３S主義';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '専門化における「他社の追随を許さない状態」を維持するための継続的な取り組みとして必要な3つの要素を説明してください。',
    '①継続的なイノベーション（技術・サービスの進化）②人材の専門性向上（教育投資）③顧客との強固な関係構築（スイッチングコストの向上）',
    '一度確立した優位性も、継続的な努力なしには維持できません。',
    'hard'
FROM categories WHERE name = '３S主義';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '３S主義を導入する際の抵抗要因を3つ挙げ、それぞれの対処法を説明してください。',
    '①既存業務への愛着（段階的移行と成功体験の共有）②変化への不安（十分な説明と研修の実施）③短期的な生産性低下（移行期間の目標調整と支援体制）',
    '抵抗要因を事前に想定し、適切な対処を行うことで、スムーズな導入が可能になります。',
    'hard'
FROM categories WHERE name = '３S主義';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '単純化と標準化の違いを明確にし、両者が補完関係にある理由を説明してください。',
    '単純化：複雑さの排除、作業の削減。標準化：最適方法の確立、品質の統一。補完関係：単純化により標準化が容易になり、標準化により単純化の効果が持続する。',
    '両者を組み合わせることで、効率性と品質の両立が可能になります。',
    'hard'
FROM categories WHERE name = '３S主義';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '３S主義の専門化において、「どのテーマを重点とするのかを決める」際の意思決定基準を4つ挙げてください。',
    '①市場の成長性②自社の強み・資源③競合他社の動向④顧客ニーズの強さ',
    '戦略的な重点テーマの選定が、専門化の成功を左右します。',
    'hard'
FROM categories WHERE name = '３S主義';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '３S主義の実践による組織変革の効果を、短期（1年以内）、中期（1-3年）、長期（3年以上）に分けて説明してください。',
    '短期：業務効率向上、コスト削減。中期：品質安定、従業員スキル向上。長期：競争優位確立、組織文化の変革、持続的成長基盤の構築。',
    '３S主義は段階的に効果を発揮し、最終的に組織の競争力を大幅に向上させます。',
    'hard'
FROM categories WHERE name = '３S主義';

-- Weekly Management（15問）
INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    'Weekly Managementの管理期間が「週単位主義」である3つの狙いを全て挙げ、それぞれの意義を説明してください。',
    '①今の数字であると誰もが信じてくれる（データの鮮度と信頼性）②年間52回もその都度、新しい手術ができる（改善機会の増加）③本部の任務が明瞭になり、現場との信頼関係が生まれる（役割明確化）',
    '週単位管理により、迅速な意思決定と継続的改善が可能になります。',
    'hard'
FROM categories WHERE name = 'Weekly Management';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    'Weekly Managementの3つの理由「作業時間の短縮化」「職能の明確化」「意思の明確化」について、それぞれ具体的に説明してください。',
    '作業時間の短縮化：週次サイクルで迅速な処理。職能の明確化：本部は現場の必要に対応するヘルパー役。意思の明確化：Man to Man方式だからこそ実行できる直接的コミュニケーション。',
    'これらの理由により、組織の機動性と効率性が大幅に向上します。',
    'hard'
FROM categories WHERE name = 'Weekly Management';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    'Weekly Managementにおける「マイナス条件」として挙げられている3つの費用と、なぜこれらを「惜しんではならない」のか説明してください。',
    '費用：①交通費②伝達・指導の資料費③数表作成費。理由：これらはコミュニケーションと教育のためのコストであり、組織の学習と成長に直結する投資だから。',
    '短期的コスト増を受け入れることで、長期的な組織力向上を実現できます。',
    'hard'
FROM categories WHERE name = 'Weekly Management';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    'Weekly Managementの週課における日曜日の活動「夕方閉店後でしめた損益計算書と効率表とを作成」の重要性を説明してください。',
    '週の締めに即座にデータを集計することで、月曜朝には最新の経営状況を共有でき、週明けから迅速な改善活動を開始できる。また、土日は人件費以外の予定外支出をしないルールにより、正確な週次決算が可能。',
    'リアルタイムな経営情報の把握が、迅速な意思決定の基盤となります。',
    'hard'
FROM categories WHERE name = 'Weekly Management';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '月曜日の活動における「必ず数字が変化した成功例を詳しく紹介する」ことの効果を3つ挙げてください。',
    '①モチベーション向上（成功体験の共有）②学習効果（ベストプラクティスの展開）③改善意欲の醸成（具体的な成果の可視化）',
    '成功例の共有により、組織全体の改善力が向上します。',
    'hard'
FROM categories WHERE name = 'Weekly Management';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '月曜午後の「セクションごとに１対１交渉」と「本部側は全員本来のデスクに着席している義務」の仕組みの利点を説明してください。',
    '1対1交渉により具体的で深い議論が可能になり、本部全員着席により即座に関係部署と調整できる。この仕組みにより、現場の要望に対して迅速かつ確実な対応が可能になる。',
    'Man to Man方式により、責任の所在が明確になり、実行力が向上します。',
    'hard'
FROM categories WHERE name = 'Weekly Management';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '火曜日の「本部側セクション間の調整」が必要な理由と、調整すべき内容を3つ挙げてください。',
    '理由：月曜の現場要望を受けて、部門横断的な対応が必要なため。調整内容：①リソースの配分②優先順位の決定③実施スケジュールの統合',
    '部門間調整により、全体最適な改善策が立案できます。',
    'hard'
FROM categories WHERE name = 'Weekly Management';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '水曜日の「ラインスタッフ（スーパーバイザー・インスペクター）」の役割と、彼らを経由する理由を説明してください。',
    '役割：本部の改善策を現場に伝達し、実施を支援する中間管理職。理由：専門知識を持つラインスタッフが介在することで、現場への適切な展開と確実な実施が可能になる。',
    'ラインスタッフは本部と現場をつなぐ重要な架け橋として機能します。',
    'hard'
FROM categories WHERE name = 'Weekly Management';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '木・金曜日の「全店全部門に通達説明」において、効果的な伝達を行うための3つのポイントを挙げてください。',
    '①具体的な実施手順の説明②期待される効果の明示③質疑応答の時間確保',
    '丁寧な通達説明により、現場の理解と協力を得ることができます。',
    'hard'
FROM categories WHERE name = 'Weekly Management';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '土・日曜日の「新しい改善をプラスしてフル回転、かせぎまくる」という表現が示す、週末営業の重要性を説明してください。',
    '週末は売上が最も高い時期であり、週初からの改善策を実践し、その効果を最大限に発揮する重要な実践期間。また、その成果が日曜夕方の締めで即座に数値化される。',
    '週末の成果が次週の改善活動の起点となる、継続的改善サイクルが構築されます。',
    'hard'
FROM categories WHERE name = 'Weekly Management';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    'Weekly Managementにおいて「光熱費などは推定値で」とある理由と、推定値を使用する際の注意点を説明してください。',
    '理由：請求書の到着を待たずに週次決算を完成させるため。注意点：①過去データに基づく合理的な推定②月次での実績値との差異分析③推定精度の継続的改善',
    '推定値の使用により、スピーディーな経営判断が可能になりますが、精度管理が重要です。',
    'hard'
FROM categories WHERE name = 'Weekly Management';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    'Weekly Managementが「年間52回もその都度、新しい手術ができる」と表現される意味と、月次管理との違いを説明してください。',
    '意味：毎週PDCAサイクルを回し、改善を実施できる機会が52回ある。月次との違い：月次は12回しか改善機会がなく、問題の早期発見と対応が遅れる。週次は4倍以上の改善スピード。',
    '高頻度の改善サイクルにより、競合他社を圧倒する改善スピードを実現できます。',
    'hard'
FROM categories WHERE name = 'Weekly Management';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    'Weekly Managementにおける「Man to Man方式」の具体的な実施方法と、集団会議との違いを説明してください。',
    '実施方法：担当者同士が直接対話し、具体的な課題解決を図る。違い：集団会議は総論的・表面的になりがちだが、Man to Manは各論的・実質的な議論が可能で、責任の所在も明確。',
    '個別対話により、深い問題解決と確実な実行が可能になります。',
    'hard'
FROM categories WHERE name = 'Weekly Management';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    'Weekly Managementを導入する際の組織的な課題を3つ挙げ、それぞれの解決策を説明してください。',
    '課題と解決策：①週次の負荷増大（業務の優先順位見直し）②部門間の同期の困難（共通スケジュールの徹底）③データ精度の確保（システム化と標準化）',
    '課題を事前に想定し対策を講じることで、スムーズな導入が可能になります。',
    'hard'
FROM categories WHERE name = 'Weekly Management';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    'Weekly Managementの効果を最大化するために必要な組織能力を4つ挙げ、それぞれの育成方法を説明してください。',
    '①データ分析力（分析ツール研修）②迅速な意思決定力（権限委譲の推進）③部門間調整力（クロスファンクショナルチーム）④実行力（KPI管理の徹底）',
    'これらの組織能力の向上により、Weekly Managementの真価が発揮されます。',
    'hard'
FROM categories WHERE name = 'Weekly Management';

-- 観察・分析・判断（15問）
INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '観察・分析・判断レポートフォームにおける「観察（問題点）」「分析（その原因・事情）」「判断（対策）」の3段階の関係性を説明してください。',
    '観察で現象としての問題を特定し、分析で根本原因を究明し、判断で効果的な対策を立案する。この3段階を順に進めることで、表面的な対処療法ではなく根本的な問題解決が可能になる。',
    'レポートフォームの構造は、論理的な問題解決プロセスを体系化したものです。',
    'hard'
FROM categories WHERE name = '観察・分析・判断';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '分析における「推定した原因」と「確定した事実」を区別する重要性と、その見分け方を説明してください。',
    '重要性：推定と事実を混同すると誤った対策を立てるリスクがある。見分け方：データや証拠で裏付けられるものが事実、仮説や推測に基づくものが推定。両者を明確に分けて記載することが必要。',
    '事実に基づく分析により、対策の有効性が高まります。',
    'hard'
FROM categories WHERE name = '観察・分析・判断';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '判断における「応急（改善）対策」と「制度（改革）対策」の違いと、使い分けの基準を説明してください。',
    '応急対策：即座に実施可能な短期的対処、症状の緩和。制度対策：根本的な仕組みの変更、原因の除去。使い分け：緊急度と重要度のマトリックスで判断し、両方を並行して実施することが多い。',
    '短期と長期の対策を組み合わせることで、即効性と持続性を両立できます。',
    'hard'
FROM categories WHERE name = '観察・分析・判断';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '実験計画における「誰が・いつ・どこで」を明確にする理由と、これらを決定する際の考慮点を説明してください。',
    '理由：責任の明確化、スケジュール管理、リソース配分の最適化。考慮点：実施者の能力と権限、タイミングの適切性、場所の条件（設備、環境等）を総合的に判断。',
    '5W1Hを明確にすることで、実験の成功確率が高まります。',
    'hard'
FROM categories WHERE name = '観察・分析・判断';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '観察・分析・判断レポートの「管理コード」と「付属資料」の活用方法を説明してください。',
    '管理コード：レポートの追跡、類似問題の検索、ナレッジの蓄積に活用。付属資料：データ、写真、図表等の証拠資料を添付し、説得力と再現性を確保。',
    'システマティックな管理により、組織的な問題解決力が向上します。',
    'hard'
FROM categories WHERE name = '観察・分析・判断';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '観察において「問題点」を正確に把握するための5つの視点を挙げてください。',
    '①定量的データ（数値の異常）②定性的情報（品質、顧客の声）③時系列変化（トレンド）④他部門・他店舗との比較⑤理想と現実のギャップ',
    '多角的な観察により、問題の本質を見逃さずに把握できます。',
    'hard'
FROM categories WHERE name = '観察・分析・判断';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '分析における「その原因・事情」を深掘りする際の、5Whyの手法をGハウスの観察・分析・判断フレームワークでどう活用するか説明してください。',
    '観察で特定した問題に対して「なぜ」を繰り返し、表面的な原因から根本原因へと掘り下げる。各段階で「推定した原因」と「確定した事実」を区別しながら記載し、最終的に真因を特定する。',
    '5Whyとフォーマットを組み合わせることで、体系的な原因分析が可能になります。',
    'hard'
FROM categories WHERE name = '観察・分析・判断';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '判断における「調査・実験案」を立案する際の4つの要件を説明してください。',
    '①実現可能性（リソース、技術的制約）②測定可能性（効果の定量化）③再現性（他部門での展開可能性）④リスク評価（失敗時の影響）',
    'これらの要件を満たす実験案により、確実な改善が実現できます。',
    'hard'
FROM categories WHERE name = '観察・分析・判断';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '観察・分析・判断のプロセスを、PDCAサイクルとどのように連携させるべきか説明してください。',
    'Plan：観察・分析・判断レポートで課題と対策を明確化。Do：判断に基づく対策の実施。Check：実施結果の観察と効果分析。Action：新たな判断と標準化。このサイクルを回すことで継続的改善を実現。',
    '両フレームワークを統合することで、問題解決の精度と速度が向上します。',
    'hard'
FROM categories WHERE name = '観察・分析・判断';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '観察・分析・判断レポートを組織的に活用するための3つの仕組みを提案してください。',
    '①レポートデータベースの構築（ナレッジ共有）②定期レビュー会議（横展開の促進）③優秀レポートの表彰制度（品質向上の動機づけ）',
    '組織的な仕組みにより、個人の問題解決力が組織の財産となります。',
    'hard'
FROM categories WHERE name = '観察・分析・判断';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '観察段階で陥りやすい3つの罠と、それを回避する方法を説明してください。',
    '罠と回避方法：①思い込み（データによる裏付け）②部分最適（全体俯瞰の視点）③問題の矮小化（影響度の定量評価）',
    '客観的で網羅的な観察により、真の問題を見逃さずに把握できます。',
    'hard'
FROM categories WHERE name = '観察・分析・判断';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '分析における「推定した原因」を「確定した事実」に変えるための検証方法を3つ挙げてください。',
    '①データ分析による相関関係の確認②現場観察による直接確認③実験による因果関係の証明',
    '推定を事実に変えることで、対策の有効性と説得力が大幅に向上します。',
    'hard'
FROM categories WHERE name = '観察・分析・判断';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '判断の質を高めるための「複数案の比較検討」の具体的な方法を説明してください。',
    '各対策案について、効果（大中小）、コスト（高中低）、実施期間（長中短）、リスク（大中小）の4軸で評価し、マトリックス表で可視化。総合評価により最適案を選択。',
    '複数案の比較により、より良い判断が可能になります。',
    'hard'
FROM categories WHERE name = '観察・分析・判断';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '観察・分析・判断レポートの品質を評価する5つの基準を挙げてください。',
    '①問題の重要性（インパクトの大きさ）②分析の深さ（根本原因への到達度）③対策の実現性（実施可能性）④エビデンスの充実度（データ・事実の裏付け）⑤文書の明瞭性（理解しやすさ）',
    'これらの基準により、レポートの質を客観的に評価し、改善できます。',
    'hard'
FROM categories WHERE name = '観察・分析・判断';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '観察・分析・判断の能力を組織的に向上させるための教育プログラムを設計してください。',
    '①基礎研修（フレームワークの理解）②ケーススタディ（過去事例の分析）③OJT（実際の問題解決プロジェクト）④相互レビュー（レポートの相互評価）⑤外部研修（専門スキルの習得）',
    '体系的な教育により、組織全体の問題解決力が向上します。',
    'hard'
FROM categories WHERE name = '観察・分析・判断';

-- 行動の優先順位（15問）
INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '行動の優先順位付けにおける「重要度」と「緊急度」の2軸で分類される4つの象限と、それぞれの対処方法を説明してください。',
    '①重要かつ緊急（即座に実行）②重要だが緊急でない（計画的に実行）③緊急だが重要でない（委譲または簡略化）④重要でも緊急でもない（排除または最小化）',
    'アイゼンハワーマトリックスに基づく優先順位付けにより、時間を最も価値ある活動に集中できます。',
    'hard'
FROM categories WHERE name = '行動の優先順位';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '優先順位を決定する際の「影響度」「実現可能性」「必要リソース」の3要素をどのように評価し、総合判断するか説明してください。',
    '各要素を5段階で評価し、影響度×実現可能性÷必要リソースで優先度スコアを算出。スコアの高いものから着手。ただし、制約条件（期限、予算等）も考慮して最終決定。',
    '定量的な評価により、客観的で説明可能な優先順位付けが可能になります。',
    'hard'
FROM categories WHERE name = '行動の優先順位';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '優先順位が頻繁に変更される環境において、効率的に対応するための3つの方策を説明してください。',
    '①バッファタイムの確保（予期せぬ変更への対応余地）②定期的な優先順位レビュー（週次での見直し）③優先順位変更の基準明確化（変更を最小限に抑える）',
    '柔軟性と安定性のバランスを取ることで、変化に対応しながら生産性を維持できます。',
    'hard'
FROM categories WHERE name = '行動の優先順位';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '複数のステークホルダーが関わる場合の優先順位調整において、合意形成を図る方法を説明してください。',
    '①評価基準の事前共有②各ステークホルダーの重要度設定③スコアリングによる可視化④協議による最終調整。透明性のあるプロセスにより、納得感のある優先順位付けを実現。',
    '合意形成により、実行段階での協力が得られやすくなります。',
    'hard'
FROM categories WHERE name = '行動の優先順位';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '「パレートの法則（80/20の法則）」を行動の優先順位付けにどのように活用するか、具体例を挙げて説明してください。',
    '20%の重要な活動が80%の成果を生むという法則に基づき、最も成果につながる少数の活動を特定し優先実行。例：売上の80%を占める上位20%の顧客への対応を最優先する。',
    'パレートの法則により、限られたリソースで最大の成果を得ることができます。',
    'hard'
FROM categories WHERE name = '行動の優先順位';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '優先順位付けにおける「機会費用」の概念を説明し、意思決定にどう活用するか述べてください。',
    '機会費用：ある選択をすることで失われる他の選択肢の価値。優先順位付けでは、各タスクの機会費用を比較し、最も価値の高い（機会費用の低い）活動を選択する。',
    '機会費用の考慮により、真に価値ある活動に集中できます。',
    'hard'
FROM categories WHERE name = '行動の優先順位';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '優先順位の「見える化」を実現する3つのツールと、それぞれの特徴を説明してください。',
    '①ガントチャート（時系列での可視化）②カンバンボード（進捗状況の可視化）③優先度マトリックス（重要度と緊急度の可視化）。用途に応じて使い分けることで効果的な管理が可能。',
    '見える化により、チーム全体での優先順位の共有と調整が容易になります。',
    'hard'
FROM categories WHERE name = '行動の優先順位';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '「依存関係」を考慮した優先順位付けの方法を、クリティカルパスの概念を用いて説明してください。',
    'タスク間の依存関係を明確にし、プロジェクト全体の最短完了時間を決定するクリティカルパス上のタスクを最優先する。遅延が全体に影響するボトルネックを解消することが重要。',
    'クリティカルパスの管理により、プロジェクト全体の効率が最適化されます。',
    'hard'
FROM categories WHERE name = '行動の優先順位';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '優先順位付けにおける「バックログ管理」の手法と、その効果を説明してください。',
    'バックログ：実施予定のタスクリスト。定期的にバックログを精査し、価値・緊急度・依存関係を評価して優先順位を更新。効果：タスクの抜け漏れ防止、柔軟な優先順位変更、透明性の確保。',
    'バックログ管理により、アジャイルな優先順位管理が実現できます。',
    'hard'
FROM categories WHERE name = '行動の優先順位';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '優先順位が低いと判断されたタスクの取り扱い方法を4つ挙げ、それぞれの適用場面を説明してください。',
    '①削除（価値がない場合）②委譲（他者が実施可能な場合）③自動化（定型作業の場合）④統合（類似タスクとまとめられる場合）',
    '低優先度タスクの適切な処理により、重要タスクへの集中が可能になります。',
    'hard'
FROM categories WHERE name = '行動の優先順位';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '優先順位付けの「ABC分析」を在庫管理以外の業務にどのように応用するか、3つの例を挙げてください。',
    '①顧客管理（売上貢献度でA/B/Cランク分け）②時間管理（生産性への貢献度で活動を分類）③品質管理（不具合の影響度で対策を優先順位付け）',
    'ABC分析の応用により、様々な業務で効率的な優先順位付けが可能になります。',
    'hard'
FROM categories WHERE name = '行動の優先順位';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '緊急事態における優先順位の即座の見直し方法「トリアージ」の考え方を業務に適用する方法を説明してください。',
    '限られたリソースで最大の成果を得るため、タスクを「即対応」「待機可能」「対応不要」に分類。判断基準：影響範囲、復旧時間、代替手段の有無。危機管理時の迅速な意思決定を可能にする。',
    'トリアージ思考により、緊急時でも冷静で効果的な優先順位付けができます。',
    'hard'
FROM categories WHERE name = '行動の優先順位';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '優先順位付けにおける「認知バイアス」の影響を3つ挙げ、それを排除する方法を説明してください。',
    'バイアスと対策：①現状維持バイアス（定期的な見直しルール化）②確証バイアス（第三者評価の導入）③沈没費用の誤謬（将来価値での評価）',
    '認知バイアスを認識し対策することで、より合理的な優先順位付けが可能になります。',
    'hard'
FROM categories WHERE name = '行動の優先順位';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '優先順位の定期的な見直しサイクル（日次・週次・月次）の設計と、各サイクルで確認すべき内容を説明してください。',
    '日次：当日タスクの進捗確認と翌日の優先順位確認。週次：週間目標との整合性確認と次週計画。月次：戦略との整合性確認と大幅な優先順位の見直し。',
    '階層的な見直しサイクルにより、短期と長期のバランスが取れた優先順位管理が実現できます。',
    'hard'
FROM categories WHERE name = '行動の優先順位';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '優先順位付けのスキルを組織全体で向上させるための教育・訓練プログラムを設計してください。',
    '①基礎研修（フレームワーク習得）②ケーススタディ（実例での演習）③ロールプレイング（優先順位交渉の練習）④メンタリング（上級者からの指導）⑤振り返り会議（実践の評価と改善）',
    '組織的なスキル向上により、全体の生産性と効率性が大幅に向上します。',
    'hard'
FROM categories WHERE name = '行動の優先順位';

-- 問題解決の特効薬（10問）
INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '「問題解決の特効薬」として挙げられる手法の中で、即効性と持続性を両立させる方法を説明してください。',
    '即効性：症状への直接対処（応急処置）を行いながら、並行して根本原因の分析を実施。持続性：制度化・仕組み化により再発防止を図る。両者を同時進行させることが「特効薬」の本質。',
    '問題解決の特効薬は、短期的解決と長期的解決を統合したアプローチです。',
    'hard'
FROM categories WHERE name = '問題解決の特効薬';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '問題解決において「特効薬」が存在しないと言われる理由と、それでも「特効薬」を追求する意義を説明してください。',
    '理由：問題は複雑で文脈依存的であり、万能の解決策は存在しない。意義：最も効果的な解決パターンを体系化し、問題解決の速度と質を向上させることで、相対的な「特効薬」となる。',
    '特効薬の追求は、問題解決の最適化プロセスそのものです。',
    'hard'
FROM categories WHERE name = '問題解決の特効薬';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '組織における問題解決の「特効薬」として、予防的アプローチと対症的アプローチをどのように組み合わせるべきか説明してください。',
    '予防：リスク管理、教育訓練、システム化で問題発生を抑制。対症：迅速な初動対応、エスカレーション体制、緊急対策チーム。両者の最適比率は7:3程度で、予防を重視しつつ対症療法の準備も怠らない。',
    'バランスの取れたアプローチが、真の問題解決の特効薬となります。',
    'hard'
FROM categories WHERE name = '問題解決の特効薬';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '問題解決の特効薬としての「標準化」がなぜ有効なのか、3つの理由を挙げて説明してください。',
    '①品質の安定（誰でも同じ結果を出せる）②学習の効率化（ベストプラクティスの共有）③改善の基盤（標準があるから改善点が明確になる）。標準化により問題の多くが未然に防げる。',
    '標準化は問題解決の最も基本的かつ強力な特効薬の一つです。',
    'hard'
FROM categories WHERE name = '問題解決の特効薬';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '「見える化」が問題解決の特効薬とされる理由を、心理学的側面と管理的側面から説明してください。',
    '心理学的：可視化により問題認識が共有され、当事者意識が生まれる。管理的：データに基づく客観的判断が可能になり、進捗管理が容易になる。両側面から問題解決が加速される。',
    '見える化は、問題解決のあらゆる段階で効力を発揮する特効薬です。',
    'hard'
FROM categories WHERE name = '問題解決の特効薬';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '問題解決の特効薬としての「権限委譲」の効果と、実施時の注意点を説明してください。',
    '効果：現場での迅速な問題解決、当事者意識の向上、組織の機動性向上。注意点：①権限と責任の明確化②判断基準の共有③定期的なモニタリング④段階的な委譲。',
    '適切な権限委譲は、組織全体の問題解決力を飛躍的に向上させる特効薬です。',
    'hard'
FROM categories WHERE name = '問題解決の特効薬';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '「小さな成功の積み重ね」が問題解決の特効薬となる理由を、組織心理学の観点から説明してください。',
    'スモールウィンにより自己効力感が向上し、チームの士気が高まる。成功体験の蓄積により問題解決への抵抗感が減少し、改善文化が醸成される。大きな問題も分解して解決可能になる。',
    '小さな成功の積み重ねは、組織の問題解決体質を作る特効薬です。',
    'hard'
FROM categories WHERE name = '問題解決の特効薬';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '問題解決の特効薬として「外部視点の導入」が重要な理由と、具体的な導入方法を3つ挙げてください。',
    '理由：内部の固定観念から脱却し、新しい解決策を発見できる。方法：①コンサルタントの活用②ベンチマーキング（他社事例研究）③顧客諮問委員会の設置。',
    '外部視点は、組織の盲点を発見し革新的な解決策をもたらす特効薬です。',
    'hard'
FROM categories WHERE name = '問題解決の特効薬';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    '問題解決の特効薬としての「早期警戒システム」の構築方法と運用のポイントを説明してください。',
    '構築：KPIの設定、閾値の決定、アラート体制の整備。運用：①定期モニタリング②異常検知時の即時対応③誤報の最小化④システムの継続的改善。問題の早期発見により被害を最小化。',
    '早期警戒システムは、問題の深刻化を防ぐ予防的特効薬です。',
    'hard'
FROM categories WHERE name = '問題解決の特効薬';

INSERT INTO questions (category_id, question, answer, explanation, difficulty)
SELECT id,
    'Gハウスの問題解決の特効薬として、各種手法（３つの思考法、３S主義、Weekly Management等）をどのように統合活用するか説明してください。',
    '３つの思考法で問題の本質を見極め、３S主義で解決策を体系化し、Weekly Managementで実行と改善を高速で回す。観察・分析・判断で状況を正確に把握し、優先順位付けで効率的に実行。全手法の統合により相乗効果を発揮。',
    'Gハウスの各手法を統合することで、最強の問題解決の特効薬が完成します。',
    'hard'
FROM categories WHERE name = '問題解決の特効薬';