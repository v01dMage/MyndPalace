import * as avatar from 'xr/cns.js';

avatar.self.psi(`//Logo noopts
construct lightRing
pu
mv 0 -25 -33
xt 10
lt 60
ts 300
repeat 
fd 188
rt 120
light 0xffff88 150 500 2
loop 5
end
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
setShape fd capsule
rt 95
color random
repeat 
fd 30
loop 4
mat MeshStandardMaterial
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
loop 9
nu offshoot
repeat 
xt 10 
fd 10
loop 9
blocks
end
construct reedW
setShape fd capsule 
rt 95
color random
repeat 
fd 30
loop 4
mat MeshStandardMaterial
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
loop 9
nu offshoot
repeat 
xt 10 
fd 10
loop 9
blocks 
end
construct offshoot
mat MeshStandardMaterial
xt 30
repeat 
xt 10 
fd 10
loop 6
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
pu
mv 0 -30 -30
lt 90
setShape fd sphere 
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
ts 3000
nu lightRing
`);
