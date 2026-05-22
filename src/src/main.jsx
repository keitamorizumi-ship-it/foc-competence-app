import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  Users, Plus, Search, ChevronRight, ChevronLeft, X, Edit3, Trash2,
  Download, Upload, Save, Clock, TrendingUp, Award, Target, Zap,
  BookOpen, Briefcase, Compass, Heart, Settings, Globe, Camera,
  History as HistoryIcon, FileText, ArrowLeft, Sparkles, Check,
  AlertCircle, BarChart3, ChevronDown
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════
// COMPETENCE FRAMEWORK DATA — embedded from FOC v2.2
// ═══════════════════════════════════════════════════════════════════
const BD = {"DATA": {"KN_OUT_1": {"jp": {"title": "1. 出荷（アウトフロー）コアプロセスの実行", "desc": "効率的なオペレーションと正しいデータに貢献するシステムやツールを用いて、ピッキング・梱包・出荷準備などのアウトフローコアプロセスを正確かつ効率的に実行します。", "items": ["出荷プロセス（ピッキング・梱包・出荷準備・積み込み）の流れを理解している", "お客さまの注文を正確かつ時間通りにピッキングできる", "梱包基準に従って商品を適切かつ安全に梱包できる", "出荷ラベル・伝票の確認と正しい添付手順を知っている", "出荷時の品質チェックと商品破損防止の手順を知っている", "出荷スケジュールと配送リードタイムへの影響を理解し、予定通りに業務を遂行できる", "データの正確性確保のため、システムへの正確な入力・スキャン・記録ができる", "アウトフローに関連するKPIを理解し、自分の業務パフォーマンスの測定に活用している"]}, "en": {"title": "1. Executing Outflow Core Processes", "desc": "Accurately and efficiently execute outflow core processes such as picking, packing, and shipment preparation using systems and tools that contribute to efficient operations and accurate data.", "items": ["Understands the flow of outflow processes (picking, packing, shipment preparation, loading)", "Able to pick customer orders accurately and on time", "Able to pack products appropriately and safely according to packing standards", "Knows the correct procedure for checking and attaching shipping labels and documents", "Knows quality check and damage prevention procedures during shipment", "Understands shipment schedules and delivery lead time impact, and executes tasks on time", "Able to accurately input, scan, and record in systems to ensure data accuracy", "Understands outflow KPIs and uses them to measure own performance"]}}, "KN_IN_1": {"jp": {"title": "1. 入荷（インフロー）コアプロセスの実行", "desc": "効率的なオペレーションと正しいデータに貢献するシステムやツールを用いて、入荷・受け入れ・格納・補充などのインフローコアプロセスを正確かつ効率的に実行します。", "items": ["入荷プロセス（荷降ろし・数量確認・品質チェック・受け入れ処理）の流れを理解している", "入荷伝票・システムを使った受け入れ処理（GR）を正確に行うことができる", "商品の入庫・ロケーション格納作業をSOPに従って正確に実行できる", "補充プロセスを理解し、正確かつ効率的に実行できる", "入荷時の破損・不良品・数量差異の確認と報告手順を知っている", "入荷スケジュールと作業計画を理解し、予定通りに業務を遂行できる", "データの正確性確保のため、システムへの正確な入力・スキャン・記録ができる", "インフローに関連するKPIを理解し、自分の業務パフォーマンスの測定に活用している"]}, "en": {"title": "1. Executing Inflow Core Processes", "desc": "Accurately and efficiently execute inflow core processes such as receipt, putaway, and replenishment using systems and tools that contribute to efficient operations and accurate data.", "items": ["Understands the flow of inflow processes (unloading, quantity check, quality check, goods receipt)", "Able to accurately perform goods receipt (GR) using inflow documents and systems", "Able to accurately execute goods putaway and location storage according to SOP", "Understands and can accurately and efficiently execute the replenishment process", "Knows the procedure for checking and reporting damage, defects, and quantity discrepancies", "Understands inflow schedules and work plans, and executes tasks on time", "Able to accurately input, scan, and record in systems to ensure data accuracy", "Understands inflow KPIs and uses them to measure own performance"]}}, "KN_2": {"jp": {"title": "2. 在庫有効性への貢献", "desc": "割り当てられたフルフィルメントユニットオペレーションの担当範囲を正確かつ予定どおりに実行することで、最高のストックアベイラビリティ（在庫有効性）に貢献します。", "items": ["在庫有効性（ストックアベイラビリティ）の概念と自分の役割との関連を理解している", "商品を正確かつ予定通りに処理し、在庫有効性の達成に貢献できる", "品切れや在庫差異を発見した際に適切な対応・報告ができる", "商品の適切な取り扱いと保管方法を知っており、破損リスクを最小化できる", "補充サイクルと在庫の流れを理解している", "IKEAユニット内の各部門の役割と全体的なフルフィルメントプロセスへの貢献を理解している", "担当エリアの目標を理解し、達成に向けた行動ができる"]}, "en": {"title": "2. Contributing to Stock Availability", "desc": "Contribute to the best stock availability by accurately and timely executing assigned fulfilment unit operations.", "items": ["Understands the concept of stock availability and its relevance to own role", "Able to process products accurately and on time to contribute to achieving stock availability", "Able to appropriately respond and report when stockouts or inventory discrepancies are found", "Knows proper product handling and storage methods to minimise damage risk", "Understands replenishment cycles and inventory flow", "Understands the role of each department in the IKEA unit and their contribution to the overall fulfilment process", "Understands area targets and takes actions toward achieving them"]}}, "KN_3_STD": {"jp": {"title": "3. 安全衛生・セキュリティへのコミット", "desc": "担当範囲内で、IKEAの安全衛生やセキュリティに関するルールおよび要件に従い、同僚と積極的に協力して事故を防ぎます。", "items": ["IKEAの行動規範を理解し、同意・遵守している", "健康・安全・セキュリティに関するすべての地域およびIKEAのルール・規制を理解している", "インシデントや危険性を発見した際に、正しい手順で速やかに報告できる", "人間工学に基づいた正しい作業姿勢・持ち方・動き方を理解し、日常的に実践している", "同僚と積極的に協力してインシデント防止に取り組んでいる", "担当エリアを常に清潔・整理整頓された状態に保つことができる"]}, "en": {"title": "3. Commitment to Health, Safety & Security", "desc": "Follow IKEA's health, safety, and security rules within own area of responsibility and actively cooperate with colleagues to prevent accidents.", "items": ["Understands and agrees with and complies with IKEA's code of conduct", "Understands all local and IKEA rules and regulations regarding health, safety, and security", "Able to promptly report incidents and hazards through the correct procedures", "Understands ergonomically correct working postures, handling, and movements, and practises them daily", "Actively cooperates with colleagues to prevent incidents", "Able to keep the work area clean and tidy at all times"]}}, "KN_3_FL": {"jp": {"title": "3. 安全衛生・セキュリティへのコミット", "desc": "担当範囲内で、IKEAの安全衛生やセキュリティに関するルールおよび要件に従い、同僚と積極的に協力して事故を防ぎます。", "items": ["IKEAの行動規範を理解し、同意・遵守している", "健康・安全・セキュリティに関するすべての地域およびIKEAのルール・規制を理解している", "インシデントや危険性を発見した際に、正しい手順で速やかに報告できる", "人間工学に基づいた正しい作業姿勢・持ち方・動き方を理解し、日常的に実践している", "フォークリフト・パレットジャック等の機器を安全に操作・管理できる（フォークリフト版のみ）", "同僚と積極的に協力してインシデント防止に取り組んでいる", "担当エリアを常に清潔・整理整頓された状態に保つことができる"]}, "en": {"title": "3. Commitment to Health, Safety & Security", "desc": "Follow IKEA's health, safety, and security rules within own area of responsibility and actively cooperate with colleagues to prevent accidents.", "items": ["Understands and agrees with and complies with IKEA's code of conduct", "Understands all local and IKEA rules and regulations regarding health, safety, and security", "Able to promptly report incidents and hazards through the correct procedures", "Understands ergonomically correct working postures, handling, and movements, and practises them daily", "Able to safely operate and manage forklifts, pallet jacks, and other equipment (Forklift version only)", "Actively cooperates with colleagues to prevent incidents", "Able to keep the work area clean and tidy at all times"]}}, "KN_4": {"jp": {"title": "4. 日々のオペレーション最適化への貢献", "desc": "コストを意識した無駄のないシンプルな方法で業務を行い、良い例を活用・共有することで、日々のフルフィルメントユニットオペレーションの最適化に貢献します。", "items": ["コスト意識を持ち、シンプルで無駄のない方法で業務を行うことができる", "良い実例を積極的に活用し、チームメンバーと共有している", "継続的な学習と「刷新して改善する」マインドセットを持って業務に取り組んでいる", "IKEAブランドアイデンティティ・カルチャー・バリューを理解している", "IKEAビジョン・カルチャー・バリューを日々の業務と行動の中で体現している", "チームや組織のサービスとサポートの改善に積極的に貢献している", "ペースの速いオムニチャネル環境での変化に柔軟かつ前向きに対応できる"]}, "en": {"title": "4. Contributing to Daily Operations Optimisation", "desc": "Work in a cost-conscious, simple, and waste-free manner and contribute to optimising daily fulfilment unit operations by utilising and sharing best practices.", "items": ["Able to work in a cost-conscious, simple, and waste-free manner", "Actively utilises and shares good examples with team members", "Approaches work with a continuous learning and 'renew & improve' mindset", "Understands IKEA Brand Identity, Culture & Values", "Embodies the IKEA Vision, Culture & Values in daily work and behaviour", "Actively contributes to improving services and support for the team and organisation", "Able to flexibly and positively adapt to change in a fast-paced omnichannel environment"]}}, "KN_5_FL": {"jp": {"title": "5. フォークリフト認定者の業務（付属書）", "desc": "日本のフォークリフト免許とIKEAジャパンのフォークリフト免許の両方を所持し、SOPに従って安全かつ効率的に業務を遂行します。", "items": ["日本のフォークリフト免許とIKEAジャパンのフォークリフト免許の両方を所持している", "IKEAのルールおよび地域の法令に従ったフォークリフトの安全な操作方法を知っている", "カウンターバランス・リーチトラック・パワードスタッカーを安全かつ効率的に操作できる", "荷降ろし・輸送・補充・入庫・出庫・ピッキング・積み込みを安全に行うことができる", "在庫や機器の損傷を避けながら、正確に商品を取り扱うことができる", "SOPに記載されているすべての安全な物品取り扱いルールと手順を遵守している", "部門内の動力付き移動機器の稼働率を最大限に維持している", "インフローチームとアウトフローチーム間で柔軟に作業できる（フレキシブル認定者）"]}, "en": {"title": "5. Forklift Certified Tasks (Appendix)", "desc": "Hold both the Japan forklift licence and IKEA Japan forklift licence and perform duties safely and efficiently according to SOP.", "items": ["Holds both Japan forklift licence and IKEA Japan forklift licence", "Knows how to safely operate forklifts in accordance with IKEA rules and local laws", "Able to safely and efficiently operate counterbalance trucks, reach trucks, and powered stackers", "Able to safely perform unloading, transport, replenishment, receipt, dispatch, picking, and loading", "Able to handle products accurately while avoiding damage to inventory and equipment", "Complies with all safe goods handling rules and procedures described in SOP", "Maintains maximum uptime of powered mobile equipment in the department", "Able to work flexibly between inflow and outflow teams (flexible certified)"]}}}, "CAP": [{"group": {"jp": "ケイパビリティ — 自己のリード", "en": "Capabilities — Leading Self"}, "items": [{"jp": {"title": "1. 未知の状況でのリード", "desc": "リーダーとして、未知の状況に勇気を持って対応し、将来に向けて成長する力を築きます。", "items": ["変化とそれに伴うリスク・機会を予測するための基盤を作っている", "ストレスを管理し、自分自身とチームのストレス軽減策を見つけている", "楽観的で自信に満ちた姿勢を示し、困難な時期でも全体像を保ち自信を持って行動している", "状況が不明確または指示が少ない場面でも効果的に行動できる"]}, "en": {"title": "1. Leading in Unknown Situations", "desc": "As a leader, respond courageously to unknown situations and build the strength to grow toward the future.", "items": ["Building a foundation to anticipate change and associated risks and opportunities", "Managing stress and finding ways to reduce stress for self and team", "Showing an optimistic and confident attitude, maintaining the big picture and acting confidently in difficult times", "Able to act effectively in unclear situations or with minimal direction"]}}, {"jp": {"title": "2. 学習能力", "desc": "好奇心を持ち、新しいことを学び、自分の強みと改善点を自覚することが不可欠です。", "items": ["自分の強みと課題を把握し、開発計画を通じてプロアクティブに成長に取り組んでいる", "失敗から学び、すべての失敗を改善の機会として捉えている", "会話の流れに素早く適応し、必要に応じてコミュニケーションスタイルを変えられる", "フィードバックをプロアクティブに求め、個人の成長の源として活用し行動を改める", "謙虚さを持ち、答えがない時はチームに聞くなど新しいことを学ぶ好奇心がある"]}, "en": {"title": "2. Learning Agility", "desc": "Being curious, learning new things, and being aware of own strengths and areas for improvement is essential.", "items": ["Aware of own strengths and development areas, proactively working on growth through a development plan", "Learning from failures and seeing every failure as an opportunity for improvement", "Quickly adapting to conversations and changing communication style as needed", "Proactively seeking feedback, using it as a source of personal growth, and changing behaviour accordingly", "Has humility and curiosity to learn new things, such as asking the team when there is no answer"]}}, {"jp": {"title": "3. レジリエンス", "desc": "失敗を一時的な後退と捉え、素早く立ち直ります。", "items": ["障害や問題を克服するための粘り強さと推進力を示している", "危機や予期せぬ問題から長期的な悪影響なく素早く立ち直れる"]}, "en": {"title": "3. Resilience", "desc": "Seeing failure as a temporary setback and recovering quickly.", "items": ["Demonstrates perseverance and drive to overcome obstacles and problems", "Able to recover quickly from crises and unexpected problems without long-term negative impact"]}}]}, {"group": {"jp": "ケイパビリティ — 業務と協働", "en": "Capabilities — Working & Collaborating"}, "items": [{"jp": {"title": "4. 業務の優先順位管理", "desc": "自分の業務に優先順位をつけ、与えられた時間を効率的に活用することが重要です。", "items": ["担当業務に優先順位をつけ、与えられた時間を効率的に活用している", "シフト内のタスクを計画的に整理し、期限内に完了させている", "複数のタスクを同時に管理しながら、品質を落とさずに実行できる", "業務の変更や追加が生じた際に、素早く優先順位を再設定できる", "必要な時に適切なサポートをチームリーダーや同僚に求めることができる"]}, "en": {"title": "4. Work Priority Management", "desc": "Prioritising own tasks and using given time efficiently is important.", "items": ["Prioritises assigned tasks and uses given time efficiently", "Organises tasks within a shift systematically and completes them within deadlines", "Able to manage multiple tasks simultaneously without reducing quality", "Able to quickly reprioritise when task changes or additions occur", "Able to seek appropriate support from team leaders and colleagues when needed"]}}, {"jp": {"title": "5. 変化への柔軟性とチームワーク", "desc": "柔軟に対応しながらチームと協力することが不可欠です。", "items": ["業務内容やシフトの変更に柔軟かつポジティブに対応している", "チームの共通目標に向けて積極的に貢献している", "チームメンバーと良好な関係を築き、協力して業務を遂行できる", "個人でも自律的に業務を完了させる力がある", "異なる業務エリアやチーム間でも柔軟に対応できる"]}, "en": {"title": "5. Flexibility and Teamwork", "desc": "Flexibly adapting while working with the team is essential.", "items": ["Responds flexibly and positively to changes in work content or shifts", "Actively contributes to the team's common goals", "Builds good relationships with team members and works cooperatively", "Has the ability to complete tasks autonomously as an individual", "Able to flexibly respond across different work areas and teams"]}}, {"jp": {"title": "6. 自己管理と細部への注意", "desc": "細部への注意と適切な自己管理が在庫精度・品質・安全に直結します。", "items": ["細部に注意を払い、正確に業務を遂行している", "自己の業務に責任を持ち、高い水準を一貫して維持している", "ミスを発見した際に素早く対処し、再発防止に取り組んでいる", "指示や手順を正確に理解し、不明点は確認している", "業務データの入力・記録を正確かつ一貫して行っている"]}, "en": {"title": "6. Self-management and Attention to Detail", "desc": "Attention to detail and appropriate self-management directly impacts inventory accuracy, quality, and safety.", "items": ["Pays attention to details and executes tasks accurately", "Takes responsibility for own work and consistently maintains high standards", "Addresses mistakes quickly when found and works to prevent recurrence", "Accurately understands instructions and procedures, and checks when unclear", "Accurately and consistently records work data"]}}]}, {"group": {"jp": "ケイパビリティ — 実行と成長", "en": "Capabilities — Execution & Growth"}, "items": [{"jp": {"title": "7. コミュニケーション能力", "desc": "チームリーダーや同僚と効果的にコミュニケーションを取ることで、業務が円滑に進みます。", "items": ["チームリーダーや同僚に対して明確で率直なコミュニケーションができる", "問題・変更・気づきをタイムリーかつ適切に報告している", "他者の意見やフィードバックを積極的に傾聴している"]}, "en": {"title": "7. Communication Skills", "desc": "Communicating effectively with team leaders and colleagues facilitates smooth operations.", "items": ["Able to communicate clearly and directly with team leaders and colleagues", "Reports problems, changes, and observations in a timely and appropriate manner", "Actively listens to others' opinions and feedback"]}}, {"jp": {"title": "8. 主体性と継続的改善", "desc": "自ら率先して行動し、業務改善に貢献することがIKEAコワーカーに求められます。", "items": ["監督なしでも主体的に業務を完了させることができる", "業務改善のアイデアや良い実例を積極的に共有している", "目標達成に向けて自ら率先して行動している"]}, "en": {"title": "8. Initiative and Continuous Improvement", "desc": "Taking initiative and contributing to work improvement is expected of IKEA co-workers.", "items": ["Able to complete tasks proactively without supervision", "Actively shares ideas for work improvement and good examples", "Takes initiative toward achieving goals"]}}, {"jp": {"title": "9. 継続的学習と成長", "desc": "失敗から学び、新しいスキルを積極的に習得し、自己のパフォーマンスを常に向上させる姿勢を持ちます。", "items": ["失敗から学び、毎回の経験を成長の機会として捉えている", "新しいスキルや知識の習得に積極的に取り組んでいる", "フィードバックをオープンに受け入れ、業務改善に活かしている", "担当外の業務領域も理解しようとし、チームに幅広く貢献できる"]}, "en": {"title": "9. Continuous Learning and Growth", "desc": "Learning from failures, actively acquiring new skills, and always improving own performance.", "items": ["Learns from failures and sees every experience as an opportunity for growth", "Actively works to acquire new skills and knowledge", "Openly accepts feedback and applies it to work improvement", "Tries to understand work areas outside own responsibility and contributes broadly to the team"]}}]}], "LS": [{"jp": {"title": "1. 私は成果を出す", "items": ["目標を達成している", "顧客とホームファニッシングへの情熱を持って行動している", "日々の業務にデータと洞察を活用している", "異なるバックグラウンドやアイデンティティを持つ多様な才能を認識している"]}, "en": {"title": "1. I deliver results", "items": ["Achieving targets", "Acting with passion for customers and home furnishing", "Using data and insights in daily work", "Recognising diverse talent with different backgrounds and identities"]}}, {"jp": {"title": "2. 私はビジネスを発展させる", "items": ["より良い方法を試し、探求するアントレプレナーとして行動している", "失敗と成功から学んだことをビジネス改善に活かしている", "優先順位をつけ、スピードを持って意思決定している", "下された決断にコミットしている", "戦略的思考を活かし、適応可能なビジネスプランを策定している", "データを活用して意思決定している"]}, "en": {"title": "2. I develop the business", "items": ["Acting as an entrepreneur who tries and explores better ways", "Applying learnings from failures and successes to business improvement", "Prioritising and making decisions with speed", "Committing to decisions made", "Developing adaptable business plans using strategic thinking", "Using data to make decisions"]}}, {"jp": {"title": "3. 私は未知の状況をナビゲートする", "items": ["課題に直面した時に機会を見出し、行動している", "楽観主義と現実のバランスを取りながら変化に適応している", "持続可能なビジネスのために自分自身と他者の健康・ウェルビーイングを大切にしている", "バランスの取れた業務量を推進している"]}, "en": {"title": "3. I navigate the unknown", "items": ["Finding and acting on opportunities when facing challenges", "Adapting to change while balancing optimism and realism", "Caring for own and others' health and wellbeing for a sustainable business", "Promoting a balanced workload"]}}, {"jp": {"title": "4. 私はコラボレーションし、共創する", "items": ["信頼できる多様な高パフォーマンスの職場環境に貢献している", "他者を尊重し、エゴを表に出さないようにしている", "共創する際に寛大さと好奇心を持って行動している"]}, "en": {"title": "4. I collaborate and co-create", "items": ["Contributing to a trustworthy, diverse, high-performing work environment", "Respecting others and not letting ego show", "Acting with generosity and curiosity when co-creating"]}}, {"jp": {"title": "5. 私は影響力のあるコミュニケーションをする", "items": ["理解するために傾聴している", "インクルーシブで、インスパイアリングで、率直な方法でコミュニケーションしている", "誠実さと透明性を持って行動し、それを示している", "他者と協力する際に自分の視点で影響を与えている"]}, "en": {"title": "5. I communicate with impact", "items": ["Listening to understand", "Communicating in an inclusive, inspiring, and straightforward way", "Acting with and demonstrating integrity and transparency", "Influencing with own perspective when working with others"]}}, {"jp": {"title": "6. 私は自分自身と他者を育成する", "items": ["毎日実践し、振り返り、学んでいる", "熱意を持って知識と新しいスキルを開発している", "好奇心を持ってフィードバックを求め、自己認識を高めている", "利用しやすく、アプローチしやすい姿勢を保っている", "知識共有・承認・フィードバックを通じて他者の自己育成を支援している", "パフォーマンスを最大化するためのメンタリングとコーチングを行っている"]}, "en": {"title": "6. I grow myself and others", "items": ["Practising, reflecting, and learning every day", "Enthusiastically developing knowledge and new skills", "Seeking feedback with curiosity and increasing self-awareness", "Remaining accessible and approachable", "Supporting others' self-development through knowledge sharing, recognition, and feedback", "Mentoring and coaching to maximise performance"]}}, {"jp": {"title": "7. 私は手本となる行動でリードします", "items": ["IKEAバリューに沿った行動で周囲のロールモデルとなっている", "誠実さと透明性を持って行動し、言行一致を心がけている", "同僚に対して公平・親切・尊重ある態度で接している", "安全・品質・IKEAカルチャーの観点での模範となる行動をとっている", "自分の行動がチームや職場環境に与える影響を意識している"]}, "en": {"title": "7. I lead by example", "items": ["Being a role model for those around through behaviour aligned with IKEA values", "Acting with integrity and transparency, walking the talk", "Treating colleagues with fairness, kindness, and respect", "Taking exemplary actions from the perspective of safety, quality, and IKEA culture", "Being aware of the impact of own actions on the team and work environment"]}}], "MV_ROLE": [{"jp": "私とフルフィルメント・オペレーション・コワーカー（アウトフロー）としての役割", "en": "My role as Fulfilment Operations Coworker (Outflow)"}, {"jp": "私とフルフィルメント・オペレーション・コワーカー（アウトフロー・フォークリフト認定者）としての役割", "en": "My role as Fulfilment Operations Coworker (Outflow – Forklift Certified)"}, {"jp": "私とフルフィルメント・オペレーション・コワーカー（インフロー）としての役割", "en": "My role as Fulfilment Operations Coworker (Inflow)"}, {"jp": "私とフルフィルメント・オペレーション・コワーカー（インフロー・フォークリフト認定者）としての役割", "en": "My role as Fulfilment Operations Coworker (Inflow – Forklift Certified)"}], "MV_DESC": [{"jp": "フルフィルメント・オペレーション・コワーカーとしての日々の業務におけるモチベーションは多くの場面に現れます。", "en": "Motivation in daily work as a Fulfilment Operations Coworker shows in many situations."}, {"jp": "日々の現実においてIKEAの価値観を指針として積極的に活用しています。", "en": "Actively using IKEA values as a guide in daily reality."}, {"jp": "より上位の役割やより大きな範囲の役割への意欲があります。", "en": "Having ambition for higher or broader roles."}, {"jp": "仕事とIKEAに留まることへのコミットメントを持ち、ビジネスの成功に貢献します。", "en": "Having commitment to work and staying at IKEA, contributing to business success."}, {"jp": "役割の範囲や責任を広げながら学び成長するための好奇心と能力があります。", "en": "Having the curiosity and ability to learn and grow while expanding scope and responsibility."}], "MV": [{"jp": {"t2": "", "items": ["IKEAのビジョン・カルチャー・バリューからインスピレーションを得ている", "継続的な学習によって意欲を高め、刷新して改善するという考え方を持っている", "マネジャー・コワーカー・組織にサービスやサポートを提供し、顧客満足に貢献することを楽しんでいる", "個人で自主的に行動し、目標を上回ることを楽しんでいる", "速いペースで常に変化するオムニチャネル環境でのロジスティクス業務を楽しんでいる", "チームの一員として、共通の目標に向かって一緒に進むことを楽しめている", "ホームファニッシング・人々の家での生活・IKEAの商品への関心がある", "現在の役割において仕事とプライベートのバランスを保てている"]}, "en": {"t2": "", "items": ["Inspired by the IKEA vision, culture, and values", "Energised by continuous learning and have a 'renew and improve' mindset", "Enjoy providing service and support to managers, co-workers, and the organisation to contribute to customer satisfaction", "Enjoy acting autonomously as an individual and exceeding targets", "Enjoy logistics work in a fast-paced, ever-changing omnichannel environment", "Enjoy working together as part of a team toward common goals", "Have an interest in home furnishing, people's lives at home, and IKEA products", "Able to maintain work-life balance in the current role"]}}, {"jp": {"t2": "2. 私とIKEAカルチャー＆バリュー", "items": ["IKEAのバリューは自分自身の価値観と本当に一致していると感じる", "ロールモデルとして、日々の現実においてIKEAの価値観を共有し体現している", "チームスピリットを示し、一緒に働くことを奨励している", "課題を可能性に変えている", "障害を乗り越え、共有の達成感を持てる協力を生み出している"]}, "en": {"t2": "2. IKEA Culture & Values", "items": ["The IKEA values truly align with my own values", "As a role model, actively sharing and embodying IKEA values in daily reality", "Demonstrating team spirit and encouraging working together", "Turning challenges into possibilities", "Creating cooperation to overcome obstacles and achieve a shared sense of accomplishment"]}}, {"jp": {"t2": "3. 私とキャリアの志向", "items": ["より上位・より広い責任範囲のシニアな役割に就くことを望んでいる", "開発計画に関連したキャリア目標を持ち、積極的に取り組んでいる", "学習・成長・責任を取る機会が十分にあり、自分の成長に責任を持っている", "ビジネスにニーズがある時は、自分の担当外のタスクも責任を持って対応している", "現在の役割を超えてIKEAでのキャリアに良い可能性を感じている"]}, "en": {"t2": "3. Career Aspirations", "items": ["Aspire to take on senior roles with greater or broader responsibilities", "Have career goals related to the development plan and actively working toward them", "Have sufficient opportunities to learn, grow, and take responsibility, and take ownership of own growth", "Willing to take on tasks outside own responsibilities when the business needs it", "See good possibilities for a career at IKEA beyond the current role"]}}, {"jp": {"t2": "4. 私とエンゲージメント", "items": ["一貫して高いコミットメント・エネルギー・モチベーションを示している", "他者を助け、貢献への強い意欲を示している", "期待以上の成果を出すために常に努力し、ビジネスの成功に個人的なつながりを感じている", "粘り強さと決意を持って成果を上げている", "IKEAで働くことを誇りに思っている", "他の人にもIKEAへの就職を勧めたいと思っている"]}, "en": {"t2": "4. Engagement", "items": ["Consistently showing high commitment, energy, and motivation", "Showing a strong desire to help others and contribute", "Always striving to exceed expectations and feeling a personal connection to the success of the business", "Achieving results with perseverance and determination", "Proud to work at IKEA", "Would recommend IKEA as a workplace to others"]}}, {"jp": {"t2": "5. 私と好奇心", "items": ["実験することが好きで、新しい状況にうまく対応できる", "好奇心旺盛で、質問し、学びを積み上げている", "フィードバックをオープンに受け入れ、遅延なく行動に移している", "失敗と経験から学んでいる", "状況や問題を批判的に考察し、素早く解決できる", "困難な状況に直面した時に学びの機会を見出している", "新しいアイデアにオープンで、変化をポジティブに受け入れている", "自分の学びを他者と共有する機会を探している"]}, "en": {"t2": "5. Curiosity", "items": ["Enjoy experimenting and able to adapt well to new situations", "Curious, asking questions, and building on learning", "Openly accepting feedback and taking action without delay", "Learning from failures and experiences", "Able to think critically about situations and problems and solve them quickly", "Finding learning opportunities when facing difficult situations", "Open to new ideas and positively accepting change", "Looking for opportunities to share own learning with others"]}}]};

