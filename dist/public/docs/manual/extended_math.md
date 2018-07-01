# Extended Math Object

Writing AI Scripts usually requires an application of various mathematical formulas. To make it easier, JavaScript class was extended to support additional computations.

Function                                 | Description
-----------------------------------------|-------------------------------------
**`Math.deg2rad(value)`**                | converts an angle value from degrees to radians. Returned value is normalized (between -PI and +PI)
**`Math.rad2deg(value)`**                | converts an angle value from radians to degrees. Returned value is normalized (between -180 and +180)
**`Math.deg.normalize(value)`**          | normalize an angle by increasing/decreasing it by 360 degrees so it is in range -180 and +180 degrees (excluding -180 degrees)
**`Math.deg.atan2(y, x)`**               | the same as Math.atan2, but returned values are in degrees
**`Math.rad.normalize(value)`**          | normalize an angle by increasing/decreasing it by 2*PI degrees so it is in range -PI and +PI (excluding -PI)
**`Math.rad.atan2(y, x)`**               | the same as Math.atan2 so returned values are in radians. Added just to keep notation coherent
**`Math.distance(x1, y1, x2, y2)`**      | calculates distance between point (x1, y1) and (x2, y2)
**`Math.randomRange(min, max)`**         | returns a random number from range [min; max)
