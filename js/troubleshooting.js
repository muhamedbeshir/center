/**
 * JavaScript خاص بصفحة حل المشاكل
 * إدارة التفاعل مع المشاكل والحلول
 */

// المتغيرات العامة
let isEmergencyModalOpen = false;
let expandedProblems = new Set();

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initializeTroubleshootingPage();
    setupProblemInteractions();
    setupSearchFunctionality();
    loadUserPreferences();
});

// تهيئة صفحة حل المشاكل
function initializeTroubleshootingPage() {
    console.log('تم تحميل صفحة حل المشاكل بنجاح');
    
    // إضافة تأثيرات بصرية للبطاقات
    const helpCards = document.querySelectorAll('.help-card');
    helpCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
    
    // إضافة أحداث للمشاكل
    setupProblemExpansion();
    
    // تحديد المشكلة من الرابط
    handleDirectLink();
}

// إعداد توسيع المشاكل
function setupProblemExpansion() {
    const problemItems = document.querySelectorAll('.problem-item');
    
    problemItems.forEach(item => {
        const header = item.querySelector('h3');
        if (header) {
            header.addEventListener('click', function() {
                toggleProblemExpansion(item);
            });
        }
    });
}

// تبديل توسيع المشكلة
function toggleProblemExpansion(problemItem) {
    const isExpanded = problemItem.classList.contains('expanded');
    
    if (isExpanded) {
        problemItem.classList.remove('expanded');
        expandedProblems.delete(problemItem.id || problemItem.querySelector('h3').textContent);
    } else {
        problemItem.classList.add('expanded');
        expandedProblems.add(problemItem.id || problemItem.querySelector('h3').textContent);
    }
    
    // حفظ الحالة
    saveUserPreferences();
    
    // تسجيل إحصائية
    logProblemView(problemItem);
}

// إعداد التفاعلات
function setupProblemInteractions() {
    // إغلاق المودال عند الضغط خارجه
    const emergencyModal = document.getElementById('emergencyModal');
    if (emergencyModal) {
        emergencyModal.addEventListener('click', function(e) {
            if (e.target === emergencyModal) {
                closeEmergencyModal();
            }
        });
    }
    
    // إغلاق المودال بمفتاح Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isEmergencyModalOpen) {
            closeEmergencyModal();
        }
    });
    
    // إضافة أحداث للروابط الجانبية
    const sidebarLinks = document.querySelectorAll('.troubleshooting-sidebar a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
            highlightSection(targetId);
        });
    });
}

// إعداد البحث
function setupSearchFunctionality() {
    // إضافة مربع بحث
    addSearchBox();
    
    // البحث في المحتوى
    const searchInput = document.getElementById('troubleshootingSearch');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            
            if (query.length < 2) {
                clearSearchHighlights();
                showAllProblems();
                return;
            }
            
            searchTimeout = setTimeout(() => {
                searchProblems(query);
            }, 300);
        });
    }
}

// إضافة مربع البحث
function addSearchBox() {
    const sidebar = document.querySelector('.troubleshooting-sidebar .sidebar-content');
    if (sidebar) {
        const searchHTML = `
            <div class="search-section" style="margin-bottom: 20px; padding: 15px; background: var(--bg-tertiary); border-radius: 8px;">
                <h4 style="margin-bottom: 10px; color: var(--text-primary);">
                    <i class="fas fa-search"></i> البحث في المشاكل
                </h4>
                <input type="text" id="troubleshootingSearch" placeholder="ابحث عن مشكلة..." 
                       style="width: 100%; padding: 8px 12px; border: 1px solid var(--border-color); 
                              border-radius: 6px; font-size: 14px;">
            </div>
        `;
        sidebar.insertAdjacentHTML('afterbegin', searchHTML);
    }
}

// البحث في المشاكل
function searchProblems(query) {
    const problemSections = document.querySelectorAll('.problem-section');
    const searchQuery = query.toLowerCase();
    let foundResults = false;
    
    // إخفاء جميع المشاكل أولاً
    hideAllProblems();
    
    problemSections.forEach(section => {
        const problemItems = section.querySelectorAll('.problem-item');
        let sectionHasResults = false;
        
        problemItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const content = item.querySelector('.solution').textContent.toLowerCase();
            
            if (title.includes(searchQuery) || content.includes(searchQuery)) {
                item.style.display = 'block';
                sectionHasResults = true;
                foundResults = true;
                
                // توسيع المشكلة إذا كانت تحتوي على النتيجة
                if (!item.classList.contains('expanded')) {
                    item.classList.add('expanded');
                }
                
                // إبراز النص المطابق
                highlightSearchTerm(item, searchQuery);
            }
        });
        
        // إظهار القسم إذا كان يحتوي على نتائج
        if (sectionHasResults) {
            section.style.display = 'block';
        }
    });
    
    // عرض رسالة إذا لم توجد نتائج
    if (!foundResults) {
        showNoSearchResults(query);
    }
}

