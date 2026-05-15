# Workshop Notes — BYOL Node.js Express to AWS Lambda

## 1. Chosen Strategy
* [cite_start]**Strategy:** Option A — `serverless-http` adapter [cite: 26, 28]
* [cite_start]**Implementation Cost:** 1 new entrypoint file (`lambda.js`), 1 npm dependency [cite: 28]
* [cite_start]**Code Changes:** ~3 lines of code in the entrypoint file [cite: 28]

---

## 2. Rationale (Lý do lựa chọn)
* **Minimum Code Changes (Tối thiểu hóa sửa đổi):** Chiến lược này hoàn toàn tuân thủ luật "Hard Rule" của bài lab. [cite_start]Toàn bộ mã nguồn ứng dụng gốc (`app.js`) được giữ sạch sẽ, độc lập và không phải import bất kỳ cấu hình Serverless nào[cite: 37]. 
* [cite_start]**Zero Refactoring Cost:** Chỉ cần bọc (wrap) ứng dụng Express bằng hàm `serverless(app)` trong file `lambda.js` là có thể dịch chuyển mượt mà từ môi trường HTTP Server truyền thống sang AWS Lambda[cite: 21, 28].
* [cite_start]**Community Support & Reliability:** `serverless-http` là một thư viện chuẩn, được sử dụng phổ biến nhất trong cộng đồng Node.js khi triển khai Express lên AWS Lambda, giúp đảm bảo tính ổn định cao và xử lý tốt cơ chế routing (Path stripping/Proxy) từ API Gateway[cite: 47].
* [cite_start]**Performance Balance:** Thời gian Cold Start ước tính ban đầu (200–400 ms) nằm trong mức chấp nhận được đối với một monolithic framework như Express[cite: 28].

---

## 3. Measured Metrics (Số liệu đo lường thực tế)
Dưới đây là các thông số thực tế được ghi nhận trực tiếp từ hệ thống CloudWatch Logs sau khi smoke-test thành công:

* **Deployed API Gateway URL:** `https://m7ybzifysf.execute-api.us-west-2.amazonaws.com`

| Metric | Measured Value | Description |
|:---|:---|:---|
| **Cold Start (`Init Duration`)** | **277.01 ms** | Thời gian Lambda khởi tạo container (Nằm trong mức ước tính tối ưu) |
| **Execution Time (`Duration`)** | **22.20 ms** | Thời gian Express xử lý logic code và trả về kết quả |
| **Memory Allocation** | **512 MB** | Cấu hình bộ nhớ được cấp phát ban đầu |
| **Max Memory Used** | **93 MB** | Dung lượng RAM thực tế tiêu thụ tối đa |