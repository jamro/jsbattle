# Renderers
There are several renderers that could be used to visualize the simulation:

![diagram](/docs/img/puml/renderer.png)

`Renderer` does not contain any implementation and can be used as a mock if
there is no need to provide visual layer. It is an interface and thus acts
as a base class for all other renderers.

`AbstractRenderer` provide the most basic implementation. It maps views with models
and within each render loop, it updates views according to related models. This
is an abstract renderer and should not be used directly with the simulation.

`AbstractPixiRenderer` include common mechanisms required to render battle with
[PixiJS](http://www.pixijs.com/) engine. This is an abstract renderer and should
not be used directly with the simulation.

Other Renderers provide various visualization of the Battle. `BrodyRenderer` is
the default one used in *JSBattle*

## Views

`AbstractRenderer` introduce a concept of `View`, that is mapped with related
`Model` and visualize its state. There are several types of Views used by
different Renderers

![diagram](/docs/img/puml/view.png)

Each view stores reference to the linked model. Properties of the model are read
during `View.update()` call and the view is being updated accordingly.
