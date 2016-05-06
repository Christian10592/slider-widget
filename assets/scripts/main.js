$(document).ready(function(){

//==================== TODO ==================== //
//Clean Up and Organize
//Infinite Slider Loop
//Better Documentation

//==================== List of Selectors ====================//

//Slider
var sliderContainer   = $('.slider-container');
var slides            = $('.slides');
var slide             = $('.slide');
var firstSlide        = $('.slide:first-child');
var lastSlide         = $('.slide:last-child');

//Controls
var controlsIcon      = $('.controls i');
var controlsContainer = $('.controls');

//Bullets
var bullets           = $('.bullets');
var bullet            = $('.bullet');
var activeBullet      = $('.active-bullet');
var firstBullet       = $('.bullet:nth-child(1)');

//==================== Global Variables ======================//
//actionSlide
var actionSlide;

//Set Slider Position
var slidePos = 0;

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

//Set Slider Container Width
var sliderWidth = slideWidth * countSlides + 'px';

//Get height of the controls
var controlHeight = parseInt($('.controls').css('height'));

//Get height of slider
var sliderHeight = parseInt($('.slider-container').css('height'));

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
  $('.bullet:nth-child(' + current + ')').addClass('active-bullet');
}

//==================== Slide Animations =====================//

//Generate Slider Width
slides.css({'width': sliderWidth});

//Centers the controls
controlsContainer.css({'margin-top': centerControls});

//Function determines which direction was clicked by passing a param that represents the class of the button clicked also changes the active bullet position by 1
function actionSlide(direction) {
  if (direction == 'prev') {
    doSlide = '+=' + slideWidth + 'px';
    bulletNav--;
  } else {
    doSlide = '-=' + slideWidth + 'px';
    bulletNav++;
  }
  changeActiveBullet(bulletNav)
  slides.animate({'margin-left': doSlide}, slideSpeed);
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

//End Document.ready
});
