// CCF期刊会议集合 - 主要功能脚本
class CCFDirectory {
    constructor() {
        this.data = null;
        this.filteredData = {
            journals: [],
            conferences: []
        };
        this.currentFilters = {
            search: '',
            type: 'all',
            level: 'all'
        };
        
        this.init();
    }

    async init() {
        try {
            await this.loadData();
            this.bindEvents();
            // 初始化完成后立即应用默认筛选（显示全部）
            this.applyFilters();
            this.render();
        } catch (error) {
            console.error('初始化失败:', error);
            this.showError('数据加载失败，请刷新页面重试');
        }
    }

    async loadData() {
        try {
            const response = await fetch('./public/data/ccf_complete.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.data = await response.json();
            this.updateStats();
        } catch (error) {
            console.error('加载数据失败:', error);
            throw error;
        }
    }

    updateStats() {
        if (!this.data) return;

        const metadata = this.data.metadata;
        document.getElementById('totalCount').textContent = metadata.total_items;
        document.getElementById('journalCount').textContent = metadata.journals_count;
        document.getElementById('conferenceCount').textContent = metadata.conferences_count;
    }

    bindEvents() {
        // 搜索功能
        const searchInput = document.getElementById('searchInput');
        const clearSearch = document.getElementById('clearSearch');
        
        searchInput.addEventListener('input', (e) => {
            this.currentFilters.search = e.target.value.trim();
            this.toggleClearButton();
            this.applyFilters();
        });

        clearSearch.addEventListener('click', () => {
            searchInput.value = '';
            this.currentFilters.search = '';
            this.toggleClearButton();
            this.applyFilters();
            searchInput.focus();
        });

        // 类型筛选
        const typeFilters = document.querySelectorAll('[data-type]');
        typeFilters.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setActiveFilter(typeFilters, e.target);
                this.currentFilters.type = e.target.dataset.type;
                this.applyFilters();
            });
        });

        // 级别筛选
        const levelFilters = document.querySelectorAll('[data-level]');
        levelFilters.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setActiveFilter(levelFilters, e.target);
                this.currentFilters.level = e.target.dataset.level;
                this.applyFilters();
            });
        });

        // 重置筛选
        document.getElementById('resetFilters').addEventListener('click', () => {
            this.resetFilters();
        });

        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
            }
            if (e.key === 'Escape') {
                this.resetFilters();
            }
        });
    }

    setActiveFilter(buttons, activeButton) {
        buttons.forEach(btn => btn.classList.remove('active'));
        activeButton.classList.add('active');
    }

    toggleClearButton() {
        const clearBtn = document.getElementById('clearSearch');
        const searchInput = document.getElementById('searchInput');
        clearBtn.style.display = searchInput.value ? 'block' : 'none';
    }

    applyFilters() {
        if (!this.data) return;

        const { search, type, level } = this.currentFilters;
        const searchLower = search.toLowerCase();

        // 筛选期刊
        this.filteredData.journals = this.data.data.journals.filter(item => {
            const matchesSearch = !search || 
                item.abbr.toLowerCase().includes(searchLower) ||
                item.name_en.toLowerCase().includes(searchLower) ||
                item.name_cn.toLowerCase().includes(searchLower);
            
            const matchesType = type === 'all' || item.type === type;
            const matchesLevel = level === 'all' || item.level === level;
            
            return matchesSearch && matchesType && matchesLevel;
        });

        // 筛选会议
        this.filteredData.conferences = this.data.data.conferences.filter(item => {
            const matchesSearch = !search || 
                item.abbr.toLowerCase().includes(searchLower) ||
                item.name_en.toLowerCase().includes(searchLower) ||
                item.name_cn.toLowerCase().includes(searchLower);
            
            const matchesType = type === 'all' || item.type === type;
            const matchesLevel = level === 'all' || item.level === level;
            
            return matchesSearch && matchesType && matchesLevel;
        });

        this.render();
    }

    resetFilters() {
        // 重置搜索
        document.getElementById('searchInput').value = '';
        this.currentFilters.search = '';
        this.toggleClearButton();

        // 重置类型筛选
        const typeFilters = document.querySelectorAll('[data-type]');
        typeFilters.forEach(btn => btn.classList.remove('active'));
        typeFilters[0].classList.add('active'); // "全部"按钮
        this.currentFilters.type = 'all';

        // 重置级别筛选
        const levelFilters = document.querySelectorAll('[data-level]');
        levelFilters.forEach(btn => btn.classList.remove('active'));
        levelFilters[0].classList.add('active'); // "全部"按钮
        this.currentFilters.level = 'all';

        this.applyFilters();
    }

    render() {
        this.hideLoading();
        this.updateResultsCount();
        this.renderCategories();
    }

    hideLoading() {
        document.getElementById('loadingSpinner').style.display = 'none';
    }

    updateResultsCount() {
        const totalResults = this.filteredData.journals.length + this.filteredData.conferences.length;
        document.getElementById('resultsCount').textContent = `显示 ${totalResults} 个结果`;
        
        // 更新分类计数
        document.getElementById('journalCountDisplay').textContent = this.filteredData.journals.length;
        document.getElementById('conferenceCountDisplay').textContent = this.filteredData.conferences.length;
    }

    renderCategories() {
        const journalsSection = document.getElementById('journalsSection');
        const conferencesSection = document.getElementById('conferencesSection');
        const emptyState = document.getElementById('emptyState');

        // 检查是否有结果
        const hasResults = this.filteredData.journals.length > 0 || this.filteredData.conferences.length > 0;

        if (!hasResults) {
            journalsSection.style.display = 'none';
            conferencesSection.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';

        // 渲染期刊
        if (this.filteredData.journals.length > 0) {
            journalsSection.style.display = 'block';
            this.renderItems(this.filteredData.journals, 'journalsGrid', 'journal');
        } else {
            journalsSection.style.display = 'none';
        }

        // 渲染会议
        if (this.filteredData.conferences.length > 0) {
            conferencesSection.style.display = 'block';
            this.renderItems(this.filteredData.conferences, 'conferencesGrid', 'conference');
        } else {
            conferencesSection.style.display = 'none';
        }
    }

    renderItems(items, containerId, type) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';

        items.forEach(item => {
            const itemElement = this.createItemElement(item, type);
            container.appendChild(itemElement);
        });
    }

    createItemElement(item, type) {
        const div = document.createElement('div');
        div.className = 'item-card';
        div.setAttribute('data-id', item.id);

        div.innerHTML = `
            <div class="item-header">
                <div class="item-title">
                    <div class="item-title-en">${this.escapeHtml(item.name_en)}</div>
                    <div class="item-title-cn">${this.escapeHtml(item.name_cn)}</div>
                </div>
                <div class="item-abbr">${this.escapeHtml(item.abbr)}</div>
            </div>
            
            <div class="item-meta">
                <div class="meta-item">
                    <span class="level-badge level-${item.level.toLowerCase()}">${item.level}类</span>
                </div>
                <div class="meta-item">
                    <span class="category-tag">${this.escapeHtml(item.category)}</span>
                </div>
            </div>
            
            <div class="item-description">
                ${this.escapeHtml(item.description)}
            </div>
            
            <div class="item-footer">
                <div class="publisher">${this.escapeHtml(item.publisher)}</div>
                <a href="${this.escapeHtml(item.website)}" target="_blank" rel="noopener noreferrer" 
                   class="website-link" onclick="event.stopPropagation()">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15,3 21,3 21,9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    官网
                </a>
            </div>
        `;

        // 添加点击事件
        div.addEventListener('click', () => {
            window.open(item.website, '_blank', 'noopener,noreferrer');
        });

        return div;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showError(message) {
        const loadingSpinner = document.getElementById('loadingSpinner');
        loadingSpinner.innerHTML = `
            <div style="text-align: center; color: var(--level-a-color);">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
                <h3 style="margin: 1rem 0;">加载失败</h3>
                <p>${message}</p>
                <button onclick="location.reload()" style="
                    margin-top: 1rem;
                    padding: 0.5rem 1rem;
                    background: var(--primary-color);
                    color: white;
                    border: none;
                    border-radius: 0.375rem;
                    cursor: pointer;
                ">重新加载</button>
            </div>
        `;
    }
}

// 工具函数
const Utils = {
    // 防抖函数
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // 高亮搜索关键词
    highlightText(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    },

    // 格式化日期
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    // 检查是否为移动设备
    isMobile() {
        return window.innerWidth <= 768;
    }
};

// 页面性能监控
const Performance = {
    startTime: performance.now(),
    
    logLoadTime() {
        window.addEventListener('load', () => {
            const loadTime = performance.now() - this.startTime;
            console.log(`页面加载时间: ${loadTime.toFixed(2)}ms`);
        });
    }
};

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    // 初始化CCF目录
    window.ccfDirectory = new CCFDirectory();
    
    // 性能监控
    Performance.logLoadTime();
    
    // 添加全局错误处理
    window.addEventListener('error', (e) => {
        console.error('全局错误:', e.error);
    });
    
    // 添加未处理的Promise错误处理
    window.addEventListener('unhandledrejection', (e) => {
        console.error('未处理的Promise错误:', e.reason);
    });
});

// 导出给全局使用
window.CCFDirectory = CCFDirectory;
window.Utils = Utils;