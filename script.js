var  center_x, center_y, radius,  
    x_end, y_end, bar_height, bufferLength, dataArray;
  
function Playsound(){
    context = new (window.AudioContext || window.webkitAudioContext)();
    analyser = context.createAnalyser();
    
    audio= document.getElementById('audiofile');
    source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize=256;
	 bufferLength=analyser.frequencyBinCount;
	 dataArray = new Float32Array(bufferLength);
   
    audio.play();
    animationLooper();
}
 
function animationLooper(){
    
    // set to the size of device
    const canvas = document.getElementById("mycanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    
    // find the center of the window
    center_x = canvas.width / 2;
    center_y = canvas.height / 2;
	var color=240;
    var radius=0; 
    // style the background
    var gradient = ctx.createLinearGradient(0,0,0,canvas.height);
        gradient.addColorStop(0,"rgba(77, 4, 34, 1)");
        gradient.addColorStop(1,"rgba(216, 186, 253, 1)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0,0,canvas.width,canvas.height);
  
    function draw(){
	  
		
	  analyser.getFloatFrequencyData(dataArray); 
	  
	  ctx.fillStyle='hsl(' + color++ + ', 100%, 50%)';
	   ctx.beginPath();
	   ctx.arc(center_x, center_y, radius,0,2*Math.PI,false);
       ctx.fill();
	  for (i=0; i<bufferLength; i++){
		  radius=(dataArray[i]+200)*2;
		  if (radius < Math.max.apply(null,dataArray)){ 
	      radius +=1;
		   }else if (radius==dataArray[0]){
			   radius=0;
		   }else{
		  radius-=1;
		  break;
	  }
		   
		}  
	   requestAnimationFrame(draw);
	}
     draw();    
 
}

