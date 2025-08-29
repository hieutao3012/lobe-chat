# 9. Constraints & Assumptions

## Constraints
- **Budget:** Không có ngân sách, phát triển nội bộ
- **Timeline:** Mục tiêu hoàn thành MVP trong 4 tuần
- **Resources:** 1 developer
- **Technical:** Phụ thuộc vào chất lượng và cấu trúc của file `places.json`

## Key Assumptions
- File `places.json` có cấu trúc nhất quán và dữ liệu là tương đối đầy đủ cho ít nhất 3-5 danh mục chính
- Người dùng sẽ tương tác với AI thông qua việc nhập prompt, không cần giao diện phức tạp hơn
- Khả năng xử lý NLP cơ bản là đủ để hiểu các yêu cầu đơn giản

## Stress Test on Assumptions & Edge Cases
1. **`places.json` có cấu trúc nhất quán và dữ liệu tương đối đầy đủ:**
   - **Rủi ro:** Nếu file bị hỏng, dữ liệu quá ít hoặc quá lớn đều có thể gây ra lỗi hoặc hiệu suất kém
   - **Giải pháp:** Cần có bộ kiểm tra dữ liệu (validator) và cơ chế fallback. Cần tối ưu hóa hiệu suất cho dữ liệu lớn và có chiến lược xử lý khi dữ liệu ít

2. **Người dùng sẽ tương tác với AI thông qua việc nhập prompt:**
   - **Rủi ro:** Prompt mơ hồ hoặc người dùng ưa thích giao diện chọn lựa có thể dẫn đến trải nghiệm không tốt
   - **Giải pháp:** Xây dựng luồng tương tác thông minh để xử lý prompt mơ hồ và xem xét mô hình Hybrid (kết hợp chat & bộ lọc) trong tương lai

3. **Khả năng xử lý NLP cơ bản là đủ:**
   - **Rủi ro:** Ngôn ngữ phức tạp hoặc tiếng lóng có thể khiến AI hiểu sai
   - **Giải pháp:** Tập trung xây dựng danh sách "intent" và "entity" rõ ràng, lựa chọn thư viện NLP phù hợp
