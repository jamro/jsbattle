# Constants and Formulas

Parameter           | Value                | Description
--------------------|----------------------|--------------------
Boost Amount        | 300                  |
Boost Consumption   | 1                    | consumption per one simulation step
Bullet Damage       | 10*power + 3*power^2 | power is a value between 0.1 and 1
Bullet Speed        | 4                    |
Gun Reloading Time  | 70*power             | power is a value between 0.1 and 1
Gun Turning Speed   | 3°                   | in degrees per simulation step
Gun Length          | 25                   | length of the gun (from the center of the tank to end of the barrel)
Hit Enemy Damage    | 0.2                  | damage received when colliding with another tank
Hit Wall Damage     | 0.2                  | damage received when colliding with a wall
Initial Energy      | 100                  |
Radar Beam Focal    | 6°                   | angle that radar beam covers
Radar Beam Range    | 300                  | how far away from the tank the radar scan
Radar Turning Speed | 6°                   | in degrees per simulation step
Ram Damage          | 0.1 + speed*0.8      | damage dealt to an opponent when you ram him
Tank Moving Speed   | 2                    | enabling boost will double this value
Tank Turning Speed  | 2                    | in degrees per simulation step