// ═══════════════════════════════════════════════════════════════════
// I18N + ROLE CONFIG
// ═══════════════════════════════════════════════════════════════════
const TXT = {
  jp: {
    appTitle: "Competence Operations", appSub: "Fulfilment Operations Coworker — Team Growth Platform",
    teamDash: "チームダッシュボード", coworkers: "コワーカー", noCoworkers: "コワーカーがまだ登録されていません",
    addFirst: "最初のコワーカーを追加", addCoworker: "コワーカー追加", newCoworker: "新しいコワーカー",
    editCoworker: "情報を編集", name: "氏名", role: "ロール", dept: "部門", timeInPos: "在職期間",
    namePh: "名前を入力…", deptPh: "例: Fulfilment", timePh: "例: 6ヶ月",
    selectRole: "ロールを選択", save: "保存", cancel: "キャンセル", delete: "削除",
    confirmDelete: "このコワーカーのデータをすべて削除しますか？", confirm: "確認",
    overall: "総合", knowledge: "知識", capabilities: "ケイパビリティ", leadership: "リーダーシップ",
    motivation: "モチベーション", overview: "概要", lastUpdated: "最終更新",
    totalProgress: "全体の進捗", itemsRated: "項目評価済み", unrated: "未評価",
    currentLevel: "現在のレベル", staircase: "ステアケース", radar: "コンピテンスチャート",
    strengths: "強み Top 3", devAreas: "要開発エリア Top 3", devPlan: "開発計画メモ",
    devPlanPh: "主な開発アクション・タイムライン・必要なサポート…",
    addNote: "メモ追加", noteFor: "メモ", aspirant: "Aspirant", inRole: "In the role", seniority: "Seniority",
    aspirantDesc: "学習段階 — 何をどう行うかを学んでいる",
    inRoleDesc: "達成段階 — 何をいつどう行うかを実行している",
    seniorityDesc: "変革段階 — 違いを生み出すために行動している",
    autoSaved: "自動保存済", saving: "保存中…", snapshot: "スナップショット",
    saveSnapshot: "スナップショットを保存", snapshotSaved: "スナップショット保存済",
    history: "履歴", noHistory: "履歴がまだありません", deleteSnapshot: "削除",
    backToTeam: "チームに戻る", backToDash: "ダッシュボードへ",
    exportAll: "全データ書き出し (JSON)", importData: "データ読み込み (JSON)",
    importOk: "インポート完了", importErr: "インポート失敗", export: "Export", import: "Import",
    settings: "設定", lang: "言語", language: "Language",
    rateAll: "未評価をジャンプ", nextUnrated: "次の未回答へ",
    knL: ["まだ経験していない", "補助あり可", "一人でできる", "教えられる"],
    capL: ["めったにない", "時々ある", "頻繁にある", "常にある"],
    pillarLabels: { kn: "知識", cap: "ケイパビリティ", ls: "リーダーシップ", mv: "モチベーション" },
    welcomeTitle: "ようこそ", welcomeBody: "チームメンバーのコンピテンスを継続的に育成。すべてブラウザに自動保存されます。",
    statsDeveloping: "成長中", statsInRole: "In the role", statsSeniority: "Seniority",
    avgTeam: "チーム平均", totalMembers: "メンバー", totalRated: "総評価数",
    motivationHint: "「常にある」=4、「めったにない」=1で評価してください",
    leadershipHint: "リーダーシップ行動の頻度を1〜4で評価", motiveLabel: "MOTIVATION",
    quickActions: "クイックアクション", filterAll: "すべて", roleFilter: "ロールで絞り込み",
    progressNow: "進捗", showLess: "閉じる", showMore: "詳細",
  },
  en: {
    appTitle: "Competence Operations", appSub: "Fulfilment Operations Coworker — Team Growth Platform",
    teamDash: "Team Dashboard", coworkers: "Coworkers", noCoworkers: "No coworkers registered yet",
    addFirst: "Add your first coworker", addCoworker: "Add Coworker", newCoworker: "New Coworker",
    editCoworker: "Edit Info", name: "Name", role: "Role", dept: "Department", timeInPos: "Time in position",
    namePh: "Enter name…", deptPh: "e.g. Fulfilment", timePh: "e.g. 6 months",
    selectRole: "Select role", save: "Save", cancel: "Cancel", delete: "Delete",
    confirmDelete: "Delete all data for this coworker?", confirm: "Confirm",
    overall: "Overall", knowledge: "Knowledge", capabilities: "Capabilities", leadership: "Leadership",
    motivation: "Motivation", overview: "Overview", lastUpdated: "Last updated",
    totalProgress: "Total progress", itemsRated: "rated", unrated: "unrated",
    currentLevel: "Current level", staircase: "Staircase", radar: "Competence Radar",
    strengths: "Top 3 Strengths", devAreas: "Top 3 Dev Areas", devPlan: "Development plan notes",
    devPlanPh: "Key actions, timeline, support needed…",
    addNote: "Add note", noteFor: "Note", aspirant: "Aspirant", inRole: "In the role", seniority: "Seniority",
    aspirantDesc: "Learning stage — learning what to do and how",
    inRoleDesc: "Achievement stage — executing what, when, and how",
    seniorityDesc: "Transformation stage — acting to create a difference",
    autoSaved: "Auto-saved", saving: "Saving…", snapshot: "Snapshot",
    saveSnapshot: "Save snapshot", snapshotSaved: "Snapshot saved",
    history: "History", noHistory: "No history yet", deleteSnapshot: "Delete",
    backToTeam: "Back to team", backToDash: "Dashboard",
    exportAll: "Export all (JSON)", importData: "Import data (JSON)",
    importOk: "Import complete", importErr: "Import failed", export: "Export", import: "Import",
    settings: "Settings", lang: "Language", language: "Language",
    rateAll: "Next unrated", nextUnrated: "Next unrated",
    knL: ["Not yet experienced", "With support", "Independently", "Can teach"],
    capL: ["Rarely", "Sometimes", "Often", "Always"],
    pillarLabels: { kn: "Knowledge", cap: "Capabilities", ls: "Leadership", mv: "Motivation" },
    welcomeTitle: "Welcome", welcomeBody: "Continuously grow your team's competence. Everything auto-saves in your browser.",
    statsDeveloping: "Developing", statsInRole: "In the role", statsSeniority: "Seniority",
    avgTeam: "Team avg", totalMembers: "Members", totalRated: "Total rated",
    motivationHint: "Rate frequency: Always=4, Rarely=1",
    leadershipHint: "Rate frequency of leadership behavior 1–4", motiveLabel: "MOTIVATION",
    quickActions: "Quick actions", filterAll: "All", roleFilter: "Filter by role",
    progressNow: "Progress", showLess: "Less", showMore: "More",
  }
};