// إخفاء جميع المشاكل
function hideAllProblems() {
    const problemSections = document.querySelectorAll('.problem-section');
    problemSections.forEach(section => {
        section.style.display = 'none';
        const items = section.querySelectorAll('.problem-item');
        items.forEach(item => {
            item.style.display = 'none';
        });
    });
    
    // إزالة رسالة "لا توجد نتائج" السابقة
    const noResults = document.querySelector('.no-search-results');
    if (noResults) {
        noResults.remove();
    }
}

// إظهار جميع المشاكل
function showAllProblems() {
    const problemSections = document.querySelectorAll('.problem-section');
    problemSections.forEach(section => {
        section.style.display = 'block';
        const items = section.querySelectorAll('.problem-item');
        items.forEach(item => {
            item.style.display = 'block';
        });
    });
    
    // إزالة رسالة "لا توجد نتائج"
    const noResults = document.querySelector('.no-search-results');
    if (noResults) {
        noResults.remove();
    }
}

// إبراز المصطلح المبحوث عنه
function highlightSearchTerm(element, term) {
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    const textNodes = [];
    let node;
    
    while (node = walker.nextNode()) {
        textNodes.push(node);
    }
    
    textNodes.forEach(textNode => {
        if (textNode.textContent.toLowerCase().includes(term)) {
            const parent = textNode.parentNode;
            const regex = new RegExp(`(${term})`, 'gi');
            const highlightedText = textNode.textContent.replace(regex, '<mark class="search-highlight">$1</mark>');
            
            const wrapper = document.createElement('span');
            wrapper.innerHTML = highlightedText;
            parent.replaceChild(wrapper, textNode);
        }
    });
}

// مسح تمييز البحث
function clearSearchHighlights() {
    const highlights = document.querySelectorAll('.search-highlight');
    highlights.forEach(highlight => {
        const parent = highlight.parentNode;
        parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
        parent.normalize();
    });
}

// عرض رسالة عدم وجود نتائج
function showNoSearchResults(query) {
    const content = document.querySelector('.troubleshooting-content');
    const noResultsHTML = `
        <div class="no-search-results" style="text-align: center; padding: 40px; background: var(--bg-tertiary); 
             border-radius: 12px; margin: 20px 0;">
            <i class="fas fa-search" style="font-size: 48px; color: var(--text-secondary); margin-bottom: 20px;"></i>
            <h3 style="color: var(--text-primary); margin-bottom: 10px;">لم يتم العثور على نتائج</h3>
            <p style="color: var(--text-secondary); margin-bottom: 20px;">
                لم نتمكن من العثور على أي مشاكل تحتوي على "${query}"
            </p>
            <div style="background: var(--bg-primary); padding: 20px; border-radius: 8px; text-align: right;">
                <h4 style="color: var(--text-primary); margin-bottom: 15px;">اقتراحات للبحث:</h4>
                <ul style="color: var(--text-secondary); list-style: none; padding: 0;">
                    <li style="margin-bottom: 8px;"><i class="fas fa-lightbulb" style="color: var(--warning-color); margin-left: 8px;"></i> تأكد من الإملاء الصحيح</li>
                    <li style="margin-bottom: 8px;"><i class="fas fa-lightbulb" style="color: var(--warning-color); margin-left: 8px;"></i> استخدم كلمات مفتاحية أبسط</li>
                    <li style="margin-bottom: 8px;"><i class="fas fa-lightbulb" style="color: var(--warning-color); margin-left: 8px;"></i> جرب مصطلحات مختلفة</li>
                    <li><i class="fas fa-lightbulb" style="color: var(--warning-color); margin-left: 8px;"></i> تصفح الأقسام مباشرة</li>
                </ul>
            </div>
        </div>
    `;
    content.insertAdjacentHTML('afterbegin', noResultsHTML);
}

// التمرير إلى قسم معين
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
        });
    }
}

// تمييز القسم
function highlightSection(sectionId) {
    // إزالة التمييز السابق
    const previousHighlight = document.querySelector('.section-highlighted');
    if (previousHighlight) {
        previousHighlight.classList.remove('section-highlighted');
    }
    
    // إضافة التمييز الجديد
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('section-highlighted');
        
        // إزالة التمييز بعد 3 ثوان
        setTimeout(() => {
            section.classList.remove('section-highlighted');
        }, 3000);
    }
}

