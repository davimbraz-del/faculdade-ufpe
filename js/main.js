// Número do WhatsApp da distribuidora (DDI + DDD + número, só dígitos)
const WHATSAPP = "5581900000000";

// Menu mobile
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", open);
  toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
});

nav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// Sombra no header ao rolar
const header = document.querySelector(".header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Máscara simples de CNPJ
const cnpj = document.querySelector('input[name="cnpj"]');
cnpj.addEventListener("input", () => {
  const d = cnpj.value.replace(/\D/g, "").slice(0, 14);
  cnpj.value = d
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
});

// Formulário -> WhatsApp
const form = document.getElementById("form-contato");
const msg = form.querySelector(".form__msg");
const link = form.querySelector(".form__link");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const required = form.querySelectorAll("[required]");
  let ok = true;
  required.forEach((input) => {
    const invalid = !input.value.trim();
    input.classList.toggle("is-invalid", invalid);
    if (invalid) ok = false;
  });

  if (!ok) {
    msg.textContent = "Preencha os campos obrigatórios.";
    return;
  }
  msg.textContent = "";

  const data = Object.fromEntries(new FormData(form));
  const text =
    `Olá! Quero ser cliente da AFEGH Distribuidora.\n\n` +
    `*Responsável:* ${data.nome}\n` +
    `*Farmácia:* ${data.farmacia}\n` +
    (data.cnpj ? `*CNPJ:* ${data.cnpj}\n` : "") +
    `*Cidade:* ${data.cidade}\n` +
    `*Interesse:* ${data.interesse}`;

  const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
  link.href = url;
  link.hidden = false;
  link.focus();
});

// Ano no rodapé
document.getElementById("ano").textContent = new Date().getFullYear();
