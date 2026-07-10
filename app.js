// Iron Valley Plumbing & Air — shared page behavior

// Footer year
var yearEl = document.getElementById('year')
if (yearEl) yearEl.textContent = new Date().getFullYear()

// Mobile nav
var toggle = document.getElementById('nav-toggle')
var nav = document.getElementById('site-nav')
if (toggle && nav) {
  toggle.addEventListener('click', function () {
    nav.classList.toggle('open')
    toggle.classList.toggle('open')
  })
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open')
      toggle.classList.remove('open')
    }
  })
}

// Scroll reveal
var observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.1 }
)
document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el) })

// Quote form — submits to RefreshWeb's shared contact endpoint
var form = document.getElementById('quote-form')
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault()
    var data = new FormData(form)
    fetch('https://refreshweb.io/api/client-contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientId: '9fd02e4a-6686-45a8-8318-0054680da10b',
        name: data.get('name'),
        contact: data.get('phone'),
        message: data.get('issue'),
        page: location.pathname,
        hp: data.get('hp'),
      }),
    }).catch(function () {})
    form.innerHTML = '<p class="sent-msg">GOT IT. WE\'LL CALL YOU BACK WITHIN THE HOUR. 🔧</p>'
  })
}
