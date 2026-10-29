

document.addEventListener("DOMContentLoaded", function () {
    
    // 1. تشغيل وتحديث الساعة والتاريخ الحي فوراً
    function updateClock() {
        var clockElement = document.getElementById("liveClock");
        if (clockElement) {
            var now = new Date();
            var options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
            var dateStr = now.toLocaleDateString('ar-YE', options);
            var timeStr = now.toLocaleTimeString('ar-YE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            
            clockElement.innerHTML = "⏱️ " + dateStr + " - " + timeStr;
        }
    }

    // استدعاء أولي وتحديث كل ثانية
    updateClock();
    setInterval(updateClock, 1000);

    // 2. التحكم في فتح وإغلاق القائمة الجانبية
    var menuBtn = document.getElementById("menuToggle");
    var closeBtn = document.getElementById("closeSidebar");
    var sidebar = document.getElementById("sidebar");
    var overlay = document.getElementById("overlay");

    function openMenu() {
        if (sidebar) sidebar.classList.add("active");
        if (overlay) overlay.classList.add("active");
    }

    function closeMenu() {
        if (sidebar) sidebar.classList.remove("active");
        if (overlay) overlay.classList.remove("active");
    }

    if (menuBtn) menuBtn.addEventListener("click", openMenu);
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    if (overlay) overlay.addEventListener("click", closeMenu);

    // 3. البحث التفاعلي في الصفحة
    var searchInput = document.querySelector("#globalSearch, .header-search input");
    if (searchInput) {
        searchInput.addEventListener("keyup", function () {
            var query = this.value.toLowerCase().trim();
            var cards = document.querySelectorAll(".card, .news-card, .matches-table tbody tr");
            
            cards.forEach(function (card) {
                var text = card.textContent.toLowerCase();
                if (text.includes(query) || query === "") {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }

    // 4. أزرار الفلترة للمباريات
    var filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            filterBtns.forEach(function (b) { b.classList.remove("active-filter"); });
            this.classList.add("active-filter");

            var status = this.getAttribute("data-status");
            var matchRows = document.querySelectorAll(".matches-table tbody tr");

            matchRows.forEach(function (row) {
                var rowStatus = row.getAttribute("data-status");
                if (status === "all" || rowStatus === status) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
            });
        });
    });

});


// --- بحث وفلترة صفحة الهدافين واللاعبين ---
document.addEventListener("DOMContentLoaded", function () {
    var searchInput = document.getElementById("searchInput");
    
    if (searchInput) {
        searchInput.addEventListener("input", function () {
            var filter = this.value.toLowerCase().trim();
            // تحديد جميع صفوف الجدول داخل tbody
            var rows = document.querySelectorAll(".standings-table tbody tr");

            rows.forEach(function (row) {
                var rowText = row.textContent.toLowerCase();
                if (rowText.includes(filter)) {
                    row.style.display = ""; // إظهار الصف
                } else {
                    row.style.display = "none"; // إخفاء الصف
                }
            });
        });
    }
});
