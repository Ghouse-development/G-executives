-- G-house幹部マネジメント研修の教材カテゴリとテスト問題のシードデータ

-- カテゴリの挿入
INSERT INTO categories (name, description) VALUES
('問題解決の思考法', '問題解決に必要な3つの思考法（クリティカル・ラテラル・ロジカルシンキング）を学習'),
('マネジメント強化', 'マネジメントの本質と属性、日本型管理との違いを理解'),
('３S主義', 'Simplification（簡素化）、Specialization（専門化）、Standardization（標準化）の理解'),
('Weekly Management', '週次管理の実践方法とポイント'),
('観察・分析・判断', '幹部として必要な観察力、分析力、判断力の向上'),
('行動の優先順位', '効果的な優先順位の付け方と実践'),
('問題解決の特効薬', '実践的な問題解決のアプローチと手法');

-- 問題解決の思考法カテゴリのテスト問題
INSERT INTO questions (category_id, question, answer)
SELECT id,
    'クリティカルシンキング（論点思考）とは何か説明してください。',
    '真に解決すべき課題・問題を導き出す思考法です。「そもそも？」「本来の目的は？」「何のため？」「それって本当？」という問いかけを通じて、問題の本質を見極めます。'
FROM categories WHERE name = '問題解決の思考法';

INSERT INTO questions (category_id, question, answer)
SELECT id,
    'ラテラルシンキング（水平思考）とは何か説明してください。',
    '既存の枠にとらわれず、視点をさまざまに変えて問題解決を探る思考法です。「それはそのままで他に方法ある？」「これはこのままで何か別で使えるか？」という発想で、新しい解決策を見出します。'
FROM categories WHERE name = '問題解決の思考法';

INSERT INTO questions (category_id, question, answer)
SELECT id,
    'ロジカルシンキング（論理思考）とは何か説明してください。',
    '与えられた枠の中で深掘りしながら問題解決を探る思考法です。「なぜ？」「じゃあ、どうする？」「まずは要素を出そう」「要素ごとに分類しよう」という手順で論理的に問題を分析します。'
FROM categories WHERE name = '問題解決の思考法';

INSERT INTO questions (category_id, question, answer)
SELECT id,
    'クリティカルシンキングを実践する際の4つの問いかけは何ですか？',
    '①そもそも？ ②本来の目的は？ ③何のため？ ④それって本当？'
FROM categories WHERE name = '問題解決の思考法';

INSERT INTO questions (category_id, question, answer)
SELECT id,
    '3つの思考法（クリティカル・ラテラル・ロジカル）の使い分けについて説明してください。',
    'クリティカルシンキングは問題の本質を見極める際に、ラテラルシンキングは既存の枠を超えた新しい発想が必要な際に、ロジカルシンキングは与えられた条件の中で詳細な分析が必要な際に使用します。'
FROM categories WHERE name = '問題解決の思考法';

-- マネジメント強化カテゴリのテスト問題
INSERT INTO questions (category_id, question, answer)
SELECT id,
    'マネジメントの本質における「よい習慣づけ」と「よい制度化」の違いを説明してください。',
    'よい習慣づけは「楽にできる」「楽しい」という属性を持ち、日常的な行動の定着を目指します。よい制度化は「継続（維持）できる」「正当なことが評価される」「拡大できる」という属性を持ち、組織的な仕組みの構築を目指します。'
FROM categories WHERE name = 'マネジメント強化';

INSERT INTO questions (category_id, question, answer)
SELECT id,
    '日本型管理とマネジメントの違いを5つの観点から説明してください。',
    '①内容：意識を変えることで奮起 vs 作業内容を変更させる ②手法：統制 vs コントロール ③期間：期間後 vs 期間中 ④使う数値：過去の数値 vs 進行中の数値 ⑤方法：叱責と激励 vs 命令の変更・教育訓練の追加'
FROM categories WHERE name = 'マネジメント強化';

INSERT INTO questions (category_id, question, answer)
SELECT id,
    'マネジメント展開の3つの方法（Execution、ドライ商法、方法とRevision）について説明してください。',
    '①Execution：何かをScrapすること（Simplification） ②ドライ商法：より影響力の大きい部分から徹底させる（Specialization） ③方法とRevision：修正（Standardization）'
FROM categories WHERE name = 'マネジメント強化';

INSERT INTO questions (category_id, question, answer)
SELECT id,
    'マネジメントの内容における4つの要素を説明してください。',
    '①あるべき形を決める（創造） ②教え続ける ③調整し続ける（維持） ④キマリを修正し、改善し続ける'
FROM categories WHERE name = 'マネジメント強化';

INSERT INTO questions (category_id, question, answer)
SELECT id,
    '企業のあるべき反省として挙げられている3つの問題点は何ですか？',
    '①教えていない（知らない） ②させていない（経験が少ない） ③時間がない（分業ができていない）'
FROM categories WHERE name = 'マネジメント強化';

