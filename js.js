$(document).ready(function () {

    //Dokumentasjons-knapp
    $("#docButton").click(function () {
      $("#documentation").slideToggle();
    });
  
    //Interaktivitet i SVG

    //Det nederste rektangelet/"ground" skifter farge.
    var n;
    $("#ground").click(function () {
      if (n == 0) {
        $("#ground").css("fill", "#8AA585");
        $("#river").css("fill", "#8AA585");
        n = 1;
      }
      else {
        $("#ground").css("fill", "#8A307F");
        $("#river").css("fill", "#8A307F");
        n = 0;
      }
    });
  
    //Viser rektangelet nederst/"river" hvis man holder musa over.
    $("#river").hover(function(){
       $("#river").css("fill", "#6883BC");
      },
     function() {
        if(n != 0){
       $("#river").css("fill", "#8AA585");
        }
        else{
        $("#river").css("fill", "#8A307F");
        }
     });
  
    //CANVAS
    //interaktivitet
    const canvas = $('#canvas').get(0);
    const ctx = canvas.getContext("2d");

    //tegner hele bildet bortsett fra de to nederste rektanglene("ground" og river),
    //fordi alle elementer untatt disse må tegnes på nytt hver frame i animasjonen.
    function drawWhole() {
      ctx.fillStyle = "#305767";
      ctx.fillRect(0, 0, 370, 293);
  
      //Big Mountain
      ctx.beginPath();
      ctx.moveTo(120.5, 166);
      ctx.lineTo(216, 307);
      ctx.lineTo(25, 307)
      ctx.lineTo(120.5, 166);
      ctx.fillStyle = "#6699CC";
      ctx.fill();
      ctx.closePath();
  
      //Little Mountain
      ctx.beginPath();
      ctx.moveTo(246, 246);
      ctx.lineTo(312.684, 340.5);
      ctx.lineTo(179.316, 340.5);
      ctx.lineTo(246, 246);
      ctx.fillStyle = "#6699CC";
      ctx.fill();
      ctx.closePath();
  
      //Star 1
      ctx.beginPath();
      ctx.moveTo(80.5, 14);
      ctx.lineTo(85.7761, 29.2016);
      ctx.lineTo(102.85, 29.2016);
      ctx.lineTo(89.0369, 38.5967);
      ctx.lineTo(94.313, 53.7984);
      ctx.lineTo(80.5, 44.4033);
      ctx.lineTo(66.687, 53.7984);
      ctx.lineTo(71.9631, 38.5967);
      ctx.lineTo(58.1502, 29.2016);
      ctx.lineTo(75.2239, 29.2016);
      ctx.lineTo(80.5, 14);
      ctx.fillStyle = "#FFCA0E";
      ctx.fill();
      ctx.closePath();
    }
  
    //Opretter variabelrektangler med posisjonen til elementene som skal
    //være interaktive og sjekker om musa er innenfor grensene til elementet
    var rect = { x: 0, y: 294, width: 370, height: 78, color: "#8AA585" }
    rect.isPointInside = function (x, y) {
      return (x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height);
    }

    var rect2 = { x: 0, y: 340, width: 370, height: 21}
    rect2.isPointInside = function (x, y) {
      return (x >= rect2.x && x <= rect2.x + rect2.width && y >= rect2.y && y <= rect2.y + rect2.height);
    }
    
    //Tegner rektanglene
    function drawGround(){
    ctx.fillStyle = "#8AA585";
    ctx.fillRect(0, 294, 370, 78);
    }
    drawGround();

    function drawRiver(){
    if(rect.color=="#8AA585"){
    ctx.fillStyle = "#8AA585";
    ctx.fillRect(0, 340, 370, 21);
    }
    else{
    ctx.fillStyle = "#8A307F";
    ctx.fillRect(0, 340, 370, 21)
    }
    }
    drawRiver();
  
    //Håndterer at en bruker klikker på "ground" med en clicked-variabel som
    //endres hver gang elementet klikkes på, slik at interaksjonen kan gjentas
    var clicked;
    function handleMouseDown(e) {
      const bounds = canvas.getBoundingClientRect()
      mouseX = parseInt(e.clientX- bounds.left);
      mouseY = parseInt(e.clientY - bounds.y);
      if (rect.isPointInside(mouseX, mouseY)) {
        if (clicked > 0) {
          ctx.clearRect(0, 294, 370, 78);
          drawGround();
          rect.color= "#8AA585";
          clicked = 0;
        }
        else {
          ctx.clearRect(0, 294, 370, 78);
          ctx.fillStyle = "#8A307F";
          ctx.fillRect(0, 294, 370, 78);
          rect.color = "#8A307F";
          clicked = 1;
        }
      }
    }
  
  //Håndterer at en bruker har musen over "river". Kan også gjentas uten 
  //begrensning.
    function handleMouseMove(e) {
        const bounds = canvas.getBoundingClientRect()
        mouseX = parseInt(e.clientX- bounds.left);
        mouseY = parseInt(e.clientY - bounds.y);

          if (rect2.isPointInside(mouseX, mouseY)) {
            ctx.fillStyle="#6883BC";
            ctx.fillRect(0, 340, 370, 21);
          } else {
            drawRiver();
          }
      }
  
    $("#canvas").click(handleMouseDown);
    $("#canvas").mousemove(handleMouseMove);
  
    //Animasjon Canvas
    var x = 185;
    var y = 32;
    var dx = 1;
    var dy = 1;
    var radius = 32;
    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, 370, 294);
      drawWhole();
  
      ctx.beginPath();
      ctx.ellipse(x, y, radius, radius, Math.PI / 4, 0, 2 * Math.PI);
      ctx.fillStyle = "#FBE782";
      ctx.fill();
      ctx.closePath();
  
      if (x + radius > 370 || x - radius < 0) {
        dx = -dx;
      }
  
      if (y + radius > 290 || y - radius < 0) {
        dy = -dy;
      }
  
      x += dx;
      y += dy;
    }
    animate();
  
  
  });
  