// export a function which
//  creates a starfield representation 
//  returning it in a htmlcanvas element 

export default function paintStarfield(w,h,n){
    let canvas= document.createElement('canvas');
    canvas.width= `${w}`;
    canvas.height= `${h}`;
    let ctx= canvas.getContext("2D");
    let r= (x)=>Math.floor(Math.random()*x);
    ctc.fillStyle= `rgb(${r(256)},${r(256)},${r(256)})`;
    for(let i= 0; i< n; i++){
      let [x,y]= [r(w),r(h)];
      ctx.fillRect( x, y, r(13)+3, r(13)+3 );
    }
    return canvas;
}