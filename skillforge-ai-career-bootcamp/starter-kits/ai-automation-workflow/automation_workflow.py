#!/usr/bin/env python3

def classify_request(text):
    lower = text.lower()
    if "hóa đơn" in lower or "thanh toán" in lower:
        return "billing"
    if "lỗi" in lower or "không chạy" in lower:
        return "technical_support"
    if "tư vấn" in lower or "báo giá" in lower:
        return "sales"
    return "general"


def build_checklist(category):
    templates = {
        "billing": ["Kiểm tra mã khách hàng", "Kiểm tra giao dịch", "Soạn phản hồi thanh toán"],
        "technical_support": ["Hỏi thiết bị/phiên bản", "Yêu cầu ảnh lỗi", "Tạo ticket kỹ thuật"],
        "sales": ["Xác định nhu cầu", "Gửi gói phù hợp", "Đặt lịch tư vấn"],
        "general": ["Đọc nội dung", "Xác định bộ phận phụ trách", "Phản hồi lịch sự"]
    }
    return templates[category]


def draft_reply(category):
    return {
        "billing": "Chúng tôi đã tiếp nhận yêu cầu thanh toán và sẽ kiểm tra giao dịch.",
        "technical_support": "Bạn vui lòng gửi thêm ảnh lỗi và thiết bị đang sử dụng để chúng tôi kiểm tra.",
        "sales": "Cảm ơn bạn đã quan tâm. Chúng tôi sẽ tư vấn gói phù hợp với nhu cầu của bạn.",
        "general": "Chúng tôi đã tiếp nhận thông tin và sẽ phản hồi sớm."
    }[category]


def main():
    text = input("Nhập yêu cầu khách hàng: ") if __import__("sys").stdin.isatty() else "Khách báo lỗi app không chạy và cần hỗ trợ kỹ thuật"
    category = classify_request(text)
    print("Category:", category)
    print("Checklist:")
    for item in build_checklist(category):
        print("-", item)
    print("Draft reply:", draft_reply(category))
    print("Human approval: cần người kiểm tra trước khi gửi.")


if __name__ == "__main__":
    main()
