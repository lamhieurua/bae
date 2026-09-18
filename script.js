/* ===================================================
   GÓI CON TIM LÀM QUÀ - SCRIPT
   Multi-Page Storybook Slider & Separate Audio Tracks
   =================================================== */

// --- Audio & Music Player Elements ---
const bgMusic = document.getElementById('bgMusic');
const musicAvatar = document.getElementById('musicAvatar');
const soundWaveRing = document.getElementById('soundWaveRing');
const musicIcon = document.getElementById('musicIcon');
const musicPill = document.getElementById('musicPill');
const musicTiming = document.getElementById('musicTiming');
let isMusicPlaying = false;

// --- Danh sách file nhạc riêng biệt tương ứng từng mục ---
const chapterAudios = [
  {
    chapter: 1,
    title: "Bầu Trời Chờ Đợi",
    audioSrc: "chapter1.mp3",
    label: "Chương 1 • Tuổi thơ"
  },
  {
    chapter: 2,
    title: "Tựa Nắng Ấm Muôn Nơi",
    audioSrc: "chapter2.mp3",
    label: "Chương 2 • Nắng ấm"
  },
  {
    chapter: 3,
    title: "Gói Con Tim Làm Quà",
    audioSrc: "chapter3.mp3",
    label: "Chương 3 • Con tim"
  },
  {
    chapter: 4,
    title: "Xin Ở Cạnh Nhau Lâu Thật Lâu",
    audioSrc: "chapter4.mp3",
    label: "Chương 4 • Lễ đường"
  }
];

let currentSlide = 0;
const totalSlides = 4;

// --- Love Notes Database ---
const loveNotes = [
  "Dù ngoài kia có bao la giông bão, thì khi về bên anh, em sẽ luôn có một chốn bình yên nhất. 🏡💕",
  "Nụ cười của em là ánh mặt trời sưởi ấm cả một ngày dài của anh. Hãy luôn cười thật tươi nhé! ☀️🌸",
  "Anh gom cả chân thành tuổi đôi mươi, chỉ mong đổi lấy một đời hạnh phúc bên cạnh em. 💖",
  "Người đến bên rạng ngời... tựa nắng ấm muôn nơi. Cảm ơn em vì đã xuất hiện trong cuộc đời anh! ✨",
  "Trái tim này từ lâu đã được gói ghém cẩn thận và đóng dấu: Thuộc quyền sở hữu của riêng em! 💌🔒",
  "Em cho nhành hoa, anh gói con tim trao làm quà... Có em, anh nguyện nâng niu suốt cả cuộc đời. 💐",
  "Hôm nay em có biết em rất đáng yêu không? Nếu chưa biết thì ngày mai anh lại nhắc tiếp nhé! 🥰",
  "Khi lưng còng răng thưa, tóc xưa phai màu... bàn tay này vẫn sẽ nắm chặt lấy tay em! 👵👴💍"
];
let currentNoteIndex = 0;

// --- Dodge Button Phrases ---
const dodgePhrases = [
  "Hổng cho từ chối đou nha! 😝",
  "Bắt hụt gòii! Bấm nút kia đi nà! 💖",
  "Nút này bị hỏng rùi nè, bấm nút đỏ đi! 🤭",
  "Đừng từ chối mà, tội nghiệp anh lém... 🥺",
  "Bấm 'Em đồng ý' đi mà bé iu ơiii! ✨"
];
let dodgeCount = 0;