const ROLE_KEYS = [
  { key: 'OUT_STD', short: 'OUT-STD', jp: 'アウトフロー（標準）', en: 'Outflow (Standard)', color: '#fbbf24' },
  { key: 'OUT_FL',  short: 'OUT-FL',  jp: 'アウトフロー（フォークリフト）', en: 'Outflow (Forklift)', color: '#f59e0b' },
  { key: 'IN_STD',  short: 'IN-STD',  jp: 'インフロー（標準）', en: 'Inflow (Standard)', color: '#60a5fa' },
  { key: 'IN_FL',   short: 'IN-FL',   jp: 'インフロー（フォークリフト）', en: 'Inflow (Forklift)', color: '#3b82f6' },
];

const PILLAR_META = {
  kn:  { icon: BookOpen,  color: '#FFDB00', glow: 'rgba(255,219,0,.35)' },
  cap: { icon: Compass,   color: '#60a5fa', glow: 'rgba(96,165,250,.35)' },
  ls:  { icon: Award,     color: '#a78bfa', glow: 'rgba(167,139,250,.35)' },
  mv:  { icon: Heart,     color: '#f87171', glow: 'rgba(248,113,113,.35)' },
};

// ═══════════════════════════════════════════════════════════════════
// COMPETENCE STRUCTURE — derives sections per role
// ═══════════════════════════════════════════════════════════════════
function getKnSections(roleKey) {
  const D = BD.DATA;
  const dir = roleKey.startsWith('OUT') ? 'out' : 'in';
  const fl = roleKey.endsWith('FL');
  const s1 = dir === 'out' ? D.KN_OUT_1 : D.KN_IN_1;
  const s3 = fl ? D.KN_3_FL : D.KN_3_STD;
  const arr = [
    { id: dir === 'out' ? 'KN_OUT_1' : 'KN_IN_1', data: s1 },
    { id: 'KN_2', data: D.KN_2 },
    { id: fl ? 'KN_3_FL' : 'KN_3_STD', data: s3 },
    { id: 'KN_4', data: D.KN_4 },
  ];
  if (fl) arr.push({ id: 'KN_5_FL', data: D.KN_5_FL });
  return arr;
}

// Returns full list of rating keys for a role (used for completion %)
function getAllKeys(roleKey) {
  const keys = [];
  // Knowledge
  getKnSections(roleKey).forEach((sec, si) => {
    sec.data.jp.items.forEach((_, ii) => keys.push(`KN__${sec.id}__${si}__${ii}`));
  });
  // Capabilities
  BD.CAP.forEach((grp, gi) => {
    grp.items.forEach((item, ii) => {
      item.jp.items.forEach((_, ki) => keys.push(`CAP__${gi}__${ii}__${ki}`));
    });
  });
  // Leadership
  BD.LS.forEach((item, ii) => {
    item.jp.items.forEach((_, ki) => keys.push(`LS__${ii}__${ki}`));
  });
  // Motivation
  BD.MV.forEach((sec, si) => {
    sec.jp.items.forEach((_, ii) => keys.push(`MV__${si}__${ii}`));
  });
  return keys;
}

function computeStats(ratings, roleKey) {
  const allKeys = getAllKeys(roleKey);
  const total = allKeys.length;
  let rated = 0, sum = 0;
  const pillars = { kn: { s: 0, n: 0, t: 0 }, cap: { s: 0, n: 0, t: 0 }, ls: { s: 0, n: 0, t: 0 }, mv: { s: 0, n: 0, t: 0 } };

  allKeys.forEach(k => {
    const pillar = k.split('__')[0].toLowerCase().slice(0, 2);
    const p = pillars[pillar === 'kn' ? 'kn' : pillar === 'ca' ? 'cap' : pillar === 'ls' ? 'ls' : 'mv'];
    p.t++;
    const v = ratings[k] || 0;
    if (v > 0) { rated++; sum += v; p.s += v; p.n++; }
  });

  const overall = rated > 0 ? sum / rated : 0;
  const completion = total > 0 ? (rated / total) * 100 : 0;

  Object.keys(pillars).forEach(k => {
    pillars[k].avg = pillars[k].n > 0 ? pillars[k].s / pillars[k].n : 0;
    pillars[k].pct = pillars[k].t > 0 ? (pillars[k].n / pillars[k].t) * 100 : 0;
  });

  let level = 0; // 0=aspirant, 1=in role, 2=seniority
  if (overall >= 3.5) level = 2;
  else if (overall >= 2.5) level = 1;

  return { overall, completion, rated, total, pillars, level };
}

