$(document).ready(function(){

//==================== TODO ==================== //
//Clean Up and Organize
//Better Documentation

//==================== List of Selectors ====================//

//Slider
var sliderContainer   = $('#slider-container');
var slides            = $('#slides');
var slide             = $('.slide');
var firstSlide        = $('.slide:first-child');
var lastSlide         = $('.slide:last-child');

//Controls
var controlsIcon      = $('#slider-controls i');
var controlsContainer = $('#slider-controls');

//Bullets
var bullets           = $('#bullets');
var bullet            = $('.bullet');
var activeBullet      = $('.active-bullet');

//==================== Global Variables ======================//
//actionSlide
var actionSlide;

//Set Slider Position
var slidePos = 1;

//Slide Speed
var slideSpeed = 300;

//Starting bullet position
var bulletNav = 1;

//Controls hidden on start
var controlsVisible = false;

//==================== Calculate Sizes ======================//

//Count Slides
var countSlides = slide.length;

//Find Slide Width
var slideWidth = parseInt(slide.css('width'));

//Set Slider Container Width (add 2 to account for cloned slides for infinite loop)
var sliderWidth = slideWidth * (countSlides + 2) + 'px';

//Get height of the controls
var controlHeight = parseInt(controlsContainer.css('height'));

//Get height of slider
var sliderHeight = parseInt(sliderContainer.css('height'));

//Center the controls -- subtract the height of the slider by the height of the controls divide by 2 and add px to the end
var centerControls = (sliderHeight - controlHeight) / 2 + 'px';

//==================== Build Bullets =======================//

//For each slide create a bullet
for (i = 0; i < countSlides; i++) {
    bullets.append('<li class="bullet"></li>');
}

//Set first bullet active by default
$('.bullet:nth-child(1)').addClass('active-bullet');

//Single Bullet Width
var bulletWidth = parseInt($('.bullet').css('width')) * countSlides;

//Get Bullet Padding
var bulletPadding = parseInt($('.bullet').css('margin-right'));

//Multiply bullet padding by the amount of slides and subtract last bullet's padding
var bulletTotalPadding = bulletPadding * countSlides - bulletPadding;

//Add the width of a single bullet to the total padding of all bullets and add px to the end
var calBulletContainer = bulletWidth + bulletTotalPadding + 'px';

//Set Bullet Container Width
bullets.css({'width': calBulletContainer});

//Change Active Bullet
function changeActiveBullet(current) {
  $('.active-bullet').removeClass('active-bullet');
  if (current == 0) {
    $('.bullet:last-child').addClass('active-bullet');
  } else if (current == (countSlides + 1)) {
    $('.bullet:first-child').addClass('active-bullet');
  } else {
    $('.bullet:nth-child(' + current + ')').addClass('active-bullet');
  }
}

//==================== Slide Animations =====================//

//Generate Slider Width
//Offset first slide to account for cloned slide
slides.css({
  'width': sliderWidth,
  'left': '-' + slideWidth + 'px'
});

//Centers the controls
controlsContainer.css({'margin-top': centerControls});

function changeBullet(direction) {
  if (direction == 'prev') {
    bulletNav--;
  } else {
    bulletNav++;
  }
}

function animateSlide(doSlide) {
  slides.animate({'left': doSlide}, slideSpeed, function () {
    if (bulletNav == 0) {
      $(this).css({'left': ('-' + countSlides * slideWidth) + 'px'});
      bulletNav = countSlides;
    } else if (bulletNav == (countSlides + 1)) {
      $(this).css({'left': '-' + slideWidth + 'px'});
      bulletNav = 1;
    }
  });
  changeActiveBullet(bulletNav);
}

function actionSlide(direction) {
  changeBullet(direction);

  if (direction == 'prev') {
    doSlide = '+=' + slideWidth + 'px';
    animateSlide(doSlide);
  } else if (direction == 'next') {
    doSlide = '-=' + slideWidth + 'px';
    animateSlide(doSlide);
  }


  console.log(bulletNav);
}

//When a control is clicked gets controls class name and uses that as the param for actionSlide()
controlsIcon.click(function(){
  var slideDirection = $(this).parent().attr('class');
  actionSlide(slideDirection);
});

sliderContainer.hover(function(){
  if (controlsVisible) {
    controlsContainer.fadeOut();
    bullets.fadeOut();
    controlsVisible = false;
  } else {
    controlsContainer.fadeIn();
    bullets.fadeIn();
    controlsVisible = true;
  }
});

//==================== Infinite Loop ========================//

//Clone First Slide
firstSlide.before(lastSlide.clone(true));
//Clone Second Slide
lastSlide.after(firstSlide.clone(true));







//End Document.ready
});
