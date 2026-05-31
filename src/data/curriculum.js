export const author = 'Vũ Hoàng'

export const product = {
  name: 'SkillForge AI: Career Bootcamp',
  promise: 'Bootcamp AI Engineering offline cho người mới: học dễ hiểu, làm code mission thật, lưu evidence, hoàn thành Capstone 2.0 và xuất portfolio để ứng tuyển intern/junior.',
  learningLoop: ['Learn', 'Lab', 'Code', 'Build', 'Explain', 'Portfolio'],
  canApply: ['AI Engineer Intern', 'Junior AI App Builder', 'AI Automation Assistant', 'LLM App Developer Intern', 'Junior AI Solutions Builder'],
  notYet: ['Senior AI Engineer', 'ML Researcher', 'Production ML Engineer chuyên sâu', 'MLOps Engineer chuyên nghiệp'],
  offline: ['Không backend', 'Không đăng nhập', 'Không API AI thật', 'Không database online', 'LocalStorage', 'Build APK bằng Codespace']
}

export const scoreWeights = [
  { id: 'concepts', label: 'AI Concepts', weight: 12, description: 'Hiểu AI, ML, DL, LLM, token, RAG, hallucination, evaluation.' },
  { id: 'pythonData', label: 'Python/Data', weight: 22, description: 'Có code mission Python, CSV, JSON, data cleaning, insight.' },
  { id: 'mlBasics', label: 'ML Basics', weight: 18, description: 'Có project train/test, regression/classification, metric, limitation.' },
  { id: 'llmApps', label: 'LLM/RAG/App', weight: 24, description: 'Có Document Q&A/RAG offline, source citation, no-answer, evaluation.' },
  { id: 'portfolio', label: 'Portfolio/Interview', weight: 24, description: 'Có evidence: GitHub, README, screenshot, CV line, interview defense.' }
]

export const weeklyPlan = [
  { week: 1, title: 'Career Map + AI Foundation', outcome: 'Biết AI Engineer là gì và giải thích được AI/ML/LLM/RAG bằng tiếng người.', deliverable: 'Learning contract + AI concept notes.' },
  { week: 2, title: 'Python Core for AI', outcome: 'Biết biến, hàm, list/dict, file, JSON và debug cơ bản.', deliverable: 'AI Glossary CLI.' },
  { week: 3, title: 'Data Thinking', outcome: 'Biết đọc dữ liệu, làm sạch dữ liệu và rút insight đơn giản.', deliverable: 'CSV Insight Analyzer.' },
  { week: 4, title: 'Machine Learning Basic', outcome: 'Hiểu train/test, prediction, metric, overfitting và limitation.', deliverable: 'ML Predictor Demo.' },
  { week: 5, title: 'LLM Application', outcome: 'Hiểu prompt, context, hallucination, evaluation và RAG workflow.', deliverable: 'Prompt/RAG mini lab.' },
  { week: 6, title: 'Document Q&A Offline', outcome: 'Xây logic retrieval bằng keyword, trả lời có nguồn, no-answer.', deliverable: 'Document Q&A Assistant bản offline.' },
  { week: 7, title: 'AI Automation Workflow', outcome: 'Biến input thô thành checklist, phân loại, báo cáo và phản hồi.', deliverable: 'AI Automation Workflow.' },
  { week: 8, title: 'Portfolio + Interview Defense', outcome: 'Hoàn thiện GitHub, README, CV line, demo và câu trả lời phỏng vấn.', deliverable: 'Capstone report + application kit.' },
  { week: 9, title: 'Upgrade Path', outcome: 'Biết cách nâng offline RAG lên API/vector DB/backend khi sẵn sàng.', deliverable: 'Next-step architecture note.' },
  { week: 10, title: 'Mock Interview', outcome: 'Trả lời được câu hỏi về project, trade-off, lỗi và hướng cải thiện.', deliverable: 'Interview defense script.' },
  { week: 11, title: 'Refactor + polish', outcome: 'Dọn README, ảnh demo, limitation, test cases, code structure.', deliverable: 'Portfolio-ready repos.' },
  { week: 12, title: 'Apply Sprint', outcome: 'Biết chọn vị trí phù hợp và nộp hồ sơ có chiến lược.', deliverable: 'Job application checklist.' }
]