// إضافة CSS للتمييز
const highlightStyle = document.createElement('style');
highlightStyle.textContent = `
    .section-highlighted {
        animation: sectionHighlight 3s ease-out;
    }
    
    @keyframes sectionHighlight {
        0% {
            background: rgba(59, 130, 246, 0.1);
            transform: scale(1.02);
        }
        100% {
            background: transparent;
            transform: scale(1);
        }
    }
    
    .search-highlight {
        background: yellow;
        padding: 2px 4px;
        border-radius: 3px;
        font-weight: bold;
    }
`;
document.head.appendChild(highlightStyle);

// معالجة الروابط المباشرة
function handleDirectLink() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        setTimeout(() => {
            scrollToSection(hash);
            highlightSection(hash);
            
            // توسيع المشكلة إذا كانت ضمن عنصر مشكلة
            const problemItem = document.querySelector(`#${hash}`)?.closest('.problem-item');
            if (problemItem && !problemItem.classList.contains('expanded')) {
                toggleProblemExpansion(problemItem);
            }
        }, 500);
    }
}

// حفظ تفضيلات المستخدم
function saveUserPreferences() {
    const preferences = {
        expandedProblems: Array.from(expandedProblems),
        lastVisit: new Date().toISOString()
    };
    
    try {
        localStorage.setItem('troubleshootingPreferences', JSON.stringify(preferences));
    } catch (e) {
        console.warn('لا يمكن حفظ التفضيلات:', e);
    }
}

// تحميل تفضيلات المستخدم
function loadUserPreferences() {
    try {
        const stored = localStorage.getItem('troubleshootingPreferences');
        if (stored) {
            const preferences = JSON.parse(stored);
            
            // استعادة المشاكل المفتوحة
            if (preferences.expandedProblems) {
                preferences.expandedProblems.forEach(problemId => {
                    const problemItem = document.getElementById(problemId) || 
                                      Array.from(document.querySelectorAll('.problem-item'))
                                           .find(item => item.querySelector('h3').textContent === problemId);
                    
                    if (problemItem) {
                        problemItem.classList.add('expanded');
                        expandedProblems.add(problemId);
                    }
                });
            }
        }
    } catch (e) {
        console.warn('لا يمكن تحميل التفضيلات:', e);
    }
}

// تسجيل مشاهدة المشكلة
function logProblemView(problemItem) {
    const problemTitle = problemItem.querySelector('h3').textContent;
    
    // إرسال إحصائية بسيطة (يمكن تطويرها حسب الحاجة)
    console.log('تم عرض المشكلة:', problemTitle);
    
    // يمكن إضافة إرسال للخادم هنا لتتبع المشاكل الأكثر شيوعاً
}

// وظائف المساعدة السريعة
function showUrgentHelp() {
    document.getElementById('emergencyModal').classList.add('active');
    isEmergencyModalOpen = true;
    document.body.style.overflow = 'hidden';
}

function closeEmergencyModal() {
    document.getElementById('emergencyModal').classList.remove('active');
    isEmergencyModalOpen = false;
    document.body.style.overflow = '';
}

function showQuickFAQ() {
    window.location.href = 'index.html#faq';
}

function reportBug() {
    // فتح نموذج بلاغ الأخطاء
    const bugReportModal = createBugReportModal();
    document.body.appendChild(bugReportModal);
}

function suggestImprovement() {
    // فتح نموذج اقتراح التحسينات
    const suggestionModal = createSuggestionModal();
    document.body.appendChild(suggestionModal);
}

// إنشاء مودال بلاغ الأخطاء
function createBugReportModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'bugReportModal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2><i class="fas fa-bug"></i> بلاغ خطأ</h2>
                <button class="modal-close" onclick="closeBugReportModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <form id="bugReportForm" style="display: flex; flex-direction: column; gap: 15px;">
                    <div>
                        <label style="display: block; margin-bottom: 5px; font-weight: 600;">نوع المشكلة:</label>
                        <select required style="width: 100%; padding: 8px; border: 1px solid var(--border-color); border-radius: 6px;">
                            <option value="">اختر نوع المشكلة</option>
                            <option value="login">مشكلة في تسجيل الدخول</option>
                            <option value="attendance">مشكلة في الحضور</option>
                            <option value="payments">مشكلة في المدفوعات</option>
                            <option value="reports">مشكلة في التقارير</option>
                            <option value="other">أخرى</option>
                        </select>
                    </div>
                    
                    <div>
                        <label style="display: block; margin-bottom: 5px; font-weight: 600;">وصف المشكلة:</label>
                        <textarea required rows="4" placeholder="اشرح المشكلة بالتفصيل..." 
                                style="width: 100%; padding: 8px; border: 1px solid var(--border-color); 
                                       border-radius: 6px; resize: vertical; font-family: inherit;"></textarea>
                    </div>
                    
                    <div>
                        <label style="display: block; margin-bottom: 5px; font-weight: 600;">خطوات إعادة المشكلة:</label>
                        <textarea rows="3" placeholder="1. افتح الصفحة&#10;2. اضغط على...&#10;3. تظهر رسالة خطأ" 
                                style="width: 100%; padding: 8px; border: 1px solid var(--border-color); 
                                       border-radius: 6px; resize: vertical; font-family: inherit;"></textarea>
                    </div>
                    
                    <div style="display: flex; gap: 10px; justify-content: flex-end;">
                        <button type="button" onclick="closeBugReportModal()" class="btn btn-secondary">إلغاء</button>
                        <button type="submit" class="btn btn-danger">إرسال البلاغ</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    // إضافة حدث الإرسال
    modal.querySelector('#bugReportForm').addEventListener('submit', function(e) {
        e.preventDefault();
        submitBugReport(this);
    });
    
    // إظهار المودال
    setTimeout(() => modal.classList.add('active'), 100);
    
    return modal;
}

