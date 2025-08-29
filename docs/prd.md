# Product Requirements Document: Box Chat AI - Hệ thống đề xuất và quản lý lịch trình địa điểm

## 1. Executive Summary

Box Chat AI là một ứng dụng chatbot thông minh được xây dựng dựa trên nền tảng LobeChat, nhằm giúp người dùng dễ dàng tìm kiếm các địa điểm ăn chơi và lên kế hoạch chi tiết cho các chuyến đi của họ. Sản phẩm giải quyết vấn đề người dùng phải dành nhiều thời gian tìm kiếm thông tin từ nhiều nguồn khác nhau và tự tổng hợp để lên kế hoạch. Với dữ liệu địa điểm sẵn có từ file `places.json`, Box Chat AI cung cấp trải nghiệm được cá nhân hóa thông qua việc tương tác đơn giản qua giao diện chat, mang đến danh sách địa điểm được đề xuất chính xác và lịch trình đi chơi được sắp xếp hợp lý.

## 2. Problem Statement

Người dùng hiện tại gặp khó khăn và mất nhiều thời gian khi lên kế hoạch cho các hoạt động đi chơi. Quá trình này thường bao gồm việc tìm kiếm thông tin địa điểm trên nhiều nền tảng (Google Maps, Foody, Travel blogs...), so sánh đánh giá, khoảng cách, giá cả, giờ mở cửa, sau đó tự tổng hợp lại thành một lịch trình. Điều này không chỉ tẻ nhạt mà còn dễ bỏ sót thông tin quan trọng. Các giải pháp hiện có thường chỉ tập trung vào một khía cạnh (ví dụ: chỉ tìm kiếm địa điểm hoặc chỉ quản lý lịch trình), chưa có một công cụ nào tích hợp cả hai chức năng một cách thông minh và thân thiện.

## 3. Proposed Solution

Box Chat AI cung cấp một giải pháp tích hợp và thông minh bằng cách cho phép người dùng tương tác với một chatbot AI để:
1. Nhập yêu cầu của họ bằng ngôn ngữ tự nhiên (prompt).
2. Nhận được danh sách các địa điểm phù hợp được hiển thị dưới dạng "place card" trực quan.
3. Dễ dàng thêm các địa điểm yêu thích vào một lịch trình.
4. Tùy chỉnh và sắp xếp lại lịch trình một cách linh hoạt.
5. Xuất lịch trình hoàn chỉnh.

Ứng dụng sẽ tận dụng dữ liệu địa điểm sẵn có (`places.json`) và khả năng xử lý ngôn ngữ tự nhiên (NLP) để hiểu và đáp ứng chính xác yêu cầu của người dùng, từ đó mang lại trải nghiệm liền mạch và hiệu quả.

## 4. Target Users

### Primary User Segment: Người trẻ (18-35 tuổi) sống tại thành phố lớn
- **Hồ sơ:** Nhân viên văn phòng, sinh viên, người yêu thích công nghệ, có thói quen sử dụng điện thoại để tìm kiếm thông tin và lên kế hoạch.
- **Hành vi:** Thường xuyên tìm kiếm các địa điểm mới để ăn uống, vui chơi, hẹn hò. Ưa chuộng sự tiện lợi và nhanh chóng.
- **Nhu cầu & Cơn đau:** Muốn tiết kiệm thời gian tìm kiếm và lên kế hoạch. Cảm thấy mệt mỏi với việc phải ghép nối thông tin từ nhiều nguồn khác nhau.
- **Mục tiêu:** Có một lịch trình đi chơi rõ ràng, thú vị và được cá nhân hóa chỉ trong vài bước thao tác đơn giản.

## 5. Goals & Success Metrics

### Business Objectives
- Tăng tỷ lệ người dùng quay lại sử dụng ứng dụng ít nhất 1 lần mỗi tuần (Weekly Active Users).
- Tăng số lượng lịch trình được tạo mỗi ngày (Daily Active Itineraries).
- Thu thập phản hồi tích cực từ 80% người dùng thử nghiệm về tính năng đề xuất địa điểm.