export const moduleBlueprints = [
  {
    id: 'm0-career', number: 0, title: 'Nhập môn nghề AI Engineer', short: 'Career Map', group: 'concepts', outcome: 'Chọn đúng hướng ứng tuyển và hiểu job không ảo tưởng.', color: 'emerald',
    topics: ['AI Engineer là ai?', 'AI App Builder là gì?', 'AI Automation Engineer là gì?', 'LLM Application Developer là gì?', 'ML Engineer khác gì?', 'Người mới nên đi hướng nào?', 'Portfolio hơn chứng chỉ ra sao?', 'Learning Contract: học để làm thật']
  },
  {
    id: 'm1-foundation', number: 1, title: 'Tư duy AI cho người mới', short: 'AI Foundation', group: 'concepts', outcome: 'Giải thích được các khái niệm lõi bằng tiếng người và bằng ngôn ngữ phỏng vấn.', color: 'cyan',
    topics: ['AI, ML, Deep Learning, LLM', 'Model học từ dữ liệu', 'Token và context window', 'Prompt và system prompt', 'Embedding là gì?', 'RAG là gì?', 'Hallucination là gì?', 'Evaluation là gì?', 'Human-in-the-loop', 'Ethics và dữ liệu nhạy cảm', 'Limitations của AI', 'Tư duy debug AI']
  },
  {
    id: 'm2-python', number: 2, title: 'Python for AI', short: 'Python Core', group: 'pythonData', outcome: 'Viết được script nhỏ để xử lý dữ liệu, JSON/CSV và mô phỏng AI workflow.', color: 'amber',
    topics: ['Biến và kiểu dữ liệu', 'Hàm và return', 'List và vòng lặp', 'Dictionary cho JSON', 'Đọc ghi file text', 'Đọc CSV', 'Đọc JSON', 'Tách code thành function', 'Xử lý lỗi try/except', 'Debug bằng print/log', 'CLI input/output', 'HTTP/API là gì?', 'Environment variables', 'Cấu trúc project Python', 'Viết README cho script']
  },
  {
    id: 'm3-data', number: 3, title: 'Data for AI', short: 'Data Thinking', group: 'pythonData', outcome: 'Hiểu dữ liệu trước khi dùng model, biết làm sạch và đánh giá dữ liệu.', color: 'lime',
    topics: ['Dataset là gì?', 'Feature và label', 'Row, column, schema', 'Missing data', 'Duplicate data', 'Outlier là gì?', 'Basic statistics', 'Group by đơn giản', 'Train/test split', 'Data leakage', 'Data quality checklist', 'Viết insight từ dữ liệu']
  },
  {
    id: 'm4-ml', number: 4, title: 'Machine Learning Basic', short: 'ML Basics', group: 'mlBasics', outcome: 'Hiểu cách model học, dự đoán, đánh giá và sai lỗi.', color: 'violet',
    topics: ['Training là gì?', 'Inference là gì?', 'Regression', 'Classification', 'Loss/error', 'Accuracy', 'Precision và recall', 'Overfitting', 'Underfitting', 'Baseline model', 'Model limitation', 'Experiment log', 'So sánh model', 'Khi nào không cần ML?', 'Giải thích model cho người không kỹ thuật']
  },
  {
    id: 'm5-llm', number: 5, title: 'LLM Application Engineering', short: 'LLM Apps', group: 'llmApps', outcome: 'Hiểu cách xây app AI hiện đại bằng prompt, context, retrieval và evaluation.', color: 'sky',
    topics: ['LLM app architecture', 'Prompt instruction rõ ràng', 'System vs user prompt', 'Few-shot examples', 'Context stuffing là gì?', 'Chunking tài liệu', 'Keyword retrieval', 'Vector retrieval concept', 'Source citation', 'No-answer behavior', 'Guardrails cơ bản', 'Evaluation set', 'Faithfulness check', 'Latency/cost thinking', 'Upgrade path từ offline lên API']
  },
  {
    id: 'm6-automation', number: 6, title: 'AI Automation Engineering', short: 'Automation', group: 'llmApps', outcome: 'Dùng AI để xử lý quy trình thật: phân loại, trích xuất, checklist, báo cáo.', color: 'rose',
    topics: ['Workflow thinking', 'Input/output contract', 'Classification task', 'Extraction task', 'Summarization task', 'Checklist generation', 'Report generation', 'Human approval step', 'Error handling trong workflow', 'Audit log', 'Automation limitation', 'Demo workflow cho khách hàng']
  },
  {
    id: 'm7-safety-production', number: 7, title: 'AI Safety & Production Thinking', short: 'Safety + Production', group: 'llmApps', outcome: 'Biết xây AI app có kiểm soát: privacy, prompt injection, evaluation, logging, fallback và human review.', color: 'orange',
    topics: ['AI Safety mindset', 'Data privacy cho người mới', 'Prompt injection là gì?', 'Source trust và citation', 'Human review workflow', 'Evaluation trước khi demo', 'Fallback và no-answer', 'Logging và audit trail', 'Latency/cost thinking', 'Monitoring sau khi deploy', 'Incident response mini-plan', 'Production upgrade checklist']
  },
  {
    id: 'm8-portfolio', number: 8, title: 'Deployment & Portfolio', short: 'Job Ready', group: 'portfolio', outcome: 'Biến project thành bằng chứng ứng tuyển: GitHub, README, demo, CV, phỏng vấn.', color: 'slate',
    topics: ['GitHub repo chuẩn', 'README structure', 'Screenshot và demo video', 'Tech stack viết sao cho đúng', 'Problem statement', 'Limitations và next steps', 'CV line cho project', 'LinkedIn project post', 'Interview defense', 'Mock interview', 'Application checklist', '90-day improvement plan']
  }
]

const slug = (text) => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export const modules = moduleBlueprints.map((m) => ({
  id: m.id,
  number: m.number,
  title: m.title,
  short: m.short,
  group: m.group,
  color: m.color,
  outcome: m.outcome,
  lessonIds: m.topics.map((topic, i) => `${m.id}-${String(i + 1).padStart(2, '0')}-${slug(topic)}`)
}))

