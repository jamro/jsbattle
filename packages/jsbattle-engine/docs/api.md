# JsBattle API
<a name="Renderer"></a>

## Renderer
Renders simulation of the battle. The object must be passed to
constructor of Simulation object

**Kind**: global class  
**See**: Simulation  

* [Renderer](#Renderer)
    * [.quality](#Renderer+quality) ⇒
    * [.initBatlefield(battlefield)](#Renderer+initBatlefield)
    * [.preRender()](#Renderer+preRender)
    * [.postRender()](#Renderer+postRender)
    * [.renderTank(tank, events)](#Renderer+renderTank)
    * [.renderClock(msElapsed, msLimit)](#Renderer+renderClock)
    * [.renderTankStats(tankList)](#Renderer+renderTankStats)
    * [.renderBullet(bullet, events)](#Renderer+renderBullet)
    * [.setSpeed()](#Renderer+setSpeed)

<a name="Renderer+quality"></a>

### renderer.quality ⇒
**Kind**: instance property of [<code>Renderer</code>](#Renderer)  
**Returns**: value from 0 to 1 that represents the current quality of the renderer. This parameter is controlled by Simulation object  
**See**: Simulation.setRendererQuality()  
<a name="Renderer+initBatlefield"></a>

### renderer.initBatlefield(battlefield)
Renders the battlefield. Called only at the beginning. Used usually to render
background of the Simulation

**Kind**: instance method of [<code>Renderer</code>](#Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| battlefield | <code>Battlefield</code> | battlefield object |

<a name="Renderer+preRender"></a>

### renderer.preRender()
Called before rendering of each frame

**Kind**: instance method of [<code>Renderer</code>](#Renderer)  
<a name="Renderer+postRender"></a>

### renderer.postRender()
Called after rendering of each frame

**Kind**: instance method of [<code>Renderer</code>](#Renderer)  
<a name="Renderer+renderTank"></a>

### renderer.renderTank(tank, events)
Render a tank

**Kind**: instance method of [<code>Renderer</code>](#Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| tank | <code>Tank</code> | a tank to be rendered |
| events | <code>Array</code> | list of events related to the tank that occurred since the last call of this method |

<a name="Renderer+renderClock"></a>

### renderer.renderClock(msElapsed, msLimit)
Renders clock of the battle

**Kind**: instance method of [<code>Renderer</code>](#Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| msElapsed | <code>Number</code> | time that has elapsed (in milliseconds) |
| msLimit | <code>Number</code> | maximum battle duration (in milliseconds) |

<a name="Renderer+renderTankStats"></a>

### renderer.renderTankStats(tankList)
Renders statistics of all tanks. Called once per frame

**Kind**: instance method of [<code>Renderer</code>](#Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| tankList | <code>Array</code> | list of all tanks that are involved in the battle |

<a name="Renderer+renderBullet"></a>

### renderer.renderBullet(bullet, events)
Render a bullet

**Kind**: instance method of [<code>Renderer</code>](#Renderer)  

| Param | Type | Description |
| --- | --- | --- |
| bullet | <code>Bullet</code> | a bullet to be rendered |
| events | <code>Array</code> | list of events related to the bullet that occurred since the last call of this method |

<a name="Renderer+setSpeed"></a>

### renderer.setSpeed()
Sets speed of the simulation. Could be used to time-scale animations so they match simulation speed

**Kind**: instance method of [<code>Renderer</code>](#Renderer)  
**Pram**: <code>Number</code> multiplier - simulation speed multiplier  
