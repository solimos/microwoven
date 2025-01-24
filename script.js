let activePos = 0;
let isOn = false;
let timer = 15;

$(document).ready(function () {
  $(".microwave__clock__time").animate({ opacity: 1 }, 1500);

  $(".microwave__dial__pos").on("click", function () {
    if (!isOn) {
      activePos = $(this).prevAll().length;
      updatePos();
    }
  });

  $(".microwave__dial__inner__knob").on("click", function () {
    if (!isOn) {
      activePos = (activePos + 1) % 3;
      updatePos();
    }
  });

  $(".microwave__go__inner__button").on("click", function () {
    if (!isOn) {
      $("body").addClass("microwaving");
      isOn = true;
      let countTime = timer;
      let countdown = setInterval(function () {
        countTime--;
        if (countTime < 10) {
          $(".microwave__clock__time").text("00:0" + countTime);
        } else {
          $(".microwave__clock__time").text("00:" + countTime);
        }
      }, 1000);
      setTimeout(function () {
        isOn = false;
        clearInterval(countdown);
        $("body").removeClass("microwaving");
        setTimeout(updatePos, 1000);
      }, timer * 1000);
    }
  });
});

function updatePos() {
  $(".microwave__dial__pos")
    .removeClass("active")
    .eq(activePos)
    .addClass("active");
  let newRot = -45;
  let newTime = 15;
  if (activePos == 1) {
    newRot = 0;
    newTime = 30;
  }
  if (activePos == 2) {
    newRot = 45;
    newTime = 45;
  }
  $(".microwave__dial__inner__knob").css(
    "transform",
    "rotate(" + newRot + "deg)"
  );
  $(".microwave__clock__time").text("00:" + newTime);
  timer = newTime;
}