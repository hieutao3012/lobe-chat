# Project Brief: Box Chat AI

## Executive Summary

Box Chat AI là một ứng dụng chatbot thông minh được xây dựng dựa trên nền tảng LobeChat, nhằm giúp người dùng dễ dàng tìm kiếm các địa điểm ăn chơi và lên kế hoạch chi tiết cho các chuyến đi của họ. Sản phẩm giải quyết vấn đề người dùng phải dành nhiều thời gian tìm kiếm thông tin từ nhiều nguồn khác nhau và tự tổng hợp để lên kế hoạch. Với dữ liệu địa điểm sẵn có, Box Chat AI cung cấp trải nghiệm được cá nhân hóa thông qua việc tương tác đơn giản qua giao diện chat, mang đến danh sách địa điểm được đề xuất chính xác và lịch trình đi chơi được sắp xếp hợp lý.

## Problem Statement

Người dùng hiện tại gặp khó khăn và mất nhiều thời gian khi lên kế hoạch cho các hoạt động đi chơi. Quá trình này thường bao gồm việc tìm kiếm thông tin địa điểm trên nhiều nền tảng (Google Maps, Foody, Travel blogs...), so sánh đánh giá, khoảng cách, giá cả, giờ mở cửa, sau đó tự tổng hợp lại thành một lịch trình. Điều này không chỉ tẻ nhạt mà còn dễ bỏ sót thông tin quan trọng. Các giải pháp hiện có thường chỉ tập trung vào một khía cạnh (ví dụ: chỉ tìm kiếm địa điểm hoặc chỉ quản lý lịch trình), chưa có một công cụ nào tích hợp cả hai chức năng một cách thông minh và thân thiện.

## Proposed Solution

Box Chat AI cung cấp một giải pháp tích hợp và thông minh bằng cách cho phép người dùng tương tác với một chatbot AI để:
1.  Nhập yêu cầu của họ bằng ngôn ngữ tự nhiên (prompt).
2.  Nhận được danh sách các địa điểm phù hợp được hiển thị dưới dạng "place card" trực quan.
3.  Dễ dàng thêm các địa điểm yêu thích vào một lịch trình.
4.  Tùy chỉnh và sắp xếp lại lịch trình một cách linh hoạt.
5.  Xuất lịch trình hoàn chỉnh.
Ứng dụng sẽ tận dụng dữ liệu địa điểm sẵn có (`places.json`) và khả năng xử lý ngôn ngữ tự nhiên (NLP) để hiểu và đáp ứng chính xác yêu cầu của người dùng, từ đó mang lại trải nghiệm liền mạch và hiệu quả.

## Target Users

### Primary User Segment: Người trẻ (18-35 tuổi) sống tại thành phố lớn
-   **Hồ sơ:** Nhân viên văn phòng, sinh viên, người yêu thích công nghệ, có thói quen sử dụng điện thoại để tìm kiếm thông tin và lên kế hoạch.
-   **Hành vi:** Thường xuyên tìm kiếm các địa điểm mới để ăn uống, vui chơi, hẹn hò. Ưa chuộng sự tiện lợi và nhanh chóng.
-   **Nhu cầu & Cơn đau:** Muốn tiết kiệm thời gian tìm kiếm và lên kế hoạch. Cảm thấy mệt mỏi với việc phải ghép nối thông tin từ nhiều nguồn khác nhau.
-   **Mục tiêu:** Có một lịch trình đi chơi rõ ràng, thú vị và được cá nhân hóa chỉ trong vài bước thao tác đơn giản.

## Goals & Success Metrics

### Business Objectives
-   Tăng tỷ lệ người dùng quay lại sử dụng ứng dụng ít nhất 1 lần mỗi tuần (MRR).
-   Tăng số lượng lịch trình được tạo mỗi ngày (Daily Active Itineraries).
-   Thu thập phản hồi tích cực từ 80% người dùng thử nghiệm về tính năng đề xuất địa điểm.

### User Success Metrics
-   Người dùng có thể tìm thấy địa điểm phù hợp trong vòng 30 giây sau khi nhập prompt.
-   Người dùng có thể tạo và tùy chỉnh một lịch trình trong vòng 2 phút.
-   Tỷ lệ hài lòng (rating > 4 sao) với các lịch trình được tạo đạt 85%.

### KPIs
-   **Thời gian phản hồi trung bình (P90):** < 2 giây.
-   **Độ chính xác của đề xuất (Precision@5):** > 75%.
-   **Tỷ lệ hoàn thành lịch trình (Itinerary Completion Rate):** > 60%.

## MVP Scope