/* ===================================================
   CANVAS ANIMATION: FLOATING HEARTS & SPARKLES
   =================================================== */
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.reset();
    this.y = Math.random() * canvas.height;
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 20;
    this.size = Math.random() * 12 + 8;
    this.speedY = Math.random() * 1.2 + 0.6;
    this.speedX = Math.sin(Math.random() * Math.PI) * 0.8;
    this.opacity = Math.random() * 0.6 + 0.2;
    this.rotation = Math.random() * 360;
    this.rotSpeed = (Math.random() - 0.5) * 1.5;
    this.type = Math.random() > 0.4 ? 'heart' : 'petal';
    this.color = Math.random() > 0.5 ? '#ff85a1' : '#fbb1bd';
  }

  update() {
    this.y -= this.speedY;
    this.x += Math.sin(this.y * 0.01) * 0.8;
    this.rotation += this.rotSpeed;
    if (this.y < -30) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.globalAlpha = this.opacity;

    if (this.type === 'heart') {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      const s = this.size * 0.5;
      ctx.moveTo(0, s * 0.3);
      ctx.bezierCurveTo(-s, -s * 0.7, -s * 1.4, s * 0.3, 0, s * 1.3);
      ctx.bezierCurveTo(s * 1.4, s * 0.3, s, -s * 0.7, 0, s * 0.3);
      ctx.fill();
    } else {
      ctx.fillStyle = '#ffccd5';
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size * 0.6, this.size * 0.3, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

const PARTICLE_COUNT = window.innerWidth < 600 ? 25 : 40;
for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ===================================================
   INTERACTIVE GIFT BOX OPENING
   =================================================== */
function openGift() {
  const giftBox = document.getElementById('giftBox');
  const introScreen = document.getElementById('introScreen');
  const storybookWrapper = document.getElementById('storybookWrapper');

  if (giftBox.classList.contains('opened')) return;

  giftBox.classList.add('opened');
  triggerGiftConfetti();

  // Bắt đầu phát đoạn nhạc của chương 1
  goToSlide(0, true);

  setTimeout(() => {
    introScreen.classList.add('fade-out');
    storybookWrapper.classList.remove('hidden');
    musicPill.classList.remove('hidden');

    setTimeout(() => {
      introScreen.style.display = 'none';
    }, 800);
  }, 850);
}

function triggerGiftConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff477e', '#ff85a1', '#ffeaa7', '#ffffff']
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff758c', '#ff85a1', '#ffd166']
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff758c', '#ff85a1', '#ffd166']
      });
    }, 250);
  }
}

/* ===================================================
   SLIDE NAVIGATION & SEPARATE AUDIO CHAPTERS
   =================================================== */
