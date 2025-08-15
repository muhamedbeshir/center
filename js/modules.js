/**
 * JavaScript خاص بصفحة الموديولات
 * إدارة التفاعل مع بطاقات الموديولات والمودال
 */

// بيانات تفصيلية للموديولات
const moduleDetails = {
    'students': {
        title: 'إدارة الطلاب',
        description: 'نظام شامل لإدارة بيانات الطلاب وتسجيلهم في المجموعات والمتابعة الأكاديمية',
        sections: [
            {
                title: 'إضافة طالب جديد',
                icon: 'fas fa-user-plus',
                steps: [
                    'انتقل إلى قسم "إدارة الطلاب" من القائمة الرئيسية',
                    'اضغط على زر "إضافة طالب جديد"',
                    'أملأ البيانات الأساسية: الاسم، الكود، تاريخ الميلاد',
                    'أدخل بيانات الاتصال: الهاتف، عنوان السكن',
                    'أضف أرقام أولياء الأمور (رقم أساسي ورقم احتياطي)',
                    'اختر الصف الدراسي المناسب',
                    'حدد المجموعات التي سينضم إليها الطالب',
                    'احفظ البيانات وتأكد من إنشاء كود فريد للطالب'
                ],
                tips: [
                    'تأكد من عدم تكرار أكواد الطلاب',
                    'احفظ أرقام هواتف صحيحة لضمان وصول الرسائل',
                    'يمكن إضافة أكثر من رقم هاتف لولي الأمر',
                    'استخدم خاصية الاستيراد من Excel للإضافة الجماعية'
                ]
            },
            {
                title: 'تعديل بيانات طالب',
                icon: 'fas fa-user-edit',
                steps: [
                    'ابحث عن الطالب باستخدام الاسم أو الكود',
                    'اضغط على زر "تعديل" بجانب اسم الطالب',
                    'عدل البيانات المطلوبة',
                    'تأكد من صحة أرقام الهواتف المحدثة',
                    'احفظ التغييرات'
                ],
                tips: [
                    'لا يمكن تعديل كود الطالب بعد الإنشاء',
                    'التعديل يؤثر فوراً على جميع التقارير',
                    'احتفظ بنسخة احتياطية قبل التعديل الجماعي'
                ]
            },
            {
                title: 'إدارة مجموعات الطالب',
                icon: 'fas fa-users-cog',
                steps: [
                    'اذهب لصفحة الطالب الشخصية',
                    'اختر تبويب "المجموعات"',
                    'للإضافة: اختر المجموعة الجديدة واضغط "إضافة"',
                    'للإزالة: اضغط على زر "إزالة" بجانب المجموعة',
                    'تأكد من حفظ التغييرات'
                ],
                tips: [
                    'تأكد من عدم تضارب الجداول الزمنية',
                    'راجع الرسوم المترتبة على الإضافة',
                    'أرسل إشعار لولي الأمر عند التغيير'
                ]
            }
        ]
    },
    'groups': {
        title: 'إدارة المجموعات',
        description: 'إنشاء وإدارة المجموعات الدراسية مع الجداول الزمنية والأسعار وتوزيع الطلاب',
        sections: [
            {
                title: 'إنشاء مجموعة جديدة',
                icon: 'fas fa-plus-circle',
                steps: [
                    'اذهب إلى قسم "إدارة المجموعات"',
                    'اضغط على "إضافة مجموعة جديدة"',
                    'اختر المادة الدراسية من القائمة',
                    'حدد المعلم المسؤول عن المجموعة',
                    'أدخل اسم المجموعة ووصف مختصر',
                    'حدد نوع الدفع (شهري/بالحصة)',
                    'أدخل سعر الاشتراك ونسبة المركز',
                    'اختر القاعة الدراسية',
                    'حدد أيام الأسبوع وأوقات الحصص',
                    'احفظ البيانات وفعّل المجموعة'
                ],
                tips: [
                    'تأكد من عدم تضارب القاعات في نفس التوقيت',
                    'راجع جدول المعلم قبل التعيين',
                    'حدد سعة مناسبة للمجموعة',
                    'استخدم أسماء واضحة ومميزة للمجموعات'
                ]
            },
            {
                title: 'إعداد الجدول الزمني',
                icon: 'fas fa-calendar-alt',
                steps: [
                    'من صفحة المجموعة، اختر "تعديل الجدول"',
                    'حدد أيام الأسبوع النشطة',
                    'لكل يوم، أدخل وقت البداية والنهاية',
                    'يمكن إضافة أكثر من حصة في نفس اليوم',
                    'احفظ الجدول واختبره'
                ],
                tips: [
                    'اتبع نفس التوقيت أسبوعياً للاستقرار',
                    'اترك فترات راحة بين الحصص',
                    'راع أوقات الذروة والمواصلات',
                    'أرسل الجدول لأولياء الأمور عند التغيير'
                ]
            }
        ]
    },
    'teachers': {
        title: 'إدارة المعلمين',
        description: 'إدارة شاملة لبيانات المعلمين والمواد التي يدرسونها ومجموعاتهم',
        sections: [
            {
                title: 'تسجيل معلم جديد',
                icon: 'fas fa-chalkboard-teacher',
                steps: [
                    'انتقل إلى قسم "إدارة المعلمين"',
                    'اضغط على "إضافة معلم جديد"',
                    'أدخل البيانات الشخصية للمعلم',
                    'أضف أرقام الهواتف والإيميل',
                    'حدد المواد التي يستطيع تدريسها',
                    'أرفق صورة شخصية إن أمكن',
                    'احفظ البيانات'
                ],
                tips: [
                    'احتفظ بنسخ من الشهادات والمؤهلات',
                    'حدث بيانات الاتصال دورياً',
                    'ربط المعلم بالمواد يسهل إنشاء المجموعات'
                ]
            },
            {
                title: 'إدارة مجموعات المعلم',
                icon: 'fas fa-users',
                steps: [
                    'من صفحة المعلم، اختر "المجموعات"',
                    'راجع قائمة المجموعات الحالية',
                    'لإضافة مجموعة جديدة، اضغط "إضافة"',
                    'اختر المادة والجدول المناسب',
                    'تأكد من عدم تضارب الأوقات'
                ],
                tips: [
                    'راع الحد الأقصى لمجموعات المعلم يومياً',
                    'وزع المجموعات على أيام الأسبوع',
                    'راجع أداء المعلم دورياً'
                ]
            }
        ]
    },
    'attendance': {
        title: 'نظام الحضور والغياب',
        description: 'نظام متطور لتسجيل ومتابعة حضور الطلاب مع إرسال تقارير فورية لأولياء الأمور',
        sections: [
            {
                title: 'بدء جلسة حضور جديدة',
                icon: 'fas fa-play-circle',
                steps: [
                    'اذهب إلى قسم "نظام الحضور"',
                    'اختر المجموعة المطلوبة',
                    'حدد التاريخ (افتراضياً اليوم)',
                    'اضغط "بدء جلسة جديدة"',
                    'ستظهر قائمة بجميع طلاب المجموعة',
                    'سجل حضور كل طالب (حاضر/غائب/متأخر)',
                    'أضف ملاحظات للطلاب حسب الحاجة',
                    'احفظ الجلسة عند الانتهاء'
                ],
                tips: [
                    'تأكد من بدء الجلسة في وقت الحصة',
                    'راجع قائمة الطلاب قبل البدء',
                    'استخدم الملاحظات لتوضيح أسباب الغياب',
                    'أرسل التقرير فور انتهاء الحصة'
                ]
            },
            {
                title: 'إرسال تقارير الحضور',
                icon: 'fas fa-paper-plane',
                steps: [
                    'من صفحة الجلسة المكتملة، اختر "إرسال تقرير"',
                    'راجع قائمة أولياء الأمور المستهدفين',
                    'عدل نص الرسالة حسب الحاجة',
                    'اختر طريقة الإرسال (واتساب/SMS)',
                    'اضغط "إرسال" لإرسال التقارير',
                    'راجع سجل الرسائل المرسلة'
                ],
                tips: [
                    'تأكد من ربط الواتساب قبل الإرسال',
                    'استخدم قوالب جاهزة لتوفير الوقت',
                    'أرسل تقارير إيجابية للتشجيع',
                    'اتبع نفس التوقيت يومياً'
                ]
            }
        ]
    },
    'payments': {
        title: 'نظام المدفوعات',
        description: 'إدارة مالية شاملة للمدفوعات والرسوم مع متابعة المستحقات والتذكيرات',
        sections: [
            {
                title: 'تسجيل دفعة جديدة',
                icon: 'fas fa-money-bill-wave',
                steps: [
                    'انتقل إلى قسم "المدفوعات"',
                    'ابحث عن الطالب بالاسم أو الكود',
                    'اختر المجموعة المراد الدفع لها',
                    'أدخل مبلغ الدفعة',
                    'حدد طريقة الدفع (نقدي/بنكي/إلكتروني)',
                    'اختر الفترة المغطاة بالدفعة',
                    'أضف ملاحظات إضافية إن لزم',
                    'احفظ الدفعة واطبع الإيصال'
                ],
                tips: [
                    'تأكد من صحة المبلغ المدخل',
                    'سجل تاريخ الدفع الفعلي',
                    'احتفظ بنسخة من الإيصال',
                    'أرسل إشعار للطالب بالدفعة المسجلة'
                ]
            },
            {
                title: 'متابعة المستحقات',
                icon: 'fas fa-file-invoice-dollar',
                steps: [
                    'اذهب إلى "تقارير المدفوعات"',
                    'اختر "المستحقات المتأخرة"',
                    'راجع قائمة الطلاب المتأخرين',
                    'اختر الطلاب للتذكير',
                    'أرسل تذكيرات عبر الواتساب',
                    'تابع ردود أولياء الأمور'
                ],
                tips: [
                    'أرسل تذكيرات مهذبة ومهنية',
                    'امنح مهلة معقولة للدفع',
                    'تابع الحالات الخاصة بمرونة',
                    'حدث حالة الدفع فور الاستلام'
                ]
            }
        ]
    },
    'exams': {
        title: 'نظام الامتحانات',
        description: 'إدارة الامتحانات والكويزات مع تسجيل الدرجات وإرسال النتائج',
        sections: [
            {
                title: 'إنشاء امتحان جديد',
                icon: 'fas fa-plus-square',
                steps: [
                    'اذهب إلى قسم "الامتحانات"',
                    'اضغط "إنشاء امتحان جديد"',
                    'أدخل اسم الامتحان ووصفه',
                    'حدد المجموعة أو المجموعات',
                    'اختر تاريخ ووقت الامتحان',
                    'حدد مدة الامتحان بالدقائق',
                    'أدخل الدرجة الكلية للامتحان',
                    'احفظ بيانات الامتحان'
                ],
                tips: [
                    'تأكد من عدم تضارب مواعيد الامتحانات',
                    'أرسل إشعار للطلاب قبل الامتحان بوقت كافٍ',
                    'حدد قاعة مناسبة لعدد الطلاب',
                    'جهز أوراق الامتحان مسبقاً'
                ]
            },
            {
                title: 'تسجيل النتائج',
                icon: 'fas fa-chart-bar',
                steps: [
                    'من صفحة الامتحان، اختر "تسجيل النتائج"',
                    'راجع قائمة الطلاب الحاضرين',
                    'أدخل درجة كل طالب',
                    'تأكد من صحة الدرجات المدخلة',
                    'احفظ النتائج',
                    'راجع الإحصائيات والمتوسطات',
                    'أرسل النتائج لأولياء الأمور'
                ],
                tips: [
                    'راجع الدرجات مرتين قبل الحفظ',
                    'استخدم التصحيح الإلكتروني إن أمكن',
                    'احفظ أوراق الامتحان للمراجعة',
                    'قارن النتائج مع امتحانات سابقة'
                ]
            }
        ]
    },
    'books': {
        title: 'إدارة الكتب والأكواد',
        description: 'إدارة مخزون الكتب والأكواد التعليمية مع نظام مبيعات متكامل',
        sections: [
            {
                title: 'إضافة كتاب جديد',
                icon: 'fas fa-book-open',
                steps: [
                    'انتقل إلى قسم "إدارة الكتب"',
                    'اضغط "إضافة كتاب جديد"',
                    'أدخل عنوان الكتاب ووصفه',
                    'حدد سعر البيع ونسبة المركز',
                    'أدخل الكمية الأولية في المخزن',
                    'أضف صورة للكتاب إن أمكن',
                    'احفظ بيانات الكتاب'
                ],
                tips: [
                    'استخدم أسماء واضحة ومميزة',
                    'احتفظ بصور عالية الجودة',
                    'راجع الأسعار دورياً',
                    'تابع مستوى المخزون باستمرار'
                ]
            },
            {
                title: 'تسجيل مبيعة',
                icon: 'fas fa-shopping-cart',
                steps: [
                    'اختر الكتاب من قائمة المخزون',
                    'اضغط "بيع" بجانب الكتاب',
                    'أدخل اسم المشتري ورقم هاتفه',
                    'حدد الكمية المطلوب بيعها',
                    'راجع السعر الإجمالي',
                    'احفظ المبيعة واطبع الإيصال'
                ],
                tips: [
                    'تأكد من توفر الكمية المطلوبة',
                    'احفظ بيانات العملاء للمتابعة',
                    'حدث المخزون فورياً',
                    'راجع الإيرادات اليومية'
                ]
            }
        ]
    },
    'reports': {
        title: 'التقارير والإحصائيات',
        description: 'مجموعة شاملة من التقارير والإحصائيات لجميع جوانب النظام',
        sections: [
            {
                title: 'تقرير الحضور الشامل',
                icon: 'fas fa-chart-pie',
                steps: [
                    'اذهب إلى قسم "التقارير"',
                    'اختر "تقارير الحضور"',
                    'حدد الفترة الزمنية المطلوبة',
                    'اختر المجموعات أو المعلمين',
                    'حدد نوع التقرير (تفصيلي/إجمالي)',
                    'اضغط "إنشاء التقرير"',
                    'راجع النتائج وصدّرها'
                ],
                tips: [
                    'استخدم فترات زمنية منطقية',
                    'قارن بين فترات مختلفة',
                    'انتبه للاتجاهات والأنماط',
                    'شارك التقارير مع الإدارة'
                ]
            }
        ]
    },
    'whatsapp': {
        title: 'تكامل الواتساب',
        description: 'نظام متكامل لإرسال الرسائل والتقارير عبر الواتساب لأولياء الأمور',
        sections: [
            {
                title: 'ربط حساب الواتساب',
                icon: 'fab fa-whatsapp',
                steps: [
                    'انتقل إلى إعدادات الواتساب',
                    'اضغط "ربط حساب جديد"',
                    'امسح رمز QR بهاتفك',
                    'انتظر تأكيد الاتصال',
                    'اختبر الإرسال برسالة تجريبية',
                    'احفظ الإعدادات'
                ],
                tips: [
                    'استخدم هاتف مخصص للمركز',
                    'تأكد من استقرار الإنترنت',
                    'احتفظ بالهاتف مشحوناً',
                    'راجع حالة الاتصال يومياً'
                ]
            }
        ]
    },
    'cards': {
        title: 'البطاقات الطلابية',
        description: 'إنشاء وطباعة البطاقات الطلابية مع الباركود للتعريف السريع',
        sections: [
            {
                title: 'طباعة بطاقة طالب',
                icon: 'fas fa-print',
                steps: [
                    'اذهب إلى "البطاقات الطلابية"',
                    'ابحث عن الطالب المطلوب',
                    'اختر تصميم البطاقة',
                    'راجع بيانات البطاقة',
                    'اضغط "معاينة" للتأكد',
                    'اطبع البطاقة أو حملها كـ PDF'
                ],
                tips: [
                    'تأكد من صحة جميع البيانات',
                    'استخدم ورق مقوى للطباعة',
                    'احفظ نسخة رقمية احتياطية',
                    'جدد البطاقات عند تغيير البيانات'
                ]
            }
        ]
    },
    'settings': {
        title: 'الإعدادات والتخصيص',
        description: 'إعدادات شاملة لتخصيص النظام حسب احتياجات المركز',
        sections: [
            {
                title: 'الإعدادات العامة',
                icon: 'fas fa-cog',
                steps: [
                    'انتقل إلى "الإعدادات العامة"',
                    'أدخل اسم المركز وشعاره',
                    'حدد العملة المستخدمة',
                    'اختر المنطقة الزمنية',
                    'حدد لغة النظام الافتراضية',
                    'احفظ الإعدادات'
                ],
                tips: [
                    'استخدم شعار عالي الجودة',
                    'راجع الإعدادات دورياً',
                    'احفظ نسخة احتياطية من الإعدادات',
                    'اختبر التغييرات قبل التطبيق'
                ]
            }
        ]
    },
    'employees': {
        title: 'إدارة الموظفين',
        description: 'إدارة الموظفين وحضورهم ورواتبهم ووظائفهم داخل المركز',
        sections: [
            {
                title: 'تسجيل موظف جديد',
                icon: 'fas fa-user-plus',
                steps: [
                    'اذهب إلى "إدارة الموظفين"',
                    'اضغط "إضافة موظف جديد"',
                    'أدخل البيانات الشخصية',
                    'حدد الوظيفة والراتب',
                    'أدخل تاريخ بداية العمل',
                    'احفظ بيانات الموظف'
                ],
                tips: [
                    'احتفظ بنسخ من الوثائق',
                    'حدد صلاحيات الموظف بدقة',
                    'راجع الراتب دورياً',
                    'تابع أداء الموظف باستمرار'
                ]
            }
        ]
    }
};

