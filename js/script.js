/**
 * نظام إدارة المركز التعليمي - دليل الاستخدام
 * ملف JavaScript الرئيسي للتفاعل والتنقل
 */

// ===========================
// المتغيرات العامة
// ===========================
let currentSection = 'overview';
let searchResults = [];
let isSearching = false;

// ===========================
// تهيئة النظام عند تحميل الصفحة
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSearch();
    initializeFAQ();
    initializeScrollSpy();
    loadModuleData();
    
    // تحميل المحتوى الأولي
    showSection('overview');
    
    console.log('نظام المساعدة جاهز للاستخدام');
});

// ===========================
// نظام التنقل بين الأقسام
// ===========================
function initializeNavigation() {
    // أحداث أزرار التنقل الرئيسية
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('href').substring(1);
            showSection(targetSection);
            updateActiveNavLink(this);
        });
    });
    
    // أحداث روابط الشريط الجانبي
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('href').substring(1);
            showSection(targetSection);
            updateActiveNavLink(document.querySelector(`[href="#${targetSection}"]`));
        });
    });
}

function showSection(sectionId) {
    // إخفاء جميع الأقسام
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // إظهار القسم المطلوب
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionId;
        
        // تحديث عنوان الصفحة
        updatePageTitle(sectionId);
        
        // تحديث URL
        history.pushState({section: sectionId}, '', `#${sectionId}`);
        
        // تمرير إلى أعلى المحتوى
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (sectionId.includes('-module')) {
        // إذا كان قسم موديول، قم بتحميله ديناميكياً
        loadModuleSection(sectionId);
    }
}

function updateActiveNavLink(activeLink) {
    // إزالة الحالة النشطة من جميع الروابط
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // إضافة الحالة النشطة للرابط المحدد
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

function updatePageTitle(sectionId) {
    const titles = {
        'overview': 'نظرة عامة',
        'getting-started': 'البدء السريع',
        'modules': 'الموديولات',
        'faq': 'الأسئلة الشائعة',
        'troubleshooting': 'حل المشاكل'
    };
    
    const title = titles[sectionId] || 'دليل الاستخدام';
    document.title = `${title} - نظام إدارة المركز التعليمي`;
}

// ===========================
// نظام البحث
// ===========================
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const query = this.value.trim();
        
        if (query.length < 2) {
            clearSearchResults();
            return;
        }
        
        // تأخير البحث لتحسين الأداء
        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    });
    
    // البحث عند الضغط على Enter
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = this.value.trim();
            if (query.length >= 2) {
                performSearch(query);
            }
        }
    });
}

function performSearch(query) {
    isSearching = true;
    searchResults = [];
    
    // البحث في المحتوى الحالي
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        searchInSection(section, query);
    });
    
    // البحث في بيانات الموديولات
    searchInModules(query);
    
    // عرض النتائج
    displaySearchResults(query);
    isSearching = false;
}

function searchInSection(section, query) {
    const elements = section.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li');
    elements.forEach(element => {
        const text = element.textContent.toLowerCase();
        if (text.includes(query.toLowerCase())) {
            searchResults.push({
                type: 'content',
                title: getElementTitle(element),
                content: element.textContent.substring(0, 200) + '...',
                section: section.id,
                element: element
            });
        }
    });
}

function searchInModules(query) {
    // البحث في بيانات الموديولات المحفوظة
    if (window.moduleData) {
        Object.keys(window.moduleData).forEach(moduleId => {
            const module = window.moduleData[moduleId];
            if (module.title.toLowerCase().includes(query.toLowerCase()) ||
                module.description.toLowerCase().includes(query.toLowerCase())) {
                searchResults.push({
                    type: 'module',
                    title: module.title,
                    content: module.description,
                    section: moduleId,
                    module: module
                });
            }
        });
    }
}

function getElementTitle(element) {
    // البحث عن أقرب عنوان
    let title = element.tagName.toLowerCase();
    if (title.match(/h[1-6]/)) {
        return element.textContent;
    }
    
    let parent = element.parentElement;
    while (parent) {
        const heading = parent.querySelector('h1, h2, h3, h4, h5, h6');
        if (heading) {
            return heading.textContent;
        }
        parent = parent.parentElement;
    }
    
    return 'نتيجة البحث';
}