### User Success Metrics
- Người dùng có thể tìm thấy địa điểm phù hợp trong vòng 30 giây sau khi nhập prompt.
- Người dùng có thể tạo và tùy chỉnh một lịch trình trong vòng 2 phút.
- Tỷ lệ hài lòng (rating > 4 sao) với các lịch trình được tạo đạt 85%.

### KPIs
- **Thời gian phản hồi trung bình (P90):** < 2 giây.
- **Độ chính xác của đề xuất (Precision@5):** > 75%.
- **Tỷ lệ hoàn thành lịch trình (Itinerary Completion Rate):** > 60%.

## 6. Functional Requirements

### Core Features (Must Have)

1. **Chat Interface để nhập Prompt**
   - Cho phép người dùng nhập yêu cầu bằng ngôn ngữ tự nhiên
   - Tận dụng giao diện chat sẵn có của LobeChat
   - Hỗ trợ cả nhập prompt dài và ngắn

2. **Module xử lý Prompt (NLP cơ bản)**
   - Phân tích prompt để trích xuất yêu cầu (danh mục, khu vực, giá cả, thời gian...)
   - Xử lý các prompt phức tạp với nhiều điều kiện
   - Có khả năng yêu cầu làm rõ khi prompt mơ hồ

3. **Truy vấn Dữ liệu Địa điểm**
   - Tìm kiếm hiệu quả trong `places.json` dựa trên yêu cầu đã xử lý
   - Xử lý file JSON lớn (51MB) một cách hiệu quả
   - Trả về kết quả trong vòng 2 giây

4. **Hiển thị Place Card**
   - Trình bày các địa điểm phù hợp với hình ảnh, tên, đánh giá, giá
   - Mỗi place card bao gồm thông tin chi tiết khi click vào
   - Hỗ trợ hiển thị 5-10 place cards trong một lần trả kết quả

5. **Danh sách Địa điểm Đã Chọn**
   - Một khu vực để lưu trữ tạm thời các địa điểm người dùng muốn thêm vào lịch trình
   - Cho phép xem nhanh các địa điểm đã chọn
   - Hỗ trợ xóa địa điểm khỏi danh sách

6. **Tùy chỉnh Lịch trình**
   - Cho phép người dùng thêm, xóa, thay đổi thứ tự các địa điểm trong danh sách đã chọn
   - Giao diện kéo thả để sắp xếp lại lịch trình
   - Tự động tạo lịch trình thô từ danh sách đã chọn

7. **Xuất Lịch trình**
   - Hiển thị lịch trình cuối cùng dưới dạng danh sách có giờ ước tính
   - Cho phép xuất lịch trình dưới dạng text hoặc file
   - Có thể chia sẻ lịch trình với người khác

### Nice to Have Features (Post-MVP)

1. Tích hợp bản đồ trực quan
2. Tự động sắp xếp lịch trình tối ưu (dựa trên khoảng cách, giờ mở cửa)
3. Tích hợp tài khoản người dùng và lưu trữ lịch trình lâu dài
4. Tích hợp với Google Calendar/iCal
5. Học máy nâng cao để cá nhân hóa

## 7. Non-Functional Requirements

1. **Performance**
   - Thời gian tải trang dưới 3 giây
   - Thời gian phản hồi AI dưới 2 giây
   - Hiệu suất xử lý file JSON lớn được tối ưu

2. **Usability**
   - Giao diện trực quan, dễ sử dụng
   - Hướng dẫn người dùng mới trong lần sử dụng đầu tiên
   - Hỗ trợ responsive trên cả mobile và desktop

3. **Reliability**
   - 99% uptime
   - Cơ chế fallback khi có lỗi xảy ra
   - Logging đầy đủ để debug khi cần

