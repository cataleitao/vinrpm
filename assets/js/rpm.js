// Comportamento do cabeçalho, menu e âncoras — copiado tal e qual do tema WordPress (astra-child/functions.php).
    (function() {

        // ---- Overlay do menu ----
        var overlay = document.getElementById('rpm-menu-overlay');
var backdrop = document.getElementById('rpm-backdrop');
var btnMenu = document.getElementById('rpm-btn-menu');

function openMenu() {
    overlay.classList.add('is-open');
    backdrop.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('rpm-menu-open');
}
function closeMenu() {
    overlay.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('rpm-menu-open');
}
if (btnMenu) btnMenu.addEventListener('click', openMenu);
if (backdrop) backdrop.addEventListener('click', closeMenu);
if (overlay) {
    overlay.querySelectorAll('.rpm-overlay__link').forEach(function(link) {
        link.style.setProperty('color', '#000000', 'important');
        link.addEventListener('click', closeMenu);
        link.addEventListener('mouseenter', function() {
            this.style.setProperty('color', '#000000', 'important');
            this.style.opacity = '0.35';
        });
        link.addEventListener('mouseleave', function() {
            this.style.setProperty('color', '#000000', 'important');
            this.style.opacity = '1';
        });
    });
}
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeMenu();
});

        // ---- Dropdown de língua ----
        var langBtn      = document.getElementById('rpm-lang-btn');
        var langDropdown = document.getElementById('rpm-lang-dropdown');

        if (langBtn && langDropdown) {
            langBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                var isOpen = langDropdown.classList.toggle('is-open');
                langBtn.setAttribute('aria-expanded', isOpen);
            });
            document.addEventListener('click', function() {
                langDropdown.classList.remove('is-open');
                if (langBtn) langBtn.setAttribute('aria-expanded', 'false');
            });
        }

        // ---- Scroll suave para âncoras (só se o alvo existe nesta página) ----
        document.addEventListener('click', function(e) {
            var link = e.target.closest('a[href]');
            if (!link) return;
            var href = link.getAttribute('href');
            if (!href) return;
            var anchorMatch = href.match(/#([a-z0-9\-]+)$/i);
            if (anchorMatch) {
                var targetId = anchorMatch[1];
                var target   = document.getElementById(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    history.pushState(null, '', '#' + targetId);
                }
                // Se o alvo não existe, navega normalmente para a home com âncora
            }
        });

        // ---- Scroll para âncora ao carregar a home ----
        var isHome = document.body.classList.contains('page-template-page-inicio')
                  || document.body.classList.contains('home');
        if (isHome) {
            var hash = window.location.hash
                    || sessionStorage.getItem('rpm_return_anchor')
                    || '';
            sessionStorage.removeItem('rpm_return_anchor');
            if (hash) {
                setTimeout(function() {
                    var target = document.getElementById(hash.replace('#', ''));
                    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300);
            }
        }

        // ---- Guardar âncora ao sair para página de vinho ----
        if (document.body.classList.contains('single-detail')) {
            sessionStorage.setItem('rpm_return_anchor', '#vinhos');
        }

    })();
    
