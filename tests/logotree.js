import * as avatar from 'xr/cns.js';

avatar.self.psi(`//Logo noopts
construct lightRing
ts 3000
pu
mv 0 -25 -33
xt 45
lt 60
repeat 
fd 188
rt 120
light 0xeeffee 150 500 2
loop 3
end
construct field
ts 200
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
ts 1000
setShape fd capsule
rt 95
color random
repeat 
fd 30
loop 4
mat MeshStandardMaterial
color 0xd47e30 
ts 2000
repeat
xt 6
fd 5.5
loop 15
bk 60
fd 150
color 0xffd700
ts 750
sz .3
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
ts 750
setShape fd capsule 
rt 95
color random
repeat 
fd 30
loop 4
mat MeshStandardMaterial
color 0xd47e30
ts 2000
repeat
xt 6
fd 5.5
loop 15
bk 60
fd 150
color 0xffffff 
ts 420
sz .17
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
ts 100
mat MeshStandardMaterial
xt 30
repeat 
xt 10 
fd 10
loop 6
blocks
end
construct blocks
ts 50
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
nu lightRing
`);