4. **Security**
   - Bảo vệ dữ liệu người dùng
   - Không lưu trữ thông tin cá nhân nhạy cảm
   - Tuân thủ các best practices về security

## 8. Technical Requirements

### Platform Requirements
- **Target Platforms:** Web (PWA), Ứng dụng Di động (React Native hoặc WebView của PWA)
- **Browser/OS Support:** Chrome, Firefox, Safari (phiên bản mới nhất), Android 10+, iOS 14+
- **Performance Requirements:** Thời gian tải trang dưới 3 giây, phản hồi AI dưới 2 giây

### Technology Stack
- **Frontend:** React/Next.js (giữ nguyên từ LobeChat), Ant Design
- **Backend:** Không cần backend riêng biệt trong MVP, xử lý logic phía client và đọc trực tiếp `places.json`
- **Database:** Dữ liệu địa điểm được lưu trữ trong file `places.json` (Static JSON)
- **Hosting/Infrastructure:** Vercel (giữ nguyên từ LobeChat)
- **NLP Libraries:** Cần research và lựa chọn thư viện phù hợp

### Architecture Considerations
- **Repository Structure:** Giữ nguyên cấu trúc của LobeChat, thêm thư mục `data` cho `places.json` và `docs` cho tài liệu
- **Service Architecture:** Client-side only cho MVP
- **Integration Requirements:** Không
- **Security/Compliance:** Không yêu cầu bảo mật nghiêm ngặt trong MVP

## 9. Constraints & Assumptions

### Constraints
- **Budget:** Không có ngân sách, phát triển nội bộ
- **Timeline:** Mục tiêu hoàn thành MVP trong 4 tuần
- **Resources:** 1 developer
- **Technical:** Phụ thuộc vào chất lượng và cấu trúc của file `places.json`

### Key Assumptions
- File `places.json` có cấu trúc nhất quán và dữ liệu là tương đối đầy đủ cho ít nhất 3-5 danh mục chính
- Người dùng sẽ tương tác với AI thông qua việc nhập prompt, không cần giao diện phức tạp hơn
- Khả năng xử lý NLP cơ bản là đủ để hiểu các yêu cầu đơn giản

### Stress Test on Assumptions & Edge Cases
1. **`places.json` có cấu trúc nhất quán và dữ liệu tương đối đầy đủ:**
   - **Rủi ro:** Nếu file bị hỏng, dữ liệu quá ít hoặc quá lớn đều có thể gây ra lỗi hoặc hiệu suất kém
   - **Giải pháp:** Cần có bộ kiểm tra dữ liệu (validator) và cơ chế fallback. Cần tối ưu hóa hiệu suất cho dữ liệu lớn và có chiến lược xử lý khi dữ liệu ít

2. **Người dùng sẽ tương tác với AI thông qua việc nhập prompt:**
   - **Rủi ro:** Prompt mơ hồ hoặc người dùng ưa thích giao diện chọn lựa có thể dẫn đến trải nghiệm không tốt
   - **Giải pháp:** Xây dựng luồng tương tác thông minh để xử lý prompt mơ hồ và xem xét mô hình Hybrid (kết hợp chat & bộ lọc) trong tương lai

3. **Khả năng xử lý NLP cơ bản là đủ:**
   - **Rủi ro:** Ngôn ngữ phức tạp hoặc tiếng lóng có thể khiến AI hiểu sai
   - **Giải pháp:** Tập trung xây dựng danh sách "intent" và "entity" rõ ràng, lựa chọn thư viện NLP phù hợp

## 10. Risks & Mitigation Strategies

| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|--------|---------------------|
| Dữ liệu không đầy đủ hoặc không chính xác trong `places.json` | Medium | High | Xây dựng bộ validator dữ liệu, có cơ chế fallback khi dữ liệu thiếu |
| AI hiểu sai prompt của người dùng | High | Medium | Xây dựng luồng tương tác thông minh để yêu cầu làm rõ, cải thiện dần qua feedback |
| Hiệu suất xử lý dữ liệu lớn | High | High | Tối ưu thuật toán, sử dụng caching, lazy loading, phân trang kết quả |
| Phụ thuộc vào chất lượng dữ liệu đầu vào | Medium | High | Xây dựng cơ chế đánh giá chất lượng dữ liệu, có plan B khi dữ liệu không đạt chuẩn |
| Khó tích hợp với LobeChat hiện tại | Low | Medium | Research kỹ kiến trúc LobeChat trước khi bắt đầu, xây dựng các integration points rõ ràng |

## 11. Success Criteria

MVP được coi là thành công khi:
1. Người dùng thử nghiệm có thể hoàn thành quy trình "nhập prompt -> nhận đề xuất -> tạo và tùy chỉnh lịch trình" một cách trơn tru và hài lòng với kết quả trong vòng 5 phút
2. 80% người dùng thử nghiệm đánh giá tích cực về trải nghiệm tổng thể
3. 75% các prompt được xử lý chính xác trong vòng 2 giây
4. 85% người dùng có thể tạo lịch trình hoàn chỉnh trong vòng 2 phút

## 12. Release Plan

### Phase 1: MVP (4 tuần)
- Core chat interface với LobeChat
- Module xử lý prompt cơ bản
- Truy vấn và hiển thị place cards
- Chức năng tạo và tùy chỉnh lịch trình
- Xuất lịch trình

### Phase 2: Enhancement (4-6 tuần sau MVP)
- Tự động sắp xếp lịch trình tối ưu
- Tích hợp tài khoản người dùng
- Lưu trữ lịch trình lâu dài
- Học máy đơn giản để cá nhân hóa

### Phase 3: Advanced Features (8-12 tuần sau MVP)
- Tích hợp bản đồ trực quan
- Xuất lịch trình sang Google Calendar/iCal
- Mô hình tương tác Hybrid
- Cộng đồng chia sẻ lịch trình

## 13. Epic Structure

Dựa trên phạm vi và độ phức tạp của dự án Box Chat AI, chúng tôi đề xuất cấu trúc epic như sau:

### Epic Approach
Dự án sẽ được triển khai theo một epic chính bao quanh toàn bộ chức năng cốt lõi, với các story chi tiết được chia nhỏ để đảm bảo quản lý và thực hiện hiệu quả:

**Epic Structure Decision**: Single comprehensive epic for the entire MVP with multiple stories because:
1. All features are tightly integrated and interdependent
2. The MVP scope is focused and cohesive
3. Resource constraints (1 developer) favor a unified approach
4. Timeline (4 weeks) requires streamlined coordination

### Epic 1: Box Chat AI - Hệ thống đề xuất và quản lý lịch trình địa điểm

**Epic Goal**: Xây dựng một hệ thống đề xuất địa điểm và quản lý lịch trình thông minh dựa trên LobeChat, giúp người dùng tìm kiếm và lên kế hoạch các hoạt động đi chơi một cách nhanh chóng và hiệu quả thông qua tương tác ngôn ngữ tự nhiên.

**Integration Requirements**: 
- Tích hợp liền mạch với giao diện chat hiện có của LobeChat
- Sử dụng hiệu quả dữ liệu từ file `places.json` lớn
- Đảm bảo hiệu suất xử lý tốt trên cả thiết bị di động và desktop
- Duy trì các tính năng cốt lõi của LobeChat trong khi mở rộng chức năng

#### Story 1.1: Xây dựng module xử lý prompt và truy vấn dữ liệu địa điểm
As a người dùng,
I want to nhập yêu cầu bằng ngôn ngữ tự nhiên và nhận được danh sách địa điểm phù hợp,
so that tôi có thể tìm kiếm địa điểm một cách nhanh chóng và chính xác chỉ bằng việc nói ra ý muốn của mình.

