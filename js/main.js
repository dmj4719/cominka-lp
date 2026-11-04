/* Cominka LP — main.js */
(function () {
  'use strict';

  /* ---------- logo marquee ---------- */
  var tpl = document.getElementById('logo-list');
  if (tpl) {
    document.querySelectorAll('.marquee__track').forEach(function (track) {
      for (var i = 0; i < 2; i++) {
        var frag = tpl.content.cloneNode(true);
        if (i === 1) frag.querySelectorAll('img').forEach(function (img) { img.alt = ''; img.setAttribute('aria-hidden', 'true'); });
        track.appendChild(frag);
      }
    });
  }

  /* ---------- scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- SP fixed CTA ---------- */
  var fixed = document.getElementById('fixed-cta');
  var fv = document.querySelector('.fv');
  var contact = document.getElementById('contact');
  if (fixed && fv && contact && 'IntersectionObserver' in window) {
    var fvVisible = true, contactVisible = false;
    var update = function () {
      var show = !fvVisible && !contactVisible;
      fixed.classList.toggle('is-show', show);
      fixed.setAttribute('aria-hidden', show ? 'false' : 'true');
      var a = fixed.querySelector('a'); if (a) a.tabIndex = show ? 0 : -1;
    };
    new IntersectionObserver(function (e) { fvVisible = e[0].isIntersecting; update(); }).observe(fv);
    new IntersectionObserver(function (e) { contactVisible = e[0].isIntersecting; update(); }).observe(contact);
  }

  /* ---------- YouTube (lite embed) ---------- */
  document.querySelectorAll('[data-yt]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-yt');
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      f.title = 'Cominka 紹介動画';
      f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      f.allowFullscreen = true;
      btn.innerHTML = '';
      btn.appendChild(f);
      btn.style.cursor = 'default';
    }, { once: true });
  });

  /* ---------- simulation ---------- */
  var $ = function (id) { return document.getElementById(id); };
  var inputs = ['sim-rev', 'sim-ltv', 'sim-close', 'sim-cvr', 'sim-pv'].map($);
  if (inputs.every(Boolean)) {
    var INV = 30, M = 24, T = INV * M * 5, H = 220; // 万円 / ヶ月 / 目標累計売上 / bar area px（PC）
    var bars = $('chart-bars'), xs = $('chart-x'), yAxis = $('chart-y'), plot = $('chart-plot');
    var inv = $('chart-inv'), invLbl = $('chart-inv-lbl');
    for (var m = 0; m < M; m++) {
      var b = document.createElement('div'); b.className = 'chart__bar'; bars.appendChild(b);
      var s = document.createElement('span'); s.textContent = [0, 5, 11, 17, 23].indexOf(m) >= 0 ? (m + 1) + 'ヶ月' : ''; xs.appendChild(s);
    }
    var fmt = function (x) { return Math.round(x).toLocaleString('ja-JP'); };
    var f1 = function (x) { return (Math.round(x * 10) / 10).toFixed(1); };

    var calc = function () {
      var R = parseFloat(inputs[0].value), L = Math.round(parseFloat(inputs[1].value)), c = parseFloat(inputs[2].value) / 100;
      var v = parseFloat(inputs[3].value) / 100, pv = parseFloat(inputs[4].value);
      var ok = R > 0 && L > 0 && c > 0;
      var w = function (mm) { return Math.min(mm, 6) / 6; };
      var n = 0, base = 0, t, mm;
      if (ok) { for (mm = 1; mm <= M; mm++) base += w(mm) * R * Math.min(L, M - mm + 1); n = T / base; }
      var rev = [];
      for (t = 1; t <= M; t++) { var x = 0; if (ok) for (mm = 1; mm <= t; mm++) if (t - mm < L) x += n * w(mm) * R; rev.push(x); }

      var areaH = bars.clientHeight || H;
      var max = Math.max.apply(null, [INV].concat(rev)) * 1.1;
      Array.prototype.forEach.call(bars.children, function (el, i) { el.style.height = Math.max(2, Math.round(rev[i] / max * areaH)) + 'px'; });

      // y axis
      yAxis.querySelectorAll('.chart__tick').forEach(function (e) { e.remove(); });
      plot.querySelectorAll('.chart__grid').forEach(function (e) { e.remove(); });
      var steps = [5, 10, 20, 25, 50, 100, 200, 250, 500, 1000], step = 1000;
      for (var i = 0; i < steps.length; i++) { if (max / steps[i] <= 5) { step = steps[i]; break; } }
      for (var y = 0; y <= max; y += step) {
        var px = Math.round(y / max * areaH) + 'px';
        var tk = document.createElement('span'); tk.className = 'chart__tick'; tk.style.bottom = px; tk.textContent = y.toLocaleString('ja-JP'); yAxis.appendChild(tk);
        var g = document.createElement('div'); g.className = 'chart__grid'; g.style.bottom = px; plot.insertBefore(g, plot.firstChild);
      }
      var invY = Math.round(INV / max * areaH);
      inv.style.bottom = invY + 'px'; invLbl.style.bottom = (invY + 6) + 'px';

      var inq = ok ? n / c : 0;
      $('out-m12').textContent = ok ? fmt(rev[11]) + '万円' : '—';
      $('out-new').textContent = ok ? f1(n) + '社' : '—';
      $('out-inq').textContent = ok ? f1(inq) + '件' : '—';
      $('out-pv').textContent = ok && v > 0 ? fmt(inq / v) + 'PV' : '—';
      $('out-cvr').textContent = ok && pv > 0 ? (inq / pv * 100).toFixed(2) + '%' : '—';
    };
    inputs.forEach(function (el) { el.addEventListener('input', calc); });
    window.addEventListener('resize', function () { clearTimeout(window.__simT); window.__simT = setTimeout(calc, 150); });
    calc();
  }

  /* ---------- contact form（EmailJS） ---------- */
  var EMAILJS = { publicKey: 'gvPYt8gPVa2Y02frn', serviceId: 'service_4o645kr', templateId: 'template_9ziatco' };
  var form = document.getElementById('contact-form');
  if (form) {
    if (window.emailjs) emailjs.init({ publicKey: EMAILJS.publicKey });
    var check = function (input) {
      var wrap = input.closest('.ff');
      var ok = input.checkValidity() && input.value.trim() !== '';
      if (wrap) wrap.classList.toggle('is-error', !ok);
      return ok;
    };
    var req = form.querySelectorAll('input[required]');
    req.forEach(function (el) {
      el.addEventListener('blur', function () { if (el.value) check(el); });
      el.addEventListener('input', function () { if (el.closest('.ff').classList.contains('is-error')) check(el); });
    });
    var btn = form.querySelector('button[type="submit"]');
    var btnLabel = btn ? btn.firstChild : null; // テキストノード
    var errBox = document.getElementById('form-error');
    var sending = false;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (sending) return;
      var first = null;
      req.forEach(function (el) { if (!check(el) && !first) first = el; });
      if (first) { first.focus(); return; }

      var val = function (n) { var el = form.querySelector('[name="' + n + '"]'); return el ? el.value.trim() : ''; };
      var plan = form.querySelector('[name="plan"]:checked');
      var params = {
        company: val('company'),
        name: val('name'),
        email: val('email'),
        tel: val('tel'),
        plan: plan ? plan.value : '',
        message: val('message') || '（記入なし）',
        page_url: window.location.href, // 送信時のURL（UTM・gclid等のパラメーター付き）
        referrer: document.referrer || '（なし）',
        submitted_at: new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
      };

      sending = true;
      if (btn) { btn.disabled = true; btn.classList.add('is-sending'); if (btnLabel) btnLabel.nodeValue = '送信中...'; }
      if (errBox) errBox.hidden = true;

      if (!window.emailjs) { onError(new Error('EmailJS SDK not loaded')); return; }
      emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, params)
        .then(function () {
          if (window.dataLayer) window.dataLayer.push({ event: 'form_submit_success', form_plan: params.plan });
          window.location.href = 'thanks.html';
        })
        .catch(onError);

      function onError(err) {
        sending = false;
        if (btn) { btn.disabled = false; btn.classList.remove('is-sending'); if (btnLabel) btnLabel.nodeValue = 'SEO/AIOのプロに無料相談'; }
        if (errBox) errBox.hidden = false;
        console.error('EmailJS Error:', err);
      }
    });
  }
})();
