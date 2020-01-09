# Algorithms: Shooting

## Power vs rate of fire
As described in [Battle Anatomy Section](../manual/battle_anatomy.md), you can decide about the power of fire. More powerful shots will increase reload time reducing the rate of fire.

Amount of damage that can be dealt over the same amount of time is not constant. Formulas required to calculate that can be found in [Constants and Formulas Section](../manual/consts.md).

Using most powerful shots (`control.SHOOT=1`) can be 25% more efficient than firing weaker bullets at the maximum rate of fire (`control.SHOOT=0.1`). However, this calculation is right only under an assumption of 100% accuracy. When shooting a moving target that is hard to hit, it may be better to use a hail of bullets and increase the probability that at least some of them will hit the target.
