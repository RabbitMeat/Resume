// 初始化 IntersectionObserver，負責觸發卡片進場動畫
function observeCardsForScrollIn() {
    const cards = document.querySelectorAll('.card');
  
    const observer = new IntersectionObserver((entries, observer) => {
      let index = 0;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = `${index * 0.1}s`;
          entry.target.classList.add('fade-in-up');
          observer.unobserve(entry.target);
          index++;
        }
      });
    }, {
      threshold: 0.2
    });
  
    cards.forEach(card => {
      // 移除動畫狀態與延遲（如果曾經執行過）
      card.classList.remove('fade-in-up');
      card.style.animationDelay = '0s';
      observer.observe(card);
    });
  }
  
  // 篩選卡片顯示與動畫重設
  function filterCards(tag) {
    const cards = document.querySelectorAll('.card');
  
    cards.forEach(card => {
      const tags = card.getAttribute('data-tags').split(' ');
      if (tag === 'all' || tags.includes(tag)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  
    // 重新綁定 IntersectionObserver 以觀察顯示中的卡片
    observeCardsForScrollIn();
  }
  
  // 初始化篩選按鈕
  function setupTagFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        // 移除目前的 active 樣式
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
  
        const tag = btn.getAttribute('data-filter');
        filterCards(tag);
      });
    });
  }
  
  // 初始執行
  document.addEventListener('DOMContentLoaded', () => {

    const navbar = document.getElementById('mainNavbar');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  
    const body = document.body;
    // 載入 resume 頁面
    if (body.classList.contains('page-resume')) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      }, { threshold: 0.2 });
  
      const resumeSections = document.querySelectorAll('.resume');
      resumeSections.forEach(section => {
        observer.observe(section);
      });
    
    }

    // 載入 project 頁面
    else{
      setupTagFilters();
      filterCards('all'); // 預設顯示全部並觀察動畫
    }
  });
  