##### Acceptance Criteria
1.1: Module NLP cơ bản có thể phân tích và trích xuất ít nhất 3 loại entity từ prompt người dùng (danh mục, khu vực, giá cả)
1.2: Hệ thống truy vấn có thể xử lý file `places.json` 51MB và trả về kết quả trong vòng 3 giây
1.3: Khi prompt không rõ ràng, hệ thống có thể yêu cầu người dùng làm rõ thông tin
1.4: Hệ thống có cơ chế fallback khi không tìm thấy địa điểm phù hợp

##### Integration Verification
IV1: Các tính năng chat gốc của LobeChat vẫn hoạt động bình thường sau khi tích hợp
IV2: Module mới không làm chậm thời gian tải trang của ứng dụng
IV3: Hiệu suất truy vấn không bị ảnh hưởng khi mở nhiều tab chat cùng lúc

#### Story 1.2: Thiết kế và triển khai giao diện place cards và danh sách địa điểm
As a người dùng,
I want xem danh sách các địa điểm được hiển thị dưới dạng place cards trực quan,
so that tôi có thể dễ dàng xem thông tin và chọn địa điểm yêu thích.

##### Acceptance Criteria
2.1: Place card hiển thị đầy đủ thông tin cơ bản (tên, đánh giá, giá, hình ảnh) trong một layout gọn gàng
2.2: Người dùng có thể click vào place card để xem chi tiết thông tin địa điểm
2.3: Danh sách các địa điểm phù hợp được hiển thị trong vòng 2 giây sau khi có kết quả từ hệ thống
2.4: Giao diện responsive hoạt động tốt trên cả mobile và desktop

##### Integration Verification
IV1: Các component mới tương thích với UI system hiện có của LobeChat
IV2: Hiệu suất render không bị giảm khi hiển thị nhiều place cards cùng lúc
IV3: Tính năng dark/light mode của LobeChat vẫn hoạt động với các component mới

#### Story 1.3: Phát triển chức năng tạo và tùy chỉnh lịch trình
As a người dùng,
I want tạo và tùy chỉnh lịch trình từ các địa điểm đã chọn,
so that tôi có thể lên kế hoạch chi tiết cho chuyến đi của mình.

##### Acceptance Criteria
3.1: Người dùng có thể thêm/bỏ địa điểm vào danh sách lịch trình với một thao tác đơn giản
3.2: Giao diện kéo thả cho phép sắp xếp lại thứ tự các địa điểm trong lịch trình
3.3: Hệ thống tự động tạo lịch trình thô với giờ ước tính khi người dùng hoàn tất chọn địa điểm
3.4: Người dùng có thể xuất lịch trình dưới dạng text hoặc chia sẻ với người khác

##### Integration Verification
IV1: Chức năng mới không làm chậm hoặc xung đột với các tính năng chat hiện có
IV2: Dữ liệu lịch trình được lưu trữ tạm thời ổn định trong suốt session sử dụng
IV3: Tính năng export hoạt động trên tất cả các trình duyệt được hỗ trợ

## 14. Open Questions

### A. Research Summary
- Đã thực hiện phiên brainstorming nội bộ về tính năng, UI/UX và luồng tương tác
- Phân tích dữ liệu `places.json` mẫu cho thấy dữ liệu có cấu trúc rõ ràng, có thể khai thác
- Xác định được các category items chính trong dữ liệu địa điểm

### B. Stakeholder Input
- Người sở hữu dự án mong muốn tập trung vào trải nghiệm người dùng liền mạch và hiệu quả
- Ưu tiên việc loại bỏ các tính năng không liên quan của LobeChat gốc
- Cần đảm bảo hiệu suất xử lý tốt với lượng dữ liệu lớn

### C. References
- File dữ liệu: `@data/places.json`
- File brainstorming: `docs/brainstorming-output.md`
- LobeChat Repository: `https://github.com/lobehub/lobe-chat`

## 15. Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-08-28 | 1.0 | Initial version | Product Manager |