### Core Features (Must Have)
-   **Chat Interface để nhập Prompt:** Cho phép người dùng nhập yêu cầu bằng ngôn ngữ tự nhiên. *(Leverages existing LobeChat UI)*
-   **Module xử lý Prompt (NLP cơ bản):** Phân tích prompt để trích xuất yêu cầu (danh mục, khu vực, giá cả...).
-   **Truy vấn Dữ liệu Địa điểm:** Tìm kiếm trong `places.json` dựa trên yêu cầu đã xử lý.
-   **Hiển thị Place Card:** Trình bày các địa điểm phù hợp với hình ảnh, tên, đánh giá, giá.
-   **Danh sách Địa điểm Đã Chọn:** Một khu vực để lưu trữ tạm thời các địa điểm người dùng muốn thêm vào lịch trình.
-   **Tùy chỉnh Lịch trình:** Cho phép người dùng thêm, xóa, thay đổi thứ tự các địa điểm trong danh sách đã chọn.
-   **Xuất Lịch trình:** Hiển thị lịch trình cuối cùng dưới dạng danh sách có giờ ước tính.

### Out of Scope for MVP
-   Tích hợp bản đồ trực quan.
-   Tự động sắp xếp lịch trình tối ưu (dựa trên khoảng cách, giờ mở cửa).
-   Tích hợp tài khoản người dùng và lưu trữ lịch trình lâu dài.
-   Tích hợp với Google Calendar/iCal.
-   Học máy nâng cao để cá nhân hóa.

### MVP Success Criteria
MVP được coi là thành công khi người dùng thử nghiệm có thể hoàn thành quy trình "nhập prompt -> nhận đề xuất -> tạo và tùy chỉnh lịch trình" một cách trơn tru và hài lòng với kết quả trong vòng 5 phút.

## Post-MVP Vision

### Phase 2 Features
-   Tự động sắp xếp lịch trình tối ưu.
-   Xuất lịch trình sang Google Calendar/iCal.
-   Tích hợp hệ thống tài khoản người dùng.
-   Học máy đơn giản để ghi nhớ sở thích và cải thiện đề xuất.
-   Mô hình tương tác Hybrid: Kết hợp chatbot AI với giao diện tìm kiếm & bộ lọc truyền thống để phục vụ đa dạng người dùng hơn.

### Long-term Vision
Biến Box Chat AI thành một trợ lý ảo cá nhân cho mọi hoạt động giải trí và du lịch của người dùng, có thể đề xuất các hành trình dài ngày, tích hợp với các dịch vụ đặt vé, đặt bàn, và trở thành một nền tảng cộng đồng nơi người dùng có thể chia sẻ lịch trình.

### Expansion Opportunities
-   Mở rộng cho các loại lịch trình khác: Du lịch, công tác, luyện tập.
-   Hợp tác với các doanh nghiệp địa phương để cung cấp ưu đãi.
-   Phát triển phiên bản cho các nền tảng khác (Web, Desktop).

## Technical Considerations

### Platform Requirements
-   **Target Platforms:** Web (PWA), Ứng dụng Di động (React Native hoặc WebView của PWA).
-   **Browser/OS Support:** Chrome, Firefox, Safari (phiên bản mới nhất), Android 10+, iOS 14+.
-   **Performance Requirements:** Thời gian tải trang dưới 3 giây, phản hồi AI dưới 2 giây.

### Technology Preferences
-   **Frontend:** React/Next.js (giữ nguyên từ LobeChat), Ant Design.
-   **Backend:** Không cần backend riêng biệt trong MVP, xử lý logic phía client và đọc trực tiếp `places.json`.
-   **Database:** Dữ liệu địa điểm được lưu trữ trong file `places.json` (Static JSON).
-   **Hosting/Infrastructure:** Vercel (giữ nguyên từ LobeChat).

### Architecture Considerations
-   **Repository Structure:** Giữ nguyên cấu trúc của LobeChat, thêm thư mục `data` cho `places.json` và `docs` cho tài liệu.
-   **Service Architecture:** Client-side only cho MVP.
-   **Integration Requirements:** Không.
-   **Security/Compliance:** Không yêu cầu bảo mật nghiêm ngặt trong MVP.

## Constraints & Assumptions

### Constraints
-   **Budget:** Không có ngân sách, phát triển nội bộ.
-   **Timeline:** Mục tiêu hoàn thành MVP trong 4 tuần.
-   **Resources:** 1 developer.
-   **Technical:** Phụ thuộc vào chất lượng và cấu trúc của file `places.json`.

