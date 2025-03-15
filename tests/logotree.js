import * as avatar from 'xr/cns.js';

avatar.self.disc.position.set(0,-28,-40);
avatar.self.psi(`//Logo noopts
construct lightRing
pd
mv 0 -29 -35
xt 10
lt 60
ts 300
repeat 
fd 130
rt 90
light 0xffff88 20 500 2
loop 8
end
construct field
mat MeshStandardMaterial 
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
mat MeshStandardMaterial
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
blocks
end
construct reedW
mat MeshStandardMaterial 
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
blocks 
end
construct blocks
setShape fd cube
color 0xaa22dd
xt 13
repeat 
fd 7
rt 163
loop 13
end
nu lightRing
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