// ═══════════════════════════════════════════════════════════════════
// STORAGE LAYER
// ═══════════════════════════════════════════════════════════════════
const ROSTER_KEY = 'foc_roster_v1';
const SETTINGS_KEY = 'foc_settings_v1';
const cwKey = (id) => `foc_cw_${id}`;

async function loadRoster() {
  try {
    const r = await window.storage.get(ROSTER_KEY);
    if (r && r.value) return JSON.parse(r.value);
  } catch (e) {}
  return [];
}
async function saveRoster(roster) {
  try { await window.storage.set(ROSTER_KEY, JSON.stringify(roster)); } catch (e) { console.error(e); }
}
async function loadCw(id) {
  try {
    const r = await window.storage.get(cwKey(id));
    if (r && r.value) return JSON.parse(r.value);
  } catch (e) {}
  return { ratings: {}, notes: {}, devPlan: '', snapshots: [] };
}
async function saveCw(id, data) {
  try { await window.storage.set(cwKey(id), JSON.stringify(data)); } catch (e) { console.error(e); }
}
async function deleteCw(id) {
  try { await window.storage.delete(cwKey(id)); } catch (e) {}
}
async function loadSettings() {
  try {
    const r = await window.storage.get(SETTINGS_KEY);
    if (r && r.value) return JSON.parse(r.value);
  } catch (e) {}
  return { lang: 'jp' };
}
async function saveSettings(s) {
  try { await window.storage.set(SETTINGS_KEY, JSON.stringify(s)); } catch (e) {}
}

// ═══════════════════════════════════════════════════════════════════
// STYLES — embedded as one block; injected once on mount
// ═══════════════════════════════════════════════════════════════════
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap');

* { box-sizing: border-box; }
.foc-root { font-family: 'Plus Jakarta Sans', -apple-system, 'Hiragino Kaku Gothic Pro', 'Hiragino Sans', sans-serif; color: #e4e4e7; min-height: 100vh; position: relative; overflow-x: hidden; }
.foc-root, .foc-root * { -webkit-font-smoothing: antialiased; }

/* atmospheric background */
.foc-bg {
  position: fixed; inset: 0; z-index: 0; pointer-events: none;
  background:
    radial-gradient(60% 50% at 15% 10%, rgba(255,219,0,.08), transparent 70%),
    radial-gradient(50% 60% at 85% 30%, rgba(74,144,226,.10), transparent 70%),
    radial-gradient(70% 50% at 50% 100%, rgba(167,139,250,.06), transparent 70%),
    linear-gradient(180deg, #0a0e1a 0%, #060912 100%);
}
.foc-bg::after {
  content: ''; position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
}

.foc-wrap { position: relative; z-index: 1; max-width: 1280px; margin: 0 auto; padding: 24px 20px 80px; }

/* type */
.disp { font-family: 'Outfit', sans-serif; letter-spacing: -0.02em; font-weight: 700; }
.mono { font-family: 'JetBrains Mono', monospace; font-feature-settings: 'tnum'; }

/* glass card primitives */
.glass { background: linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.02)); border: 1px solid rgba(255,255,255,.08); border-radius: 16px; backdrop-filter: blur(20px); }
.glass-hover { transition: all .25s ease; }
.glass-hover:hover { border-color: rgba(255,255,255,.18); transform: translateY(-2px); }