function displaySearchResults(query) {
    if (searchResults.length === 0) {
        showNoResults(query);
        return;
    }
    
    // إنشاء صفحة نتائج البحث
    createSearchResultsSection(query);
}

function createSearchResultsSection(query) {
    // إزالة قسم النتائج السابق إن وجد
    const existingResults = document.getElementById('search-results');
    if (existingResults) {
        existingResults.remove();
    }
    
    // إنشاء قسم النتائج الجديد
    const resultsSection = document.createElement('section');
    resultsSection.id = 'search-results';
    resultsSection.className = 'content-section';
    
    resultsSection.innerHTML = `
        <div class="section-header">
            <h2><i class="fas fa-search"></i> نتائج البحث عن "${query}"</h2>
            <p>تم العثور على ${searchResults.length} نتيجة</p>
        </div>
        <div class="search-results-container">
            ${searchResults.map(result => createSearchResultItem(result)).join('')}
        </div>
        <div class="search-actions">
            <button onclick="clearSearchResults()" class="btn btn-secondary">
                <i class="fas fa-times"></i> إغلاق النتائج
            </button>
        </div>
    `;
    
    // إضافة القسم للمحتوى
    document.getElementById('module-content').appendChild(resultsSection);
    
    // إظهار النتائج
    showSection('search-results');
}

function createSearchResultItem(result) {
    return `
        <div class="search-result-item" onclick="goToSearchResult('${result.section}', ${result.element ? 'true' : 'false'})">
            <div class="result-header">
                <h4><i class="fas fa-${result.type === 'module' ? 'puzzle-piece' : 'file-text'}"></i> ${result.title}</h4>
                <span class="result-type">${result.type === 'module' ? 'موديول' : 'محتوى'}</span>
            </div>
            <p class="result-content">${result.content}</p>
            <div class="result-section">القسم: ${getSectionName(result.section)}</div>
        </div>
    `;
}

function goToSearchResult(sectionId, hasElement) {
    showSection(sectionId);
    
    if (hasElement) {
        // التمرير إلى العنصر المحدد
        setTimeout(() => {
            const element = searchResults.find(r => r.section === sectionId)?.element;
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // تأثير بصري للعنصر
                element.style.background = 'rgba(59, 130, 246, 0.1)';
                setTimeout(() => {
                    element.style.background = '';
                }, 2000);
            }
        }, 500);
    }
}

function getSectionName(sectionId) {
    const sectionNames = {
        'overview': 'نظرة عامة',
        'getting-started': 'البدء السريع',
        'faq': 'الأسئلة الشائعة',
        'students-module': 'إدارة الطلاب',
        'groups-module': 'إدارة المجموعات',
        'teachers-module': 'إدارة المعلمين',
        'attendance-module': 'نظام الحضور',
        'payments-module': 'نظام المدفوعات',
        'exams-module': 'نظام الامتحانات',
        'books-module': 'إدارة الكتب',
        'reports-module': 'التقارير',
        'whatsapp-module': 'نظام الواتساب',
        'cards-module': 'البطاقات الطلابية',
        'notifications-module': 'الإشعارات',
        'settings-module': 'الإعدادات'
    };
    
    return sectionNames[sectionId] || sectionId;
}

function showNoResults(query) {
    createSearchResultsSection(query);
    const container = document.querySelector('#search-results .search-results-container');
    container.innerHTML = `
        <div class="no-results">
            <i class="fas fa-search"></i>
            <h3>لم يتم العثور على نتائج</h3>
            <p>لم نتمكن من العثور على أي نتائج تحتوي على "${query}"</p>
            <div class="search-suggestions">
                <h4>اقتراحات:</h4>
                <ul>
                    <li>تأكد من الإملاء الصحيح</li>
                    <li>استخدم كلمات مفتاحية أقل</li>
                    <li>جرب مصطلحات مختلفة</li>
                    <li>تصفح الأقسام الرئيسية</li>
                </ul>
            </div>
        </div>
    `;
}

