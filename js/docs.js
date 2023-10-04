
function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints;
}
function loaded() {
    $(this).addClass('loaded');
  }

function animatelazyloaded() {
  $('.lazyloaded').each(function() {
      var element = this;
      if (element.tagName === 'IMG') {
        if (element.complete) {
            loaded.call(element);
        } else {
            $(element).on('load', loaded);
        }
      } else {
        var bgImage = new Image();
        var bgImageUrl = $(element).data('background-image');
        $(element).css('background-image', 'url(' + bgImageUrl + ')');
        bgImage.onload = function() {
            loaded.call(element);
        };
        bgImage.src = bgImageUrl;
      }
  });
}

function scrollAndHighlight(element, index) {
  glider.scrollItem(index);
  const images = document.querySelectorAll('.dragscroll img');
  images.forEach(img => {
    img.classList.remove('ring-2', 'ring-black');
  });
  element.classList.add('ring-2', 'ring-black');
}
const toggleNotifyMsgBox = () => {
  notifyGrayArea.classList.toggle('opacity-0');
  notifyGrayArea.classList.toggle('pointer-events-none');
};

$(document).ready(function() {
    animatelazyloaded();
    // glider //
    // Hover-zoom
    // Pinch-zoom for mobile devices and tablets
    
    $('.btn-zoom-img').on("click", function () {
      var src;
      if ($(this).parent().find('.glider').length) {
          src = $(this).parent().find('.glider .glider-slide.active img').attr('src');
      } else {
          src = $(this).parent().find('img[data-enlargable]').attr('src');
      }
      
      var $zoomDiv = $('<div>').css({
        background: 'RGBA(255, 255, 255)',
        width: '100%',
        height: '100%',
        position: 'fixed',
        zIndex: '10000',
        top: '0',
        left: '0',
      });
      
      var $imgElement = $('<img>').attr('src', src).css({
        width: '100%',
        height: '100%',
        objectFit: 'contain'
      });
      $zoomDiv.append($imgElement);
      
      var closeButton = $('<button>').addClass('bg-white border border-black w-16 h-16 rounded-full flex justify-center items-center hover:bg-white/70 absolute bottom-6 left-1/2 transform -translate-x-1/2')
        .click(function(){
          $zoomDiv.remove();
        })
        .html('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>');
      
      $zoomDiv.append(closeButton);
      $('body').append($zoomDiv);

      if (isTouchDevice()) {
        $zoomDiv.addClass('pinch-zoom');
        new PinchZoom.default($imgElement.get(0));
      } else {
        $zoomDiv.addClass('flex justify-center items-center cursor-zoom-in').on("mouseover", function (e) {
          if (!$(e.target).is(closeButton) && $(e.target).closest('svg').length === 0) {
            $imgElement.css({ transform: "scale(1.6)" });
          }
        })
        .on("mouseout", function () {
          $imgElement.css({ transform: "scale(1)" });
        })
        .on("mousemove", function (e) {
          $imgElement.css({
            "transform-origin":
              ((e.pageX - $(this).offset().left) / $(this).width()) * 100 +
              "% " +
              ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +
              "%"
          });
        });
      }

    });
});