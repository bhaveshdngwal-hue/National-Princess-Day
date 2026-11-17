/* ==========================================================================
   PRINCESS KANAK - NATIONAL PRINCESS DAY INTERACTIVE EXPERIENCE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  /* ------------------------------------------------------------------------
     1. PRELOADER & GRAND ENTRANCE
     ------------------------------------------------------------------------ */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('fade-out');
    }, 700);
  });

  const enterWorldBtn = document.getElementById('enterWorldBtn');
  const mainExperience = document.getElementById('mainExperience');

  enterWorldBtn.addEventListener('click', () => {
    startMusicSafely();
    burstParticles(window.innerWidth / 2, window.innerHeight / 2, 45);
    mainExperience.scrollIntoView({ behavior: 'smooth' });
  });

  /* ------------------------------------------------------------------------
     2. BACKGROUND MUSIC CONTROLLER (Browser Autoplay-Safe)
     ------------------------------------------------------------------------ */
  const bgMusic = document.getElementById('bgMusic');
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const musicIcon = document.getElementById('musicIcon');
  const muteBtn = document.getElementById('muteBtn');
  const muteIcon = document.getElementById('muteIcon');
  const volumeSlider = document.getElementById('volumeSlider');

  let isPlaying = false;
  bgMusic.volume = parseFloat(volumeSlider.value);

  function startMusicSafely() {
    if (!isPlaying) {
      bgMusic.play()
        .then(() => {
          isPlaying = true;
          musicIcon.textContent = '⏸️';
        })
        .catch(() => {
          // Audio file may not be added yet; fail gracefully without console noise
        });
    }
  }

  musicToggleBtn.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play().then(() => {
        isPlaying = true;
        musicIcon.textContent = '⏸️';
      }).catch(() => {});
    } else {
      bgMusic.pause();
      isPlaying = false;
      musicIcon.textContent = '▶️';
    }
  });

  muteBtn.addEventListener('click', () => {
    bgMusic.muted = !bgMusic.muted;
    muteIcon.textContent = bgMusic.muted ? '🔇' : '🔊';
  });

  volumeSlider.addEventListener('input', (e) => {
    bgMusic.volume = parseFloat(e.target.value);
    if (bgMusic.volume > 0 && bgMusic.muted) {
      bgMusic.muted = false;
      muteIcon.textContent = '🔊';
    }
  });

  /* ------------------------------------------------------------------------
     3. GENERATE DETAILED SVG SUNFLOWER BOUQUET
     ------------------------------------------------------------------------ */
  const sunflowersContainer = document.getElementById('sunflowersContainer');
  const flowerConfigs = [
    { cx: 210, cy: 135, r: 44, petals: 20 }, // Center hero sunflower
    { cx: 145, cy: 165, r: 36, petals: 18 }, // Top left
    { cx: 275, cy: 165, r: 36, petals: 18 }, // Top right
    { cx: 120, cy: 225, r: 32, petals: 16 }, // Lower left
    { cx: 300, cy: 225, r: 32, petals: 16 }, // Lower right
    { cx: 175, cy: 215, r: 34, petals: 18 }, // Mid left
    { cx: 245, cy: 215, r: 34, petals: 18 }  // Mid right
  ];

  function buildSunflowerBouquet() {
    const svgNS = 'http://www.w3.org/2000/svg';
    sunflowersContainer.innerHTML = '';

    flowerConfigs.forEach((flower) => {
      const group = document.createElementNS(svgNS, 'g');

      // Outer & inner golden petals
      for (let i = 0; i < flower.petals; i++) {
        const angle = (360 / flower.petals) * i;
        const petal = document.createElementNS(svgNS, 'ellipse');
        petal.setAttribute('cx', flower.cx);
        petal.setAttribute('cy', flower.cy - flower.r * 0.78);
        petal.setAttribute('rx', flower.r * 0.19);
        petal.setAttribute('ry', flower.r * 0.52);
        petal.setAttribute('fill', 'url(#petalGold)');
        petal.setAttribute('stroke', '#E08E00');
        petal.setAttribute('stroke-width', '0.7');
        petal.setAttribute('transform', `rotate(${angle} ${flower.cx} ${flower.cy})`);
        group.appendChild(petal);
      }

      // Rich seed center
      const core = document.createElementNS(svgNS, 'circle');
      core.setAttribute('cx', flower.cx);
      core.setAttribute('cy', flower.cy);
      core.setAttribute('r', flower.r * 0.42);
      core.setAttribute('fill', 'url(#sunCenter)');
      core.setAttribute('stroke', '#F7B500');
      core.setAttribute('stroke-width', '2');
      group.appendChild(core);

      sunflowersContainer.appendChild(group);
    });
  }

  buildSunflowerBouquet();

  // Bouquet Interactive Bloom Animation
  const bloomBouquetBtn = document.getElementById('bloomBouquetBtn');
  const bouquetWrapper = document.getElementById('bouquetWrapper');

  bloomBouquetBtn.addEventListener('click', (e) => {
    startMusicSafely();
    bouquetWrapper.classList.remove('bloom-burst');
    void bouquetWrapper.offsetWidth; // Trigger reflow
    bouquetWrapper.classList.add('bloom-burst');

    const rect = bouquetWrapper.getBoundingClientRect();
    burstParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, 55, true);

    setTimeout(() => {
      bouquetWrapper.classList.remove('bloom-burst');
    }, 900);
  });

  /* ------------------------------------------------------------------------
     4. HEARTFELT LETTER ENVELOPE & REVEAL ANIMATION
     ------------------------------------------------------------------------ */
  const envelopeBox = document.getElementById('envelopeBox');
  const letterPaper = document.getElementById('letterPaper');
  const letterContent = document.getElementById('letterContent');
  const replayLetterBtn = document.getElementById('replayLetterBtn');

  const letterParagraphs = [
    "My Dearest Kanak,",
    "Happy National Princess Day to the most beautiful soul!",
    "I don't know if words will ever be enough to describe how special you are, but today I want to try.",
    "If I could create a world just for you, it would be filled with endless gardens of sunflowers, skies painted with your favourite colours, stars that shine a little brighter, and beautiful moments that never come to an end.",
    "You know what makes you special? It's not just your smile, your beauty, or the way you make everything feel magical. It's the little things about you, the way you exist, the happiness you bring, and the beautiful person you are.",
    "I wish you could see yourself through my eyes, even for a moment. You would understand why someone like you deserves all the happiness in the universe.",
    "Like a sunflower follows the sunlight, I hope your life always follows happiness, love, success, and beautiful opportunities.",
    "On days when you feel low, remember that you are precious. On days when you doubt yourself, remember how wonderful you are. And whenever life becomes difficult, I hope you never forget that you deserve kindness, respect, and endless reasons to smile.",
    "I wish you countless beautiful mornings, peaceful nights, unexpected surprises, unforgettable adventures, and dreams that come true one by one.",
    "Never stop smiling, never stop dreaming, and never let the world dim the beautiful light inside you.",
    "Today is National Princess Day, but honestly, you don't need a special day to be celebrated. You deserve to feel like a princess every single day.",
    "If happiness had a flower, I would give you an entire garden. If love had a colour, I would paint your sky with it. And if wishes could become real, I would make sure every beautiful wish in your heart came true.",
    "Thank you for being YOU.",
    "Keep shining, keep smiling, and keep being the wonderful Kanak that you are.",
    "With lots of love, warmth, and a thousand imaginary sunflowers,",
    "Always wishing the best for you. ❤️",
    "Happy Princess Day, Kanak! 👑🌻"
  ];

  function renderLetterWithAnimation() {
    letterContent.innerHTML = '';
    letterParagraphs.forEach((text, index) => {
      const p = document.createElement('p');
      p.textContent = text;
      p.style.animationDelay = `${index * 0.22}s`;
      letterContent.appendChild(p);
    });
  }

  function openEnvelope() {
    startMusicSafely();
    envelopeBox.classList.add('opened');
    if (letterPaper.classList.contains('hidden')) {
      letterPaper.classList.remove('hidden');
      renderLetterWithAnimation();
      const rect = envelopeBox.getBoundingClientRect();
      burstParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, 35);
    }
  }

  envelopeBox.addEventListener('click', openEnvelope);
  envelopeBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openEnvelope();
    }
  });

  replayLetterBtn.addEventListener('click', renderLetterWithAnimation);

  /* ------------------------------------------------------------------------
     5. LOVE COUNTER & RANDOM SWEET SURPRISE MESSAGES
     ------------------------------------------------------------------------ */
  const reasonCounter = document.getElementById('reasonCounter');
  const addReasonBtn = document.getElementById('addReasonBtn');
  let count = 0;

  // Smooth initial count-up when scrolled into view
  let counterStarted = false;
  function animateInitialCounter() {
    if (counterStarted) return;
    counterStarted = true;
    const target = 100;
    const interval = setInterval(() => {
      count += 2;
      reasonCounter.textContent = count;
      if (count >= target) {
        clearInterval(interval);
      }
    }, 20);
  }

  addReasonBtn.addEventListener('click', (e) => {
    count += 1;
    reasonCounter.textContent = count;
    burstParticles(e.clientX, e.clientY, 15);
  });

  const sweetMessages = [
    "Your smile has the power to brighten even the cloudiest sky. ☀️",
    "You bring warmth and grace into every space you enter, Kanak. 👑",
    "Just like a sunflower, you naturally turn every moment toward the light. 🌻",
    "The kindness in your heart makes you rarer than any royal jewel. ✨",
    "You deserve every gentle dream and joyful surprise this world holds. 💖",
    "Never forget how deeply appreciated and wonderful you truly are. 🌸",
    "If magic had a name, it would sound just like your laughter. 🪄"
  ];

  const sweetMessageBox = document.getElementById('sweetMessageBox');
  const surpriseMsgBtn = document.getElementById('surpriseMsgBtn');
  let lastMsgIndex = -1;

  surpriseMsgBtn.addEventListener('click', (e) => {
    let idx;
    do {
      idx = Math.floor(Math.random() * sweetMessages.length);
    } while (idx === lastMsgIndex);
    lastMsgIndex = idx;

    sweetMessageBox.style.transform = 'scale(0.95)';
    setTimeout(() => {
      sweetMessageBox.textContent = `“${sweetMessages[idx]}”`;
      sweetMessageBox.style.transform = 'scale(1)';
    }, 150);

    burstParticles(e.clientX, e.clientY, 20);
  });

  /* ------------------------------------------------------------------------
     6. INTERACTIVE DIGITAL GIFT BOX & FINALE CELEBRATION
     ------------------------------------------------------------------------ */
  const giftBox = document.getElementById('giftBox');
  const giftRevealCard = document.getElementById('giftRevealCard');

  function openGiftBox() {
    startMusicSafely();
    giftBox.classList.add('opened');
    giftRevealCard.classList.remove('hidden');
    const rect = giftBox.getBoundingClientRect();
    burstParticles(rect.left + rect.width / 2, rect.top, 45, true);
  }

  giftBox.addEventListener('click', openGiftBox);
  giftBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openGiftBox();
    }
  });

  const celebrateFinaleBtn = document.getElementById('celebrateFinaleBtn');
  celebrateFinaleBtn.addEventListener('click', () => {
    startMusicSafely();
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        const rx = Math.random() * window.innerWidth;
        const ry = Math.random() * (window.innerHeight * 0.7);
        burstParticles(rx, ry, 35, true);
      }, i * 250);
    }
  });

  /* ------------------------------------------------------------------------
     7. SCROLL REVEAL OBSERVER
     ------------------------------------------------------------------------ */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.contains(reasonCounter)) {
          animateInitialCounter();
        }
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach((el) => observer.observe(el));

  /* ------------------------------------------------------------------------
     8. AMBIENT CANVAS: FLOATING HEARTS, ROSE PETALS, STARS & MAGIC CURSOR
     ------------------------------------------------------------------------ */
  const canvas = document.getElementById('magicCanvas');
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const ambientParticles = [];
  const burstList = [];
  const ambientSymbols = ['✨', '🌸', '💖', '⭐'];

  // Initialize gentle background floating particles
  for (let i = 0; i < 32; i++) {
    ambientParticles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 10 + Math.random() * 12,
      speedY: 0.35 + Math.random() * 0.65,
      speedX: (Math.random() - 0.5) * 0.5,
      symbol: ambientSymbols[Math.floor(Math.random() * ambientSymbols.length)],
      opacity: 0.35 + Math.random() * 0.45
    });
  }

  // Magical Cursor Sparkle Trail
  let lastSparkleTime = 0;
  window.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastSparkleTime > 35) {
      lastSparkleTime = now;
      burstList.push({
        x: e.clientX,
        y: e.clientY,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -0.5 - Math.random() * 1.2,
        alpha: 1,
        size: 4 + Math.random() * 4,
        isEmoji: false
      });
    }
  });

  // Burst helper for buttons, bouquet & gift interactions
  function burstParticles(x, y, count = 25, includeSunflowers = false) {
    const emojis = includeSunflowers ? ['🌻', '👑', '💖', '✨'] : ['✨', '💖', '🌸'];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 4.5;
      burstList.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        alpha: 1,
        size: 14 + Math.random() * 10,
        isEmoji: true,
        symbol: emojis[Math.floor(Math.random() * emojis.length)]
      });
    }
  }

  function animateCanvas() {
    ctx.clearRect(0, 0, width, height);

    // Draw & update ambient floating hearts/petals/stars
    ambientParticles.forEach((p) => {
      p.y -= p.speedY;
      p.x += Math.sin(p.y * 0.01) * 0.4 + p.speedX;

      if (p.y < -30) {
        p.y = height + 20;
        p.x = Math.random() * width;
      }

      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.font = `${p.size}px serif`;
      ctx.fillText(p.symbol, p.x, p.y);
      ctx.restore();
    });

    // Draw & update cursor sparkles and celebration bursts
    for (let i = burstList.length - 1; i >= 0; i--) {
      const b = burstList[i];
      b.x += b.vx;
      b.y += b.vy;
      if (b.isEmoji) b.vy += 0.06; // Gentle gravity for celebration bursts
      b.alpha -= 0.018;

      if (b.alpha <= 0) {
        burstList.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = b.alpha;
      if (b.isEmoji) {
        ctx.font = `${b.size}px serif`;
        ctx.fillText(b.symbol, b.x, b.y);
      } else {
        ctx.fillStyle = '#FFE169';
        ctx.shadowColor = '#E6B85C';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    requestAnimationFrame(animateCanvas);
  }

  animateCanvas();
});