function goToSlide(index, forcePlay = false) {
  if (index < 0 || index >= totalSlides) return;
  currentSlide = index;

  // Cập nhật vị trí track
  const track = document.getElementById('slidesTrack');
  track.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Cập nhật active class cho slide items
  const items = document.querySelectorAll('.slide-item');
  items.forEach((item, i) => {
    if (i === currentSlide) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Cập nhật progress bar và dots
  const progressFill = document.getElementById('progressBarFill');
  progressFill.style.width = `${((currentSlide + 1) / totalSlides) * 100}%`;

  const stepBtns = document.querySelectorAll('.step-btn');
  stepBtns.forEach((btn, i) => {
    if (i === currentSlide) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Cập nhật Counter & Buttons
  const counter = document.getElementById('slideCounter');
  counter.innerText = `${currentSlide + 1} / ${totalSlides}`;

  const prevBtn = document.getElementById('prevBtn');
  if (currentSlide === 0) {
    prevBtn.classList.add('hidden');
  } else {
    prevBtn.classList.remove('hidden');
  }

  const nextBtn = document.getElementById('nextBtn');
  if (currentSlide === totalSlides - 1) {
    nextBtn.innerHTML = 'Bắt đầu lại <i class="fa-solid fa-rotate-right"></i>';
  } else {
    nextBtn.innerHTML = 'Tiếp tục <i class="fa-solid fa-chevron-right"></i>';
  }

  // PHÁT ĐÚNG ĐOẠN NHẠC CỦA CHƯƠNG ĐÓ
  playChapterAudio(currentSlide, forcePlay);
}

function playChapterAudio(index, forcePlay = false) {
  const currentChapter = chapterAudios[index];
  musicTiming.innerText = currentChapter.label;

  // Đổi file nhạc sang file của chương hiện tại
  if (!bgMusic.src.includes(currentChapter.audioSrc)) {
    bgMusic.src = currentChapter.audioSrc;
    bgMusic.currentTime = 0;
  }

  if (forcePlay || isMusicPlaying) {
    playMusic();
  }
}

function nextSlide() {
  if (currentSlide < totalSlides - 1) {
    goToSlide(currentSlide + 1);
  } else {
    goToSlide(0);
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    goToSlide(currentSlide - 1);
  }
}

/* ===================================================
   SWIPE TOUCH GESTURES (Vuốt cảm ứng chuyển trang)
   =================================================== */
let touchStartX = 0;
let touchEndX = 0;

const viewport = document.getElementById('slidesViewport');
if (viewport) {
  viewport.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  viewport.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
}

function handleSwipe() {
  const swipeThreshold = 45;
  if (touchEndX < touchStartX - swipeThreshold) {
    if (currentSlide < totalSlides - 1) {
      nextSlide();
    }
  }
  if (touchEndX > touchStartX + swipeThreshold) {
    if (currentSlide > 0) {
      prevSlide();
    }
  }
}

/* ===================================================
   MUSIC PLAYER CONTROLLER
   =================================================== */
function playMusic() {
  bgMusic.volume = 0.85;
  bgMusic.play().then(() => {
    isMusicPlaying = true;
    musicAvatar.classList.remove('paused');
    musicAvatar.classList.add('spinning');
    if (soundWaveRing) soundWaveRing.style.display = 'block';
    musicIcon.className = 'fa-solid fa-volume-high';
  }).catch(err => {
    console.log('Autoplay policy or audio play error:', err);
  });
}

function pauseMusic() {
  bgMusic.pause();
  isMusicPlaying = false;
  musicAvatar.classList.add('paused');
  musicAvatar.classList.remove('spinning');
  if (soundWaveRing) soundWaveRing.style.display = 'none';
  musicIcon.className = 'fa-solid fa-volume-xmark';
}

function toggleMusic() {
  if (isMusicPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

/* ===================================================
   POLAROID PHOTO BURST HEARTS
   =================================================== */
function burstPhotoHearts(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  const clickX = e.clientX || (rect.left + rect.width / 2);
  const clickY = e.clientY || (rect.top + rect.height / 2);

  for (let i = 0; i < 7; i++) {
    createFloatingHeart(clickX, clickY);
  }

  const card = document.getElementById('polaroidCard');
  if (card) {
    card.style.transform = 'scale(1.04) rotate(0deg)';
    setTimeout(() => {
      card.style.transform = '';
    }, 250);
  }
}

function createFloatingHeart(x, y) {
  const heart = document.createElement('div');
  heart.innerHTML = Math.random() > 0.4 ? '💖' : '🌸';
  heart.style.position = 'fixed';
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.fontSize = `${Math.random() * 16 + 20}px`;
  heart.style.pointerEvents = 'none';
  heart.style.zIndex = '9999';
  heart.style.transition = 'all 1s cubic-bezier(0.25, 1, 0.5, 1)';
  heart.style.opacity = '1';

  document.body.appendChild(heart);

  const deltaX = (Math.random() - 0.5) * 140;
  const deltaY = -(Math.random() * 120 + 80);

  requestAnimationFrame(() => {
    heart.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.3) rotate(${(Math.random() - 0.5) * 60}deg)`;
    heart.style.opacity = '0';
  });

  setTimeout(() => {
    heart.remove();
  }, 1000);
}

/* ===================================================
   LOVE NOTES DISPLAY
   =================================================== */
function revealLoveNote() {
  const noteCard = document.getElementById('loveNoteCard');
  const noteText = document.getElementById('noteText');
  const heartEl = document.getElementById('pulseHeart');

  currentNoteIndex = (currentNoteIndex + 1) % loveNotes.length;

  noteCard.style.animation = 'none';
  void noteCard.offsetWidth;
  noteCard.style.animation = 'notePop 0.4s ease-out';
  noteText.innerText = loveNotes[currentNoteIndex];

  const rect = heartEl.getBoundingClientRect();
  createFloatingHeart(rect.left + rect.width / 2, rect.top + rect.height / 2);
}

// --- CẤU HÌNH NHẬN THÔNG BÁO KẾT QUẢ VỀ CHO BẠN ---
const NOTIFICATION_CONFIG = {
  // Thay địa chỉ email của bạn vào đây (ví dụ: lamhieu@gmail.com)
  email: "hieurua1900@gmail.com",
  enableLocalLog: true
};

function sendNotification(type, details = "") {
  const timestamp = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
  const userAgent = navigator.userAgent;
  const isMobile = /Android|iPhone|iPad|iPod/i.test(userAgent);
  const deviceType = isMobile ? "Điện thoại (Mobile)" : "Máy tính (PC)";

  let subject = "";
  let actionTitle = "";

  if (type === "agree") {
    subject = "🎉 [TIN CỰC VUI] Bạn gái ĐÃ BẤM ĐỒNG Ý rồi nha! ❤️";
    actionTitle = "ĐÃ ĐỒNG Ý ❤️";
  } else if (type === "dodge") {
    subject = "😜 [THÔNG BÁO] Bé iu vừa bấm nghịch nút từ chối kìa!";
    actionTitle = "Bấm nút từ chối/né tránh 😜";
  } else if (type === "reply") {
    subject = "💌 [LỜI NHẮN] Bạn gái gửi tin nhắn cho bạn: " + details;
    actionTitle = "Gửi lời nhắn yêu thương 💕";
  }

  const payload = {
    _subject: subject,
    _template: "table",
    _captcha: "false",
    "Kết quả": actionTitle,
    "Chi tiết": details || "Người yêu đã bấm trên trang web!",
    "Thời gian": timestamp,
    "Thiết bị": deviceType
  };

  // Lưu lịch sử vào LocalStorage để xem lại bất cứ lúc nào
  if (NOTIFICATION_CONFIG.enableLocalLog) {
    try {
      const logs = JSON.parse(localStorage.getItem('love_notifications') || '[]');
      logs.push({ type, details, timestamp, deviceType });
      localStorage.setItem('love_notifications', JSON.stringify(logs));
    } catch(e) {}
  }

  // Gửi email tự động qua FormSubmit (hoàn toàn miễn phí, hỗ trợ GitHub Pages)
  if (NOTIFICATION_CONFIG.email && !NOTIFICATION_CONFIG.email.includes("your_email_here")) {
    fetch(`https://formsubmit.co/ajax/${encodeURIComponent(NOTIFICATION_CONFIG.email)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    }).then(res => res.json())
      .then(data => console.log('Notification sent successfully:', data))
      .catch(err => console.log('Notification error:', err));
  }
}

/* ===================================================
   PROPOSAL INTERACTION (ACCEPT & PLAYFUL DODGE)
   =================================================== */
function dodgeButton(btn) {
  const container = document.getElementById('decisionContainer');
  const containerRect = container.getBoundingClientRect();
  const btnRect = btn.getBoundingClientRect();

  const maxOffsetX = (containerRect.width - btnRect.width) / 2;
  const maxOffsetY = 35;

  const randomX = (Math.random() * 2 - 1) * Math.min(maxOffsetX, 70);
  const randomY = (Math.random() * 2 - 1) * maxOffsetY;

  btn.style.transform = `translate(${randomX}px, ${randomY}px)`;

  btn.innerText = dodgePhrases[dodgeCount % dodgePhrases.length];
  dodgeCount++;

  // Gửi thông báo khi nàng bấm thử nút từ chối lần 1 hoặc lần 3
  if (dodgeCount === 1 || dodgeCount === 3) {
    sendNotification("dodge", `Nàng vừa bấm thử nút từ chối lần thứ ${dodgeCount}!`);
  }

  const btnYes = document.getElementById('btnYes');
  const currentScale = 1 + (dodgeCount * 0.04);
  btnYes.style.transform = `scale(${Math.min(currentScale, 1.25)})`;
}

function onAcceptLove() {
  const decisionContainer = document.getElementById('decisionContainer');
  const successCertificate = document.getElementById('successCertificate');

  decisionContainer.style.display = 'none';
  successCertificate.classList.remove('hidden');

  // GỬI KẾT QUẢ ĐỒNG Ý VỀ CHO BẠN
  sendNotification("agree", "Nàng đã chính thức bấm nút: Dạ em đồng ý! ❤️");

  const duration = 3.5 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#ff477e', '#ff85a1', '#ffeaa7', '#ffffff']
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#ff477e', '#ff85a1', '#ffeaa7', '#ffffff']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());

  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      createFloatingHeart(
        Math.random() * window.innerWidth,
        window.innerHeight * 0.7
      );
    }, i * 150);
  }
}

function sendGirlfriendReply() {
  const input = document.getElementById('replyMessageInput');
  const status = document.getElementById('replyStatus');
  const btn = document.getElementById('replyBtn');

  const msg = input.value.trim();
  if (!msg) {
    input.focus();
    return;
  }

  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang gửi...';

  sendNotification("reply", msg);

  setTimeout(() => {
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Đã gửi';
    status.classList.remove('hidden');
    input.disabled = true;

    for (let i = 0; i < 8; i++) {
      createFloatingHeart(window.innerWidth / 2, window.innerHeight * 0.7);
    }
  }, 600);
}

document.addEventListener('DOMContentLoaded', () => {
  bgMusic.load();
});