export const lessons = moduleBlueprints.flatMap((module) => module.topics.map((topic, index) => {
  const id = `${module.id}-${String(index + 1).padStart(2, '0')}-${slug(topic)}`
  const projectHint = module.group === 'concepts' ? 'AI Glossary App' : module.group === 'pythonData' ? 'CSV Insight Analyzer' : module.group === 'mlBasics' ? 'ML Predictor Demo' : module.group === 'llmApps' ? 'Document Q&A Assistant' : 'Portfolio Kit'
  return {
    id,
    moduleId: module.id,
    title: topic,
    duration: index % 3 === 0 ? '12 phút' : index % 3 === 1 ? '15 phút' : '18 phút',
    level: index < 4 ? 'Beginner' : index < 9 ? 'Practice' : 'Job Ready',
    objective: `Sau bài này, bạn phải giải thích được “${topic}” và dùng nó trong ${projectHint}.`,
    beginner: `${topic} là một mảnh kiến thức nhỏ trong lộ trình AI Engineering. Người mới không cần thuộc lòng ngay; mục tiêu là hiểu nó giải quyết vấn đề gì và nó xuất hiện ở đâu trong project thật.`,
    analogy: `Hãy tưởng tượng bạn đang học nghề bếp. “${topic}” giống một kỹ thuật nhỏ: không phải toàn bộ nghề, nhưng thiếu nó thì bạn khó làm món hoàn chỉnh.`,
    technical: `Ở góc nhìn kỹ thuật, ${topic} cần được hiểu trong quan hệ với dữ liệu đầu vào, logic xử lý, tiêu chí đánh giá và cách trình bày kết quả. Trong project, nó phải tạo ra output có thể kiểm tra được.`,
    mistake: `Sai lầm thường gặp: học khái niệm này như định nghĩa rời rạc, nhưng không biết dùng nó trong code, README hoặc câu trả lời phỏng vấn.`,
    lab: `Mini lab: chọn một ví dụ đời thật, mô tả input, output, lỗi có thể xảy ra và cách kiểm tra kết quả liên quan đến “${topic}”.`,
    codeTask: `Code task: tạo một function nhỏ hoặc pseudo-code thể hiện “${topic}” trong workflow. Ghi lại input, output và 1 test case.`,
    interview: `Câu trả lời phỏng vấn mẫu: “Em hiểu ${topic} không chỉ là lý thuyết. Trong project ${projectHint}, em dùng nó để biến dữ liệu/thông tin đầu vào thành kết quả có thể kiểm tra, có giới hạn và có cách đánh giá.”`,
    portfolio: `Liên hệ portfolio: thêm 1 dòng vào README giải thích project của bạn dùng “${topic}” ở bước nào, vì sao cần và hạn chế hiện tại là gì.`,
    quiz: [
      { q: `Học “${topic}” thế nào là đúng nhất?`, options: ['Hiểu khái niệm + làm ví dụ + biết giải thích trong project', 'Chỉ đọc định nghĩa', 'Chỉ bấm hoàn thành'], answer: 0, why: 'Bootcamp nghề nghiệp cần bằng chứng thực hành, không chỉ đọc hiểu.' },
      { q: `Trong portfolio, bạn nên trình bày “${topic}” ra sao?`, options: ['Nó nằm ở bước nào, input/output là gì, hạn chế gì', 'Không cần nói', 'Chỉ ghi thuật ngữ cho oai'], answer: 0, why: 'Nhà tuyển dụng cần thấy bạn hiểu vai trò kỹ thuật và giới hạn của nó.' }
    ]
  }
}))

export const terms = [
  ['AI', 'Hệ thống giúp máy thực hiện việc thường cần trí thông minh con người.', 'Như trợ lý biết phân loại, tóm tắt, gợi ý.', 'AI là lĩnh vực rộng gồm ML, symbolic AI, optimization và GenAI.', 'AI không tự đúng; phải kiểm tra dữ liệu, nguồn và ngữ cảnh.'],
  ['Machine Learning', 'Cách cho máy học pattern từ dữ liệu.', 'Cho máy xem nhiều ví dụ nhà và giá để dự đoán giá mới.', 'ML tối ưu hàm dự đoán từ feature sang label dựa trên dữ liệu huấn luyện.', 'Không có dữ liệu tốt thì model khó tốt.'],
  ['Deep Learning', 'Machine Learning dùng mạng nơ-ron nhiều lớp.', 'Giống bộ lọc nhiều tầng để nhận ra đặc điểm trong ảnh/văn bản.', 'Deep learning sử dụng neural networks để học representation phức tạp.', 'Không phải bài toán nào cũng cần deep learning.'],
  ['LLM', 'Mô hình ngôn ngữ lớn có thể hiểu và sinh văn bản.', 'Như người đọc rất nhiều sách và biết viết câu trả lời.', 'LLM thường dựa trên transformer và dự đoán token tiếp theo theo ngữ cảnh.', 'LLM có thể hallucinate nếu thiếu nguồn hoặc prompt kém.'],
  ['Token', 'Mảnh nhỏ của câu chữ mà model xử lý.', 'Cắt câu thành các mảnh để máy đọc.', 'Token là đơn vị input/output của LLM, ảnh hưởng context và chi phí.', 'Không thể nhét vô hạn tài liệu vào prompt.'],
  ['Context Window', 'Lượng nội dung model có thể nhìn trong một lần trả lời.', 'Như bàn làm việc chỉ để được vài tờ giấy.', 'Context window giới hạn tổng token prompt + output.', 'Tài liệu dài cần chunk/retrieval.'],
  ['Embedding', 'Biến chữ thành vector số để so sánh ý nghĩa.', 'Câu gần nghĩa nằm gần nhau trên bản đồ.', 'Embedding biểu diễn ngữ nghĩa trong không gian vector.', 'Embedding không tự trả lời; nó hỗ trợ retrieval.'],
  ['RAG', 'AI tìm tài liệu liên quan trước rồi mới trả lời.', 'Luật sư mở hồ sơ trước khi tư vấn.', 'Retrieval-Augmented Generation kết hợp retrieval + generation.', 'RAG giảm hallucination nhưng không đảm bảo đúng 100%.'],
  ['Chunking', 'Chia tài liệu dài thành đoạn nhỏ.', 'Cắt sách thành trang để dễ tìm.', 'Chunking giúp retrieval chọn đoạn liên quan trong giới hạn context.', 'Chunk quá dài hoặc quá ngắn đều có vấn đề.'],
  ['Retrieval', 'Tìm thông tin liên quan đến câu hỏi.', 'Tìm đúng trang trong hồ sơ.', 'Retrieval có thể dùng keyword, embedding hoặc hybrid search.', 'Retrieval sai thì câu trả lời dễ sai.'],
  ['Citation', 'Nguồn mà câu trả lời dựa vào.', 'Trả lời kèm “xem trang nào”.', 'Citation giúp kiểm chứng và audit câu trả lời AI.', 'Không có nguồn thì khó tin.'],
  ['Hallucination', 'AI trả lời nghe hợp lý nhưng sai hoặc không có nguồn.', 'Một người đoán bừa nhưng nói rất tự tin.', 'Hallucination xảy ra do thiếu context, prompt kém, model bias hoặc retrieval sai.', 'Cần no-answer, citation, evaluation.'],
  ['Evaluation', 'Kiểm tra AI trả lời tốt hay không.', 'Chấm bài bằng đáp án mẫu.', 'Evaluation gồm test set, expected answer, source match, faithfulness.', 'Không eval thì không biết app có dùng được không.'],
  ['API', 'Cách phần mềm nói chuyện với phần mềm khác.', 'Như gọi món qua menu rõ ràng.', 'API định nghĩa request/response giữa client và service.', 'API key cần bảo mật, không hard-code public.'],
  ['Dataset', 'Bộ dữ liệu dùng để học hoặc kiểm thử.', 'Bảng danh sách nhà, diện tích, giá.', 'Dataset có schema, rows, features, labels và quality issues.', 'Dataset bẩn làm model sai.'],
  ['Feature', 'Thông tin đầu vào để model dự đoán.', 'Diện tích, số phòng, vị trí.', 'Feature là biến mô tả sample.', 'Feature kém thì prediction kém.'],
  ['Label', 'Đáp án đúng dùng để train/evaluate.', 'Giá nhà thật trong dữ liệu.', 'Label là target trong supervised learning.', 'Label sai gây học sai.'],
  ['Training', 'Quá trình cho model học từ dữ liệu.', 'Luyện tập nhiều ví dụ.', 'Training tối ưu tham số để giảm loss trên data.', 'Training không đồng nghĩa model đã tốt ngoài đời.'],
  ['Inference', 'Dùng model đã học để dự đoán input mới.', 'Thi xong rồi áp dụng kiến thức.', 'Inference là serving/prediction phase.', 'Inference cần latency, cost, monitoring.'],
  ['MLOps', 'Quy trình đưa ML vào vận hành bền vững.', 'Không chỉ nấu món, còn phải mở nhà hàng vận hành ổn.', 'MLOps gồm pipeline, versioning, deployment, monitoring, retraining.', 'Junior chưa cần sâu nhưng phải biết khái niệm.']
].map(([term, simple, analogy, technical, mistake]) => ({ id: slug(term), term, simple, analogy, technical, interview: `${term} là khái niệm em hiểu qua ví dụ và đã liên hệ vào project. Em luôn nói rõ input, output, giới hạn và cách kiểm tra.`, mistake }))

