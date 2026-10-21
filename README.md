# 🧠 LifeMap English — Visual Mind Mapping & Contextual Vocabulary

> **Nền tảng học từ vựng tiếng Anh trực quan bằng sơ đồ tư duy hữu cơ (Organic Mind Mapping), phát âm chuẩn bản ngữ, phân tầng độ khó chuẩn CEFR và tích hợp ôn tập ngắt quãng (Spaced Repetition).**

---

## 🌟 Điểm nổi bật (Key Features)

### 1. 9 Chủ đề Toàn diện — 900 Từ vựng Chuyên sâu
- **Tối thiểu 100 từ vựng cho mỗi chủ đề** (tổng cộng 900 từ được biên soạn chi tiết).
- **Phân tầng độ khó theo chuẩn CEFR cho người mới bắt đầu:**
  - **50 từ vựng đầu tiên (A1 - A2):** Các từ vựng nền tảng, cơ bản, gần gũi với đời sống và công việc hàng ngày để người mới học dễ dàng tiếp cận và ghi nhớ.
  - **50 từ vựng kế tiếp (B1 - C1):** Nâng cao dần sang các khái niệm chuyên môn, tư duy lãnh đạo và học thuật.
- **Bộ lọc cấp độ thông minh (Level Filter):**
  - `Tất cả (100 từ)`: Hiển thị trọn vẹn toàn bộ sơ đồ 4 nhánh.
  - `🌱 Người mới bắt đầu (50 từ A1-A2)`: 1 click ẩn các từ phức tạp, chỉ hiển thị 50 từ cơ bản nhất.
  - `🚀 Nâng cao (50 từ B1-C1)`: Dành cho người học đã vững nền tảng muốn mở rộng vốn từ chuyên sâu.

### 2. Danh mục 9 Chủ đề & 36 Phân nhóm
1. 💼 **Chiến lược Kinh doanh & Quản trị** (100 từ)
2. 📈 **Marketing Kỹ thuật số & Tăng trưởng** (100 từ)
3. 🏋️ **Gym, Thể hình & Vận động** (100 từ)
4. 🩺 **Chăm sóc Sức khỏe & Y tế** (100 từ)
5. 🍳 **Nghệ thuật Ẩm thực & Nấu nướng** (100 từ)
6. 🛋️ **Đồ vật & Đời sống Gia đình** (100 từ)
7. 🦁 **Thế giới Động vật & Sinh thái** (100 từ)
8. ✈️ **Du lịch, Khám phá & Thế giới** (100 từ)
9. 💻 **Công nghệ, Lập trình & Trí tuệ AI** (100 từ)

### 3. Sơ đồ Mind-map 4 Chiều (2D Pan & Zoom)
- Kéo thả tự do trên nền canvas (Mouse Drag).
- Vuốt 2 ngón trên Trackpad (Touchpad Pan) cực nhạy.
- Cụm phím điều hướng D-Pad (Trái, Phải, Lên, Xuống).
- Thanh cuộn gradient tương tác ngang & dọc.
- Phóng to, thu nhỏ và căn giữa chỉ với một nút bấm.

### 4. Phát âm Bản ngữ Mọi Cấp độ (Audio Pronunciation)
- Tích hợp Web Speech API chất lượng cao trên:
  - Từng thẻ từ vựng đơn lẻ (kèm phiên âm IPA chuẩn).
  - Từng nhánh chủ đề phân cấp.
  - Ô chủ đề trung tâm của sơ đồ.

### 5. Đa dạng 4 Chế độ Học tập (Multi-view Modes)
- **Sơ đồ Mind-map (Visual Map):** Trải nghiệm không gian liên kết trực quan.
- **Cây thư mục (Tree View):** Xem danh sách phân cấp gọn gàng theo từng nhánh kèm nhãn CEFR.
- **Tập trung từng từ (Guided Focus Mode):** Tập trung học từng từ kèm ví dụ song ngữ Anh - Việt.
- **Thẻ Flashcard:** Chạm để lật mặt thẻ xem nghĩa và câu ví dụ ngữ cảnh.

### 6. Trung tâm Luyện tập Quiz & Spaced Repetition
- 6 dạng câu hỏi trắc nghiệm (Chọn nghĩa, chọn từ, điền khuyết, nghe phát âm, ghép từ, tình huống).
- Thuật toán ôn tập Spaced Repetition giúp chống lại đường cong lãng quên Ebbinghaus.
- Theo dõi Streak, điểm thành thạo (Mastery Score) và bảng điều khiển trực quan phong cách macOS Dark Mode.

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

- **Frontend:** React 19, TypeScript
- **Styling:** Tailwind CSS, Lucide Icons, Glassmorphism & macOS Modern Dark UI
- **Build Tool:** Vite, Oxlint
- **Audio:** Web Speech API (Native, Zero Dependency)

---

## 🚀 Hướng dẫn Cài đặt & Chạy ứng dụng

### Yêu cầu môi trường
- Node.js 18+
- npm hoặc yarn/pnpm

### Cài đặt
```bash
# 1. Clone repository
git clone https://github.com/Tranhai68/lifemap-english.git
cd lifemap-english

# 2. Cài đặt các thư viện phụ thuộc
npm install

# 3. Khởi chạy môi trường phát triển (Dev server)
npm run dev
```

Truy cập trình duyệt tại địa chỉ: `http://localhost:5173`

### Build phiên bản Production
```bash
npm run build
npm run preview
```

---

## 📄 Bản quyền (License)
Dự án được phân phối dưới giấy phép MIT.
