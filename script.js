// Utility: LocalStorage persistence
const setTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('bakeD-theme', theme);
};

const setDirection = (dir) => {
  document.documentElement.setAttribute('dir', dir);
  localStorage.setItem('bakeD-dir', dir);
};

// Initialize Theme & Direction
const init = () => {
  const savedTheme = localStorage.getItem('bakeD-theme') || 'light';
  const savedDir = localStorage.getItem('bakeD-dir') || 'ltr';
  setTheme(savedTheme);
  setDirection(savedDir);
  
  // Theme Toggle Logic
  const themeBtns = document.querySelectorAll('.theme-toggle');
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
      updateThemeIcons();
    });
  });
  
  // RTL Toggle Logic
  const rtlBtns = document.querySelectorAll('.rtl-toggle');
  rtlBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('dir');
      setDirection(current === 'rtl' ? 'ltr' : 'rtl');
    });
  });
  
  // Mobile Menu Logic
  const menuBtn = document.querySelector('.menu-btn');
  const drawer = document.querySelector('.drawer');
  const overlay = document.querySelector('.overlay');
  
  if (menuBtn && drawer && overlay) {
    menuBtn.addEventListener('click', () => {
      drawer.classList.add('open');
      overlay.classList.add('visible');
    });
    
    overlay.addEventListener('click', () => {
      drawer.classList.remove('open');
      overlay.classList.remove('visible');
    });
  }
  
  // Navbar Scroll effect (Class-based for Theme support)
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Scroll Animations
  const observerOptions = {
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
  
  // Password Toggle logic
  document.querySelectorAll('.password-toggle').forEach(btn => {
    btn.addEventListener('click', function() {
      const input = this.parentElement.querySelector('input');
      const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
      input.setAttribute('type', type);
      this.querySelector('[data-lucide=eye]').style.display = type === 'text' ? 'none' : 'block';
      this.querySelector('[data-lucide=eye-off]').style.display = type === 'text' ? 'block' : 'none';
    });
  });

  // FAQ Accordion Logic
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
};

const updateThemeIcons = () => {
  const current = document.documentElement.getAttribute('data-theme');
  document.querySelectorAll('.theme-toggle [data-lucide]').forEach(icon => {
    if (current === 'dark' && icon.getAttribute('data-lucide') === 'sun') {
      icon.style.display = 'block';
    } else if (current === 'light' && icon.getAttribute('data-lucide') === 'moon') {
      icon.style.display = 'block';
    } else {
      icon.style.display = 'none';
    }
  });
};

// Initialize Lucide Icons
const initIcons = () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
    updateThemeIcons();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  init();
  initIcons();
});
window.addEventListener('load', initIcons);

// Extra safety for dynamic environments
setTimeout(initIcons, 500);
setTimeout(initIcons, 2000);
