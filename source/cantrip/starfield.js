// export a function which
//  creates a starfield representation 
//  returning it in a htmlcanvas element 
import * as avatar from 'avatat/cns';

const cout= avatar.self.console.cout;

export function paintStarfield(w,h,n){
    var canvas= document.createElement('canvas');
    cout( canvas );
    canvas.width= w;
    canvas.height= h;
    let ctx= canvas.getContext("2d");
    ctx.fillStyle= "#000000";
    ctx.fillRect(0,0,w,h);

    let r= (x)=>Math.floor(Math.random()*x);
    
    for(let i= 0; i< n; i++){
      ctx.fillStyle= `rgb(${r(256)},${r(256)},${r(256)})`;
      ctx.fillRect( r(w), r(h), r(13)+3, r(13)+3 );
    }
    document.body.appendChild(canvas);
    return canvas;
}