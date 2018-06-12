$(document).ready(function () {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.src = './asset.png'; // img cup coffee
    var progressCoffee = 35; // % coffee
    var progressMilk = 30; // % milk
    var progressFoam = 30; //% foam

    function cupCoffee() {
        ctx.beginPath();
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.fill();
        ctx.closePath();
    }
    // canvas cup coffee


    // Max: 100% - 390px -> 1% = 3.9
    // 0.1 : tilt of cup when height of cup increase 1%
    // height > 80% -> create canvas quadraticCurveTo()
    function coffee() {
        var xLeft = 70; // position left of x
        var xRight = 70 + 160; // position right of x - 160: width of cup
        var yDown = canvas.height - 20; // y start - 20 : thickness of cup
        var yUp = canvas.height - 20 - progressCoffee * 3.9; // y end
        var value = progressCoffee * 3.9 * 0.1; // tilt of cup at the height

      // 2 cases: height > 80(canvas quadraticCurveTo) and height < 80
        if (progressCoffee > 80 && progressMilk === 0 && progressFoam === 0) {
            var yUpHigh = canvas.height - 20 - 80 * 3.9; // y of height < 80
            var valueHigh = 80 * 3.9 * 0.1; // value of height < 80
            ctx.beginPath();
            ctx.fillStyle = "#C05839";
            ctx.moveTo(xLeft, yDown);
            ctx.lineTo(xRight, yDown);
            ctx.lineTo(xRight + valueHigh, yUpHigh);
            ctx.lineTo(xLeft - valueHigh, yUpHigh);
            ctx.moveTo(xLeft - valueHigh, yUpHigh);
            ctx.quadraticCurveTo(xLeft + 80, yUp - (progressCoffee - 80) * 2, xRight + valueHigh, yUpHigh);
            ctx.fill();
            ctx.closePath();
        } else {
            ctx.beginPath();
            ctx.fillStyle = "#C05839";
            ctx.moveTo(xLeft, yDown);
            ctx.lineTo(xRight, yDown);
            ctx.lineTo(xRight + value, yUp);
            ctx.lineTo(xLeft - value, yUp);
            ctx.fill();
            ctx.closePath();
        }
    }
    // canvas coffee

    function milk() {
        var xLeft = 70;
        var xRight = 70 + 160;
        var yDown = canvas.height - 20 - progressCoffee * 3.9;
        var yUp = canvas.height - 20 - progressCoffee * 3.9 - progressMilk * 3.9;
        var valueDown = progressCoffee * 3.9 * 0.1;
        var valueUp = (progressCoffee * 3.9 + progressMilk * 3.9) * 0.1;

        // 2 cases: 1) > 80
        //             - coffee > 80
        //             - milk + coffee > 80
        //          2) < 80
        if (progressMilk + progressCoffee > 80 && progressFoam === 0 && progressMilk !== 0) {
            if (progressCoffee >= 80) {
                ctx.beginPath();
                ctx.fillStyle = "#F6F7D2";
                ctx.moveTo(xLeft - valueDown, yDown);
                ctx.quadraticCurveTo(xLeft + 80, yUp - progressMilk * 2, xRight + valueDown, yDown);
                ctx.fill();
                ctx.closePath();
            } else {
                var yUpHigh = canvas.height - 20 - progressCoffee * 3.9 - (80 - progressCoffee) * 3.9;
                var valueUpHigh = (progressCoffee * 3.9 + (80 - progressCoffee) * 3.9) * 0.1;
                ctx.beginPath();
                ctx.fillStyle = "#F6F7D2";
                ctx.moveTo(xLeft - valueDown, yDown);
                ctx.lineTo(xRight + valueDown, yDown);
                ctx.lineTo(xRight + valueUpHigh, yUpHigh);
                ctx.lineTo(xLeft - valueUpHigh, yUpHigh);
                ctx.moveTo(xLeft - valueUpHigh, yUpHigh);
                ctx.quadraticCurveTo(xLeft + 80, yUp - (progressCoffee + progressMilk - 80) * 2, xRight + valueUpHigh, yUpHigh);
                ctx.fill();
                ctx.closePath();
            }
        } else {
            ctx.beginPath();
            ctx.fillStyle = "#F6F7D2";
            ctx.moveTo(xLeft - valueDown, yDown);
            ctx.lineTo(xRight + valueDown, yDown);
            ctx.lineTo(xRight + valueUp, yUp);
            ctx.lineTo(xLeft - valueUp, yUp);
            ctx.fill();
            ctx.closePath();
        }
    }
    // canvas milk

    function foam() {
        var xLeft = 70;
        var xRight = 70 + 160;
        var yDown = canvas.height - 20 - progressCoffee * 3.9 - progressMilk * 3.9;
        var valueDown = (progressCoffee * 3.9 + progressMilk * 3.9) * 0.1;
        var yUp = canvas.height - 20 - progressCoffee * 3.9 - progressMilk * 3.9 - progressFoam * 3.9;
        var valueUp = (progressCoffee * 3.9 + progressMilk * 3.9 + progressFoam * 3.9) * 0.1;

        if (progressMilk + progressCoffee + progressFoam > 80 && progressFoam !== 0) {
            if (progressMilk + progressCoffee > 80) {
                ctx.beginPath();
                ctx.fillStyle = "#FBF392";
                ctx.moveTo(xLeft - valueDown, yDown);
                ctx.quadraticCurveTo(xLeft + 80, yUp - progressFoam * 2, xRight + valueDown, yDown);
                ctx.fill();
                ctx.closePath();
            } else {
                var yUpHigh = canvas.height - 20 - progressCoffee * 3.9 - progressMilk * 3.9 - (80 - progressCoffee - progressMilk) * 3.9;
                var valueUpHigh = (progressCoffee * 3.9 + progressMilk * 3.9 + (80 - progressCoffee - progressMilk) * 3.9) * 0.1;
                ctx.beginPath();
                ctx.fillStyle = "#FBF392";
                ctx.moveTo(xLeft - valueDown, yDown);
                ctx.lineTo(xRight + valueDown, yDown);
                ctx.lineTo(xRight + valueUpHigh, yUpHigh);
                ctx.lineTo(xLeft - valueUpHigh, yUpHigh);
                ctx.moveTo(xLeft - valueUpHigh, yUpHigh);
                ctx.quadraticCurveTo(xLeft + 80, yUp - (progressCoffee + progressMilk + progressFoam - 80) * 2, xRight + valueUpHigh, yUpHigh);
                ctx.fill();
                ctx.closePath();
            }
        } else {
            ctx.beginPath();
            ctx.fillStyle = "#FBF392";
            ctx.moveTo(xLeft - valueDown, yDown);
            ctx.lineTo(xRight + valueDown, yDown);
            ctx.lineTo(xRight + valueUp, yUp);
            ctx.lineTo(xLeft - valueUp, yUp);
            ctx.fill();
            ctx.closePath();
        }
    }
    // canvas foam

    function updateCupCoffee() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        img.onload = function () {
            cupCoffee();
        };
        cupCoffee();
        coffee();
        milk();
        foam();
    }
    // update cup coffee

    updateCupCoffee();

    var xMouseStart;
    var isDragPro = true; // false event dragging mouse

    $(".container--progress span")
        .mouseenter(function (e) {
            xMouseStart = e.pageX;
//             isDragPro = true; 
        })
//         .mouseleave(function () {
//             isDragPro = false;
//         }) // 
        .mousemove(function (e) {
            if (isDragPro) {
                var type = $(this).attr("types");
                var total = progressCoffee + progressFoam + progressMilk;
                if (e.pageX < xMouseStart) {
                  if (type === 'coffee' && progressCoffee > 0) {
                    progressCoffee -= 1;
                    $(this).parent().find('progress').attr('value', progressCoffee);
                    $(this).css({ left: progressCoffee - 5 + "%" });
                    $(this).text(progressCoffee + '%');
                  }
                  if (type === 'milk' && progressMilk > 0) {
                    progressMilk -= 1;
                    $(this).parent().find('progress').attr('value', progressMilk);
                    $(this).css({ left: progressMilk - 5 + "%" });
                    $(this).text(progressMilk + '%');
                  }
                  if (type === 'foam' && progressFoam > 0) {
                    progressFoam -= 1;
                    $(this).parent().find('progress').attr('value', progressFoam);
                    $(this).css({ left: progressFoam - 5 + "%" });
                    $(this).text(progressFoam + '%');
                  }
                }
                // decrease coffee, milk, foam

                if (e.pageX > xMouseStart && total < 100) {
                  if (type === 'coffee') {
                    progressCoffee += 1;
                    $(this).parent().find('progress').attr('value', progressCoffee);
                    $(this).css({ left: progressCoffee - 5 + "%" });
                    $(this).text(progressCoffee + '%');
                  }
                  if (type === 'milk') {
                    progressMilk += 1;
                    $(this).parent().find('progress').attr('value', progressMilk);
                    $(this).css({ left: progressMilk - 5 + "%" });
                    $(this).text(progressMilk + '%');
                  }
                  if (type === 'foam') {
                    progressFoam += 1;
                    $(this).parent().find('progress').attr('value', progressFoam);
                    $(this).css({ left: progressFoam - 5 + "%" });
                    $(this).text(progressFoam + '%');
                  }
                }
                //increase coffe, milk, foam

                xMouseStart = e.pageX;
                updateCupCoffee();
              }
        });
    // mouse move span to customize

    var yMouseStart;
    var isDragCanvas = false; // when drag mouse

    $(".container--canvas canvas")
        .mousedown(function (e) {
            yMouseStart = e.pageY;
            isDragCanvas = true;
        })
        .mouseup(function () {
            isDragCanvas = false;
        })
        .mousemove(function (e) {
            var total = progressCoffee + progressMilk + progressFoam;
            if (isDragCanvas) {
              var position = (410 - e.pageY + $("canvas").offset().top + 20)/3.9; // position mouse/canvas

              // check position
              if (progressCoffee > position) {
                if (e.pageY > yMouseStart && progressCoffee > 0) {
                  progressCoffee -= 1;
                }
                if (e.pageY < yMouseStart && total < 100) {
                  progressCoffee += 1;
                }
                $(".progress__coffee").find('progress').attr('value', progressCoffee);
                $(".type__coffee").css({ left: progressCoffee - 5 + "%" });
                $(".type__coffee").text(progressCoffee + '%');
              }
              if (progressCoffee + progressMilk > position && progressCoffee < position) {
                if (e.pageY > yMouseStart && progressMilk > 0) {
                  progressMilk -= 1;
                }
                if (e.pageY < yMouseStart && total < 100) {
                  progressMilk += 1;
                }
                $(".progress__milk").find('progress').attr('value', progressMilk);
                $(".type__milk").css({ left: progressMilk - 5 + "%" });
                $(".type__milk").text(progressMilk + '%');
              }
              if (total > position && progressCoffee < position && progressMilk < position && progressCoffee + progressMilk < position) {
                if (e.pageY > yMouseStart && progressFoam > 0) {
                  progressFoam -= 1;
                }
                if (e.pageY < yMouseStart && total < 100) {
                  progressFoam += 1;
                }
                $(".progress__foam").find('progress').attr('value', progressFoam);
                $(".type__foam").css({ left: progressFoam - 5 + "%" });
                $(".type__foam").text(progressFoam + '%');
              }
              xMouseStart = e.pageX;
              updateCupCoffee();
            }
        });
    // mouse drag cup to customize
});
