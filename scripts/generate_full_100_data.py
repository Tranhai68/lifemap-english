import json
import os

# Categories (9 total)
categories = [
  {
    "id": "business",
    "nameEn": "Business & Commerce",
    "nameVi": "Kinh doanh & Thương mại",
    "description": "Chiến lược, khởi nghiệp, tài chính và đàm phán thương mại.",
    "icon": "Briefcase",
    "color": "#DEDBC8",
    "order": 1
  },
  {
    "id": "marketing",
    "nameEn": "Marketing & Growth",
    "nameVi": "Marketing & Tăng trưởng số",
    "description": "Branding, chuyển đổi, quảng cáo số và tiếp thị nội dung.",
    "icon": "TrendingUp",
    "color": "#38BDF8",
    "order": 2
  },
  {
    "id": "fitness",
    "nameEn": "Fitness & Physical Power",
    "nameVi": "Thể hình & Rèn luyện Thể lực",
    "description": "Tập luyện cường độ, cơ bắp, sức bền và dinh dưỡng thể thao.",
    "icon": "Dumbbell",
    "color": "#10B981",
    "order": 3
  },
  {
    "id": "wellness",
    "nameEn": "Health & Medical Wellness",
    "nameVi": "Chăm sóc Sức khỏe & Y tế",
    "description": "Thói quen lành mạnh, giấc ngủ, kiểm soát căng thẳng và sơ cứu.",
    "icon": "HeartPulse",
    "color": "#FB7185",
    "order": 4
  },
  {
    "id": "culinary",
    "nameEn": "Culinary Arts & Cooking",
    "nameVi": "Ẩm thực & Nghệ thuật Nấu nướng",
    "description": "Kỹ thuật chế biến, gia vị, hương vị và văn hóa thưởng thức.",
    "icon": "Utensils",
    "color": "#F59E0B",
    "order": 5
  },
  {
    "id": "household",
    "nameEn": "Household & Daily Objects",
    "nameVi": "Đồ vật & Đời sống Thường nhật",
    "description": "Thiết bị gia đình, đồ nội thất và đồ dùng thông minh hằng ngày.",
    "icon": "Home",
    "color": "#A78BFA",
    "order": 6
  },
  {
    "id": "nature",
    "nameEn": "Wildlife & Living Ecosystems",
    "nameVi": "Động vật Hoang dã & Thiên nhiên",
    "description": "Hệ sinh thái, tập tính động vật và bảo tồn môi trường tự nhiên.",
    "icon": "Trees",
    "color": "#34D399",
    "order": 7
  },
  {
    "id": "travel",
    "nameEn": "Global World & Travel",
    "nameVi": "Du lịch Toàn cầu & Khám phá",
    "description": "Hành trình khám phá, văn hóa thế giới và giao thông vận tải.",
    "icon": "Compass",
    "color": "#60A5FA",
    "order": 8
  },
  {
    "id": "tech",
    "nameEn": "Tech, AI & Future Worlds",
    "nameVi": "Công nghệ số, AI & Tương lai",
    "description": "Trí tuệ nhân tạo, lập trình phần mềm, thiết bị tương lai.",
    "icon": "Cpu",
    "color": "#F472B6",
    "order": 9
  }
]