// المتغيرات العامة
let currentModule = null;

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initializeModulePage();
    setupEventListeners();
});

// تهيئة صفحة الموديولات
function initializeModulePage() {
    console.log('تم تحميل صفحة الموديولات بنجاح');
    
    // إضافة تأثيرات بصرية للبطاقات
    const moduleCards = document.querySelectorAll('.module-card');
    moduleCards.forEach((card, index) => {
        // تأخير ظهور البطاقات تدريجياً
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // إغلاق المودال عند الضغط خارجه
    const modal = document.getElementById('moduleModal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // إغلاق المودال بمفتاح Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// عرض تفاصيل الموديول
function showModuleDetails(moduleId) {
    currentModule = moduleId;
    const module = moduleDetails[moduleId];
    
    if (!module) {
        console.error('لم يتم العثور على بيانات الموديول:', moduleId);
        return;
    }
    
    // تحديث عنوان المودال
    document.getElementById('modalTitle').textContent = module.title;
    
    // إنشاء محتوى المودال
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = createModuleDetailContent(module);
    
    // إظهار المودال
    document.getElementById('moduleModal').classList.add('active');
    
    // منع التمرير في الصفحة الخلفية
    document.body.style.overflow = 'hidden';
}

// إنشاء محتوى تفاصيل الموديول
function createModuleDetailContent(module) {
    let content = `
        <div class="module-detail-section">
            <h3><i class="fas fa-info-circle"></i> نظرة عامة</h3>
            <p>${module.description}</p>
        </div>
    `;
    
    // إضافة أقسام الاستخدام
    if (module.sections && module.sections.length > 0) {
        content += `
            <div class="module-detail-section">
                <h3><i class="fas fa-book-open"></i> دليل الاستخدام المفصل</h3>
        `;
        
        module.sections.forEach(section => {
            content += `
                <div class="step-by-step">
                    <h4><i class="${section.icon}"></i> ${section.title}</h4>
                    <ol>
                        ${section.steps.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                    
                    ${section.tips ? `
                        <div class="tips-section">
                            <h4><i class="fas fa-lightbulb"></i> نصائح مهمة</h4>
                            <ul>
                                ${section.tips.map(tip => `<li><i class="fas fa-star"></i> ${tip}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>
            `;
        });
        
        content += '</div>';
    }
    
    // إضافة أزرار الإجراءات
    content += `
        <div class="module-detail-section">
            <h3><i class="fas fa-tools"></i> إجراءات سريعة</h3>
            <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                <button class="btn btn-primary" onclick="copyModuleLink('${currentModule}')">
                    <i class="fas fa-link"></i> نسخ رابط الموديول
                </button>
                <button class="btn btn-secondary" onclick="printModuleGuide('${currentModule}')">
                    <i class="fas fa-print"></i> طباعة الدليل
                </button>
                <a href="index.html#${currentModule}-module" class="btn btn-primary">
                    <i class="fas fa-external-link-alt"></i> فتح في الدليل الرئيسي
                </a>
            </div>
        </div>
    `;
    
    return content;
}

// إغلاق المودال
function closeModal() {
    document.getElementById('moduleModal').classList.remove('active');
    document.body.style.overflow = '';
    currentModule = null;
}

// نسخ رابط الموديول
function copyModuleLink(moduleId) {
    const link = `${window.location.origin}${window.location.pathname}#${moduleId}`;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(link).then(() => {
            showNotification('تم نسخ الرابط بنجاح', 'success');
        }).catch(() => {
            fallbackCopyTextToClipboard(link);
        });
    } else {
        fallbackCopyTextToClipboard(link);
    }
}

// نسخ النص كبديل
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('تم نسخ الرابط بنجاح', 'success');
    } catch (err) {
        showNotification('فشل في نسخ الرابط', 'error');
    }
    
    document.body.removeChild(textArea);
}

// طباعة دليل الموديول
function printModuleGuide(moduleId) {
    const module = moduleDetails[moduleId];
    if (!module) return;
    
    // إنشاء نافذة طباعة
    const printWindow = window.open('', '_blank');
    
    const printContent = `
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
        <head>
            <meta charset="UTF-8">
            <title>دليل ${module.title}</title>
            <style>
                body { font-family: 'Arial', sans-serif; direction: rtl; margin: 20px; }
                h1, h2, h3 { color: #2563eb; }
                .section { margin-bottom: 30px; page-break-inside: avoid; }
                ol, ul { margin: 15px 0; padding-right: 30px; }
                li { margin-bottom: 8px; line-height: 1.6; }
                .tips { background: #f0f9ff; padding: 15px; border-right: 4px solid #0ea5e9; margin: 15px 0; }
                @media print { body { margin: 0; } }
            </style>
        </head>
        <body>
            <h1>دليل ${module.title}</h1>
            <p><strong>الوصف:</strong> ${module.description}</p>
            
            ${module.sections.map(section => `
                <div class="section">
                    <h2>${section.title}</h2>
                    <h3>خطوات التنفيذ:</h3>
                    <ol>
                        ${section.steps.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                    
                    ${section.tips ? `
                        <div class="tips">
                            <h3>نصائح مهمة:</h3>
                            <ul>
                                ${section.tips.map(tip => `<li>${tip}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>
            `).join('')}
            
            <footer style="margin-top: 50px; text-align: center; color: #666; font-size: 12px;">
                تم إنشاء هذا الدليل من نظام إدارة المركز التعليمي - ${new Date().toLocaleDateString('ar-SA')}
            </footer>
        </body>
        </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // انتظار تحميل المحتوى ثم طباعة
    printWindow.onload = function() {
        printWindow.print();
        printWindow.close();
    };
}

// عرض الإشعارات
function showNotification(message, type = 'info') {
    // إزالة الإشعارات السابقة
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
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
    
    // إضافة CSS للإشعار
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
    
    // إزالة الإشعار تلقائياً
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 4000);
}

// إضافة CSS للأنيميشن
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 5px;
        margin-right: 10px;
        border-radius: 4px;
        transition: background 0.2s;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;
document.head.appendChild(style);

// معالجة الروابط المباشرة للموديولات
window.addEventListener('load', function() {
    const hash = window.location.hash.substring(1);
    if (hash && moduleDetails[hash]) {
        showModuleDetails(hash);
    }
});

// تصدير الوظائف للاستخدام العام
window.moduleSystem = {
    showModuleDetails,
    closeModal,
    copyModuleLink,
    printModuleGuide
};
