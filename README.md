# CCF期刊会议集合网站

一个简洁现代的学术风格网站，展示中国计算机学会(CCF)推荐的期刊和会议信息。

## 🌟 项目特色

- **完整数据**：收录280个CCF推荐的期刊和会议
- **智能搜索**：支持按缩写、英文名、中文名搜索
- **多维筛选**：按类型(期刊/会议)和级别(A/B/C类)筛选
- **响应式设计**：完美适配桌面、平板、手机等设备
- **学术风格**：简洁现代的界面设计
- **一键跳转**：直接访问期刊/会议官方网站

## 📊 数据统计

- **总计**：280个期刊和会议
- **期刊**：96个 (A类35个 + B类61个)
- **会议**：184个 (A类58个 + B类54个 + C类72个)
- **覆盖领域**：10个主要CCF专业领域

## 🚀 快速开始

### 部署到GitHub Pages

1. **Fork项目**
   ```bash
   # 将项目文件上传到您的GitHub仓库
   ```

2. **启用GitHub Pages**
   - 进入仓库 Settings → Pages
   - 选择 Source: Deploy from a branch
   - 选择 Branch: main / (root)
   - 点击 Save

3. **访问网站**
   ```
   https://yourusername.github.io/your-repository-name
   ```

### 本地开发

1. **克隆项目**
   ```bash
   git clone https://github.com/yourusername/ccf-website.git
   cd ccf-website
   ```

2. **启动本地服务器**
   ```bash
   # 使用Python
   python -m http.server 8080
   
   # 或使用Node.js
   npx serve .
   ```

3. **访问网站**
   ```
   http://localhost:8080
   ```

## 📁 项目结构

```
ccf-website/
├── index.html              # 主页面
├── README.md              # 项目说明
├── css/
│   └── styles.css         # 样式文件
├── js/
│   └── main.js           # 主要功能脚本
└── public/
    └── data/
        └── ccf_complete.json  # CCF数据文件
```

## 🔧 功能特性

### 搜索功能
- **实时搜索**：输入即时显示结果
- **多字段搜索**：支持缩写、英文名、中文名
- **模糊匹配**：智能识别关键词

### 筛选功能
- **类型筛选**：全部 / 期刊 / 会议
- **级别筛选**：全部 / A类 / B类 / C类
- **组合筛选**：支持多个条件同时筛选

### 展示功能
- **详细信息**：显示中英文名称、缩写、分类、描述
- **级别标识**：清晰的A/B/C级别标识
- **外链跳转**：一键访问官方网站
- **统计信息**：实时显示筛选结果数量

## 🎨 技术栈

- **前端**：HTML5 + CSS3 + JavaScript (ES6+)
- **样式**：原生CSS，响应式设计
- **字体**：Google Fonts (Inter)
- **图标**：SVG图标
- **数据**：JSON格式存储

## 📱 响应式设计

- **桌面端**：完整功能展示
- **平板端**：适配中等屏幕
- **移动端**：优化触摸体验

## 🔄 数据更新

### 更新CCF数据

1. **获取最新数据**
   - 访问CCF官方目录
   - 下载最新的期刊会议列表

2. **更新数据文件**
   - 编辑 `public/data/ccf_complete.json`
   - 保持数据格式一致性

3. **更新统计信息**
   - 修改 `index.html` 中的默认统计数字
   - 更新 `js/main.js` 中的统计显示逻辑

### 数据格式

```json
{
  "metadata": {
    "title": "中国计算机学会推荐国际学术期刊和会议目录",
    "version": "2024.1",
    "last_updated": "2025-11-04",
    "total_items": 280,
    "journals_count": 96,
    "conferences_count": 184
  },
  "data": {
    "journals": [...],
    "conferences": [...]
  }
}
```

## 🎯 使用场景

- **学术研究**：查找合适的期刊和会议投稿
- **学术评估**：了解期刊会议的CCF级别
- **学习参考**：了解计算机科学领域的重要期刊会议
- **选刊选会**：为学术论文选择合适的发表平台

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🤝 贡献

欢迎提交问题和改进建议！

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 [Issue](../../issues)

## 🙏 致谢

- [中国计算机学会(CCF)](https://www.ccf.org.cn/) - 提供权威的期刊会议推荐目录
- [Google Fonts](https://fonts.google.com/) - 提供Inter字体
- 所有为学术资源整理做出贡献的研究者和机构

---

**最后更新**：2025年11月4日
