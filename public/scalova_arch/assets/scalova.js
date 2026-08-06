/* =========================================================
   SCALOVA × Architekci — shared behaviour
   ========================================================= */
(function(){
  "use strict";

  /* ---------- Bayer-dithered hero gradient (ported from Scalova) ---------- */
  const BAYER4 = [0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5].map(v => (v/16 - 0.5) * 2);

  function initHeroCanvas(canvas){
    const ctx = canvas.getContext("2d", { colorSpace: "srgb" });
    const DELAY_MS = 400, DURATION_MS = 2600, GLOW_FINAL = 0.55;
    const BR=14,BG=14,BB=14, GR=58,GG=58,GB=58;
    let w=0,h=0,currentGlow=0,raf=null,startTs=null,timer=null;

    // Offscreen canvases
    const glowCanvas = document.createElement("canvas");
    const glowCtx = glowCanvas.getContext("2d", { colorSpace: "srgb" });
    
    const gridCanvas = document.createElement("canvas");
    const gridCtx = gridCanvas.getContext("2d");
    
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    
    const noiseCanvas = document.createElement("canvas");
    const noiseW = 64, noiseH = 64;
    noiseCanvas.width = noiseW;
    noiseCanvas.height = noiseH;
    const noiseCtx = noiseCanvas.getContext("2d");
    const noiseImg = noiseCtx.createImageData(noiseW, noiseH);
    const noiseData = noiseImg.data;

    // Render the static dithered glow onto the offscreen glowCanvas
    function renderGlow() {
      if (w === 0 || h === 0) return;
      glowCanvas.width = w;
      glowCanvas.height = h;
      const img = glowCtx.createImageData(w, h), data = img.data;
      const cx = w * 0.5, cy = h, rx = w * 0.82, ry = h * 0.6;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          const dither = BAYER4[(y & 3) * 4 + (x & 3)];
          const dx = (x - cx) / rx, dy = (y - cy) / ry;
          const t = Math.min(Math.sqrt(dx * dx + dy * dy), 1.0);
          const ss = 1 - t * t * (3 - 2 * t);
          const a = ss * GLOW_FINAL;
          const n = dither * 2;
          data[i] = Math.min(255, Math.max(0, (BR + (GR - BR) * a) + n));
          data[i + 1] = Math.min(255, Math.max(0, (BG + (GG - BG) * a) + n));
          data[i + 2] = Math.min(255, Math.max(0, (BB + (GB - BB) * a) + n));
          data[i + 3] = Math.min(255, Math.max(0, (a * 0.85) * 255));
        }
      }
      glowCtx.putImageData(img, 0, 0);
    }

    // Render static grid lines onto the offscreen gridCanvas
    function renderGrid() {
      if (w === 0 || h === 0) return;
      gridCanvas.width = w;
      gridCanvas.height = h;
      
      gridCtx.clearRect(0, 0, w, h);
      
      // 36px fine grid
      gridCtx.strokeStyle = "rgba(255, 255, 255, 0.055)";
      gridCtx.lineWidth = 1;
      gridCtx.beginPath();
      for (let x = 0; x < w; x += 36) {
        gridCtx.moveTo(x, 0);
        gridCtx.lineTo(x, h);
      }
      for (let y = 0; y < h; y += 36) {
        gridCtx.moveTo(0, y);
        gridCtx.lineTo(w, y);
      }
      gridCtx.stroke();

      // 180px bold grid
      gridCtx.strokeStyle = "rgba(255, 255, 255, 0.11)";
      gridCtx.lineWidth = 1.2;
      gridCtx.beginPath();
      for (let x = 0; x < w; x += 180) {
        gridCtx.moveTo(x, 0);
        gridCtx.lineTo(x, h);
      }
      for (let y = 0; y < h; y += 180) {
        gridCtx.moveTo(0, y);
        gridCtx.lineTo(w, y);
      }
      gridCtx.stroke();
    }

    // Update moving noise mask
    function updateNoise(time) {
      for (let y = 0; y < noiseH; y++) {
        for (let x = 0; x < noiseW; x++) {
          const i = (y * noiseW + x) * 4;
          
          // Smooth multi-layered waves for moving noise
          let val = Math.sin(x * 0.06 + time * 0.0009) * Math.cos(y * 0.07 - time * 0.0011)
                  + Math.sin(y * 0.12 + time * 0.0014) * Math.cos(x * 0.10 - time * 0.0007)
                  + Math.sin((x + y) * 0.035 + time * 0.0005);
          
          // Normalize to [0, 1]
          val = (val + 3) / 6;
          
          // Add thresholding / contrast for more distinct organic shapes
          val = Math.max(0, Math.min(1, (val - 0.2) * 1.6));
          
          noiseData[i] = 255;
          noiseData[i + 1] = 255;
          noiseData[i + 2] = 255;
          noiseData[i + 3] = Math.floor(val * 255);
        }
      }
      noiseCtx.putImageData(noiseImg, 0, 0);
    }

    function draw(time) {
      if (w === 0 || h === 0) return;
      
      // Clear main canvas
      ctx.clearRect(0, 0, w, h);
      
      // 1. Draw the dithered glow (applying the current fade-in factor)
      ctx.save();
      ctx.globalAlpha = currentGlow / GLOW_FINAL;
      ctx.drawImage(glowCanvas, 0, 0);
      ctx.restore();
      
      // 2. Update noise mask
      updateNoise(time);
      
      // 3. Composite grid with noise on tempCanvas
      tempCtx.clearRect(0, 0, w, h);
      tempCtx.drawImage(gridCanvas, 0, 0);
      tempCtx.globalCompositeOperation = "destination-in";
      tempCtx.drawImage(noiseCanvas, 0, 0, w, h);
      tempCtx.globalCompositeOperation = "source-over";
      
      // 4. Draw the composite grid onto the main canvas
      ctx.drawImage(tempCanvas, 0, 0);
    }

    function resize() {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;
      tempCanvas.width = w;
      tempCanvas.height = h;
      
      renderGlow();
      renderGrid();
      
      draw(startTs || 0);
    }

    function animate(ts) {
      if (!startTs) startTs = ts;
      
      // Glow fade-in logic
      const p = Math.min((ts - startTs) / DURATION_MS, 1.0);
      const eased = -(Math.cos(Math.PI * p) - 1) / 2;
      currentGlow = eased * GLOW_FINAL;
      
      draw(ts);
      
      // Request frame indefinitely to keep noise moving
      raf = requestAnimationFrame(animate);
    }

    resize();
    timer = setTimeout(() => { raf = requestAnimationFrame(animate); }, DELAY_MS);
    
    let rt;
    window.addEventListener("resize", () => {
      clearTimeout(rt);
      rt = setTimeout(resize, 150);
    });
  }

  /* ---------- Navbar scroll state ---------- */
  function initNav(){
    const nav=document.querySelector(".nav");
    if(!nav) return;
    const onScroll=()=>{ nav.classList.toggle("scrolled", window.scrollY>40); };
    onScroll(); window.addEventListener("scroll",onScroll,{passive:true});
  }

  /* ---------- Mobile drawer ---------- */
  function initDrawer(){
    const toggle=document.querySelector(".nav-toggle");
    const drawer=document.querySelector(".drawer");
    const backdrop=document.querySelector(".drawer-backdrop");
    const close=document.querySelector(".drawer-close");
    if(!toggle||!drawer) return;
    const open=()=>{ drawer.classList.add("open"); backdrop.classList.add("open"); document.body.style.overflow="hidden"; };
    const shut=()=>{ drawer.classList.remove("open"); backdrop.classList.remove("open"); document.body.style.overflow=""; };
    toggle.addEventListener("click",open);
    close&&close.addEventListener("click",shut);
    backdrop&&backdrop.addEventListener("click",shut);
    drawer.querySelectorAll("a").forEach(a=>a.addEventListener("click",shut));
  }

  /* ---------- Accordion ---------- */
  function initAccordion(){
    document.querySelectorAll(".acc").forEach(acc=>{
      const items=[...acc.querySelectorAll(".acc-item")];
      items.forEach(item=>{
        const head=item.querySelector(".acc-head");
        const body=item.querySelector(".acc-body");
        const icon=item.querySelector(".acc-icon");
        head.addEventListener("click",()=>{
          const isOpen=item.classList.contains("open");
          items.forEach(o=>{
            o.classList.remove("open");
            o.querySelector(".acc-body").style.maxHeight="0px";
            const ic=o.querySelector(".acc-icon"); if(ic) ic.textContent="+";
          });
          if(!isOpen){
            item.classList.add("open");
            body.style.maxHeight=body.scrollHeight+"px";
            if(icon) icon.textContent="–";
          }
        });
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal(){
    const els=[...document.querySelectorAll(".reveal")];
    if(!els.length) return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if(reduce){ els.forEach(e=>e.classList.add("in")); return; }
    // hide initially via inline styles (wins cascade; no-JS users still see content)
    els.forEach(el=>{ el.style.opacity="0"; el.style.transform="translateY(26px)"; });
    const show=el=>{
      if(el.dataset.shown) return;
      el.dataset.shown="1";
      const delay=parseFloat(el.dataset.delay||"0");
      setTimeout(()=>{ el.style.opacity="1"; el.style.transform="none"; el.classList.add("in"); }, delay*1000);
    };
    const sweep=()=>{
      const vh=window.innerHeight||document.documentElement.clientHeight;
      els.forEach(el=>{
        if(el.dataset.shown) return;
        const r=el.getBoundingClientRect();
        if(r.top < vh*0.92 && r.bottom > -40) show(el);
      });
    };
    if("IntersectionObserver" in window){
      const io=new IntersectionObserver((entries)=>{
        entries.forEach(en=>{ if(en.isIntersecting){ show(en.target); io.unobserve(en.target); } });
      },{threshold:0.06,rootMargin:"0px 0px -6% 0px"});
      els.forEach(e=>io.observe(e));
    }
    requestAnimationFrame(()=>requestAnimationFrame(sweep));
    setTimeout(sweep,250);
    window.addEventListener("scroll",sweep,{passive:true});
    window.addEventListener("resize",sweep);
  }

  /* ---------- Consultation modal ---------- */
  /* Uzupełnij poniższe 3 wartości danymi z EmailJS (Netlify → Site settings →
     Environment variables: VITE_EMAILJS_SERVICE_ID / TEMPLATE_ID / PUBLIC_KEY,
     albo panel emailjs.com). Dopóki EMAILJS_CONFIG.serviceID zostanie
     "YOUR_SERVICE_ID", formularz działa w trybie testowym (pokazuje "Dziękujemy",
     ale nic nie wysyła). */
  const EMAILJS_CONFIG = {
    serviceID: "service_yakxxdf",
    templateID: "template_aunau5m",
    publicKey: "rI76RCa1osQcfUcfT"
  };
  const THANKS_HTML = '<div style="text-align:center;padding:30px 0;"><div class="eyebrow plain" style="justify-content:center;color:var(--accent);">// Dziękujemy</div><h3 class="h-card" style="margin-bottom:14px;">Wiadomość wysłana.</h3><p class="dim2" style="font-size:.95rem;">Odezwiemy się w ciągu 48 godzin.</p></div>';

  // Rozpoznaje, z której podstrony usługowej Scalova Arch wysłano formularz
  function getPageLabel(){
    const path=(location.pathname||"").toLowerCase();
    if(path.indexOf("marketing")!==-1) return "Marketing";
    if(path.indexOf("strona-internetowa")!==-1) return "Strona internetowa";
    if(path.indexOf("wizualizacje-3d")!==-1) return "Wizualizacje 3D";
    return "Strona główna (Metodologia)";
  }

  function initModal(){
    const backdrop=document.querySelector(".modal-backdrop");
    if(!backdrop) return;
    const modal=backdrop.querySelector(".modal");
    const pristineHTML=modal.innerHTML; // zapasowa kopia oryginalnego formularza

    const open=()=>{ backdrop.classList.add("open"); document.body.style.overflow="hidden"; };
    const shut=()=>{
      backdrop.classList.remove("open");
      document.body.style.overflow="";
      // po animacji zamknięcia przywróć czysty formularz, żeby przy kolejnym
      // otwarciu nie zostało pokazane stare "Dziękujemy"
      setTimeout(()=>{ modal.innerHTML=pristineHTML; wireModal(); }, 300);
    };

    function wireModal(){
      const close=modal.querySelector(".modal-close");
      close&&close.addEventListener("click",shut);
      const form=modal.querySelector("form");
      form&&form.addEventListener("submit",e=>{
        e.preventDefault();
        const btn=form.querySelector("button[type=submit]");

        if(EMAILJS_CONFIG.serviceID==="YOUR_SERVICE_ID"){
          modal.innerHTML=THANKS_HTML;
          return;
        }
        if(typeof emailjs==="undefined"){
          console.error("EmailJS nie jest załadowany — sprawdź, czy skrypt CDN jest dodany w <head>.");
          alert("Wystąpił błąd wysyłania. Spróbuj ponownie później.");
          return;
        }

        const originalBtnHtml=btn ? btn.innerHTML : "";
        if(btn){
          btn.disabled=true;
          btn.innerHTML='<span class="shine"></span>Wysyłanie…';
        }
        const pageLabel=getPageLabel();
        emailjs.send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateID, {
          name: form.user_name ? form.user_name.value : "",
          email: form.user_email ? form.user_email.value : "",
          phone: form.user_phone ? form.user_phone.value : "Nie podano",
          company: "Scalova Arch — " + pageLabel,
          type: "Scalova Arch — " + pageLabel,
          message: "Podstrona usługowa: " + pageLabel + "\n\n" + (form.user_message ? form.user_message.value : "")
        }, EMAILJS_CONFIG.publicKey)
          .then(()=>{ modal.innerHTML=THANKS_HTML; })
          .catch(err=>{
            console.error("EmailJS error:", err);
            if(btn){ btn.disabled=false; btn.innerHTML=originalBtnHtml; }
            alert("Wystąpił błąd wysyłania. Spróbuj ponownie.");
          });
      });
    }

    document.querySelectorAll("[data-open-modal]").forEach(b=>b.addEventListener("click",e=>{e.preventDefault();open();}));
    backdrop.addEventListener("click",e=>{ if(e.target===backdrop) shut(); });
    document.addEventListener("keydown",e=>{ if(e.key==="Escape") shut(); });
    wireModal();
  }

  /* ---------- Tweaks (host protocol + cross-page localStorage) ---------- */
  const ACCENTS={
    lime:{accent:"#C6D300",accent2:"#D4FF00",glow:"rgba(212,255,0,0.15)",glowS:"rgba(212,255,0,0.35)"},
    citron:{accent:"#D7E600",accent2:"#E4F700",glow:"rgba(228,247,0,0.15)",glowS:"rgba(228,247,0,0.35)"},
    spring:{accent:"#9FE870",accent2:"#B6F58A",glow:"rgba(159,232,112,0.16)",glowS:"rgba(159,232,112,0.38)"}
  };
  const TW_KEY="scalova_tweaks_v1";

  function readTweaks(){
    let base={accent:"lime",headingCase:"upper",density:"comfort"};
    try{ if(window.TWEAK_DEFAULTS) base=Object.assign(base,window.TWEAK_DEFAULTS); }catch(e){}
    try{ const s=JSON.parse(localStorage.getItem(TW_KEY)||"{}"); base=Object.assign(base,s); }catch(e){}
    return base;
  }
  function applyTweaks(t){
    const a=ACCENTS[t.accent]||ACCENTS.lime;
    const r=document.documentElement.style;
    r.setProperty("--accent",a.accent); r.setProperty("--accent-2",a.accent2);
    r.setProperty("--glow",a.glow); r.setProperty("--glow-strong",a.glowS);
    document.body.classList.toggle("tw-case-normal",t.headingCase==="normal");
    document.body.classList.toggle("tw-dense",t.density==="dense");
  }
  function initTweaks(){
    let state=readTweaks();
    applyTweaks(state);

    // build panel
    const panel=document.createElement("div");
    panel.className="tw-panel";
    panel.innerHTML=
      '<div class="tw-head"><span class="t">Tweaks</span><button data-tw-close aria-label="Zamknij">'+
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>'+
      '<div class="tw-group"><span class="tw-label">Kolor akcentu</span><div class="tw-swatches" data-tw="accent">'+
        '<span class="tw-sw" data-val="lime" style="background:#C6D300"></span>'+
        '<span class="tw-sw" data-val="citron" style="background:#D7E600"></span>'+
        '<span class="tw-sw" data-val="spring" style="background:#9FE870"></span>'+
      '</div></div>'+
      '<div class="tw-group"><span class="tw-label">Nagłówki</span><div class="tw-seg" data-tw="headingCase">'+
        '<button data-val="upper">WERSALIKI</button><button data-val="normal">Aa Naturalne</button></div></div>'+
      '<div class="tw-group"><span class="tw-label">Rytm sekcji</span><div class="tw-seg" data-tw="density">'+
        '<button data-val="comfort">Przestronny</button><button data-val="dense">Zwarty</button></div></div>';
    document.body.appendChild(panel);

    function syncUI(){
      panel.querySelectorAll('[data-tw="accent"] .tw-sw').forEach(s=>s.classList.toggle("sel",s.dataset.val===state.accent));
      panel.querySelectorAll('[data-tw="headingCase"] button').forEach(b=>b.classList.toggle("sel",b.dataset.val===state.headingCase));
      panel.querySelectorAll('[data-tw="density"] button').forEach(b=>b.classList.toggle("sel",b.dataset.val===state.density));
    }
    syncUI();

    function set(key,val){
      state[key]=val;
      applyTweaks(state); syncUI();
      try{ localStorage.setItem(TW_KEY,JSON.stringify(state)); }catch(e){}
      try{ window.parent.postMessage({type:"__edit_mode_set_keys",edits:{[key]:val}},"*"); }catch(e){}
    }
    panel.querySelectorAll('[data-tw="accent"] .tw-sw').forEach(s=>s.addEventListener("click",()=>set("accent",s.dataset.val)));
    panel.querySelectorAll('[data-tw="headingCase"] button').forEach(b=>b.addEventListener("click",()=>set("headingCase",b.dataset.val)));
    panel.querySelectorAll('[data-tw="density"] button').forEach(b=>b.addEventListener("click",()=>set("density",b.dataset.val)));

    // host protocol — register listener BEFORE announcing availability
    window.addEventListener("message",(e)=>{
      const d=e.data||{};
      if(d.type==="__activate_edit_mode") panel.classList.add("open");
      else if(d.type==="__deactivate_edit_mode") panel.classList.remove("open");
    });
    panel.querySelector("[data-tw-close]").addEventListener("click",()=>{
      panel.classList.remove("open");
      try{ window.parent.postMessage({type:"__edit_mode_dismissed"},"*"); }catch(e){}
    });
    try{ window.parent.postMessage({type:"__edit_mode_available"},"*"); }catch(e){}
  }

  document.addEventListener("DOMContentLoaded",()=>{
    const c=document.querySelector(".hero-canvas");
    if(c) initHeroCanvas(c);
    initNav(); initDrawer(); initAccordion(); initReveal(); initModal(); initTweaks();
  });
})();
