
(function(){
  function updateBackground(){
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    const winHeight = window.innerHeight;
    const maxScroll = Math.max(docHeight - winHeight, 1);
    const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1); // 0..1

    const red = Math.round(progress * 255);
    
    const hex = red.toString(16).padStart(2, '0').toUpperCase();
    document.body.style.backgroundColor = `#${hex}0000`;
  }

  window.addEventListener('scroll', updateBackground, {passive:true});
  window.addEventListener('resize', updateBackground);
  window.addEventListener('load', updateBackground);
})();
