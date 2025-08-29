# 6. Functional Requirements

## Core Features (Must Have)

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

## Nice to Have Features (Post-MVP)

1. Tích hợp bản đồ trực quan
2. Tự động sắp xếp lịch trình tối ưu (dựa trên khoảng cách, giờ mở cửa)
3. Tích hợp tài khoản người dùng và lưu trữ lịch trình lâu dài
4. Tích hợp với Google Calendar/iCal
5. Học máy nâng cao để cá nhân hóa
