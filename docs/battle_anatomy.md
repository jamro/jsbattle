# Battle Anatomy

## Coordinate System

X coordinates of the battle field increase from left to right. Y coordinates increase from top to down. Top right corner of the battle field is not necessarily at (0, 0) and may be randomly shifted. Radar of the tank should be used to detect wall instead of assuming any constant coordinates.

![alt text](/img/tank_coordinates.png)

All angles are in a range between -180° and 180°. Angle 0° is equivalent to left direction (east).

## Simulation Mechanics

Simulation processing loop updates all objects in the battlefield (tanks and bullets). In every step of the loop [AI Script](ai_script) is being called and returned information is used to control the behavior of tanks.
