document.addEventListener('DOMContentLoaded', () => {
  const prevBtn = document.querySelector('.testimonials__arrow--prev');
  const nextBtn = document.querySelector('.testimonials__arrow--next');
  const grid = document.querySelector('.testimonials__grid');

  if (prevBtn && nextBtn && grid) {
    prevBtn.addEventListener('click', () => {
      grid.scrollBy({ left: -420, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      grid.scrollBy({ left: 420, behavior: 'smooth' });
    });
  }

  // Mobile Menu Toggle Logic
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const closeBtn = document.querySelector('.mobile-close-btn');
  const mainNav = document.querySelector('.main-nav');
  const overlay = document.querySelector('.mobile-menu-overlay');

  const openMenu = () => {
    if (mainNav) mainNav.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent body scrolling
  };

  const closeMenu = () => {
    if (mainNav) mainNav.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (menuBtn) menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  // Close mobile menu when links inside are clicked
  const navLinks = document.querySelectorAll('.main-nav__link');
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // PDP Image Gallery Logic
  const thumbBtns = document.querySelectorAll('.product-gallery__thumb-btn');
  const mainImg = document.getElementById('main-product-image');

  if (thumbBtns.length > 0 && mainImg) {
    thumbBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class and selected state from all
        thumbBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        
        // Add active class and selected state to clicked
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        
        // Update main image source and mobile source with fade transition
        const newSrc = btn.getAttribute('data-image');
        const newSrcMobile = btn.getAttribute('data-image-mobile');
        const mainMobileSource = document.getElementById('main-product-source-mobile');
        
        if (newSrc) {
          mainImg.style.opacity = '0.3';
          setTimeout(() => {
            mainImg.setAttribute('src', newSrc);
            if (mainMobileSource && newSrcMobile) {
              mainMobileSource.setAttribute('srcset', newSrcMobile);
            }
            mainImg.style.opacity = '1';
          }, 150);
        }
      });
    });
  }

  // PDP Quantity Selector Logic
  const qtyMinus = document.querySelector('.quantity-selector__btn.minus');
  const qtyPlus = document.querySelector('.quantity-selector__btn.plus');
  const qtyInput = document.querySelector('.quantity-selector__input');

  if (qtyMinus && qtyPlus && qtyInput) {
    qtyMinus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value, 10) || 1;
      if (val > 1) {
        qtyInput.value = val - 1;
      }
    });

    qtyPlus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value, 10) || 1;
      qtyInput.value = val + 1;
    });
  }

  // PDP Tabs Interaction Logic
  const tabBtns = document.querySelectorAll('.product-tabs__btn');
  const tabPanels = document.querySelectorAll('.product-tabs__panel');

  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Deactivate all tab buttons
        tabBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });

        // Hide all panels
        tabPanels.forEach(panel => {
          panel.classList.add('sr-only');
          panel.setAttribute('aria-hidden', 'true');
        });

        // Activate clicked button
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        // Show matching panel
        const panelId = btn.getAttribute('aria-controls');
        const activePanel = document.getElementById(panelId);
        if (activePanel) {
          activePanel.classList.remove('sr-only');
          activePanel.removeAttribute('aria-hidden');
        }
      });
    });
  }

  // Category Sort Select Auto-Fit Width
  const sortSelect = document.querySelector('.sort-by-select');
  if (sortSelect) {
    const adjustSelectWidth = () => {
      const tempSpan = document.createElement('span');
      tempSpan.style.visibility = 'hidden';
      tempSpan.style.position = 'absolute';
      tempSpan.style.fontFamily = window.getComputedStyle(sortSelect).fontFamily;
      tempSpan.style.fontSize = window.getComputedStyle(sortSelect).fontSize;
      tempSpan.style.fontWeight = '700';
      tempSpan.innerText = sortSelect.options[sortSelect.selectedIndex].text;
      document.body.appendChild(tempSpan);
      const textWidth = tempSpan.getBoundingClientRect().width;
      document.body.removeChild(tempSpan);
      sortSelect.style.width = Math.ceil(textWidth + 20) + 'px';
    };
    adjustSelectWidth();
    sortSelect.addEventListener('change', adjustSelectWidth);
  }

  // Pagination Numbers Active Toggle
  const pageNumbers = document.querySelectorAll('.pagination-number');
  if (pageNumbers.length > 0) {
    pageNumbers.forEach(num => {
      num.addEventListener('click', () => {
        pageNumbers.forEach(n => n.classList.remove('active'));
        num.classList.add('active');
      });
    });
  }

  // Mobile Filter Drawer / Modal Popup Logic
  const filterTriggerBtn = document.querySelector('.mobile-filter-trigger-btn');
  const filterSidebar = document.getElementById('filter-sidebar');
  const filterOverlay = document.getElementById('filter-sidebar-overlay');
  const filterCloseBtn = document.querySelector('.filter-sidebar__close-btn');
  const filterApplyBtn = document.querySelector('.btn-apply-filter');

  const openFilterModal = () => {
    if (filterSidebar) filterSidebar.classList.add('open');
    if (filterOverlay) filterOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeFilterModal = () => {
    if (filterSidebar) filterSidebar.classList.remove('open');
    if (filterOverlay) filterOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (filterTriggerBtn) filterTriggerBtn.addEventListener('click', openFilterModal);
  if (filterCloseBtn) filterCloseBtn.addEventListener('click', closeFilterModal);
  if (filterApplyBtn) filterApplyBtn.addEventListener('click', closeFilterModal);
  if (filterOverlay) filterOverlay.addEventListener('click', closeFilterModal);

  // Color Swatches Selection Logic
  const colorSwatches = document.querySelectorAll('.color-swatch-btn');
  if (colorSwatches.length > 0) {
    colorSwatches.forEach(btn => {
      btn.addEventListener('click', () => {
        colorSwatches.forEach(b => {
          b.classList.remove('active');
          b.innerHTML = '';
        });
        btn.classList.add('active');
        btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
      });
    });
  }

  // Size Pills Selection Logic
  const sizePills = document.querySelectorAll('.size-pill-btn');
  if (sizePills.length > 0) {
    sizePills.forEach(pill => {
      pill.addEventListener('click', () => {
        sizePills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
      });
    });
  }

  // Filter Group Accordion Toggle Logic
  const filterHeaders = document.querySelectorAll('.filter-group__header');
  if (filterHeaders.length > 0) {
    filterHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const groupContent = header.nextElementSibling;
        const chevron = header.querySelector('.chevron-icon');
        if (groupContent) {
          if (groupContent.style.display === 'none') {
            groupContent.style.display = 'block';
            if (chevron) chevron.style.transform = 'rotate(0deg)';
          } else {
            groupContent.style.display = 'none';
            if (chevron) chevron.style.transform = 'rotate(180deg)';
          }
        }
      });
    });
  }
});