-- ３S主義カテゴリのテスト問題
INSERT INTO questions (category_id, question, answer)
SELECT id,
    '３S主義とは何を指しますか？それぞれの意味を説明してください。',
    'Simplification（簡素化）：複雑なものをシンプルにする、Specialization（専門化）：専門性を高めて効率化する、Standardization（標準化）：基準を設けて統一する'
FROM categories WHERE name = '３S主義';

INSERT INTO questions (category_id, question, answer)
SELECT id,
    'Simplificationを実現するための具体的な方法を説明してください。',
    'Execution（何かをScrapすること）を通じて、不要な要素を削除し、プロセスや仕組みを簡素化します。'
FROM categories WHERE name = '３S主義';

INSERT INTO questions (category_id, question, answer)
SELECT id,
    'Specializationを実現するための「ドライ商法」とは何ですか？',
    'より影響力の大きい部分から徹底させることです。重要度の高い領域に特化して、そこから波及効果を狙う手法です。'
FROM categories WHERE name = '３S主義';

INSERT INTO questions (category_id, question, answer)
SELECT id,
    'Standardizationにおける「方法とRevision（修正）」の重要性を説明してください。',
    '標準化した後も継続的に方法を見直し、修正することで、常に最適な状態を維持し、改善し続けることができます。'
FROM categories WHERE name = '３S主義';

-- Weekly Managementカテゴリのテスト問題
INSERT INTO questions (category_id, question, answer)
SELECT id,
    'Weekly Managementの重要性について説明してください。',
    '週単位での管理により、短期的な目標設定と達成度の確認が可能になり、迅速な軌道修正と継続的な改善が実現できます。'
FROM categories WHERE name = 'Weekly Management';

INSERT INTO questions (category_id, question, answer)
SELECT id,
    '週次管理で確認すべき主要な項目を挙げてください。',
    '①週の目標達成度 ②課題と改善点 ③来週の優先事項 ④チームメンバーの状況 ⑤リソースの配分'
FROM categories WHERE name = 'Weekly Management';

-- 観察・分析・判断カテゴリのテスト問題
INSERT INTO questions (category_id, question, answer)
SELECT id,
    '観察・分析・判断のサイクルについて説明してください。',
    '観察で現状を正確に把握し、分析で原因や要因を明確にし、判断で最適な対応を決定するという一連のプロセスです。'
FROM categories WHERE name = '観察・分析・判断';

INSERT INTO questions (category_id, question, answer)
SELECT id,
    '効果的な観察を行うためのポイントを説明してください。',
    '①先入観を持たない ②数値やデータで客観的に見る ③複数の視点から確認する ④定期的に観察を行う'
FROM categories WHERE name = '観察・分析・判断';

INSERT INTO questions (category_id, question, answer)
SELECT id,
    '分析における重要な視点を説明してください。',
    '①要因を分解して考える ②因果関係を明確にする ③優先順位を付ける ④定量的・定性的両面から分析する'
FROM categories WHERE name = '観察・分析・判断';

-- 行動の優先順位カテゴリのテスト問題
INSERT INTO questions (category_id, question, answer)
SELECT id,
    '優先順位を決める際の重要度と緊急度のマトリクスについて説明してください。',
    '重要度と緊急度の2軸で分類し、①重要かつ緊急（すぐ実行）②重要だが緊急でない（計画的に実行）③緊急だが重要でない（委任を検討）④重要でも緊急でもない（削除を検討）に分けて対応します。'
FROM categories WHERE name = '行動の優先順位';

INSERT INTO questions (category_id, question, answer)
SELECT id,
    '効果的な優先順位付けのための基準を説明してください。',
    '①ビジネスへのインパクト ②リソースの制約 ③実現可能性 ④期限の有無 ⑤他のタスクとの依存関係'
FROM categories WHERE name = '行動の優先順位';

-- 問題解決の特効薬カテゴリのテスト問題
INSERT INTO questions (category_id, question, answer)
SELECT id,
    '問題解決における「特効薬」的なアプローチとは何ですか？',
    '根本原因に直接アプローチし、短期間で大きな効果を得られる解決策のことです。ただし、持続性を確保するための仕組み作りも同時に必要です。'
FROM categories WHERE name = '問題解決の特効薬';

INSERT INTO questions (category_id, question, answer)
SELECT id,
    '問題の根本原因を特定するための手法を説明してください。',
    'なぜなぜ分析（5回のなぜ）、特性要因図（フィッシュボーン）、パレート分析などを用いて、表面的な現象ではなく真の原因を特定します。'
FROM categories WHERE name = '問題解決の特効薬';

INSERT INTO questions (category_id, question, answer)
SELECT id,
    '特効薬的な解決策を実行する際の注意点を説明してください。',
    '①副作用の検討 ②関係者への影響確認 ③実行後のモニタリング体制 ④改善効果の測定方法の設定 ⑤継続性の確保'
FROM categories WHERE name = '問題解決の特効薬';