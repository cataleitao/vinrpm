# Testa todos os endereços dos QR codes, páginas antigas e PDFs.
# Uso: python3 ferramentas/testar_enderecos.py https://vinrpm.com
import urllib.request, urllib.error, sys, re
BASE=sys.argv[1]
qr=['/detail/analogue_2024/','/detail/duotone-2024/','/detail/eq-2024/','/detail/ovdb-tinto-2024/','/detail/ovdb-branco-2025/',
    '/pt/detail/reverb-2/','/detail/analogue/','/detail/looper/','/detail/eq/','/detail/ovdb-branco/']
outras=['/','/pt/inicio/','/detail/reverb/','/detail/ovdb-tinto/','/pt/detail/analogue-2/','/pt/detail/eq-2/','/pt/detail/looper-2/','/pt/detail/ovdb-tinto-2/','/pt/detail/ovdb-branco-2/','/pt/detail/analogue_2024-2/','/pt/detail/eq-2024-2/','/pt/detail/ovdb-tinto-2024-2/','/pt/detail/ovdb-branco-2025-2/','/pt/detail/duotone-2024-2/',
    '/the-quinta/','/pt/a-quinta/','/wines/','/pt/vinhos/','/contacts/','/pt/contactos/','/pt/','/detail/','/pt/detail/','/hello-world/','/detail/reverb-2/',
    '/wp-content/uploads/2026/07/Ficha_Tecnica_Analogue_2024.pdf','/wp-content/uploads/2026/07/Ficha_Tecnica_Duotone_2024.pdf','/wp-content/uploads/2026/07/Ficha_Tecnica_Equaliser_2024.pdf','/wp-content/uploads/2026/07/Ficha_Tecnica_Overdub_2025.pdf','/wp-content/uploads/2026/07/Ficha_Tecnica_Overdub_Tinto_2024.pdf']
sem_barra=[u.rstrip('/') for u in qr]
class NoRedir(urllib.request.HTTPRedirectHandler):
    def redirect_request(self,*a,**k): return None
op=urllib.request.build_opener(NoRedir)
def get(u):
    try: r=op.open(BASE+u); return r.status, r.read().decode('utf-8','ignore'), None
    except urllib.error.HTTPError as e: return e.code, '', e.headers.get('Location')
fail=0
for grupo,lista in (('QR',qr),('outras',outras),('QR sem barra final',sem_barra)):
    print('--',grupo)
    for u in lista:
        st,body,loc=get(u)
        extra=''
        m=re.search(r'http-equiv="refresh" content="0; url=([^"]+)"',body)
        if m: extra='→ redireciona para '+m.group(1)
        elif loc: extra='→ '+loc
        elif 'rpm-detail-card__titulo' in body: extra='página de vinho: '+re.search(r'<title>(.*?)</title>',body).group(1)
        ok = st==200 or (st in (301,302) and loc)
        if not ok: fail+=1
        print(f'  {"OK " if ok else "FALHA"} {st} {u} {extra}')
st,_,_=get('/nao-existe/'); print('-- 404 para endereço inexistente:', st)
print('FALHAS:',fail)
