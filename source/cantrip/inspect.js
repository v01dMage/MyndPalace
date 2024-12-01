//inspect an http address and visualize it

import { htmlTokenStream } from 'parser/htmlTokenStream.js';
import { visualizeHtml } from 'parser/htmlTokenVisualizer.js';
import * as avatar from 'xr/cns.js';


function inspectHtml( url ){
  fetch(url).then( res=>res.text() ).then( txt=>{
    let ts= htmlTokenStream( txt );
    let target= visualizeHtml( ts );
    avatar.self.scene.add( target );
  });
}