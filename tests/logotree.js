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
loop 11
end
construct reed
rt 95
color random
repeat 
fd 36
loop 4
color 0xd47e30 
repeat
xt 6
fd 6
loop 15
bk 40
fd 300
end
pu
mv 0 -30 -30
lt 90
pd
repeat
fd 15
nu field
fd 15
nu reed
rt 10
loop 36
`);