export const labs = [
  { id: 'lab-token', type: 'Visual Lab', title: 'Token & Context Demo', goal: 'Thấy vì sao tài liệu dài cần chia nhỏ.', scenario: 'Một tài liệu quá dài không thể đưa hết vào prompt.', steps: ['Tách câu thành token giả lập', 'Tính số token ước lượng', 'Chọn đoạn liên quan thay vì nhét toàn bộ'], reflection: 'Context là tài nguyên giới hạn; RAG giúp chọn đúng phần cần đọc.' },
  { id: 'lab-retrieval', type: 'RAG Lab', title: 'Keyword Retrieval Offline', goal: 'Hiểu retrieval trước khi học vector database.', scenario: 'Người dùng hỏi về hallucination, hệ thống phải tìm đoạn tài liệu liên quan.', steps: ['Chuẩn hóa câu hỏi', 'Loại stopwords', 'Chấm điểm tài liệu theo keyword', 'Trả lời kèm nguồn'], reflection: 'Keyword retrieval đơn giản nhưng đủ để hiểu tư duy RAG.' },
  { id: 'lab-no-answer', type: 'Safety Lab', title: 'No-answer Behavior', goal: 'Dạy AI không đoán bừa khi thiếu dữ liệu.', scenario: 'Tài liệu không nói về câu hỏi của người dùng.', steps: ['Kiểm tra điểm retrieval', 'Nếu điểm thấp, trả lời không đủ dữ liệu', 'Gợi ý người dùng bổ sung tài liệu'], reflection: 'Không trả lời bừa là một năng lực sản phẩm AI quan trọng.' },
  { id: 'lab-ml-split', type: 'ML Lab', title: 'Train/Test Split', goal: 'Hiểu vì sao cần dữ liệu kiểm thử.', scenario: 'Model học thuộc dữ liệu train nhưng sai khi gặp dữ liệu mới.', steps: ['Chia dữ liệu train/test', 'Train trên một phần', 'Đánh giá trên phần chưa thấy'], reflection: 'Không test riêng thì dễ tưởng model tốt hơn thực tế.' },
  { id: 'lab-eval', type: 'Evaluation Lab', title: 'Faithfulness Check', goal: 'Kiểm tra câu trả lời có bám nguồn không.', scenario: 'Chatbot trả lời thêm chi tiết không có trong tài liệu.', steps: ['So câu trả lời với nguồn', 'Gạch chân phần không có căn cứ', 'Sửa lại chỉ dựa trên nguồn'], reflection: 'Faithfulness giúp giảm hallucination trong ứng dụng tài liệu.' }
]