topics_meta = [
  {
    "id": "topic-business-strategy",
    "categoryId": "business",
    "nameEn": "Executive Strategy & Venture Growth",
    "nameVi": "Chiến lược Doanh nghiệp & Khởi nghiệp",
    "description": "Từ vựng từ văn phòng cơ bản, buôn bán hằng ngày đến gọi vốn và đàm phán cấp cao.",
    "coverImage": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    "cefrRange": "A1 - C1",
    "status": "In Progress",
    "progress": 75,
    "branchCount": 4,
    "wordCount": 100,
    "featured": True
  },
  {
    "id": "topic-digital-marketing",
    "categoryId": "marketing",
    "nameEn": "Digital Marketing & Conversion Funnels",
    "nameVi": "Marketing Kỹ thuật số & Phễu Chuyển đổi",
    "description": "Từ vựng quảng cáo cơ bản, mạng xã hội đến phễu chuyển đổi số và định vị thương hiệu.",
    "coverImage": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    "cefrRange": "A1 - C1",
    "status": "In Progress",
    "progress": 68,
    "branchCount": 4,
    "wordCount": 100,
    "featured": True
  },
  {
    "id": "topic-gym-fitness",
    "categoryId": "fitness",
    "nameEn": "Fitness & Physical Power",
    "nameVi": "Thể hình & Rèn luyện Thể lực",
    "description": "Vận động cơ bản, bài tập thể thao đến sức bền cơ bắp và phục hồi sinh cơ học.",
    "coverImage": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
    "cefrRange": "A1 - C1",
    "status": "In Progress",
    "progress": 82,
    "branchCount": 4,
    "wordCount": 100,
    "featured": True
  },
  {
    "id": "topic-health-wellness",
    "categoryId": "wellness",
    "nameEn": "Health & Medical Wellness",
    "nameVi": "Chăm sóc Sức khỏe & Y tế",
    "description": "Triệu chứng thông thường, chăm sóc hằng ngày đến y học phòng ngừa và lâm sàng.",
    "coverImage": "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1200&auto=format&fit=crop",
    "cefrRange": "A1 - C1",
    "status": "In Progress",
    "progress": 60,
    "branchCount": 4,
    "wordCount": 100,
    "featured": False
  },
  {
    "id": "topic-culinary-mastery",
    "categoryId": "culinary",
    "nameEn": "Culinary Arts & Cooking",
    "nameVi": "Ẩm thực & Nghệ thuật Nấu nướng",
    "description": "Nhà bếp cơ bản, nguyên liệu hằng ngày đến kỹ thuật chế biến và ẩm thực đỉnh cao.",
    "coverImage": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop",
    "cefrRange": "A1 - C1",
    "status": "In Progress",
    "progress": 70,
    "branchCount": 4,
    "wordCount": 100,
    "featured": False
  },
  {
    "id": "topic-household-modern",
    "categoryId": "household",
    "nameEn": "Household & Daily Objects",
    "nameVi": "Đồ vật & Đời sống Thường nhật",
    "description": "Đồ dùng gia đình đơn giản, phòng ốc đến thiết bị gia dụng và nhà thông minh.",
    "coverImage": "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1200&auto=format&fit=crop",
    "cefrRange": "A1 - C1",
    "status": "Not Started",
    "progress": 0,
    "branchCount": 4,
    "wordCount": 100,
    "featured": False
  },
  {
    "id": "topic-wildlife-ecosystem",
    "categoryId": "nature",
    "nameEn": "Wildlife & Living Ecosystems",
    "nameVi": "Động vật Hoang dã & Thiên nhiên",
    "description": "Động vật quen thuộc, tự nhiên gần gũi đến sinh thái đại dương và bảo tồn đa dạng sinh học.",
    "coverImage": "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=1200&auto=format&fit=crop",
    "cefrRange": "A1 - C1",
    "status": "Not Started",
    "progress": 0,
    "branchCount": 4,
    "wordCount": 100,
    "featured": False
  },
  {
    "id": "topic-travel-journey",
    "categoryId": "travel",
    "nameEn": "Global World & Travel",
    "nameVi": "Du lịch Toàn cầu & Khám phá",
    "description": "Phương tiện di chuyển, chuyến đi cơ bản đến sân bay, phong cảnh và thám hiểm thế giới.",
    "coverImage": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop",
    "cefrRange": "A1 - C1",
    "status": "In Progress",
    "progress": 45,
    "branchCount": 4,
    "wordCount": 100,
    "featured": False
  },
  {
    "id": "topic-tech-ai-future",
    "categoryId": "tech",
    "nameEn": "Tech, AI & Future Worlds",
    "nameVi": "Công nghệ số, AI & Tương lai",
    "description": "Thiết bị số cơ bản, ứng dụng hằng ngày đến lập trình, đám mây và trí tuệ nhân tạo tương lai.",
    "coverImage": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    "cefrRange": "A1 - C1",
    "status": "In Progress",
    "progress": 64,
    "branchCount": 4,
    "wordCount": 100,
    "featured": True
  }
]

print("Topics meta ready:", len(topics_meta))
