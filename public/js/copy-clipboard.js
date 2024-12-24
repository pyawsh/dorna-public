
  
  jQuery(document).ready(function ($){
    $('.copy').each(function(){
      $(this).on('click', function(event) {
          copyToClipboard(event);
      });
    
      function copyToClipboard(e) {
    
        var
          t = e.target, 
          c = t.dataset.copytarget,
          inp = (c ? document.querySelector(c) : null);
    
        if (inp && inp.select) {
    
            inp.select();
            document.execCommand('copy');
            inp.blur();
    
            t.classList.add('copied');
            setTimeout(function() {
              t.classList.remove('copied');
            }, 1500);
    
        }
      }
    })
  } , jQuery);
    
  