function clearSearchResults() {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = '';
    searchResults = [];
    
    const resultsSection = document.getElementById('search-results');
    if (resultsSection) {
        resultsSection.remove();
    }
    
    // العودة للقسم السابق
    showSection('overview');
}

// ===========================
// نظام الأسئلة الشائعة
// ===========================
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // إغلاق جميع الأسئلة الأخرى
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // فتح السؤال الحالي إذا لم يكن مفتوحاً
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// ===========================
// مراقب التمرير (Scroll Spy)
// ===========================
function initializeScrollSpy() {
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 200;
        
        // تحديث الرابط النشط في الشريط الجانبي
        const sections = document.querySelectorAll('.content-section.active [id]');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // تحديث الرابط النشط
                const targetLink = document.querySelector(`.sidebar a[href="#${section.id}"]`);
                if (targetLink) {
                    document.querySelectorAll('.sidebar a').forEach(link => {
                        link.classList.remove('active');
                    });
                    targetLink.classList.add('active');
                }
            }
        });
    });
}

// ===========================
// تحميل بيانات الموديولات
// ===========================
function loadModuleData() {
    window.moduleData = {
        'students-module': {
            title: 'إدارة الطلاب',
            description: 'نظام شامل لإدارة بيانات الطلاب وتسجيلهم في المجموعات',
            features: [
                'تسجيل الطلاب الجدد',
                'إدارة البيانات الشخصية',
                'ربط الطلاب بالمجموعات',
                'متابعة المدفوعات',
                'طباعة البطاقات الطلابية',
                'استيراد البيانات من Excel',
                'تصدير التقارير',
                'إدارة أرقام أولياء الأمور'
            ],
            sections: [
                {
                    title: 'إضافة طالب جديد',
                    content: 'لإضافة طالب جديد، انتقل إلى قسم إدارة الطلاب واختر "إضافة طالب جديد". أدخل جميع البيانات المطلوبة مثل الاسم، الكود، الهاتف، وبيانات ولي الأمر.'
                },
                {
                    title: 'تعديل بيانات الطالب',
                    content: 'يمكنك تعديل أي بيانات خاصة بالطالب من خلال البحث عنه ثم الضغط على "تعديل". يمكن تغيير جميع البيانات عدا الكود الخاص بالطالب.'
                },
                {
                    title: 'ربط الطالب بالمجموعات',
                    content: 'لربط طالب بمجموعة جديدة، اذهب لصفحة الطالب واختر "إدارة المجموعات". يمكنك إضافة أو إزالة الطالب من المجموعات المختلفة.'
                }
            ]
        },
        'groups-module': {
            title: 'إدارة المجموعات',
            description: 'إنشاء وإدارة المجموعات الدراسية مع الجداول والأسعار',
            features: [
                'إنشاء مجموعات جديدة',
                'تحديد الجداول الزمنية',
                'إدارة الأسعار والمدفوعات',
                'ربط المعلمين بالمجموعات',
                'تحديد القاعات الدراسية',
                'إدارة عدد الطلاب',
                'متابعة الحضور الجماعي',
                'إعداد الجداول الأسبوعية'
            ],
            sections: [
                {
                    title: 'إنشاء مجموعة جديدة',
                    content: 'لإنشاء مجموعة جديدة، حدد المادة والمعلم أولاً، ثم أدخل اسم المجموعة والوصف. حدد نوع الدفع (شهري أو بالحصة) والسعر.'
                },
                {
                    title: 'إعداد الجدول الزمني',
                    content: 'اختر أيام الأسبوع التي تعمل فيها المجموعة، ووقت بداية ونهاية كل حصة. يمكن إعداد جداول مختلفة لأيام مختلفة.'
                }
            ]
        },
        'attendance-module': {
            title: 'نظام الحضور والغياب',
            description: 'تسجيل ومتابعة حضور الطلاب مع إرسال تقارير فورية',
            features: [
                'تسجيل الحضور اليومي',
                'إدارة جلسات الحضور',
                'إضافة ملاحظات للطلاب',
                'تسجيل أسباب الغياب',
                'إرسال تقارير للأولياء',
                'متابعة نسب الحضور',
                'إحصائيات شاملة',
                'تصدير تقارير مفصلة'
            ],
            sections: [
                {
                    title: 'بدء جلسة حضور',
                    content: 'لبدء جلسة حضور جديدة، اختر المجموعة والتاريخ ثم اضغط "بدء الجلسة". سيتم فتح قائمة بجميع طلاب المجموعة.'
                },
                {
                    title: 'تسجيل الحضور',
                    content: 'لكل طالب، يمكنك اختيار حاضر، غائب، أو متأخر. يمكن إضافة ملاحظات خاصة لكل طالب حسب الحاجة.'
                }
            ]
        },
        'payments-module': {
            title: 'نظام المدفوعات',
            description: 'إدارة مدفوعات الطلاب والرسوم الشهرية والمستحقات',
            features: [
                'تسجيل المدفوعات',
                'متابعة المستحقات',
                'إدارة أنواع الدفع المختلفة',
                'تقارير مالية شاملة',
                'تذكيرات الدفع',
                'حساب نصيب المركز والمعلم',
                'إيصالات رقمية',
                'متابعة الديون'
            ],
            sections: [
                {
                    title: 'تسجيل دفعة جديدة',
                    content: 'لتسجيل دفعة، اختر الطالب والمجموعة، أدخل المبلغ المدفوع وطريقة الدفع. يمكن تحديد فترة التغطية للدفعة.'
                },
                {
                    title: 'متابعة المستحقات',
                    content: 'يمكن مراجعة المستحقات لكل طالب من خلال صفحته الشخصية أو من تقرير المستحقات العام.'
                }
            ]
        }
    };
}