### Key Assumptions
-   File `places.json` có cấu trúc nhất quán và dữ liệu là tương đối đầy đủ cho ít nhất 3-5 danh mục chính.
-   Người dùng sẽ tương tác với AI thông qua việc nhập prompt, không cần giao diện phức tạp hơn.
-   Khả năng xử lý NLP cơ bản là đủ để hiểu các yêu cầu đơn giản.

### Stress Test on Assumptions & Edge Cases
Để đảm bảo tính bền vững, các giả định trên đã được kiểm tra trong các tình huống biên (edge cases):
1.  **`places.json` có cấu trúc nhất quán và dữ liệu tương đối đầy đủ:**
    *   **Rủi ro:** Nếu file bị hỏng, dữ liệu quá ít hoặc quá lớn đều có thể gây ra lỗi hoặc hiệu suất kém.
    *   **Giải pháp:** Cần có bộ kiểm tra dữ liệu (validator) và cơ chế fallback. Cần tối ưu hóa hiệu suất cho dữ liệu lớn và có chiến lược xử lý khi dữ liệu ít.
2.  **Người dùng sẽ tương tác với AI thông qua việc nhập prompt:**
    *   **Rủi ro:** Prompt mơ hồ hoặc người dùng ưa thích giao diện chọn lựa có thể dẫn đến trải nghiệm không tốt.
    *   **Giải pháp:** Xây dựng luồng tương tác thông minh để xử lý prompt mơ hồ và xem xét mô hình Hybrid (kết hợp chat & bộ lọc) trong tương lai.
3.  **Khả năng xử lý NLP cơ bản là đủ:**
    *   **Rủi ro:** Ngôn ngữ phức tạp hoặc tiếng lóng có thể khiến AI hiểu sai.
    *   **Giải pháp:** Tập trung xây dựng danh sách "intent" và "entity" rõ ràng, lựa chọn thư viện NLP phù hợp.

## Risks & Open Questions

### Key Risks
-   **Dữ liệu không đầy đủ hoặc không chính xác:** Nếu `places.json` thiếu thông tin hoặc có cấu trúc sai, AI sẽ không thể đưa ra đề xuất chính xác. *Tác động: Sản phẩm không đạt được mục tiêu chính.*
-   **AI hiểu sai prompt:** Người dùng có thể thất vọng nếu kết quả không như mong đợi. *Tác động: UX kém, người dùng rời bỏ.*
-   **Hiệu suất xử lý dữ liệu lớn:** Nếu `places.json` rất lớn, việc lọc và hiển thị có thể chậm. *Tác động: Trải nghiệm người dùng bị ảnh hưởng.*
-   **Phụ thuộc vào chất lượng dữ liệu đầu vào:** Chất lượng đề xuất của AI hoàn toàn phụ thuộc vào chất lượng của `places.json`. Dữ liệu cũ, sai lệch sẽ dẫn đến trải nghiệm người dùng kém.

### Open Questions
-   Cần xử lý như thế nào khi không tìm thấy địa điểm phù hợp với prompt?
-   Có nên cho phép người dùng nhập dữ liệu địa điểm riêng của họ không?
-   Làm thế nào để xử lý hiệu quả việc cập nhật dữ liệu `places.json` khi dữ liệu gốc thay đổi?

### Areas Needing Further Research
-   Các thư viện NLP nhẹ và hiệu quả có thể tích hợp vào LobeChat.
-   Cách tối ưu hóa hiệu suất khi làm việc với file JSON lớn trên client-side.
-   Các mô hình tương tác thay thế hoặc bổ sung cho chatbot, ví dụ như giao diện tìm kiếm & bộ lọc truyền thống (Search & Filter UI) hoặc mô hình Hybrid kết hợp cả hai.

## Appendices

### A. Research Summary
-   Đã thực hiện phiên brainstorming nội bộ về tính năng, UI/UX và luồng tương tác.
-   Phân tích dữ liệu `places.json` mẫu cho thấy dữ liệu có cấu trúc rõ ràng, có thể khai thác.

### B. Stakeholder Input
-   Người sở hữu dự án mong muốn tập trung vào trải nghiệm người dùng liền mạch và hiệu quả, ưu tiên việc loại bỏ các tính năng không liên quan của LobeChat gốc.

### C. References
-   File dữ liệu: `@data/places.json`
-   File brainstorming: `docs/brainstorming-output.md`
-   LobeChat Repository: `https://github.com/lobehub/lobe-chat`

## Next Steps

1.  Tạo đặc tả kỹ thuật chi tiết cho Frontend (Front-end Spec).
2.  Thiết kế chi tiết giao diện người dùng (UI/UX Wireframes).
3.  Chuẩn bị môi trường phát triển và dữ liệu.
4.  Bắt đầu phát triển các tính năng cốt lõi của MVP.