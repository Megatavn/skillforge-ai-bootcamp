# Document Q&A Offline

## Mục tiêu
Mô phỏng RAG offline: tài liệu local → keyword retrieval → trả lời có nguồn → no-answer.

## Chạy
```bash
python document_qa.py
```

## Test questions
- RAG gồm những bước nào?
- Làm sao giảm hallucination?
- Evaluation set dùng để làm gì?
- Chatbot có biết thời tiết hôm nay không? `=> phải no-answer`

## Next steps
- Thay keyword retrieval bằng embedding/vector database
- Thêm UI React
- Thêm evaluation report