// إنشاء مودال اقتراح التحسينات
function createSuggestionModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'suggestionModal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2><i class="fas fa-lightbulb"></i> اقتراح تحسين</h2>
                <button class="modal-close" onclick="closeSuggestionModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <form id="suggestionForm" style="display: flex; flex-direction: column; gap: 15px;">
                    <div>
                        <label style="display: block; margin-bottom: 5px; font-weight: 600;">نوع التحسين:</label>
                        <select required style="width: 100%; padding: 8px; border: 1px solid var(--border-color); border-radius: 6px;">
                            <option value="">اختر نوع التحسين</option>
                            <option value="feature">ميزة جديدة</option>
                            <option value="ui">تحسين الواجهة</option>
                            <option value="performance">تحسين الأداء</option>
                            <option value="usability">سهولة الاستخدام</option>
                            <option value="other">أخرى</option>
                        </select>
                    </div>
                    
                    <div>
                        <label style="display: block; margin-bottom: 5px; font-weight: 600;">العنوان:</label>
                        <input type="text" required placeholder="عنوان مختصر للاقتراح" 
                               style="width: 100%; padding: 8px; border: 1px solid var(--border-color); border-radius: 6px;">
                    </div>
                    
                    <div>
                        <label style="display: block; margin-bottom: 5px; font-weight: 600;">وصف الاقتراح:</label>
                        <textarea required rows="4" placeholder="اشرح اقتراحك بالتفصيل والفائدة المرجوة منه..." 
                                style="width: 100%; padding: 8px; border: 1px solid var(--border-color); 
                                       border-radius: 6px; resize: vertical; font-family: inherit;"></textarea>
                    </div>
                    
                    <div style="display: flex; gap: 10px; justify-content: flex-end;">
                        <button type="button" onclick="closeSuggestionModal()" class="btn btn-secondary">إلغاء</button>
                        <button type="submit" class="btn btn-success">إرسال الاقتراح</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    // إضافة حدث الإرسال
    modal.querySelector('#suggestionForm').addEventListener('submit', function(e) {
        e.preventDefault();
        submitSuggestion(this);
    });
    
    // إظهار المودال
    setTimeout(() => modal.classList.add('active'), 100);
    
    return modal;
}

// إغلاق مودال بلاغ الأخطاء
function closeBugReportModal() {
    const modal = document.getElementById('bugReportModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
}

// إغلاق مودال الاقتراحات
function closeSuggestionModal() {
    const modal = document.getElementById('suggestionModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
}

// إرسال بلاغ الخطأ
function submitBugReport(form) {
    const formData = new FormData(form);
    
    // يمكن هنا إرسال البيانات للخادم
    console.log('تم إرسال بلاغ خطأ:', Object.fromEntries(formData));
    
    // إظهار رسالة نجاح
    showNotification('تم إرسال البلاغ بنجاح! سيتم مراجعته والرد عليك قريباً.', 'success');
    
    closeBugReportModal();
}

// إرسال اقتراح التحسين
function submitSuggestion(form) {
    const formData = new FormData(form);
    
    // يمكن هنا إرسال البيانات للخادم
    console.log('تم إرسال اقتراح:', Object.fromEntries(formData));
    
    // إظهار رسالة نجاح
    showNotification('تم إرسال اقتراحك بنجاح! نقدر مساهمتك في تطوير النظام.', 'success');
    
    closeSuggestionModal();
}

// عرض الإشعارات
function showNotification(message, type = 'info') {
    // استخدام نفس نظام الإشعارات من ملف modules.js
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    notification.innerHTML = `
        <i class="${icons[type] || icons.info}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : type === 'warning' ? '#f59e0b' : '#06b6d4'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10001;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// تصدير الوظائف للاستخدام العام
window.troubleshootingSystem = {
    showUrgentHelp,
    closeEmergencyModal,
    showQuickFAQ,
    reportBug,
    suggestImprovement,
    scrollToSection,
    highlightSection,
    toggleProblemExpansion
};