export const codeMissions = [
  { id: 'mission-glossary-cli', moduleId: 'm2-python', title: 'AI Glossary CLI', level: 'Beginner', folder: 'starter-kits/ai-glossary-cli', objective: 'Viết CLI nhập thuật ngữ AI và trả về giải thích dễ hiểu, ví dụ, phỏng vấn.', files: ['ai_glossary.py', 'README.md'], checks: ['Chạy được bằng python ai_glossary.py', 'Có ít nhất 8 thuật ngữ', 'Có README', 'Có 1 screenshot terminal'] },
  { id: 'mission-csv-analyzer', moduleId: 'm3-data', title: 'CSV Insight Analyzer', level: 'Practice', folder: 'starter-kits/csv-insight-analyzer', objective: 'Đọc CSV doanh thu và tạo báo cáo insight.', files: ['sales.csv', 'analyzer.py', 'README.md'], checks: ['Đọc được CSV', 'Tính doanh thu/chi phí/lợi nhuận', 'Tìm ngày tốt nhất', 'Có output mẫu'] },
  { id: 'mission-ml-predictor', moduleId: 'm4-ml', title: 'ML Predictor Demo', level: 'Practice', folder: 'starter-kits/ml-predictor-demo', objective: 'Mô phỏng regression không cần thư viện nặng, hiểu train/test và error.', files: ['train_model.py', 'README.md'], checks: ['Có dữ liệu mẫu', 'Có train/test split', 'Có prediction', 'Có MAE/error'] },
  { id: 'mission-document-qa', moduleId: 'm5-llm', title: 'Document Q&A Offline', level: 'Job Track', folder: 'starter-kits/document-qa-offline', objective: 'Mô phỏng RAG bằng keyword retrieval, trả lời có nguồn và no-answer.', files: ['document_qa.py', 'README.md'], checks: ['Có tài liệu local', 'Có retrieval score', 'Có sources', 'Có no-answer case', 'Có test questions'] },
  { id: 'mission-automation', moduleId: 'm6-automation', title: 'AI Automation Workflow', level: 'Job Track', folder: 'starter-kits/ai-automation-workflow', objective: 'Phân loại yêu cầu khách hàng, tạo checklist và phản hồi mẫu.', files: ['automation_workflow.py', 'README.md'], checks: ['Có classifier rule-based', 'Có extraction cơ bản', 'Có checklist', 'Có human approval step'] }
]

export const projects = [
  { id: 'ai-glossary-app', title: 'AI Glossary App', level: 'Beginner', missionId: 'mission-glossary-cli', focus: 'Giải thích thuật ngữ AI cho người mới.', evidence: ['GitHub repo', 'README', 'Screenshot', '10 thuật ngữ', 'CV line'], interview: ['Vì sao app này hữu ích cho người mới?', 'Bạn tổ chức dữ liệu thuật ngữ thế nào?', 'Bạn sẽ nâng cấp app ra sao?'] },
  { id: 'data-insight-dashboard', title: 'Data Insight Dashboard', level: 'Practice', missionId: 'mission-csv-analyzer', focus: 'Phân tích dữ liệu bán hàng mẫu.', evidence: ['sales.csv', 'script analyzer', 'summary output', 'README', 'insight section'], interview: ['Feature là gì trong project này?', 'Bạn xử lý dữ liệu thiếu thế nào?', 'Insight nào quan trọng nhất?'] },
  { id: 'ml-predictor-demo', title: 'ML Predictor Demo', level: 'Practice', missionId: 'mission-ml-predictor', focus: 'Mô phỏng model dự đoán, train/test, metric.', evidence: ['dataset mẫu', 'train/test split', 'prediction output', 'metric', 'limitation'], interview: ['Regression là gì?', 'Vì sao cần test set?', 'Model này hạn chế gì?'] },
  { id: 'rag-document-assistant', title: 'RAG Document Assistant', level: 'Job Track', missionId: 'mission-document-qa', focus: 'Hỏi đáp tài liệu có nguồn.', evidence: ['documents local', 'retrieval logic', 'answer with sources', 'no-answer case', 'evaluation checklist'], interview: ['RAG khác chatbot thường ở đâu?', 'Retrieval sai thì chuyện gì xảy ra?', 'Bạn giảm hallucination thế nào?'] },
  { id: 'ai-automation-workflow', title: 'AI Automation Workflow', level: 'Job Track', missionId: 'mission-automation', focus: 'Tự động hóa phân loại, checklist, báo cáo.', evidence: ['workflow input/output', 'classification', 'checklist', 'human approval', 'README'], interview: ['Workflow này giải quyết vấn đề gì?', 'Khi nào cần human approval?', 'Bạn đo chất lượng automation ra sao?'] },
  { id: 'capstone-document-qa-assistant', title: 'AI Career Capstone: Document Q&A Assistant', level: 'Capstone', missionId: 'mission-document-qa', focus: 'Project cuối: Document Q&A có nguồn, test set, rubric 100 điểm, portfolio kit.', evidence: ['UI hoặc CLI demo', '5 tài liệu mẫu', '10 test questions', 'retrieval score', 'faithfulness/no-answer', 'README', 'CV line', 'interview defense'], interview: ['Hãy giải thích kiến trúc project của bạn.', 'Làm sao biết câu trả lời đúng nguồn?', 'Nếu nâng lên bản thật, bạn dùng API/vector DB thế nào?'] }
]

export const proofSteps = [
  { id: 'learn', label: 'Learn', description: 'Hoàn thành bài nền liên quan.' },
  { id: 'lab', label: 'Lab', description: 'Chạy lab/mô phỏng liên quan.' },
  { id: 'code', label: 'Code', description: 'Hoàn thành code mission hoặc starter kit.' },
  { id: 'build', label: 'Build', description: 'Có deliverables chạy được.' },
  { id: 'explain', label: 'Explain', description: 'Trả lời được câu hỏi phỏng vấn.' },
  { id: 'portfolio', label: 'Portfolio', description: 'Có GitHub/README/CV line/screenshot.' }
]

