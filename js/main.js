// ----------------------------------
// Smooth Scroll
// ----------------------------------
document.querySelectorAll(".header-menu-item").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetElement = document.getElementById(this.getAttribute("href").substring(1));
    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: "smooth"
    });
  });
});

// -----------------------------
// SP Hamburger Menu
// -----------------------------
const menuButton = document.querySelector(".hamburger-menu");
const menu = document.querySelector(".header-menu");
const menuLinks = document.querySelectorAll(".header-menu-item");

menuButton.addEventListener("click", () => {
  menu.classList.toggle("active");
  menuButton.classList.toggle("open");
});

menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
    menuButton.classList.remove("open");
  });
});

// -----------------------------
// News-Modal
// -----------------------------
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal");
  const closeButton = document.getElementById("close-btn");

  document.querySelectorAll(".news-title a").forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const title = link.getAttribute("data-title");
      const content = link.closest("article").querySelector(".news-content").innerHTML;
      const imgSrc = link.getAttribute("data-image");

      document.getElementById("modal-title").textContent = title;
      document.getElementById("modal-content").innerHTML = `<p>${content}</p>`;
      document.getElementById("modal-image").src = imgSrc;

      modal.style.display = "block";
    });
  });

  closeButton.addEventListener("click", () => modal.style.display = "none");
  window.addEventListener("click", event => {
    if (event.target === modal) modal.style.display = "none";
  });
});

// -----------------------------
// About-Section Fade-in
// -----------------------------
const aboutSection = document.querySelector(".about-container");
new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) aboutSection.classList.add("fade-in");
  });
}).observe(aboutSection);

// -----------------------------
// Contact Form Validation with Alert
// -----------------------------
const form = document.getElementById("contact-form");
const nameInput = document.getElementById("contact-name");
const emailInput = document.getElementById("contact-email");
const inquiryOptions = document.querySelectorAll("input[name='inquiry']");
const privacyCheckbox = document.getElementById("contact-privacy");

form.addEventListener("submit", function (event) {
  let errors = [];

  // 名前のバリデーション
  if (!nameInput.value.trim()) {
    errors.push("お名前は必須項目です。");
  }

  // メールアドレスのバリデーション
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput.value.trim())) {
    errors.push("正しいメールアドレスを入力してください。");
  }

  // お問い合わせ内容のバリデーション
  if (![...inquiryOptions].some(option => option.checked)) {
    errors.push("お問い合わせ内容を選択してください。");
  }

  // プライバシーポリシー同意のバリデーション
  if (!privacyCheckbox || !privacyCheckbox.checked) {
    errors.push("プライバシーポリシーに同意してください。");
  }

  // エラーがある場合：送信を防ぎ、アラート表示
  if (errors.length > 0) {
    event.preventDefault();
    alert(errors.join("\n"));
    return;
  }

  // 正常時：デモとして送信防止（本番では削除）
  event.preventDefault();
  alert("お問い合わせありがとうございます。送信が完了しました。");
  form.reset();
});

