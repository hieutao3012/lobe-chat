# 8. Technical Requirements

## Platform Requirements
- **Target Platforms:** Web (PWA), Ứng dụng Di động (React Native hoặc WebView của PWA)
- **Browser/OS Support:** Chrome, Firefox, Safari (phiên bản mới nhất), Android 10+, iOS 14+
- **Performance Requirements:** Thời gian tải trang dưới 3 giây, phản hồi AI dưới 2 giây

## Technology Stack
- **Frontend:** React/Next.js (giữ nguyên từ LobeChat), Ant Design
- **Backend:** Không cần backend riêng biệt trong MVP, xử lý logic phía client và đọc trực tiếp `places.json`
- **Database:** Dữ liệu địa điểm được lưu trữ trong file `places.json` (Static JSON)
- **Hosting/Infrastructure:** Vercel (giữ nguyên từ LobeChat)
- **NLP Libraries:** Cần research và lựa chọn thư viện phù hợp

## Architecture Considerations
- **Repository Structure:** Giữ nguyên cấu trúc của LobeChat, thêm thư mục `data` cho `places.json` và `docs` cho tài liệu
- **Service Architecture:** Client-side only cho MVP
- **Integration Requirements:** Không
- **Security/Compliance:** Không yêu cầu bảo mật nghiêm ngặt trong MVP