export const capstoneDocuments = [
  { id: 'doc-rag', title: 'RAG Workflow', source: 'Bootcamp Doc 01', text: 'RAG gồm retrieval và generation. Retrieval tìm đoạn tài liệu liên quan, generation tạo câu trả lời dựa trên đoạn đó. RAG giúp câu trả lời bám nguồn hơn nhưng vẫn cần evaluation.' },
  { id: 'doc-hallucination', title: 'Hallucination Guard', source: 'Bootcamp Doc 02', text: 'Hallucination là khi AI trả lời sai hoặc không có căn cứ. Một ứng dụng tốt cần citation, no-answer behavior, test questions và human review.' },
  { id: 'doc-eval', title: 'Evaluation Set', source: 'Bootcamp Doc 03', text: 'Evaluation set gồm câu hỏi kiểm thử, expected source và expected answer. Nó giúp kiểm tra retrieval, faithfulness và độ hữu ích của câu trả lời.' },
  { id: 'doc-chunking', title: 'Chunking Strategy', source: 'Bootcamp Doc 04', text: 'Tài liệu dài cần chia thành chunk để retrieval dễ tìm đúng phần liên quan. Chunk quá dài làm loãng thông tin, chunk quá ngắn mất ngữ cảnh.' },
  { id: 'doc-portfolio', title: 'Portfolio Evidence', source: 'Bootcamp Doc 05', text: 'Project ứng tuyển cần README, ảnh demo, cách chạy, tech stack, limitation, next steps và câu trả lời phỏng vấn về kiến trúc.' },
  { id: 'doc-no-answer', title: 'No-answer Rule', source: 'Bootcamp Doc 06', text: 'Nếu tài liệu không chứa thông tin, hệ thống nên nói không đủ dữ liệu thay vì đoán. Đây là nguyên tắc quan trọng khi xây trợ lý tài liệu.' }
]

export const capstoneTestSet = [
  { q: 'RAG gồm những bước nào?', expectedSource: 'doc-rag', expectedKeywords: ['retrieval', 'generation'] },
  { q: 'Làm sao giảm hallucination?', expectedSource: 'doc-hallucination', expectedKeywords: ['citation', 'no-answer', 'evaluation'] },
  { q: 'Evaluation set dùng để làm gì?', expectedSource: 'doc-eval', expectedKeywords: ['expected source', 'expected answer', 'faithfulness'] },
  { q: 'Vì sao cần chunking?', expectedSource: 'doc-chunking', expectedKeywords: ['chunk', 'ngữ cảnh'] },
  { q: 'Portfolio cần bằng chứng gì?', expectedSource: 'doc-portfolio', expectedKeywords: ['README', 'demo', 'limitation'] },
  { q: 'Khi không có dữ liệu thì chatbot nên làm gì?', expectedSource: 'doc-no-answer', expectedKeywords: ['không đủ dữ liệu', 'không đoán'] },
  { q: 'RAG có đảm bảo đúng 100% không?', expectedSource: 'doc-rag', expectedKeywords: ['evaluation', 'không'] },
  { q: 'Nếu retrieval lấy sai đoạn thì sao?', expectedSource: 'doc-rag', expectedKeywords: ['retrieval', 'liên quan'] },
  { q: 'README nên nói về hạn chế không?', expectedSource: 'doc-portfolio', expectedKeywords: ['limitation', 'next steps'] },
  { q: 'No-answer behavior là gì?', expectedSource: 'doc-no-answer', expectedKeywords: ['không đủ dữ liệu', 'đoán'] }
]

export const capstoneRubric = [
  { id: 'problem', label: 'Hiểu bài toán Document Q&A', points: 10 },
  { id: 'documents', label: 'Có tài liệu mẫu và chunk/source rõ ràng', points: 10 },
  { id: 'retrieval', label: 'Có retrieval logic và retrieval score', points: 15 },
  { id: 'grounded', label: 'Câu trả lời bám nguồn và có citation', points: 20 },
  { id: 'noanswer', label: 'Có no-answer khi thiếu dữ liệu', points: 10 },
  { id: 'eval', label: 'Có test set, expected source/answer và evaluation checklist', points: 15 },
  { id: 'portfolio', label: 'README, screenshot, CV line, limitation, next steps', points: 15 },
  { id: 'defense', label: 'Trả lời phỏng vấn/defense được', points: 5 }
]

export const quests = [
  { id: 'quest-career', title: 'Quest 01: Chọn hướng nghề thật', task: 'Chọn một vị trí mục tiêu và viết lý do trong 3 dòng.', reward: '+Career Clarity' },
  { id: 'quest-python', title: 'Quest 02: Viết script đầu tiên', task: 'Chạy AI Glossary CLI và chụp screenshot output.', reward: '+Python Evidence' },
  { id: 'quest-data', title: 'Quest 03: Tìm insight từ CSV', task: 'Tính doanh thu, chi phí, lợi nhuận và viết 1 insight.', reward: '+Data Sense' },
  { id: 'quest-rag', title: 'Quest 04: Bắt AI không đoán bừa', task: 'Test Document Q&A với câu hỏi không có trong tài liệu.', reward: '+RAG Safety' },
  { id: 'quest-portfolio', title: 'Quest 05: Portfolio Gate', task: 'Tạo README cho ít nhất 1 project.', reward: '+Job Ready' }
]

export const dailyChallenges = [
  { id: 'daily-rag-coffee', title: 'Giải thích RAG cho chủ quán cà phê', time: '4 phút', task: 'Viết 3 câu thật dễ hiểu, không dùng thuật ngữ khó.' },
  { id: 'daily-bad-answer', title: 'Tìm lỗi câu trả lời AI', time: '5 phút', task: 'Câu trả lời có phần không nằm trong nguồn. Hãy gạch ra phần bịa.' },
  { id: 'daily-cv-line', title: 'Viết CV line', time: '3 phút', task: 'Viết 1 dòng CV cho Document Q&A Assistant.' },
  { id: 'daily-debug', title: 'Debug retrieval sai', time: '5 phút', task: 'Nếu câu hỏi về hallucination nhưng retrieval lấy tài liệu portfolio, nguyên nhân có thể là gì?' }
]