function loadModuleSection(moduleId) {
    const moduleData = window.moduleData[moduleId];
    if (!moduleData) return;
    
    // إزالة القسم السابق إن وجد
    const existingSection = document.getElementById(moduleId);
    if (existingSection) {
        existingSection.remove();
    }
    
    // إنشاء قسم الموديول
    const moduleSection = document.createElement('section');
    moduleSection.id = moduleId;
    moduleSection.className = 'content-section';
    
    moduleSection.innerHTML = `
        <div class="section-header">
            <h2><i class="fas fa-puzzle-piece"></i> ${moduleData.title}</h2>
            <p>${moduleData.description}</p>
        </div>
        
        <div class="module-overview">
            <h3><i class="fas fa-star"></i> المميزات الرئيسية</h3>
            <div class="features-grid">
                ${moduleData.features.map(feature => `
                    <div class="feature-item">
                        <i class="fas fa-check"></i>
                        <span>${feature}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="module-sections">
            <h3><i class="fas fa-book-open"></i> دليل الاستخدام</h3>
            ${moduleData.sections.map(section => `
                <div class="module-section-item">
                    <h4>${section.title}</h4>
                    <p>${section.content}</p>
                </div>
            `).join('')}
        </div>
        
        <div class="module-actions">
            <button onclick="showSection('modules')" class="btn btn-primary">
                <i class="fas fa-arrow-right"></i> العودة لقائمة الموديولات
            </button>
        </div>
    `;
    
    // إضافة القسم للمحتوى
    document.getElementById('module-content').appendChild(moduleSection);
    
    // إظهار القسم
    showSection(moduleId);
}

// ===========================
// معالجة تاريخ المتصفح
// ===========================
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.section) {
        showSection(event.state.section);
    } else {
        const hash = window.location.hash.substring(1);
        if (hash) {
            showSection(hash);
        }
    }
});

// ===========================
// وظائف مساعدة
// ===========================
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('تم النسخ بنجاح', 'success');
    }).catch(() => {
        showNotification('فشل في النسخ', 'error');
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // إظهار الإشعار
    setTimeout(() => notification.classList.add('show'), 100);
    
    // إخفاء الإشعار
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===========================
// تصدير الوظائف للاستخدام العام
// ===========================
window.helpSystem = {
    showSection,
    performSearch,
    clearSearchResults,
    loadModuleSection,
    showNotification,
    scrollToTop,
    copyToClipboard
};
