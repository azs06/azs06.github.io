// Hero animations script for Sprint 1
class HeroAnimations {
  constructor() {
    this.init();
  }

  init() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
      this.initTypingAnimation();
      this.initParticles();
      this.initScrollAnimations();
    }
    
    this.initButtonInteractions();
  }

  initTypingAnimation() {
    const typingElements = document.querySelectorAll('.typing-animation');
    
    typingElements.forEach(element => {
      const text = element.textContent;
      element.textContent = '';
      element.style.borderRight = '3px solid currentColor';
      
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        } else {
          // Remove cursor after typing is complete
          setTimeout(() => {
            element.style.borderRight = 'none';
          }, 1000);
        }
      };
      
      // Start typing animation after a short delay
      setTimeout(typeWriter, 500);
    });
  }

  initParticles() {
    const particleContainer = document.querySelector('.particle-container');
    if (!particleContainer) return;

    // Create floating particles
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
      particleContainer.appendChild(particle);
    }
  }

  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
        }
      });
    }, observerOptions);

    // Observe elements with scroll animation
    document.querySelectorAll('.scroll-animate').forEach(el => {
      observer.observe(el);
    });
  }

  initButtonInteractions() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.05) translateY(-2px)';
        button.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
      });
      
      button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1) translateY(0)';
        button.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
      });
      
      button.addEventListener('mousedown', () => {
        button.style.transform = 'scale(0.98) translateY(0)';
      });
      
      button.addEventListener('mouseup', () => {
        button.style.transform = 'scale(1.05) translateY(-2px)';
      });
    });
  }

  // Professional headshot glow effect
  initHeadshotGlow() {
    const headshot = document.querySelector('.hero-headshot');
    if (!headshot) return;

    headshot.addEventListener('mouseenter', () => {
      headshot.style.boxShadow = '0 0 30px rgba(139, 92, 246, 0.4)';
      headshot.style.transform = 'scale(1.02)';
    });

    headshot.addEventListener('mouseleave', () => {
      headshot.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
      headshot.style.transform = 'scale(1)';
    });
  }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new HeroAnimations();
});

// Export for potential use in other scripts
export default HeroAnimations;
