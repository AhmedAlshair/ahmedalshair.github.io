$(function () {
  const animateCSS = (element, animation, prefix = 'animate__') =>
    new Promise((resolve) => {
      const animationName = `${prefix}${animation}`;
      const node = document.querySelector(element);
      node.classList.add(`${prefix}animated`, animationName);
      function handleAnimationEnd() {
        node.classList.remove(`${prefix}animated`, animationName);
        node.removeEventListener('animationend', handleAnimationEnd);

        resolve('Animation ended');
      }
      node.addEventListener('animationend', handleAnimationEnd);
    });

  // Consent Overlay Actions

  let hideOverlayConsent = 'hcp-consent=true',
    showOverlay = function () {
      $('.hero > *').hide();
      $('body').addClass('noscroll');
      $('.consent-overlay').prop('hidden', false);
      animateCSS('.consent-overlay', 'slideInUp');
    },
    hideOverlay = function () {
      $('.hero > *').show();
      $('body').removeClass('noscroll');
      animateCSS('.consent-overlay', 'slideOutDown').then(() => {
        // Do something after the animation
        $('.consent-overlay').prop('hidden', true);
      });
    };

  if (!localStorage.getItem(hideOverlayConsent)) {
    showOverlay();
  } else {
    hideOverlay();
  }

  $('.consent-overlay .yes-btn').click(function () {
    localStorage.setItem(hideOverlayConsent, true);
    hideOverlay();
  });

  $('.consent-overlay .no-btn').click(function () {
    document.location = 'http://abbvie.com';
  });

  // Timer Actions

  function diff_weeks(dt2, dt1) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60 * 60 * 24 * 7;
    return Math.abs(Math.round(diff));
  }

  // Circle Percentage Actions

  if ($('.timer-container').length > 0) {
    let startDate = new Date('January 1, 2020 00:00:00'),
      dateToday = new Date(),
      endDate = new Date('January 1, 2030 00:00:00'),
      baseWeeks = diff_weeks(startDate, endDate),
      remainingWeeks = diff_weeks(dateToday, endDate);

    var percent_val = (remainingWeeks / baseWeeks) * 100,
      circle_radius = $('.circle_cont').find('svg circle').attr('r'),
      circle_circumference = circle_radius * Math.PI * 2,
      percent_dashoffset = circle_circumference * (1 - percent_val / 100),
      percent_circle = $('.circle_cont').find('.percentage_val'),
      percent_display = $('.circle_cont').find('.percentage-display h1');

    percent_circle.get(0).style.strokeDasharray = circle_circumference;
    percent_circle.get(0).style.strokeDashoffset = percent_dashoffset;
    percent_display.text(Math.round(remainingWeeks));
  }

  // Scroll Related Animations

  const images = document.querySelectorAll('.sc-animate');

  const animConfig = {
    rootMargin: '200px 0px 120px 0px',
    threshold: 0.4,
  };

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.intersectionRatio > 0) {
          entry.target.classList.add('animate__animated', 'animate__fadeIn');
        }
      } else {
        entry.target.classList.remove('animate__animated', 'animate__fadeIn');
      }
    });
  }, animConfig);

  images.forEach((image) => {
    observer.observe(image);
  });

  // Scroll - Floating Bar

  $(window).on('scroll', function () {
    let winHeight = $(window).innerHeight(),
      winScrollTop = $(window).scrollTop();

    if (winScrollTop > winHeight - 200) {
      $('.floating-bar').removeClass('out');
    } else {
      $('.floating-bar').addClass('out');
    }
  });

  $(document).scroll();

  // Video Overlay

  let enlargeViewer = $('.video-overlay');

  $('.show-video').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    enlargeViewer.html('');
    let path = $(this).attr('href'),
      newVid = $('<video autoplay controls>').attr('src', path),
      closeBtn =
        "<button class='close-btn'><img src='img/close-24px.svg' alt='Close'></button>";
    enlargeViewer.html(newVid).fadeIn(function () {
      $(this).find('video').fadeIn('fast').delay(20).css('display', 'block');
      enlargeViewer.append(closeBtn);
    });
    $('body').addClass('noscroll');
  });

  enlargeViewer.on('click', '.close-btn', function () {
    let hasVideo = enlargeViewer.find('video');
    if (hasVideo.length == 1) {
      hasVideo[0].pause();
    }
    $('body').removeClass('noscroll');
    enlargeViewer.fadeOut();
  });
});