/* Top bar */
.topbar { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 24px; flex-wrap: wrap; }
.brand { display: flex; align-items: center; gap: 12px; }
.brand-mark { width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, #FFDB00, #ffb800); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 30px rgba(255,219,0,.4), inset 0 1px 0 rgba(255,255,255,.4); position: relative; }
.brand-mark::after { content: ''; position: absolute; inset: 1px; border-radius: 11px; background: linear-gradient(135deg, transparent 40%, rgba(255,255,255,.2)); }
.brand-mark svg { color: #0a0e1a; position: relative; z-index: 1; }
.brand-text h1 { font-size: 18px; font-weight: 800; letter-spacing: -.02em; color: #fff; line-height: 1.1; }
.brand-text .sub { font-size: 11px; color: #71717a; text-transform: uppercase; letter-spacing: .12em; font-weight: 600; margin-top: 2px; }

/* top controls */
.tc-group { display: flex; gap: 8px; align-items: center; }
.icon-btn { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 10px; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); color: #a1a1aa; cursor: pointer; transition: all .15s; }
.icon-btn:hover { background: rgba(255,255,255,.08); color: #fff; border-color: rgba(255,255,255,.16); }
.icon-btn.active { background: #FFDB00; color: #0a0e1a; border-color: #FFDB00; }

.lang-pill { display: inline-flex; padding: 2px; gap: 2px; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); border-radius: 10px; }
.lang-pill button { padding: 6px 12px; font-size: 11px; font-weight: 700; letter-spacing: .04em; border: none; background: transparent; color: #a1a1aa; border-radius: 8px; cursor: pointer; transition: all .15s; }
.lang-pill button.active { background: #FFDB00; color: #0a0e1a; }

.btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 600; letter-spacing: -.01em; border-radius: 10px; cursor: pointer; transition: all .15s; border: 1px solid transparent; }
.btn-primary { background: linear-gradient(180deg, #FFDB00, #ffc800); color: #0a0e1a; box-shadow: 0 4px 20px rgba(255,219,0,.25); }
.btn-primary:hover { box-shadow: 0 6px 28px rgba(255,219,0,.4); transform: translateY(-1px); }
.btn-ghost { background: rgba(255,255,255,.04); color: #e4e4e7; border-color: rgba(255,255,255,.1); }
.btn-ghost:hover { background: rgba(255,255,255,.08); border-color: rgba(255,255,255,.2); }
.btn-danger { background: rgba(244,63,94,.1); color: #fb7185; border-color: rgba(244,63,94,.3); }
.btn-danger:hover { background: rgba(244,63,94,.2); }
.btn:disabled { opacity: .45; cursor: not-allowed; }

/* welcome hero */
.welcome { padding: 32px; margin-bottom: 24px; position: relative; overflow: hidden; }
.welcome::before { content: ''; position: absolute; top: -60%; right: -10%; width: 480px; height: 480px; background: radial-gradient(circle, rgba(255,219,0,.15), transparent 70%); pointer-events: none; }
.welcome h2 { font-size: clamp(28px, 5vw, 42px); font-weight: 800; line-height: 1; color: #fff; letter-spacing: -.025em; margin-bottom: 8px; }
.welcome h2 .accent { color: #FFDB00; }
.welcome p { color: #a1a1aa; max-width: 560px; line-height: 1.55; font-size: 14px; }

/* stats strip */
.stats-strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; }
@media (max-width: 720px) { .stats-strip { grid-template-columns: repeat(2, 1fr); } }
.stat-card { padding: 18px 18px 16px; position: relative; overflow: hidden; }
.stat-label { font-size: 10px; text-transform: uppercase; letter-spacing: .12em; color: #71717a; font-weight: 700; margin-bottom: 8px; }
.stat-value { font-family: 'Outfit', sans-serif; font-size: 32px; font-weight: 800; color: #fff; letter-spacing: -.03em; line-height: 1; }
.stat-suffix { font-size: 14px; color: #71717a; font-weight: 600; margin-left: 4px; }
.stat-icon { position: absolute; top: 16px; right: 16px; opacity: .15; }

/* coworker cards grid */
.section-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin: 8px 0 16px; flex-wrap: wrap; }
.section-title { font-family: 'Outfit', sans-serif; font-size: 18px; font-weight: 700; color: #fff; letter-spacing: -.015em; display: flex; align-items: center; gap: 10px; }
.section-title .badge { font-family: 'JetBrains Mono', monospace; font-size: 11px; padding: 3px 8px; background: rgba(255,255,255,.06); border-radius: 6px; color: #a1a1aa; font-weight: 600; }
.role-filter { display: flex; gap: 6px; flex-wrap: wrap; }
.role-filter .rf { padding: 6px 12px; font-size: 11px; font-weight: 600; border-radius: 99px; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); color: #a1a1aa; cursor: pointer; transition: all .15s; }
.role-filter .rf:hover { color: #fff; border-color: rgba(255,255,255,.2); }
.role-filter .rf.active { background: #FFDB00; color: #0a0e1a; border-color: #FFDB00; font-weight: 700; }

.cw-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 14px; }
.cw-card { padding: 18px; cursor: pointer; position: relative; overflow: hidden; }
.cw-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--accent, #FFDB00); opacity: .9; }
.cw-head { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
.cw-avatar { width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, var(--accent, #FFDB00), color-mix(in srgb, var(--accent, #FFDB00) 70%, #000)); display: flex; align-items: center; justify-content: center; font-family: 'Outfit', sans-serif; font-weight: 800; color: #0a0e1a; font-size: 16px; }
.cw-name { font-family: 'Outfit', sans-serif; font-size: 16px; font-weight: 700; color: #fff; line-height: 1.2; }
.cw-meta { font-size: 11px; color: #71717a; margin-top: 3px; }
.cw-rolepill { display: inline-block; padding: 3px 8px; font-size: 9px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; border-radius: 5px; background: rgba(255,255,255,.06); color: var(--accent, #FFDB00); margin-top: 6px; }

.cw-pillars { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin: 12px 0; }
.cw-pillar { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.cw-pillar-name { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: #71717a; }
.ring-mini { width: 38px; height: 38px; }

.cw-progress { margin-top: 10px; }
.progress-track { height: 4px; background: rgba(255,255,255,.06); border-radius: 4px; overflow: hidden; }
.progress-fill { height: 100%; background: linear-gradient(90deg, #FFDB00, #ffb800); border-radius: 4px; transition: width .6s cubic-bezier(.4,0,.2,1); }
.progress-meta { display: flex; justify-content: space-between; font-size: 10px; margin-top: 5px; }
.progress-meta .l { color: #71717a; font-weight: 600; text-transform: uppercase; letter-spacing: .08em; }
.progress-meta .v { font-family: 'JetBrains Mono', monospace; color: #fff; font-weight: 600; }

.cw-empty { padding: 60px 24px; text-align: center; }
.cw-empty .ico { width: 60px; height: 60px; margin: 0 auto 18px; background: rgba(255,255,255,.04); border-radius: 18px; display: flex; align-items: center; justify-content: center; color: #71717a; }
.cw-empty h3 { font-family: 'Outfit', sans-serif; font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 6px; }
.cw-empty p { color: #71717a; margin-bottom: 24px; }

/* level chip - mini */
.lvl-chip { display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 99px; font-size: 9px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
.lvl-0 { background: rgba(96,165,250,.12); color: #93c5fd; }
.lvl-1 { background: rgba(255,219,0,.12); color: #FFDB00; }
.lvl-2 { background: rgba(167,139,250,.15); color: #c4b5fd; }

/* modal */
.modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,.7); backdrop-filter: blur(8px); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px; animation: fadeIn .2s ease; }
.modal { width: 100%; max-width: 480px; padding: 28px; border-radius: 20px; max-height: 90vh; overflow-y: auto; }
.modal-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
.modal-title { font-family: 'Outfit', sans-serif; font-size: 22px; font-weight: 700; color: #fff; letter-spacing: -.02em; }
.modal-close { background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #a1a1aa; cursor: pointer; }
.modal-close:hover { background: rgba(255,255,255,.08); color: #fff; }
.modal-body { display: flex; flex-direction: column; gap: 14px; }
.modal-foot { display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px; }

.field label { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: .12em; color: #71717a; font-weight: 700; margin-bottom: 6px; }
.field input, .field textarea, .field select { width: 100%; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.1); border-radius: 10px; padding: 10px 12px; color: #fff; font-family: inherit; font-size: 14px; transition: all .15s; }
.field input:focus, .field textarea:focus, .field select:focus { outline: none; border-color: #FFDB00; background: rgba(255,255,255,.06); box-shadow: 0 0 0 3px rgba(255,219,0,.1); }
.field textarea { resize: vertical; min-height: 80px; line-height: 1.5; }
.field .role-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.field .role-opt { padding: 12px; border-radius: 10px; background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08); cursor: pointer; transition: all .15s; }
.field .role-opt:hover { border-color: rgba(255,255,255,.2); }
.field .role-opt.sel { border-color: var(--accent, #FFDB00); background: rgba(255,219,0,.06); }
.field .role-opt .ro-short { font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 700; letter-spacing: .08em; color: var(--accent, #FFDB00); }
.field .role-opt .ro-name { font-size: 12px; color: #fff; font-weight: 600; margin-top: 4px; line-height: 1.3; }

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.fadein { animation: fadeIn .3s ease; }
.slideup { animation: slideUp .35s cubic-bezier(.4,0,.2,1); }
`;

const STYLES_2 = `
/* ── DETAIL VIEW ── */
.det-head { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 20px; flex-wrap: wrap; }
.det-back { display: inline-flex; align-items: center; gap: 6px; padding: 8px 12px; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); border-radius: 10px; font-size: 12px; color: #a1a1aa; cursor: pointer; font-weight: 600; transition: all .15s; }
.det-back:hover { color: #fff; border-color: rgba(255,255,255,.2); }
.det-info { flex: 1; display: flex; align-items: center; gap: 14px; min-width: 240px; }
.det-avatar { width: 56px; height: 56px; border-radius: 16px; background: linear-gradient(135deg, var(--accent, #FFDB00), color-mix(in srgb, var(--accent, #FFDB00) 70%, #000)); display: flex; align-items: center; justify-content: center; font-family: 'Outfit', sans-serif; font-weight: 800; color: #0a0e1a; font-size: 22px; flex-shrink: 0; }
.det-name { font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 800; color: #fff; line-height: 1.1; letter-spacing: -.02em; }
.det-meta-line { display: flex; gap: 8px; align-items: center; font-size: 12px; color: #71717a; margin-top: 4px; flex-wrap: wrap; }
.det-meta-line .pip { width: 3px; height: 3px; border-radius: 50%; background: #52525b; }
.det-actions { display: flex; gap: 8px; flex-wrap: wrap; }
.save-tag { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; color: #4ade80; font-weight: 600; padding: 0 8px; }

/* big rings overview */
.overview-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 20px; }
@media (max-width: 720px) { .overview-grid { grid-template-columns: repeat(2, 1fr); } }
.pillar-tile { padding: 18px 16px; text-align: center; position: relative; overflow: hidden; cursor: pointer; transition: all .2s; }
.pillar-tile:hover { transform: translateY(-3px); }
.pillar-tile::after { content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 40%; height: 60px; background: var(--accent); opacity: .12; filter: blur(30px); pointer-events: none; }
.pillar-name { font-size: 10px; text-transform: uppercase; letter-spacing: .12em; font-weight: 700; color: #a1a1aa; margin-top: 12px; }
.pillar-value { font-family: 'Outfit', sans-serif; font-size: 28px; font-weight: 800; color: #fff; letter-spacing: -.03em; margin-top: 4px; }
.pillar-value .of { font-size: 14px; color: #71717a; font-weight: 600; }
.pillar-progress { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #71717a; margin-top: 4px; font-weight: 600; }

/* the BIG ring */
.ring-svg { transform: rotate(-90deg); }
.ring-bg { fill: none; stroke: rgba(255,255,255,.06); }
.ring-fg { fill: none; stroke: var(--accent, #FFDB00); stroke-linecap: round; transition: stroke-dashoffset .8s cubic-bezier(.4,0,.2,1); filter: drop-shadow(0 0 6px var(--glow, rgba(255,219,0,.4))); }

/* staircase */
.stair-card { padding: 24px; margin-bottom: 20px; position: relative; overflow: hidden; }
.stair-card::before { content: ''; position: absolute; inset: 0; background: radial-gradient(60% 80% at 50% 100%, rgba(255,219,0,.06), transparent 70%); pointer-events: none; }
.stair-title { font-size: 11px; text-transform: uppercase; letter-spacing: .14em; color: #71717a; font-weight: 700; margin-bottom: 18px; display: flex; justify-content: space-between; align-items: center; }
.stair-overall { font-family: 'Outfit', sans-serif; font-size: 36px; font-weight: 800; color: #FFDB00; }
.stair-overall .of { font-size: 16px; color: #71717a; }
.stair-track { display: flex; align-items: flex-end; justify-content: center; gap: 8px; margin: 0 auto; max-width: 560px; position: relative; }
.stair-step { flex: 1; position: relative; display: flex; flex-direction: column; align-items: center; }
.stair-tile { width: 100%; border-radius: 14px; background: linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.01)); border: 1px solid rgba(255,255,255,.08); padding: 16px 12px 14px; transition: all .4s; position: relative; }
.stair-step.s0 .stair-tile { height: 100px; }
.stair-step.s1 .stair-tile { height: 130px; }
.stair-step.s2 .stair-tile { height: 160px; }
.stair-step.active .stair-tile { background: linear-gradient(180deg, rgba(255,219,0,.22), rgba(255,219,0,.06)); border-color: rgba(255,219,0,.6); box-shadow: 0 0 40px rgba(255,219,0,.25), inset 0 1px 0 rgba(255,255,255,.1); }
.stair-step.passed .stair-tile { background: linear-gradient(180deg, rgba(74,222,128,.08), rgba(74,222,128,.02)); border-color: rgba(74,222,128,.25); }
.stair-num { font-family: 'Outfit', sans-serif; font-size: 26px; font-weight: 800; color: rgba(255,255,255,.25); }
.stair-step.active .stair-num { color: #FFDB00; }
.stair-step.passed .stair-num { color: #4ade80; }
.stair-label { font-size: 11px; font-weight: 700; color: #a1a1aa; margin-top: 2px; }
.stair-step.active .stair-label { color: #fff; }
.stair-desc { font-size: 10px; color: #71717a; line-height: 1.45; margin-top: 8px; }
.stair-step.active .stair-desc { color: #d4d4d8; }

/* tabs */
.tab-bar { display: flex; gap: 4px; margin-bottom: 20px; padding: 4px; background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08); border-radius: 14px; overflow-x: auto; scrollbar-width: none; }
.tab-bar::-webkit-scrollbar { display: none; }
.tab { flex-shrink: 0; display: flex; align-items: center; gap: 8px; padding: 9px 16px; font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 600; color: #a1a1aa; background: transparent; border: none; cursor: pointer; border-radius: 10px; transition: all .15s; white-space: nowrap; }
.tab:hover { color: #fff; }
.tab.active { background: linear-gradient(180deg, rgba(255,219,0,.18), rgba(255,219,0,.08)); color: #FFDB00; box-shadow: inset 0 1px 0 rgba(255,255,255,.06); }
.tab-pct { font-family: 'JetBrains Mono', monospace; font-size: 10px; padding: 2px 6px; background: rgba(255,255,255,.06); border-radius: 4px; color: inherit; font-weight: 600; }
.tab.active .tab-pct { background: rgba(255,219,0,.2); }

/* competence item */
.sec-block { margin-bottom: 24px; }
.sec-title { font-family: 'Outfit', sans-serif; font-size: 16px; font-weight: 700; color: #fff; letter-spacing: -.01em; margin-bottom: 6px; }
.sec-desc { font-size: 12px; color: #a1a1aa; line-height: 1.55; margin-bottom: 12px; font-style: italic; }
.grp-label { font-size: 10px; text-transform: uppercase; letter-spacing: .14em; color: #71717a; font-weight: 700; padding: 12px 14px; background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.06); border-radius: 10px; margin: 18px 0 10px; }

.item-card { padding: 14px 16px; margin-bottom: 8px; border-left: 3px solid transparent; transition: all .2s; }
.item-card.unrated { border-left-color: rgba(244,63,94,.7); background: linear-gradient(90deg, rgba(244,63,94,.04), rgba(255,255,255,.02)); }
.item-card.rated { border-left-color: #4ade80; }
.item-head { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px; }
.item-num { flex-shrink: 0; width: 24px; height: 24px; border-radius: 7px; background: rgba(255,255,255,.06); display: flex; align-items: center; justify-content: center; font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 700; color: #a1a1aa; }
.item-text { flex: 1; font-size: 13px; line-height: 1.55; color: #e4e4e7; }

.step-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
.step { padding: 10px 6px; border-radius: 10px; background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08); cursor: pointer; text-align: center; transition: all .15s; position: relative; }
.step:hover { background: rgba(255,255,255,.06); border-color: rgba(255,255,255,.16); transform: translateY(-1px); }
.step.sel { background: linear-gradient(180deg, rgba(255,219,0,.2), rgba(255,219,0,.06)); border-color: rgba(255,219,0,.6); box-shadow: 0 4px 20px rgba(255,219,0,.2); }
.step.sel.s1 { background: linear-gradient(180deg, rgba(244,63,94,.18), rgba(244,63,94,.06)); border-color: rgba(244,63,94,.6); box-shadow: 0 4px 20px rgba(244,63,94,.2); }
.step.sel.s2 { background: linear-gradient(180deg, rgba(251,146,60,.18), rgba(251,146,60,.06)); border-color: rgba(251,146,60,.6); box-shadow: 0 4px 20px rgba(251,146,60,.2); }
.step.sel.s3 { background: linear-gradient(180deg, rgba(74,222,128,.18), rgba(74,222,128,.06)); border-color: rgba(74,222,128,.6); box-shadow: 0 4px 20px rgba(74,222,128,.2); }
.step.sel.s4 { background: linear-gradient(180deg, rgba(167,139,250,.22), rgba(167,139,250,.08)); border-color: rgba(167,139,250,.7); box-shadow: 0 4px 24px rgba(167,139,250,.25); }
.step-num { font-family: 'Outfit', sans-serif; font-size: 18px; font-weight: 800; color: rgba(255,255,255,.4); }
.step.sel .step-num { color: #fff; }
.step-label { font-size: 9px; font-weight: 700; color: #71717a; margin-top: 2px; letter-spacing: .04em; }
.step.sel .step-label { color: rgba(255,255,255,.9); }

.note-toggle { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; color: #a1a1aa; cursor: pointer; margin-top: 10px; padding: 4px 10px; border-radius: 6px; transition: all .15s; }
.note-toggle:hover { background: rgba(255,255,255,.04); color: #fff; }
.note-textarea { width: 100%; margin-top: 10px; background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08); border-radius: 8px; padding: 8px 10px; color: #e4e4e7; font-family: inherit; font-size: 12px; resize: vertical; min-height: 60px; }
.note-textarea:focus { outline: none; border-color: rgba(255,219,0,.5); }

/* radar + strengths */
.ov-2col { display: grid; grid-template-columns: 1.1fr 1fr; gap: 16px; margin-bottom: 20px; }
@media (max-width: 860px) { .ov-2col { grid-template-columns: 1fr; } }
.panel-card { padding: 20px; }
.panel-h { font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 14px; display: flex; align-items: center; justify-content: space-between; }

.top3 { display: flex; flex-direction: column; gap: 8px; }
.top3-row { display: flex; align-items: center; gap: 10px; padding: 10px 12px; background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.06); border-radius: 10px; }
.top3-row .badge-n { width: 24px; height: 24px; border-radius: 7px; background: rgba(255,255,255,.06); display: flex; align-items: center; justify-content: center; font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; color: #a1a1aa; flex-shrink: 0; }
.strength .badge-n { background: rgba(74,222,128,.15); color: #4ade80; }
.dev .badge-n { background: rgba(251,146,60,.15); color: #fb923c; }
.top3-text { flex: 1; font-size: 12px; color: #e4e4e7; line-height: 1.45; }
.top3-score { font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 5px; flex-shrink: 0; }
.strength .top3-score { background: rgba(74,222,128,.1); color: #4ade80; }
.dev .top3-score { background: rgba(251,146,60,.1); color: #fb923c; }
.top3-empty { font-size: 12px; color: #71717a; padding: 24px 12px; text-align: center; font-style: italic; }

/* history */
.hist-list { display: flex; flex-direction: column; gap: 10px; }
.hist-row { display: flex; align-items: center; gap: 14px; padding: 14px 16px; }
.hist-date { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #FFDB00; font-weight: 600; min-width: 90px; }
.hist-vals { display: flex; gap: 14px; flex: 1; flex-wrap: wrap; font-size: 11px; }
.hist-vals .hv { display: flex; gap: 4px; align-items: baseline; }
.hist-vals .hv .l { color: #71717a; text-transform: uppercase; font-weight: 700; letter-spacing: .08em; font-size: 9px; }
.hist-vals .hv .v { font-family: 'JetBrains Mono', monospace; color: #fff; font-weight: 600; }
.hist-del { background: transparent; border: none; color: #71717a; cursor: pointer; padding: 6px; border-radius: 6px; transition: all .15s; }
.hist-del:hover { color: #fb7185; background: rgba(244,63,94,.1); }

/* dev plan */
.devplan-card { padding: 20px; }
.devplan-area { width: 100%; min-height: 110px; background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08); border-radius: 10px; padding: 12px; color: #e4e4e7; font-family: inherit; font-size: 13px; line-height: 1.6; resize: vertical; }
.devplan-area:focus { outline: none; border-color: rgba(255,219,0,.5); background: rgba(255,255,255,.05); }

/* toast */
.toast { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); padding: 12px 20px; background: rgba(20,25,40,.95); border: 1px solid rgba(74,222,128,.4); border-radius: 12px; color: #4ade80; font-size: 13px; font-weight: 600; z-index: 1000; backdrop-filter: blur(20px); box-shadow: 0 10px 40px rgba(0,0,0,.4); animation: slideUp .3s ease; display: flex; align-items: center; gap: 8px; }
.toast.err { border-color: rgba(244,63,94,.4); color: #fb7185; }

/* settings menu */
.menu-pop { position: absolute; top: 48px; right: 0; min-width: 240px; padding: 8px; z-index: 50; }
.menu-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; font-size: 13px; color: #e4e4e7; cursor: pointer; border-radius: 8px; background: transparent; border: none; width: 100%; text-align: left; font-family: inherit; font-weight: 500; transition: all .12s; }
.menu-item:hover { background: rgba(255,255,255,.06); }
.menu-item svg { color: #a1a1aa; }
.menu-divider { height: 1px; background: rgba(255,255,255,.06); margin: 6px 0; }
.menu-pos { position: relative; }
`;

// ═══════════════════════════════════════════════════════════════════
// REUSABLE UI COMPONENTS
// ═══════════════════════════════════════════════════════════════════
function Ring({ size = 80, stroke = 8, value = 0, max = 4, color = '#FFDB00', glow, children, showPct = false, asCompletion = false }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = asCompletion ? Math.min(100, value) : (max > 0 ? Math.min(100, (value / max) * 100) : 0);
  const offset = c - (pct / 100) * c;
  return (
    <div style={{ width: size, height: size, position: 'relative', display: 'inline-block' }}>
      <svg width={size} height={size} className="ring-svg">
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} className="ring-bg" />
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} className="ring-fg"
          strokeDasharray={c} strokeDashoffset={offset}
          style={{ stroke: color, filter: glow ? `drop-shadow(0 0 8px ${glow})` : undefined }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', fontFamily: 'Outfit, sans-serif', fontWeight: 800 }}>
        {children}
      </div>
    </div>
  );
}

function MiniRing({ value, max = 4, color = '#FFDB00' }) {
  if (value === 0) {
    return <div className="ring-mini" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#52525b', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}>—</div>;
  }
  return (
    <Ring size={38} stroke={4} value={value} max={max} color={color}>
      <span style={{ fontSize: 11, color: '#fff' }}>{value.toFixed(1)}</span>
    </Ring>
  );
}

function Toast({ msg, type = 'ok' }) {
  if (!msg) return null;
  return (
    <div className={`toast ${type === 'err' ? 'err' : ''}`}>
      {type === 'err' ? <AlertCircle size={16} /> : <Check size={16} />}
      <span>{msg}</span>
    </div>
  );
}

function Modal({ open, title, onClose, children, footer }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal glass slideup" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div className="modal-title">{title}</div>
          <button className="modal-close" onClick={onClose}><X size={16} /></button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </div>
  );
}

function getInitials(name) {
  if (!name) return '?';
  const parts = String(name).trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function roleObj(roleKey) {
  return ROLE_KEYS.find(r => r.key === roleKey) || ROLE_KEYS[0];
}

function fmtDate(d, lang) {
  if (!d) return '—';
  try {
    const dt = new Date(d);
    if (lang === 'jp') {
      return `${dt.getMonth() + 1}/${dt.getDate()}`;
    }
    return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch { return '—'; }
}
function fmtDateLong(d, lang) {
  if (!d) return '—';
  try {
    const dt = new Date(d);
    return dt.toLocaleDateString(lang === 'jp' ? 'ja-JP' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch { return '—'; }
}

// ═══════════════════════════════════════════════════════════════════
// STAIRCASE (level visualization)
// ═══════════════════════════════════════════════════════════════════
function Staircase({ overall, level, lang }) {
  const t = TXT[lang];
  const labels = [t.aspirant, t.inRole, t.seniority];
  const descs = [t.aspirantDesc, t.inRoleDesc, t.seniorityDesc];
  return (
    <div className="stair-card glass">
      <div className="stair-title">
        <span>{t.staircase}</span>
        <span className="stair-overall">{overall.toFixed(2)}<span className="of">/4</span></span>
      </div>
      <div className="stair-track">
        {[0, 1, 2].map(i => (
          <div key={i} className={`stair-step s${i} ${i === level ? 'active' : ''} ${i < level ? 'passed' : ''}`}>
            <div className="stair-tile">
              <div className="stair-num">0{i + 1}</div>
              <div className="stair-label">{labels[i]}</div>
              <div className="stair-desc">{descs[i]}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// RADAR CHART — custom SVG, no library needed
// ═══════════════════════════════════════════════════════════════════
function RadarChart({ values, lang }) {
  // values = {kn, cap, ls, mv}
  const labels = [TXT[lang].pillarLabels.kn, TXT[lang].pillarLabels.cap, TXT[lang].pillarLabels.ls, TXT[lang].pillarLabels.mv];
  const data = [values.kn, values.cap, values.ls, values.mv];
  // wider viewBox than visible size to give label breathing room
  const W = 340, H = 280;
  const cx = W / 2, cy = H / 2;
  const r = 88;
  const angles = [-Math.PI / 2, 0, Math.PI / 2, Math.PI]; // top, right, bottom, left
  const ringLevels = [1, 2, 3, 4];

  const point = (i, val) => {
    const a = angles[i];
    const rr = (val / 4) * r;
    return [cx + rr * Math.cos(a), cy + rr * Math.sin(a)];
  };
  const polyPts = data.map((v, i) => point(i, v).join(',')).join(' ');
  const ratedCount = data.filter(v => v > 0).length;
  const avg = ratedCount > 0 ? data.reduce((s, v) => s + v, 0) / ratedCount : 0;

  return (
    <svg width="100%" height="auto" viewBox={`0 0 ${W} ${H}`} style={{ maxWidth: 360, display: 'block', margin: '0 auto' }}>
      {ringLevels.map(lv => (
        <circle key={lv} cx={cx} cy={cy} r={(lv / 4) * r} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="1" strokeDasharray={lv === 4 ? '0' : '2 3'} />
      ))}
      {angles.map((a, i) => (
        <line key={i} x1={cx} y1={cy} x2={cx + r * Math.cos(a)} y2={cy + r * Math.sin(a)} stroke="rgba(255,255,255,.06)" strokeWidth="1" />
      ))}
      <polygon points={polyPts} fill="rgba(255,219,0,.18)" stroke="#FFDB00" strokeWidth="2" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 12px rgba(255,219,0,.3))' }} />
      {data.map((v, i) => {
        if (v === 0) return null;
        const [x, y] = point(i, v);
        return <circle key={i} cx={x} cy={y} r="4" fill="#FFDB00" style={{ filter: 'drop-shadow(0 0 6px rgba(255,219,0,.6))' }} />;
      })}
      {labels.map((label, i) => {
        const a = angles[i];
        const lr = r + 22;
        const lx = cx + lr * Math.cos(a);
        const ly = cy + lr * Math.sin(a);
        return (
          <text key={i} x={lx} y={ly} fontSize="10.5" fontWeight="700" fill="#a1a1aa" textAnchor="middle" dominantBaseline="middle" fontFamily="Outfit, sans-serif" letterSpacing="0.6">
            {label.toUpperCase()}
          </text>
        );
      })}
      {/* center value */}
      <text x={cx} y={cy - 4} fontSize="22" fontFamily="Outfit, sans-serif" fontWeight="800" fill="#fff" textAnchor="middle">
        {avg.toFixed(1)}
      </text>
      <text x={cx} y={cy + 14} fontSize="9" fontFamily="JetBrains Mono, monospace" fill="#71717a" textAnchor="middle" fontWeight="600" letterSpacing="0.5">AVG / 4</text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════
// STRENGTHS / DEV — Top 3 sourced from current ratings
// ═══════════════════════════════════════════════════════════════════
function buildItemIndex(roleKey, lang) {
  // Returns map: key -> { text, sectionTitle }
  const map = {};
  getKnSections(roleKey).forEach((sec, si) => {
    const sd = sec.data[lang];
    sd.items.forEach((txt, ii) => {
      map[`KN__${sec.id}__${si}__${ii}`] = { text: txt, sec: sd.title };
    });
  });
  BD.CAP.forEach((grp, gi) => {
    grp.items.forEach((item, ii) => {
      const id = item[lang];
      id.items.forEach((txt, ki) => {
        map[`CAP__${gi}__${ii}__${ki}`] = { text: txt, sec: id.title };
      });
    });
  });
  BD.LS.forEach((item, ii) => {
    const id = item[lang];
    id.items.forEach((txt, ki) => {
      map[`LS__${ii}__${ki}`] = { text: txt, sec: id.title };
    });
  });
  BD.MV.forEach((sec, si) => {
    const sd = sec[lang];
    sd.items.forEach((txt, ii) => {
      map[`MV__${si}__${ii}`] = { text: txt, sec: sd.t2 || '' };
    });
  });
  return map;
}

function TopThree({ ratings, roleKey, lang }) {
  const t = TXT[lang];
  const idx = useMemo(() => buildItemIndex(roleKey, lang), [roleKey, lang]);
  const rated = Object.entries(ratings).filter(([k, v]) => v > 0 && idx[k]);
  const top3 = [...rated].sort((a, b) => b[1] - a[1]).slice(0, 3);
  const bot3 = [...rated].sort((a, b) => a[1] - b[1]).slice(0, 3);
  return (
    <div className="ov-2col" style={{ marginBottom: 0 }}>
      <div className="panel-card glass">
        <div className="panel-h"><span>★ {t.strengths}</span></div>
        <div className="top3">
          {top3.length === 0 && <div className="top3-empty">{t.strEmpty || (lang === 'jp' ? '評価を入力すると強みが表示されます' : 'Rate items to see strengths')}</div>}
          {top3.map(([k, v], i) => (
            <div key={k} className="top3-row strength">
              <div className="badge-n">{i + 1}</div>
              <div className="top3-text">{idx[k].text}</div>
              <div className="top3-score">{v}/4</div>
            </div>
          ))}
        </div>
      </div>
      <div className="panel-card glass">
        <div className="panel-h"><span>↗ {t.devAreas}</span></div>
        <div className="top3">
          {bot3.length === 0 && <div className="top3-empty">{lang === 'jp' ? '評価を入力すると開発エリアが表示されます' : 'Rate items to see dev areas'}</div>}
          {bot3.map(([k, v], i) => (
            <div key={k} className="top3-row dev">
              <div className="badge-n">{i + 1}</div>
              <div className="top3-text">{idx[k].text}</div>
              <div className="top3-score">{v}/4</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// COMPETENCE ITEM (the rating row)
// ═══════════════════════════════════════════════════════════════════
function CompetenceItem({ itemKey, text, num, value, onRate, lang, isKn, note, onNote }) {
  const [showNote, setShowNote] = useState(!!note);
  const labels = isKn ? TXT[lang].knL : TXT[lang].capL;
  return (
    <div className={`item-card glass ${value > 0 ? 'rated' : 'unrated'}`}>
      <div className="item-head">
        <div className="item-num">{num}</div>
        <div className="item-text">{text}</div>
      </div>
      <div className="step-row">
        {[1, 2, 3, 4].map(r => (
          <div key={r}
            className={`step ${value === r ? `sel s${r}` : ''}`}
            onClick={() => onRate(value === r ? 0 : r)}
            title={labels[r - 1]}>
            <div className="step-num">{r}</div>
            <div className="step-label">{labels[r - 1]}</div>
          </div>
        ))}
      </div>
      {showNote ? (
        <textarea className="note-textarea" placeholder={TXT[lang].noteFor + '…'} value={note || ''} onChange={(e) => onNote(e.target.value)} />
      ) : (
        <div className="note-toggle" onClick={() => setShowNote(true)}>
          <Edit3 size={11} /> {TXT[lang].addNote}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PANELS — Overview, Knowledge, Capabilities, Leadership, Motivation
// ═══════════════════════════════════════════════════════════════════
function OverviewPanel({ stats, ratings, roleKey, lang, devPlan, onDevPlan }) {
  const t = TXT[lang];
  return (
    <div className="fadein">
      <Staircase overall={stats.overall} level={stats.level} lang={lang} />

      <div className="overview-grid" style={{ marginBottom: 20 }}>
        {['kn', 'cap', 'ls', 'mv'].map(p => {
          const meta = PILLAR_META[p];
          const v = stats.pillars[p];
          const Icon = meta.icon;
          return (
            <div key={p} className="pillar-tile glass glass-hover" style={{ '--accent': meta.color }}>
              <Ring size={84} stroke={8} value={v.avg} max={4} color={meta.color} glow={meta.glow}>
                <span style={{ fontSize: 22, color: '#fff' }}>{v.avg.toFixed(1)}</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: '#71717a', fontWeight: 600, marginTop: 1 }}>/ 4</span>
              </Ring>
              <div className="pillar-name" style={{ color: meta.color }}>{t.pillarLabels[p]}</div>
              <div className="pillar-progress">{v.n}/{v.t} · {v.pct.toFixed(0)}%</div>
            </div>
          );
        })}
      </div>

      <div className="ov-2col">
        <div className="panel-card glass" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="panel-h" style={{ alignSelf: 'stretch' }}><span>{t.radar}</span></div>
          <RadarChart values={{ kn: stats.pillars.kn.avg, cap: stats.pillars.cap.avg, ls: stats.pillars.ls.avg, mv: stats.pillars.mv.avg }} lang={lang} />
        </div>
        <div className="devplan-card glass">
          <div className="panel-h"><span>📋 {t.devPlan}</span></div>
          <textarea className="devplan-area" placeholder={t.devPlanPh} value={devPlan || ''} onChange={(e) => onDevPlan(e.target.value)} />
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <TopThree ratings={ratings} roleKey={roleKey} lang={lang} />
      </div>
    </div>
  );
}

function KnowledgePanel({ ratings, notes, onRate, onNote, roleKey, lang }) {
  const secs = getKnSections(roleKey);
  return (
    <div className="fadein">
      {secs.map((sec, si) => {
        const sd = sec.data[lang];
        return (
          <div key={sec.id} className="sec-block">
            <div className="sec-title">{sd.title}</div>
            <div className="sec-desc">{sd.desc}</div>
            {sd.items.map((txt, ii) => {
              const k = `KN__${sec.id}__${si}__${ii}`;
              return (
                <CompetenceItem
                  key={k}
                  itemKey={k} text={txt} num={ii + 1}
                  value={ratings[k] || 0}
                  onRate={(v) => onRate(k, v)}
                  note={notes[k] || ''}
                  onNote={(v) => onNote(k, v)}
                  lang={lang} isKn={true}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function CapabilitiesPanel({ ratings, notes, onRate, onNote, lang }) {
  return (
    <div className="fadein">
      {BD.CAP.map((grp, gi) => (
        <div key={gi} className="sec-block">
          <div className="grp-label">{grp.group[lang]}</div>
          {grp.items.map((item, ii) => {
            const id = item[lang];
            return (
              <div key={ii} style={{ marginBottom: 18 }}>
                <div className="sec-title" style={{ fontSize: 14, marginTop: 14 }}>{id.title}</div>
                <div className="sec-desc">{id.desc}</div>
                {id.items.map((txt, ki) => {
                  const k = `CAP__${gi}__${ii}__${ki}`;
                  return (
                    <CompetenceItem
                      key={k} itemKey={k} text={txt} num={ki + 1}
                      value={ratings[k] || 0}
                      onRate={(v) => onRate(k, v)}
                      note={notes[k] || ''}
                      onNote={(v) => onNote(k, v)}
                      lang={lang} isKn={false}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function LeadershipPanel({ ratings, notes, onRate, onNote, lang }) {
  return (
    <div className="fadein">
      <div className="sec-desc" style={{ marginBottom: 14 }}>{TXT[lang].leadershipHint}</div>
      {BD.LS.map((item, ii) => {
        const id = item[lang];
        return (
          <div key={ii} className="sec-block">
            <div className="sec-title">{id.title}</div>
            {id.items.map((txt, ki) => {
              const k = `LS__${ii}__${ki}`;
              return (
                <CompetenceItem
                  key={k} itemKey={k} text={txt} num={ki + 1}
                  value={ratings[k] || 0}
                  onRate={(v) => onRate(k, v)}
                  note={notes[k] || ''}
                  onNote={(v) => onNote(k, v)}
                  lang={lang} isKn={false}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function MotivationPanel({ ratings, notes, onRate, onNote, roleKey, lang }) {
  // Show role label up top
  const ri = ROLE_KEYS.findIndex(r => r.key === roleKey);
  const roleLabel = BD.MV_ROLE[ri >= 0 ? ri : 0][lang];
  return (
    <div className="fadein">
      <div className="sec-block">
        <div className="sec-title">{roleLabel}</div>
        <div className="sec-desc">{TXT[lang].motivationHint}</div>
      </div>
      {BD.MV.map((sec, si) => {
        const sd = sec[lang];
        const headTitle = si === 0 ? BD.MV_DESC[0][lang] : sd.t2;
        return (
          <div key={si} className="sec-block">
            <div className="sec-title">{headTitle}</div>
            {sd.items.map((txt, ii) => {
              const k = `MV__${si}__${ii}`;
              return (
                <CompetenceItem
                  key={k} itemKey={k} text={txt} num={ii + 1}
                  value={ratings[k] || 0}
                  onRate={(v) => onRate(k, v)}
                  note={notes[k] || ''}
                  onNote={(v) => onNote(k, v)}
                  lang={lang} isKn={false}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function HistoryPanel({ snapshots, onDelete, lang }) {
  const t = TXT[lang];
  if (!snapshots || snapshots.length === 0) {
    return (
      <div className="cw-empty glass fadein">
        <div className="ico"><HistoryIcon size={24} /></div>
        <h3>{t.noHistory}</h3>
        <p>{lang === 'jp' ? 'スナップショットを保存すると、ここに履歴が表示されます。' : 'Snapshots will appear here as you save them.'}</p>
      </div>
    );
  }
  return (
    <div className="hist-list fadein">
      {snapshots.slice().reverse().map((s, i) => {
        const realIdx = snapshots.length - 1 - i;
        return (
          <div key={s.date + i} className="hist-row glass">
            <div className="hist-date">{fmtDateLong(s.date, lang)}</div>
            <div className="hist-vals">
              <div className="hv"><span className="l">{t.overall}</span><span className="v">{s.scores.overall.toFixed(2)}</span></div>
              <div className="hv"><span className="l">KN</span><span className="v">{s.scores.kn.toFixed(1)}</span></div>
              <div className="hv"><span className="l">CAP</span><span className="v">{s.scores.cap.toFixed(1)}</span></div>
              <div className="hv"><span className="l">LS</span><span className="v">{s.scores.ls.toFixed(1)}</span></div>
              <div className="hv"><span className="l">MV</span><span className="v">{s.scores.mv.toFixed(1)}</span></div>
              <div className="hv"><span className="l">{lang === 'jp' ? '進捗' : 'Progress'}</span><span className="v">{s.scores.completion.toFixed(0)}%</span></div>
            </div>
            <button className="hist-del" onClick={() => onDelete(realIdx)} title={t.deleteSnapshot}>
              <Trash2 size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ADD / EDIT COWORKER FORM (used inside Modal)
// ═══════════════════════════════════════════════════════════════════
function CoworkerForm({ initial, onSubmit, onCancel, lang }) {
  const t = TXT[lang];
  const [name, setName] = useState(initial?.name || '');
  const [role, setRole] = useState(initial?.role || 'OUT_STD');
  const [dept, setDept] = useState(initial?.dept || 'Fulfilment');
  const [timeInRole, setTime] = useState(initial?.timeInRole || '');

  const submit = () => {
    if (!name.trim()) return;
    onSubmit({ name: name.trim(), role, dept: dept.trim(), timeInRole: timeInRole.trim() });
  };

  return (
    <>
      <div className="field">
        <label>{t.name} *</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t.namePh} autoFocus />
      </div>
      <div className="field">
        <label>{t.role}</label>
        <div className="role-grid">
          {ROLE_KEYS.map(r => (
            <div key={r.key}
              className={`role-opt ${role === r.key ? 'sel' : ''}`}
              style={{ '--accent': r.color }}
              onClick={() => setRole(r.key)}>
              <div className="ro-short">{r.short}</div>
              <div className="ro-name">{r[lang]}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="field">
        <label>{t.dept}</label>
        <input type="text" value={dept} onChange={(e) => setDept(e.target.value)} placeholder={t.deptPh} />
      </div>
      <div className="field">
        <label>{t.timeInPos}</label>
        <input type="text" value={timeInRole} onChange={(e) => setTime(e.target.value)} placeholder={t.timePh} />
      </div>
      <div className="modal-foot">
        <button className="btn btn-ghost" onClick={onCancel}>{t.cancel}</button>
        <button className="btn btn-primary" onClick={submit} disabled={!name.trim()}>
          <Save size={14} /> {t.save}
        </button>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════
// COWORKER CARD (dashboard tile)
// ═══════════════════════════════════════════════════════════════════
function CoworkerCard({ cw, onOpen, lang }) {
  const t = TXT[lang];
  const role = roleObj(cw.role);
  const s = cw.scores || { overall: 0, completion: 0, pillars: { kn: { avg: 0 }, cap: { avg: 0 }, ls: { avg: 0 }, mv: { avg: 0 } }, level: 0 };
  const levelTxt = s.level === 2 ? t.seniority : s.level === 1 ? t.inRole : t.aspirant;
  return (
    <div className="cw-card glass glass-hover" style={{ '--accent': role.color }} onClick={onOpen}>
      <div className="cw-head">
        <div className="cw-avatar">{getInitials(cw.name)}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="cw-name">{cw.name}</div>
          <div className="cw-meta">{cw.dept || '—'}{cw.timeInRole ? ` · ${cw.timeInRole}` : ''}</div>
          <div className="cw-rolepill">{role.short}</div>
        </div>
        <div className={`lvl-chip lvl-${s.level}`}>{levelTxt}</div>
      </div>
      <div className="cw-pillars">
        {['kn', 'cap', 'ls', 'mv'].map(p => (
          <div key={p} className="cw-pillar">
            <MiniRing value={s.pillars[p].avg} color={PILLAR_META[p].color} />
            <div className="cw-pillar-name">{t.pillarLabels[p].slice(0, lang === 'jp' ? 4 : 3)}</div>
          </div>
        ))}
      </div>
      <div className="cw-progress">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${s.completion}%` }} />
        </div>
        <div className="progress-meta">
          <span className="l">{t.progressNow}</span>
          <span className="v">{s.completion.toFixed(0)}% · avg {s.overall.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// DASHBOARD VIEW
// ═══════════════════════════════════════════════════════════════════
function Dashboard({ roster, lang, onOpenCw, onAddCw }) {
  const t = TXT[lang];
  const [filter, setFilter] = useState('ALL');
  const filtered = filter === 'ALL' ? roster : roster.filter(c => c.role === filter);

  // Team stats
  const totalRated = roster.reduce((sum, c) => sum + ((c.scores?.rated) || 0), 0);
  const totalMembers = roster.length;
  const avgOverall = roster.length > 0 ? roster.reduce((sum, c) => sum + ((c.scores?.overall) || 0), 0) / roster.length : 0;
  const inRoleCount = roster.filter(c => (c.scores?.level || 0) >= 1).length;
  const seniorityCount = roster.filter(c => (c.scores?.level || 0) >= 2).length;

  return (
    <div className="fadein">
      <div className="welcome glass">
        <h2>{t.welcomeTitle} <span className="accent">/</span> {t.teamDash}</h2>
        <p>{t.welcomeBody}</p>
      </div>

      <div className="stats-strip">
        <div className="stat-card glass">
          <div className="stat-label">{t.totalMembers}</div>
          <div className="stat-value">{totalMembers}</div>
          <div className="stat-icon"><Users size={32} /></div>
        </div>
        <div className="stat-card glass">
          <div className="stat-label">{t.avgTeam}</div>
          <div className="stat-value">{avgOverall.toFixed(2)}<span className="stat-suffix">/4</span></div>
          <div className="stat-icon"><TrendingUp size={32} /></div>
        </div>
        <div className="stat-card glass">
          <div className="stat-label">{t.statsInRole}</div>
          <div className="stat-value">{inRoleCount}</div>
          <div className="stat-icon"><Target size={32} /></div>
        </div>
        <div className="stat-card glass">
          <div className="stat-label">{t.statsSeniority}</div>
          <div className="stat-value">{seniorityCount}</div>
          <div className="stat-icon"><Award size={32} /></div>
        </div>
      </div>

      <div className="section-head">
        <div className="section-title">
          {t.coworkers} <span className="badge">{filtered.length}</span>
        </div>
        <div className="role-filter">
          <div className={`rf ${filter === 'ALL' ? 'active' : ''}`} onClick={() => setFilter('ALL')}>{t.filterAll}</div>
          {ROLE_KEYS.map(r => (
            <div key={r.key} className={`rf ${filter === r.key ? 'active' : ''}`} onClick={() => setFilter(r.key)}>{r.short}</div>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="cw-empty glass">
          <div className="ico"><Users size={28} /></div>
          <h3>{t.noCoworkers}</h3>
          <p>{lang === 'jp' ? 'コワーカーを追加して、コンピテンスマッピングを始めましょう。' : 'Add coworkers to start mapping their competencies.'}</p>
          <button className="btn btn-primary" onClick={onAddCw}>
            <Plus size={16} /> {t.addFirst}
          </button>
        </div>
      ) : (
        <div className="cw-grid">
          {filtered.map(cw => (
            <CoworkerCard key={cw.id} cw={cw} onOpen={() => onOpenCw(cw.id)} lang={lang} />
          ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// COWORKER DETAIL VIEW (full editor)
// ═══════════════════════════════════════════════════════════════════
function CoworkerDetail({ cw, lang, onBack, onUpdateMeta, onDelete, onScoresChanged }) {
  const t = TXT[lang];
  const [tab, setTab] = useState('ov');
  const [data, setData] = useState({ ratings: {}, notes: {}, devPlan: '', snapshots: [] });
  const [loaded, setLoaded] = useState(false);
  const [saveTag, setSaveTag] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [toast, setToast] = useState(null);
  const role = roleObj(cw.role);

  const saveTimer = useRef(null);

  // Load data on mount
  useEffect(() => {
    let alive = true;
    (async () => {
      const d = await loadCw(cw.id);
      if (alive) {
        setData({ ratings: d.ratings || {}, notes: d.notes || {}, devPlan: d.devPlan || '', snapshots: d.snapshots || [] });
        setLoaded(true);
      }
    })();
    return () => { alive = false; };
  }, [cw.id]);

  const stats = useMemo(() => computeStats(data.ratings, cw.role), [data.ratings, cw.role]);

  // Debounced save
  const scheduleSave = useCallback((next) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      await saveCw(cw.id, next);
      const newStats = computeStats(next.ratings, cw.role);
      const summary = {
        overall: newStats.overall, completion: newStats.completion, rated: newStats.rated,
        level: newStats.level,
        pillars: {
          kn: { avg: newStats.pillars.kn.avg }, cap: { avg: newStats.pillars.cap.avg },
          ls: { avg: newStats.pillars.ls.avg }, mv: { avg: newStats.pillars.mv.avg },
        }
      };
      onScoresChanged(cw.id, summary);
      setSaveTag(true);
      setTimeout(() => setSaveTag(false), 1500);
    }, 400);
  }, [cw.id, cw.role, onScoresChanged]);

  const onRate = (key, val) => {
    setData(prev => {
      const next = { ...prev, ratings: { ...prev.ratings, [key]: val } };
      scheduleSave(next);
      return next;
    });
  };
  const onNote = (key, val) => {
    setData(prev => {
      const next = { ...prev, notes: { ...prev.notes, [key]: val } };
      scheduleSave(next);
      return next;
    });
  };
  const onDevPlan = (val) => {
    setData(prev => {
      const next = { ...prev, devPlan: val };
      scheduleSave(next);
      return next;
    });
  };

  const onSaveSnapshot = () => {
    const snap = {
      date: new Date().toISOString(),
      scores: {
        overall: stats.overall, completion: stats.completion,
        kn: stats.pillars.kn.avg, cap: stats.pillars.cap.avg, ls: stats.pillars.ls.avg, mv: stats.pillars.mv.avg,
      }
    };
    setData(prev => {
      const next = { ...prev, snapshots: [...(prev.snapshots || []), snap] };
      scheduleSave(next);
      return next;
    });
    setToast({ msg: t.snapshotSaved, type: 'ok' });
    setTimeout(() => setToast(null), 2200);
  };

  const onDeleteSnap = (idx) => {
    setData(prev => {
      const next = { ...prev, snapshots: prev.snapshots.filter((_, i) => i !== idx) };
      scheduleSave(next);
      return next;
    });
  };

  // Tab pcts for indicator
  const tabPcts = {
    kn: stats.pillars.kn.pct, cap: stats.pillars.cap.pct,
    ls: stats.pillars.ls.pct, mv: stats.pillars.mv.pct,
  };

  if (!loaded) {
    return (
      <div className="fadein" style={{ padding: 60, textAlign: 'center', color: '#71717a' }}>
        <Sparkles size={20} /> <div style={{ marginTop: 12, fontSize: 13 }}>{lang === 'jp' ? '読み込み中…' : 'Loading…'}</div>
      </div>
    );
  }

  return (
    <div className="fadein">
      <div className="det-head" style={{ '--accent': role.color }}>
        <button className="det-back" onClick={onBack}><ArrowLeft size={14} /> {t.backToDash}</button>
        <div className="det-info">
          <div className="det-avatar">{getInitials(cw.name)}</div>
          <div style={{ minWidth: 0 }}>
            <div className="det-name">{cw.name}</div>
            <div className="det-meta-line">
              <span style={{ color: role.color, fontWeight: 700 }}>{role.short}</span>
              <span className="pip" />
              <span>{cw.dept || '—'}</span>
              {cw.timeInRole && <><span className="pip" /><span>{cw.timeInRole}</span></>}
              {saveTag && <span className="save-tag"><Check size={11} /> {t.autoSaved}</span>}
            </div>
          </div>
        </div>
        <div className="det-actions">
          <button className="btn btn-ghost" onClick={onSaveSnapshot} title={t.saveSnapshot}>
            <Camera size={14} /> {t.snapshot}
          </button>
          <button className="btn btn-ghost" onClick={() => setEditOpen(true)} title={t.editCoworker}>
            <Edit3 size={14} />
          </button>
          <button className="btn btn-danger" onClick={() => setConfirmDel(true)} title={t.delete}>
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className="tab-bar">
        <button className={`tab ${tab === 'ov' ? 'active' : ''}`} onClick={() => setTab('ov')}>
          <BarChart3 size={14} /> {t.overview}
          <span className="tab-pct">{stats.completion.toFixed(0)}%</span>
        </button>
        <button className={`tab ${tab === 'kn' ? 'active' : ''}`} onClick={() => setTab('kn')}>
          <BookOpen size={14} /> {t.knowledge}
          <span className="tab-pct">{tabPcts.kn.toFixed(0)}%</span>
        </button>
        <button className={`tab ${tab === 'cap' ? 'active' : ''}`} onClick={() => setTab('cap')}>
          <Compass size={14} /> {t.capabilities}
          <span className="tab-pct">{tabPcts.cap.toFixed(0)}%</span>
        </button>
        <button className={`tab ${tab === 'ls' ? 'active' : ''}`} onClick={() => setTab('ls')}>
          <Award size={14} /> {t.leadership}
          <span className="tab-pct">{tabPcts.ls.toFixed(0)}%</span>
        </button>
        <button className={`tab ${tab === 'mv' ? 'active' : ''}`} onClick={() => setTab('mv')}>
          <Heart size={14} /> {t.motivation}
          <span className="tab-pct">{tabPcts.mv.toFixed(0)}%</span>
        </button>
        <button className={`tab ${tab === 'hist' ? 'active' : ''}`} onClick={() => setTab('hist')}>
          <HistoryIcon size={14} /> {t.history}
          {data.snapshots.length > 0 && <span className="tab-pct">{data.snapshots.length}</span>}
        </button>
      </div>

      {tab === 'ov' && <OverviewPanel stats={stats} ratings={data.ratings} roleKey={cw.role} lang={lang} devPlan={data.devPlan} onDevPlan={onDevPlan} />}
      {tab === 'kn' && <KnowledgePanel ratings={data.ratings} notes={data.notes} onRate={onRate} onNote={onNote} roleKey={cw.role} lang={lang} />}
      {tab === 'cap' && <CapabilitiesPanel ratings={data.ratings} notes={data.notes} onRate={onRate} onNote={onNote} lang={lang} />}
      {tab === 'ls' && <LeadershipPanel ratings={data.ratings} notes={data.notes} onRate={onRate} onNote={onNote} lang={lang} />}
      {tab === 'mv' && <MotivationPanel ratings={data.ratings} notes={data.notes} onRate={onRate} onNote={onNote} roleKey={cw.role} lang={lang} />}
      {tab === 'hist' && <HistoryPanel snapshots={data.snapshots} onDelete={onDeleteSnap} lang={lang} />}

      <Modal open={editOpen} title={t.editCoworker} onClose={() => setEditOpen(false)}>
        <CoworkerForm
          initial={cw} lang={lang}
          onSubmit={(meta) => { onUpdateMeta(cw.id, meta); setEditOpen(false); }}
          onCancel={() => setEditOpen(false)}
        />
      </Modal>

      <Modal open={confirmDel} title={t.confirmDelete} onClose={() => setConfirmDel(false)}
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setConfirmDel(false)}>{t.cancel}</button>
            <button className="btn btn-danger" onClick={() => { setConfirmDel(false); onDelete(cw.id); }}>
              <Trash2 size={14} /> {t.delete}
            </button>
          </>
        }>
        <div style={{ color: '#a1a1aa', fontSize: 13, lineHeight: 1.6 }}>
          <strong style={{ color: '#fff' }}>{cw.name}</strong> {lang === 'jp' ? 'のすべての評価・メモ・履歴が削除されます。この操作は元に戻せません。' : ' — all ratings, notes, and history will be deleted permanently.'}
        </div>
      </Modal>

      {toast && <Toast msg={toast.msg} type={toast.type} />}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════
function App() {
  const [lang, setLang] = useState('jp');
  const [roster, setRoster] = useState([]);
  const [view, setView] = useState('dash'); // 'dash' | 'cw'
  const [selectedId, setSelectedId] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [ready, setReady] = useState(false);
  const fileRef = useRef(null);
  const menuRef = useRef(null);

  // Click outside to close settings menu
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  // Inject styles once on mount
  useEffect(() => {
    const id = 'foc-styles';
    if (!document.getElementById(id)) {
      const s = document.createElement('style');
      s.id = id;
      s.textContent = STYLES + STYLES_2;
      document.head.appendChild(s);
    }
  }, []);

  // Load on mount
  useEffect(() => {
    (async () => {
      const [r, s] = await Promise.all([loadRoster(), loadSettings()]);
      setRoster(r);
      if (s.lang) setLang(s.lang);
      setReady(true);
    })();
  }, []);

  // Persist lang
  const changeLang = (l) => {
    setLang(l);
    saveSettings({ lang: l });
  };

  // Add new coworker
  const handleAdd = async (meta) => {
    const id = 'cw_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
    const newCw = {
      id, ...meta,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      scores: { overall: 0, completion: 0, rated: 0, level: 0, pillars: { kn: { avg: 0 }, cap: { avg: 0 }, ls: { avg: 0 }, mv: { avg: 0 } } }
    };
    const next = [...roster, newCw];
    setRoster(next);
    await saveRoster(next);
    await saveCw(id, { ratings: {}, notes: {}, devPlan: '', snapshots: [] });
    setAddOpen(false);
    setSelectedId(id);
    setView('cw');
  };

  // Update meta
  const handleUpdateMeta = async (id, meta) => {
    const next = roster.map(c => c.id === id ? { ...c, ...meta, lastUpdated: new Date().toISOString() } : c);
    setRoster(next);
    await saveRoster(next);
  };

  // Update scores from detail view
  const handleScoresChanged = async (id, scoresSummary) => {
    setRoster(prev => {
      const next = prev.map(c => c.id === id ? { ...c, scores: scoresSummary, lastUpdated: new Date().toISOString() } : c);
      saveRoster(next);
      return next;
    });
  };

  // Delete coworker
  const handleDelete = async (id) => {
    const next = roster.filter(c => c.id !== id);
    setRoster(next);
    await saveRoster(next);
    await deleteCw(id);
    setView('dash');
    setSelectedId(null);
    setToast({ msg: lang === 'jp' ? '削除しました' : 'Deleted', type: 'ok' });
    setTimeout(() => setToast(null), 1800);
  };

  // Export all data
  const handleExport = async () => {
    const exp = { version: 1, exportedAt: new Date().toISOString(), lang, roster: [], coworkers: {} };
    exp.roster = roster;
    for (const c of roster) {
      exp.coworkers[c.id] = await loadCw(c.id);
    }
    const json = JSON.stringify(exp, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `foc-team-data-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setMenuOpen(false);
  };

  const handleImportFile = async (file) => {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (!parsed.roster || !Array.isArray(parsed.roster)) throw new Error('Invalid format');
      setRoster(parsed.roster);
      await saveRoster(parsed.roster);
      for (const c of parsed.roster) {
        if (parsed.coworkers && parsed.coworkers[c.id]) {
          await saveCw(c.id, parsed.coworkers[c.id]);
        }
      }
      setToast({ msg: TXT[lang].importOk, type: 'ok' });
    } catch (e) {
      console.error(e);
      setToast({ msg: TXT[lang].importErr, type: 'err' });
    }
    setTimeout(() => setToast(null), 2400);
    setMenuOpen(false);
  };

  const selectedCw = roster.find(c => c.id === selectedId);

  if (!ready) {
    return (
      <div className="foc-root">
        <div className="foc-bg" />
        <div className="foc-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
          <div style={{ color: '#71717a', fontSize: 13, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Sparkles size={16} /> Loading…
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="foc-root">
      <div className="foc-bg" />
      <div className="foc-wrap">
        {/* Top bar */}
        <div className="topbar">
          <div className="brand">
            <div className="brand-mark"><Zap size={20} strokeWidth={2.5} /></div>
            <div className="brand-text">
              <h1>{TXT[lang].appTitle}</h1>
              <div className="sub">FOC · Team Growth Platform</div>
            </div>
          </div>
          <div className="tc-group">
            <div className="lang-pill">
              <button className={lang === 'jp' ? 'active' : ''} onClick={() => changeLang('jp')}>日本語</button>
              <button className={lang === 'en' ? 'active' : ''} onClick={() => changeLang('en')}>EN</button>
            </div>
            {view === 'dash' && roster.length > 0 && (
              <button className="btn btn-primary" onClick={() => setAddOpen(true)}>
                <Plus size={14} /> {TXT[lang].addCoworker}
              </button>
            )}
            <div className="menu-pos">
              <button className="icon-btn" onClick={() => setMenuOpen(!menuOpen)} title={TXT[lang].settings}>
                <Settings size={16} />
              </button>
              {menuOpen && (
                <div className="menu-pop glass" onClick={(e) => e.stopPropagation()}>
                  <button className="menu-item" onClick={handleExport}>
                    <Download size={14} /> {TXT[lang].exportAll}
                  </button>
                  <button className="menu-item" onClick={() => fileRef.current?.click()}>
                    <Upload size={14} /> {TXT[lang].importData}
                  </button>
                  <input ref={fileRef} type="file" accept="application/json" style={{ display: 'none' }}
                    onChange={(e) => { if (e.target.files?.[0]) handleImportFile(e.target.files[0]); e.target.value = ''; }} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main */}
        {view === 'dash' && (
          <Dashboard
            roster={roster} lang={lang}
            onOpenCw={(id) => { setSelectedId(id); setView('cw'); }}
            onAddCw={() => setAddOpen(true)}
          />
        )}
        {view === 'cw' && selectedCw && (
          <CoworkerDetail
            cw={selectedCw} lang={lang}
            onBack={() => { setView('dash'); setSelectedId(null); }}
            onUpdateMeta={handleUpdateMeta}
            onDelete={handleDelete}
            onScoresChanged={handleScoresChanged}
          />
        )}

        {/* Add modal */}
        <Modal open={addOpen} title={TXT[lang].newCoworker} onClose={() => setAddOpen(false)}>
          <CoworkerForm lang={lang} onSubmit={handleAdd} onCancel={() => setAddOpen(false)} />
        </Modal>

        {toast && <Toast msg={toast.msg} type={toast.type} />}
      </div>
    </div>
  );
}

export default App;
