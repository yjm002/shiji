window.SHIJI_ANALYTICS = window.SHIJI_ANALYTICS || { plausible:"", ga4:"", umami:null, local:true };
/* 统计：默认只做本机阅读统计；填 window.SHIJI_ANALYTICS 后才会加载第三方脚本。 */
(function(){
  var c = window.SHIJI_ANALYTICS || {};
  function add(src, attrs){
    var s = document.createElement("script");
    s.defer = true; s.src = src;
    if (attrs) for (var k in attrs) s.setAttribute(k, attrs[k]);
    document.head.appendChild(s);
  }
  if (c.plausible){
    window.plausible = window.plausible || function(){ (window.plausible.q = window.plausible.q || []).push(arguments); };
    add("https://plausible.io/js/script.js", {"data-domain": c.plausible});
  }
  if (c.ga4){
    add("https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(c.ga4));
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", c.ga4);
  }
  if (c.umami && c.umami.src && c.umami.id){
    add(c.umami.src, {"data-website-id": c.umami.id});
  }
  var KEY = "shiji.stats";
  function read(){
    try { return JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch(e){ return {}; }
  }
  function save(st){
    try { localStorage.setItem(KEY, JSON.stringify(st)); } catch(e){}
  }
  function notesCount(){
    var n = 0;
    try {
      for (var i = 0; i < localStorage.length; i++){
        var k = localStorage.key(i);
        if (k && k.indexOf("shiji.notes.") === 0){
          var d = JSON.parse(localStorage.getItem(k) || "{}");
          n += Object.keys(d || {}).length;
        }
      }
    } catch(e){}
    return n;
  }
  function paint(){
    var el = document.getElementById("localstats");
    if (!el) return;
    var st = read();
    el.hidden = false;
    el.textContent = "本机统计：访问 " + (st.views || 0) + " 次 · 已读 " +
      Object.keys(st.chapters || {}).length + " / 132 篇 · 笔记 " + notesCount() + " 条（只存在这台设备）";
  }
  function boot(){
    if (c.local === false) return;
    var st = read();
    st.views = (st.views || 0) + 1;
    st.chapters = st.chapters || {};
    st.last = Date.now();
    save(st);
    paint();
  }
  window.sjTrackChapter = function(n){
    if (c.plausible && window.plausible) window.plausible("chapter", {props:{n:String(n)}});
    if (c.ga4 && window.gtag) window.gtag("event", "chapter_view", {chapter:String(n)});
    if (c.umami && window.umami) window.umami.track("chapter", {n:String(n)});
    if (c.local === false) return;
    var st = read();
    st.chapters = st.chapters || {};
    st.chapters[n] = (st.chapters[n] || 0) + 1;
    save(st);
    paint();
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
