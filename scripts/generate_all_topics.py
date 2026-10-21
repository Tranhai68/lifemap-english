import json
import re

# Comprehensive categories
categories = [
  {"id": "business", "nameEn": "Business & Commerce", "nameVi": "Kinh doanh & Thương mại", "description": "Từ vựng từ vỡ lòng (mua, bán, tiền, giá) đến quản trị, tài chính và chiến lược.", "icon": "Briefcase", "color": "#DEDBC8", "order": 1},
  {"id": "marketing", "nameEn": "Marketing & Growth", "nameVi": "Marketing & Tăng trưởng số", "description": "Từ ngữ mạng xã hội, quảng cáo cơ bản đến phễu chuyển đổi và thương hiệu.", "icon": "TrendingUp", "color": "#38BDF8", "order": 2},
  {"id": "fitness", "nameEn": "Fitness & Physical Power", "nameVi": "Thể hình & Rèn luyện Thể lực", "description": "Động tác cơ thể, gym cơ bản đến cơ sinh học, tạ nặng và dinh dưỡng phục hồi.", "icon": "Dumbbell", "color": "#10B981", "order": 3},
  {"id": "wellness", "nameEn": "Health & Medical Wellness", "nameVi": "Chăm sóc Sức khỏe & Y tế", "description": "Triệu chứng thường gặp, thuốc men cơ bản đến nhịp sinh học và trường thọ.", "icon": "HeartPulse", "color": "#FB7185", "order": 4},
  {"id": "culinary", "nameEn": "Culinary Arts & Cooking", "nameVi": "Ẩm thực & Nghệ thuật Nấu nướng", "description": "Dụng cụ làm bếp, nấu nướng hằng ngày đến kỹ thuật đầu bếp và làm bánh.", "icon": "Utensils", "color": "#F59E0B", "order": 5},
  {"id": "household", "nameEn": "Household & Daily Objects", "nameVi": "Đồ vật & Đời sống Thường nhật", "description": "Đồ vật trong nhà, phòng ốc sinh hoạt đến thiết bị thông minh và đồ bảo dưỡng.", "icon": "Home", "color": "#A78BFA", "order": 6},
  {"id": "nature", "nameEn": "Wildlife & Living Ecosystems", "nameVi": "Động vật hoang dã & Thiên nhiên", "description": "Thú cưng, con vật gần gũi đến động vật săn mồi, đại dương và bảo tồn.", "icon": "TreePine", "color": "#34D399", "order": 7},
  {"id": "travel", "nameEn": "Global World & Expeditions", "nameVi": "Thế giới & Du lịch Khám phá", "description": "Đi lại, hỏi đường, khách sạn cơ bản đến thủ tục hàng không và văn hóa quốc tế.", "icon": "Compass", "color": "#60A5FA", "order": 8},
  {"id": "technology", "nameEn": "Tech, AI & Future Worlds", "nameVi": "Công nghệ số & Trí tuệ nhân tạo", "description": "Máy tính, mạng internet hằng ngày đến trí tuệ nhân tạo tạo sinh và an ninh mạng.", "icon": "Cpu", "color": "#C084FC", "order": 9},
]

print("Ready to assemble topics.")