export const bossBattles = [
  { id: 'boss-hallucination', title: 'Boss Hallucination', prompt: 'AI trả lời rất tự tin nhưng không có nguồn. Bạn làm gì?', answer: 'Yêu cầu nguồn, kiểm tra retrieval, nếu thiếu dữ liệu thì trả lời no-answer.' },
  { id: 'boss-overfitting', title: 'Boss Overfitting', prompt: 'Model đúng 100% trên train nhưng sai trên dữ liệu mới. Vì sao?', answer: 'Có thể model học thuộc train data; cần test set, validation và baseline.' },
  { id: 'boss-bad-readme', title: 'Boss Bad README', prompt: 'Repo có code nhưng README chỉ ghi “AI app”. Sai ở đâu?', answer: 'Thiếu problem, feature, cách chạy, demo, limitation, next steps.' },
  { id: 'boss-broken-rag', title: 'Boss Broken RAG', prompt: 'Chatbot trả lời sai dù có tài liệu đúng. Debug từ đâu?', answer: 'Kiểm tra chunking, retrieval score, prompt, context và faithfulness.' }
]

export const detectiveCases = [
  { id: 'detective-no-source', title: 'Case: Câu trả lời không có nguồn', symptoms: ['Trả lời dài', 'Không có citation', 'Không biết lấy từ document nào'], suspects: ['Prompt thiếu yêu cầu citation', 'Retrieval không trả source', 'AI tự suy diễn'], fix: 'Bắt buộc answer phải map với source id và nếu không có source thì no-answer.' },
  { id: 'detective-wrong-doc', title: 'Case: Retrieval lấy sai tài liệu', symptoms: ['Câu hỏi về RAG', 'Nguồn lại là portfolio', 'Answer lệch chủ đề'], suspects: ['Keyword quá yếu', 'Stopwords chưa lọc', 'Chunk không chứa từ khóa quan trọng'], fix: 'Cải thiện tokenize, keyword weight hoặc chuyển sang embedding/hybrid search ở bản nâng cấp.' },
  { id: 'detective-user-trust', title: 'Case: Người dùng không tin chatbot', symptoms: ['Không rõ nguồn', 'Không có limitation', 'Không có test case'], suspects: ['README yếu', 'UI thiếu source', 'Không có evaluation report'], fix: 'Thêm source panel, test set, score và phần limitation.' }
]

export const mistakeMuseum = [
  { id: 'mistake-quiz-only', title: 'Tưởng quiz là đủ', lesson: 'Quiz chỉ kiểm tra nhận biết. Job-ready cần code, project, evidence và giải thích.' },
  { id: 'mistake-no-readme', title: 'Có code nhưng không có README', lesson: 'Không có README thì nhà tuyển dụng khó hiểu bạn làm gì.' },
  { id: 'mistake-rag-magic', title: 'Tưởng RAG là phép màu', lesson: 'RAG vẫn sai nếu retrieval, chunking hoặc nguồn dữ liệu sai.' },
  { id: 'mistake-no-eval', title: 'Không có evaluation', lesson: 'Không test thì không biết app tốt hay chỉ nhìn có vẻ hay.' },
  { id: 'mistake-overclaim', title: 'Hứa quá mức', lesson: 'Portfolio tốt phải nói rõ giới hạn hiện tại và hướng nâng cấp.' }
]

export const skillTree = [
  { group: 'AI Concepts', skills: ['AI/ML/DL/LLM', 'Token/Context', 'RAG', 'Hallucination', 'Evaluation'] },
  { group: 'Python/Data', skills: ['Function', 'List/Dict', 'CSV/JSON', 'Debug', 'Insight'] },
  { group: 'ML Basics', skills: ['Train/Test', 'Regression', 'Classification', 'Metric', 'Overfitting'] },
  { group: 'LLM Apps', skills: ['Prompt', 'Chunking', 'Retrieval', 'Citation', 'No-answer'] },
  { group: 'Portfolio', skills: ['GitHub', 'README', 'Screenshot', 'CV line', 'Interview Defense'] }
]


export const placementQuestions = [
  { id: 'pq1', q: 'Bạn có từng viết Python function chưa?', options: ['Chưa', 'Có xem qua', 'Có tự viết được'], scores: [0, 1, 2] },
  { id: 'pq2', q: 'Bạn có biết CSV/JSON dùng để làm gì không?', options: ['Chưa biết', 'Biết sơ', 'Biết dùng trong code'], scores: [0, 1, 2] },
  { id: 'pq3', q: 'Bạn có giải thích được RAG không?', options: ['Chưa', 'Giải thích đơn giản', 'Giải thích được retrieval + generation'], scores: [0, 1, 2] },
  { id: 'pq4', q: 'Bạn đã có repo GitHub project nào chưa?', options: ['Chưa', 'Có nhưng sơ sài', 'Có README/demo rõ'], scores: [0, 1, 2] },
  { id: 'pq5', q: 'Bạn muốn ứng tuyển hướng nào trước?', options: ['AI App Builder', 'AI Automation', 'LLM App Developer', 'ML Foundation'], scores: [1, 1, 1, 1] }
]

export const careerTracks = [
  { id: 'track-app-builder', title: 'AI App Builder', bestFor: 'Người mới muốn build app AI có UI, workflow rõ và demo được nhanh.', focus: ['LLM basics', 'RAG offline', 'React UI', 'README', 'Capstone'], targetRoles: ['Junior AI App Builder', 'AI Solutions Builder Intern'], mustShip: ['Document Q&A Assistant', 'Portfolio Export Pack'] },
  { id: 'track-automation', title: 'AI Automation Assistant', bestFor: 'Người muốn làm workflow cho khách hàng/doanh nghiệp nhỏ.', focus: ['Input/output contract', 'classification', 'extraction', 'report generation', 'human approval'], targetRoles: ['AI Automation Assistant', 'AI Workflow Builder'], mustShip: ['AI Automation Workflow', 'Evidence Vault'] },
  { id: 'track-llm-dev', title: 'LLM Application Developer Intern', bestFor: 'Người muốn đi sâu chatbot, RAG, evaluation và app có nguồn.', focus: ['Prompt', 'chunking', 'retrieval', 'source citation', 'evaluation'], targetRoles: ['LLM App Developer Intern', 'RAG Assistant Builder'], mustShip: ['Document Q&A 2.0', 'Capstone Evaluation Report'] },
  { id: 'track-ml-foundation', title: 'ML Engineer Foundation', bestFor: 'Người muốn xây nền Python/Data/ML trước khi học production ML sâu hơn.', focus: ['Python', 'data cleaning', 'train/test', 'metrics', 'limitations'], targetRoles: ['AI/ML Intern Foundation', 'Data/AI Assistant'], mustShip: ['CSV Analyzer', 'ML Predictor Demo'] }
]

