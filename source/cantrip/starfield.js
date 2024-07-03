// export a function which
//  creates a starfield representation 
//  returning it in a htmlcanvas element 

// todo: paint a star, copy, scale
//       maybe track and animate 
//import * as avatar from 'xr/cns.js'; 

//const cout= avatar.self.console.cout;

export function paintStarfield(w,h,n){
    var canvas= document.createElement('canvas');
    //cout( canvas );
    canvas.width= w;
    canvas.height= h;
    let ctx= canvas.getContext("2d");
    ctx.fillStyle= "#000000";
    ctx.fillRect(0,0,w,h);

    let r= (x)=>Math.floor(Math.random()*x);
    
    for(let i= 0; i< n; i++){
      ctx.fillStyle= `rgb(${r(256)},${r(256)},${r(256)})`;
      ctx.fillRect( r(w), r(h), r(3)+1, r(3)+1 );
    }
    //document.body.appendChild(canvas);
    return canvas;
}
