#!/usr/bin/env python3
import re

DOCUMENTS = [
    {"id": "doc-rag", "source": "Doc 01", "title": "RAG Workflow", "text": "RAG gồm retrieval và generation. Retrieval tìm đoạn tài liệu liên quan, generation tạo câu trả lời dựa trên đoạn đó."},
    {"id": "doc-hallucination", "source": "Doc 02", "title": "Hallucination Guard", "text": "Hallucination là khi AI trả lời sai hoặc không có căn cứ. Cần citation, no-answer và evaluation."},
    {"id": "doc-eval", "source": "Doc 03", "title": "Evaluation Set", "text": "Evaluation set gồm câu hỏi kiểm thử, expected source và expected answer để kiểm tra hệ thống."},
]

STOPWORDS = {"la", "gi", "va", "co", "the", "nhu", "nao", "vi", "sao", "mot", "duoc", "trong", "ai"}


def normalize(text):
    text = text.lower()
    text = re.sub(r"[^a-z0-9áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ\s]", " ", text)
    return text


def tokenize(text):
    return [t for t in normalize(text).split() if len(t) > 1 and t not in STOPWORDS]


def retrieve(question):
    tokens = tokenize(question)
    scored = []
    for doc in DOCUMENTS:
        haystack = normalize(doc["title"] + " " + doc["text"])
        score = sum(1 for token in tokens if token in haystack)
        scored.append({**doc, "score": score})
    return [doc for doc in sorted(scored, key=lambda d: d["score"], reverse=True) if doc["score"] > 0][:2]


def answer(question):
    docs = retrieve(question)
    if not docs:
        return "Không đủ dữ liệu trong tài liệu mẫu. Hệ thống không nên đoán bừa.", []
    text = " ".join(doc["text"] for doc in docs)
    sources = ", ".join(f'{doc["source"]}: {doc["title"]}' for doc in docs)
    return f"Dựa trên {sources}: {text}", docs


def main():
    print("Document Q&A Offline - hỏi về RAG, hallucination, evaluation")
    question = input("Câu hỏi: ") if __import__("sys").stdin.isatty() else "RAG giúp giảm hallucination như thế nào?"
    response, sources = answer(question)
    print("\nTrả lời:", response)
    print("\nSources:")
    for source in sources:
        print("-", source["source"], source["title"], "score=", source["score"])


if __name__ == "__main__":
    main()