export const evidenceTypes = [
  { id: 'github', label: 'GitHub repo', placeholder: 'https://github.com/username/project-name', weight: 25 },
  { id: 'readme', label: 'README summary', placeholder: 'Dán phần problem/features/how-to-run/limitations...', weight: 18 },
  { id: 'screenshot', label: 'Screenshot/demo note', placeholder: 'Ghi ảnh demo hoặc đường dẫn ảnh trong repo...', weight: 15 },
  { id: 'terminal', label: 'Terminal output', placeholder: 'Dán kết quả chạy code mission...', weight: 12 },
  { id: 'cv', label: 'CV bullet', placeholder: 'Built an offline Document Q&A Assistant...', weight: 15 },
  { id: 'defense', label: 'Interview defense', placeholder: 'Problem → Approach → Result → Limitation → Next step', weight: 15 }
]

export const productionLabs = [
  { id: 'prod-debug-wrong-answer', title: 'Debug chatbot trả lời sai', scenario: 'User hỏi đúng chủ đề nhưng answer sai nguồn.', decisionTree: ['Kiểm tra câu hỏi có nằm trong scope không', 'Kiểm tra retrieval lấy đúng chunk chưa', 'Kiểm tra prompt có ép citation/no-answer không', 'Kiểm tra answer có thêm thông tin ngoài source không'], output: 'Viết incident note 5 dòng: nguyên nhân, cách sửa, test lại.' },
  { id: 'prod-privacy-check', title: 'Privacy check trước khi dùng AI', scenario: 'Khách gửi tài liệu có số điện thoại, email, hợp đồng.', decisionTree: ['Phân loại dữ liệu nhạy cảm', 'Ẩn thông tin cá nhân nếu không cần', 'Không gửi data thật vào API trong MVP offline', 'Ghi limitation trong README'], output: 'Tạo privacy checklist cho project.' },
  { id: 'prod-eval-gate', title: 'Evaluation gate trước khi demo', scenario: 'Capstone chạy được nhưng chưa biết đúng hay sai.', decisionTree: ['Tạo 10 test questions', 'Đặt expected source', 'Chạy no-answer test', 'Ghi retrieval/faithfulness score'], output: 'Tạo bảng evaluation report cho GitHub.' }
]

export const spacedReviewCards = [
  { id: 'sr-rag', topic: 'RAG', front: 'RAG gồm mấy bước chính?', back: 'Retrieval tìm nguồn liên quan; generation tạo câu trả lời dựa trên nguồn đó.' },
  { id: 'sr-hallucination', topic: 'Hallucination', front: 'AI trả lời tự tin nhưng không có nguồn là gì?', back: 'Hallucination. Cần citation, no-answer, evaluation và human review.' },
  { id: 'sr-train-test', topic: 'Train/Test', front: 'Vì sao cần test set?', back: 'Để kiểm tra model trên dữ liệu chưa thấy, tránh tưởng model tốt vì học thuộc train data.' },
  { id: 'sr-readme', topic: 'README', front: 'README portfolio cần có gì?', back: 'Problem, features, tech stack, how to run, screenshots, limitations, next steps.' },
  { id: 'sr-evidence', topic: 'Evidence', front: 'Tại sao “tôi đã học” chưa đủ?', back: 'Vì tuyển dụng cần bằng chứng: repo, code output, README, screenshot, CV line, interview defense.' }
]

export const portfolioExportPack = [
  'GitHub README chuẩn cho từng project',
  'CV bullets cho 5 project + capstone',
  'LinkedIn project post tiếng Việt/Anh',
  'Interview defense script theo project',
  'Capstone evaluation report',
  '90-day improvement plan sau MVP'
]

export const sprintReviewQuestions = [
  'Tuần này bạn đã tạo được output gì có thể show lên GitHub?',
  'Bạn đã gặp lỗi gì và debug như thế nào?',
  'Bạn có thể giải thích project trong 60 giây không?',
  'README của bạn đã có limitation và next steps chưa?',
  'Tuần sau bạn sẽ nâng bằng chứng nào trước?'
]

export const interviewBank = [
  'AI Engineer khác người dùng ChatGPT ở đâu?',
  'Hãy giải thích project Document Q&A Assistant của bạn.',
  'RAG gồm những bước nào?',
  'Embedding dùng để làm gì?',
  'Nếu chatbot trả lời sai, bạn debug từ đâu?',
  'Vì sao cần no-answer behavior?',
  'Bạn đánh giá chất lượng AI app như thế nào?',
  'Train/test split là gì?',
  'Overfitting là gì?',
  'README tốt cần có gì?',
  'Project của bạn có hạn chế gì?',
  'Nếu nâng từ offline lên bản thật, bạn sẽ thêm gì?'
]

export const novaLines = [
  'Đừng học để bấm hoàn thành. Học để tạo bằng chứng có thể show lên GitHub.',
  'Người mới không cần hiểu hết mọi thứ ngay. Nhưng mỗi tuần phải có output thật.',
  'Một câu trả lời AI không có nguồn là một rủi ro sản phẩm, không phải tính năng hay.',
  'README tốt là cách bạn nói chuyện với nhà tuyển dụng khi bạn chưa có mặt ở đó.',
  'Nếu bạn giải thích được project bằng ngôn ngữ đơn giản, bạn đã tiến gần hơn đến phỏng vấn thật.'
]
