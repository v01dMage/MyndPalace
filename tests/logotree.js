import * as avatar from 'xr/cns.js';

avatar.self.disc.position.set(0,-28,-40);
avatar.self.psi(`//Logo noopts
sz .15
construct field
setShape fd sphere
rt 90
repeat
fd 6
loop 20
color 0x407050
repeat
xt 6
fd 6
loop 6
end
construct reedG
rt 95
color random
repeat 
fd 30
loop 4
color 0xd47e30 
repeat
xt 6
fd 5.5
loop 15
bk 60
fd 150
color 0xdabb13
sz .25
repeat 
xt 10 
fd 10
loop 18
end
construct reedW
rt 95
color random
repeat 
fd 30
loop 4
color 0xd47e30
repeat
xt 6
fd 5.5
loop 15
bk 60
fd 150
color 0xffffff 
sz .14
repeat 
xt 10 
fd 10
loop 18
end
pu
mv 0 -30 -30
lt 90
pd
repeat
fd 15
nu field
fd 15
nu reedG
rt 10
loop 12 
repeat
fd 15
nu field
fd 15
nu reedW
rt 10
loop 6
repeat
fd 15
nu field
fd 15
nu reedG
rt 10
loop 12
repeat
fd 15
nu field
fd 15
nu reedW
rt 10
loop 6
`);
