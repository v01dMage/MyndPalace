import * as avatar from 'xr/cns.js';

avatar.self.psi(`//Logo noopts
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
loop 15
color 0x9999aa
repeat 
fd 5
loop 20
color 0xffddaa
repeat
xt 6
fd 6
loop 30
color 0xaa00cc
repeat 
fd 7
loop 10
end
construct tree
rt 95
color 0xd47e30
repeat 
fd 36
loop 4
end
pu
mv 0 -30 -30
lt 90
pd
repeat
fd 15
nu field
fd 15
nu tree
rt 10
loop 36
`);
