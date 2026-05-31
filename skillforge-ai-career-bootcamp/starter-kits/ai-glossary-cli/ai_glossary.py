#!/usr/bin/env python3
# AI Glossary CLI - offline starter kit

TERMS = {
    "rag": {
        "easy": "RAG là cách AI tìm tài liệu liên quan trước rồi mới trả lời.",
        "example": "Giống luật sư mở hồ sơ trước khi tư vấn.",
        "interview": "RAG kết hợp retrieval và generation để câu trả lời bám nguồn hơn."
    },
    "embedding": {
        "easy": "Embedding biến chữ thành vector số để so sánh ý nghĩa.",
        "example": "Các câu gần nghĩa nằm gần nhau trên bản đồ ý nghĩa.",
        "interview": "Embedding hỗ trợ tìm kiếm ngữ nghĩa trong hệ thống RAG."
    },
    "hallucination": {
        "easy": "Hallucination là khi AI trả lời nghe hợp lý nhưng sai hoặc không có nguồn.",
        "example": "Một người đoán bừa nhưng nói rất tự tin.",
        "interview": "Giảm hallucination bằng citation, retrieval tốt, no-answer và evaluation."
    }
}


def explain(term: str) -> dict:
    key = term.strip().lower()
    return TERMS.get(key, {
        "easy": "Chưa có thuật ngữ này trong bộ mẫu.",
        "example": "Hãy thêm nó vào TERMS để luyện cấu trúc dữ liệu dictionary.",
        "interview": "Khi chưa biết, hãy nói rõ giới hạn thay vì đoán."
    })


def main():
    print("AI Glossary CLI - nhập thuật ngữ: rag, embedding, hallucination")
    term = input("Thuật ngữ: ") if __import__("sys").stdin.isatty() else "rag"
    result = explain(term)
    print("\nDễ hiểu:", result["easy"])
    print("Ví dụ:", result["example"])
    print("Phỏng vấn:", result["interview"])


if __name__ == "__main__":
    main()
