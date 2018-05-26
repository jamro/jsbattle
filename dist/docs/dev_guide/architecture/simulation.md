# Simulation

Simulation is based on two independent loops: rendering and simulation. Simulation
loop updates model of the battle while rendering loop reads a state of the model
and visualize it. Keeping them independent allows avoiding interferences. It is
also possible to easily replace rendering layer or even turn it completely off.

![Simulation sequence diagram](/docs/img/puml/sim_seq.png)
