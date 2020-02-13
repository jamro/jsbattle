# JsBattle Engine API
## Classes

<dl>
<dt><a href="#AiDefinition">AiDefinition</a></dt>
<dd><p>Describes AI algorithm of the tank. There could be two sources of AI scripts:
files or string variable. Depending on source of scripts <code>fromFile()</code> or <code>fromCode()</code>
methods should be used to initialize the object</p>
</dd>
<dt><a href="#Renderer">Renderer</a></dt>
<dd><p>Renders simulation of the battle. The object must be passed to
constructor of Simulation object</p>
</dd>
<dt><a href="#Simulation">Simulation</a></dt>
<dd><p>Battle simulation component. Process the simulation updating all related objects
and refreshing the renderer.</p>
</dd>
<dt><a href="#Tank">Tank</a></dt>
<dd><p>Object represents a tank that is involved in the battle during simulation</p>
</dd>
</dl>

<a name="AiDefinition"></a>

## AiDefinition
Describes AI algorithm of the tank. There could be two sources of AI scripts:
files or string variable. Depending on source of scripts `fromFile()` or `fromCode()`
methods should be used to initialize the object

**Kind**: global class  

* [AiDefinition](#AiDefinition)
    * [new AiDefinition()](#new_AiDefinition_new)
    * [.name](#AiDefinition+name) ⇒
    * [.teamName](#AiDefinition+teamName) ⇒
    * [.executionLimit](#AiDefinition+executionLimit) ⇒
    * [.executionLimit](#AiDefinition+executionLimit)
    * [.filePath](#AiDefinition+filePath) ⇒
    * [.code](#AiDefinition+code) ⇒
    * [.initData](#AiDefinition+initData) ⇒
    * [.useSandbox](#AiDefinition+useSandbox) ⇒
    * [.toJSON()](#AiDefinition+toJSON) ⇒
    * [.fromJSON(data)](#AiDefinition+fromJSON)
    * [.clone()](#AiDefinition+clone) ⇒
    * [.fromFile(tankName, initData)](#AiDefinition+fromFile)
    * [.fromCode(tankName, code, initData)](#AiDefinition+fromCode)
    * [.assignToTeam(name)](#AiDefinition+assignToTeam)
    * [.disableSandbox()](#AiDefinition+disableSandbox)

<a name="new_AiDefinition_new"></a>

### new AiDefinition()
Creates AiDefinition. Constructor is not available outside of
`JsBattle.min.js` library. To create AiDefinition object use
`JsBattle.createAiDefinition()` instead

<a name="AiDefinition+name"></a>

### aiDefinition.name ⇒
**Kind**: instance property of [<code>AiDefinition</code>](#AiDefinition)  
**Returns**: name of the AI. The same name will be assigned to the tank  
<a name="AiDefinition+teamName"></a>

### aiDefinition.teamName ⇒
**Kind**: instance property of [<code>AiDefinition</code>](#AiDefinition)  
**Returns**: name of the team  
<a name="AiDefinition+executionLimit"></a>

### aiDefinition.executionLimit ⇒
**Kind**: instance property of [<code>AiDefinition</code>](#AiDefinition)  
**Returns**: Maximum time for execution of AI script (in milliseconds)  
<a name="AiDefinition+executionLimit"></a>

### aiDefinition.executionLimit
**Kind**: instance property of [<code>AiDefinition</code>](#AiDefinition)  

| Param | Type | Description |
| --- | --- | --- |
| limit | <code>Number</code> | Maximum time for execution of AI script (in milliseconds) |

<a name="AiDefinition+filePath"></a>

### aiDefinition.filePath ⇒
**Kind**: instance property of [<code>AiDefinition</code>](#AiDefinition)  
**Returns**: path to file with code of Web Worker where the AI will be ran.  
<a name="AiDefinition+code"></a>

### aiDefinition.code ⇒
**Kind**: instance property of [<code>AiDefinition</code>](#AiDefinition)  
**Returns**: source code of AI algorithm as a string. This property is not empty only for AIs created by `fromCode()` call  
**See**: AiDefinition.fromCode()  
<a name="AiDefinition+initData"></a>

### aiDefinition.initData ⇒
**Kind**: instance property of [<code>AiDefinition</code>](#AiDefinition)  
**Returns**: optional initial data that is passed to the AI and can be accessed from tank info object (`info.initData`)  
<a name="AiDefinition+useSandbox"></a>

### aiDefinition.useSandbox ⇒
**Kind**: instance property of [<code>AiDefinition</code>](#AiDefinition)  
**Returns**: true if AI should be sandboxed. Otherwise false. By default, all AIs are sandboxed.  
<a name="AiDefinition+toJSON"></a>

### aiDefinition.toJSON() ⇒
**Kind**: instance method of [<code>AiDefinition</code>](#AiDefinition)  
**Returns**: JSON representation of AiDefiniton  
<a name="AiDefinition+fromJSON"></a>

### aiDefinition.fromJSON(data)
**Kind**: instance method of [<code>AiDefinition</code>](#AiDefinition)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | JSON data to be parsed |

<a name="AiDefinition+clone"></a>

### aiDefinition.clone() ⇒
**Kind**: instance method of [<code>AiDefinition</code>](#AiDefinition)  
**Returns**: copy of the object  
<a name="AiDefinition+fromFile"></a>

### aiDefinition.fromFile(tankName, initData)
Creates AI definition that has source codes in a file. All AI scripts
are kept in `/tanks/[tankName].tank.js` files

**Kind**: instance method of [<code>AiDefinition</code>](#AiDefinition)  

| Param | Type | Description |
| --- | --- | --- |
| tankName | <code>String</code> | name of the tank. Its source code is kept in `/tanks/[tankName].tank.js` |
| initData | <code>object</code> | optional initial data that is passed to the AI and can be accessed from tank info object (`info.initData`) |

<a name="AiDefinition+fromCode"></a>

### aiDefinition.fromCode(tankName, code, initData)
Creates AI definition that has the algorithm codded in provided in string parameter.

**Kind**: instance method of [<code>AiDefinition</code>](#AiDefinition)  

| Param | Type | Description |
| --- | --- | --- |
| tankName | <code>String</code> | name of the tank. |
| code | <code>String</code> | JavaScript code of AI script. |
| initData | <code>object</code> | optional initial data that is passed to the AI and can be accessed from tank info object (`info.initData`) |

<a name="AiDefinition+assignToTeam"></a>

### aiDefinition.assignToTeam(name)
Set name of the team. Tanks from the same team can coomunicate with eachother and cooperate

**Kind**: instance method of [<code>AiDefinition</code>](#AiDefinition)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | unique name of the team |

<a name="AiDefinition+disableSandbox"></a>

### aiDefinition.disableSandbox()
Allows to running code of AI in the same sandbox as the core of JsBattle game. It is
potentially dangerous since code of AI Script can access code of JS Battle and
influence it. However disabling sandbox can significantly increase performance
(especially if you run several simulations in concurrent). Use this approach
only for trusted AI code.

**Kind**: instance method of [<code>AiDefinition</code>](#AiDefinition)  
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
    * [.stop()](#Renderer+stop)
    * [.dispose()](#Renderer+dispose)

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
| tank | [<code>Tank</code>](#Tank) | a tank to be rendered |
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
<a name="Renderer+stop"></a>

### renderer.stop()
Stops renderinf loop of the battle. After this call, renderinig cannot be resumed.

**Kind**: instance method of [<code>Renderer</code>](#Renderer)  
<a name="Renderer+dispose"></a>

### renderer.dispose()
Clean up and remove all resources used by renderer

**Kind**: instance method of [<code>Renderer</code>](#Renderer)  
<a name="Simulation"></a>

## Simulation
Battle simulation component. Process the simulation updating all related objects
and refreshing the renderer.

**Kind**: global class  

* [Simulation](#Simulation)
    * [new Simulation(renderer, debug)](#new_Simulation_new)
    * [.tankList](#Simulation+tankList) ⇒
    * [.teamList](#Simulation+teamList) ⇒
    * [.renderer](#Simulation+renderer) ⇒
    * [.timeElapsed](#Simulation+timeElapsed) ⇒
    * [.timeLimit](#Simulation+timeLimit) ⇒
    * [.setRngSeed(seed)](#Simulation+setRngSeed)
    * [.getRngSeed()](#Simulation+getRngSeed) ⇒
    * [.getRandom()](#Simulation+getRandom) ⇒
    * [.log(msg)](#Simulation+log)
    * [.setFinishCondition(callback)](#Simulation+setFinishCondition)
    * [.init(width, height)](#Simulation+init)
    * [.start()](#Simulation+start)
    * [.addTank(aiDefinition)](#Simulation+addTank)
    * [.setSpeed(multiplier)](#Simulation+setSpeed)
    * [.setRendererQuality(qualityLevel)](#Simulation+setRendererQuality)
    * [.stop()](#Simulation+stop)
    * [.onStep(callback)](#Simulation+onStep)
    * [.onRender(callback)](#Simulation+onRender)
    * [.onStart(callback)](#Simulation+onStart)
    * [.onFinish(callback)](#Simulation+onFinish)
    * [.onError(callback)](#Simulation+onError)
    * [.createUltimateBattleDescriptor()](#Simulation+createUltimateBattleDescriptor) ⇒
    * [.hasTeams()](#Simulation+hasTeams) ⇒

<a name="new_Simulation_new"></a>

### new Simulation(renderer, debug)
Create Simulation object. Constructor is not available outside of
`JsBattle.min.js` library. To create Simulation object use
`JsBattle.createSimulation(renderer)` instead


| Param | Type | Description |
| --- | --- | --- |
| renderer | [<code>Renderer</code>](#Renderer) | Renderer used to present results of the simulation |
| debug | <code>Boolean</code> | turn on logging on the console |

<a name="Simulation+tankList"></a>

### simulation.tankList ⇒
**Kind**: instance property of [<code>Simulation</code>](#Simulation)  
**Returns**: all tanks that were added to the battle  
<a name="Simulation+teamList"></a>

### simulation.teamList ⇒
**Kind**: instance property of [<code>Simulation</code>](#Simulation)  
**Returns**: list of teams  
<a name="Simulation+renderer"></a>

### simulation.renderer ⇒
**Kind**: instance property of [<code>Simulation</code>](#Simulation)  
**Returns**: renderer attached to the simulation  
<a name="Simulation+timeElapsed"></a>

### simulation.timeElapsed ⇒
**Kind**: instance property of [<code>Simulation</code>](#Simulation)  
**Returns**: amount of time that has elapsed from the beginning of the battle (in milliseconds)  
<a name="Simulation+timeLimit"></a>

### simulation.timeLimit ⇒
**Kind**: instance property of [<code>Simulation</code>](#Simulation)  
**Returns**: maximum duration of the battle (in milliseconds). The battle will be over after that time.  
<a name="Simulation+setRngSeed"></a>

### simulation.setRngSeed(seed)
Seed random number generator. Each time when you seed rng with the same data
it will return the same sequence of numbers. That feature can be used
to reconstruct exactly the same, "randomized" simulation condidtions.

IMPORTANT! set it just after calling constructor of the calss. Otherwise
some RNG calls could be unseeded.

**Kind**: instance method of [<code>Simulation</code>](#Simulation)  

| Param | Type | Description |
| --- | --- | --- |
| seed | <code>Number</code> | rng seed data |

<a name="Simulation+getRngSeed"></a>

### simulation.getRngSeed() ⇒
**Kind**: instance method of [<code>Simulation</code>](#Simulation)  
**Returns**: seed of random number generator  
<a name="Simulation+getRandom"></a>

### simulation.getRandom() ⇒
**Kind**: instance method of [<code>Simulation</code>](#Simulation)  
**Returns**: random number from seeded rng  
<a name="Simulation+log"></a>

### simulation.log(msg)
log message if logging is enabled

**Kind**: instance method of [<code>Simulation</code>](#Simulation)  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | message to log |

<a name="Simulation+setFinishCondition"></a>

### simulation.setFinishCondition(callback)
set custom condition of battle finish. Once provided callbacl return true, the simulation will be over

**Kind**: instance method of [<code>Simulation</code>](#Simulation)  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | callback determining end of the battle. It takes one argument (simulation object) and return true (stop simulation) or false (continue simulation) |

<a name="Simulation+init"></a>

### simulation.init(width, height)
Initialize the battle field. Must be called before any other calls
to simulation object

**Kind**: instance method of [<code>Simulation</code>](#Simulation)  

| Param | Type | Description |
| --- | --- | --- |
| width | <code>Number</code> | width of the battlefield |
| height | <code>Number</code> | height of the battlefield |

<a name="Simulation+start"></a>

### simulation.start()
Starts simulation of the battle. It will initialize all AI scripts, trigger `onStart` event
and launch rendering and simulation processing loops. Remember to call `Simulation.init()` and
`Simulation.addTank()` before executing this method.

**Kind**: instance method of [<code>Simulation</code>](#Simulation)  
**See**: Simulation.onStart()  
<a name="Simulation+addTank"></a>

### simulation.addTank(aiDefinition)
Create a tank according to provided `AiDefinition`. Remember to add at
least two tanks to the battle. Otherwise, it will stop immediately and
the winner will be recognized

**Kind**: instance method of [<code>Simulation</code>](#Simulation)  

| Param | Type | Description |
| --- | --- | --- |
| aiDefinition | [<code>AiDefinition</code>](#AiDefinition) | defintion of tank AI script |

<a name="Simulation+setSpeed"></a>

### simulation.setSpeed(multiplier)
Set speed multiplier of the simulation. Setting to `2`means that everything will be
two times faster than usual. Setting to `0.5` will simulate the battle 2 times slower
than usual

**Kind**: instance method of [<code>Simulation</code>](#Simulation)  

| Param | Type | Description |
| --- | --- | --- |
| multiplier | <code>Number</code> | simulation speed multiplier |

<a name="Simulation+setRendererQuality"></a>

### simulation.setRendererQuality(qualityLevel)
Sets quality of renderer controlled by simulation object.
You can specify a value between 0 (lowest quality) and 1 (highest quality)
or allow the simulation to adjust it automatically by passing 'auto' string
Automatic quality adjustment try to keep the speed of the animation at proper level.
If simulation is lagging, quality will be reduced to ensure that the simulation
does not take longer than it should

**Kind**: instance method of [<code>Simulation</code>](#Simulation)  

| Param | Type | Description |
| --- | --- | --- |
| qualityLevel | <code>Number</code> \| <code>String</code> | number between 0 and 1 or 'auto' string |

<a name="Simulation+stop"></a>

### simulation.stop()
Stops battle simulation. It also stops rendering loop.
After calling this method you should not try to call
start to resume the battle but rather create a new
Simulation object and initialize it from the beginning

**Kind**: instance method of [<code>Simulation</code>](#Simulation)  
<a name="Simulation+onStep"></a>

### simulation.onStep(callback)
Allow adding a callback that will be called after each step of simulation
processing loop. The callback takes no arguments. The frequency of this event
depends on simulation speed.

**Kind**: instance method of [<code>Simulation</code>](#Simulation)  
**See**: `Simulation.setSpeed()`  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | callback that will be called on each event occurence. |

<a name="Simulation+onRender"></a>

### simulation.onRender(callback)
Allow adding a callback that will be called after each refresh of the renderer.
The callback takes no arguments. `onRender` and `onStep` event are not synchronized
and may be called at different intervals. Increasing of animation speed will not
increase rendering frequency. Rendering frequency is affected by quality of
rendering parameter

**Kind**: instance method of [<code>Simulation</code>](#Simulation)  
**See**

- `Simulation.setSpeed()`
- `Simulation.setRendererQuality()`


| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | callback that will be called on each event occurence. |

<a name="Simulation+onStart"></a>

### simulation.onStart(callback)
Allow adding a callback that will be called when the battle is started.
It is executed after initialization of all AI Scripts, just before
first step of simulation processing loop. The callback takes no arguments.

**Kind**: instance method of [<code>Simulation</code>](#Simulation)  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | callback that will be called on each event occurence. |

<a name="Simulation+onFinish"></a>

### simulation.onFinish(callback)
Allow adding a callback that will be called when the battle is over.
The callback takes no arguments.

**Kind**: instance method of [<code>Simulation</code>](#Simulation)  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | callback that will be called on each event occurence. |

<a name="Simulation+onError"></a>

### simulation.onError(callback)
Allow adding a callback that will be called when an error occur.
The callback takes one arguments: error message

**Kind**: instance method of [<code>Simulation</code>](#Simulation)  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | callback that will be called on each event occurence. |

<a name="Simulation+createUltimateBattleDescriptor"></a>

### simulation.createUltimateBattleDescriptor() ⇒
Create Ultimate Battle Descriptor that contains all data requied to replay
the battle and reflect its exact course.

**Kind**: instance method of [<code>Simulation</code>](#Simulation)  
**Returns**: UltimateBattleDescriptor object  
<a name="Simulation+hasTeams"></a>

### simulation.hasTeams() ⇒
**Kind**: instance method of [<code>Simulation</code>](#Simulation)  
**Returns**: true if at least two tanks are cooperating within one team  
<a name="Tank"></a>

## Tank
Object represents a tank that is involved in the battle during simulation

**Kind**: global class  

* [Tank](#Tank)
    * [new Tank(aiDefinition, id, team)](#new_Tank_new)
    * [.id](#Tank+id) ⇒
    * [.skin](#Tank+skin) ⇒
    * [.state](#Tank+state) ⇒
    * [.energy](#Tank+energy) ⇒
    * [.score](#Tank+score) ⇒
    * [.maxEnergy](#Tank+maxEnergy) ⇒
    * [.radarRange](#Tank+radarRange) ⇒
    * [.radarFocal](#Tank+radarFocal) ⇒
    * [.name](#Tank+name) ⇒
    * [.fullName](#Tank+fullName) ⇒
    * [.team](#Tank+team) ⇒
    * [.x](#Tank+x) ⇒
    * [.y](#Tank+y) ⇒
    * [.speed](#Tank+speed) ⇒
    * [.angle](#Tank+angle) ⇒
    * [.throttle](#Tank+throttle) ⇒
    * [.hasBoost](#Tank+hasBoost) ⇒
    * [.boost](#Tank+boost) ⇒
    * [.maxBoost](#Tank+maxBoost) ⇒
    * [.gunAngle](#Tank+gunAngle) ⇒
    * [.radarAngle](#Tank+radarAngle) ⇒
    * [.targetingAlarm](#Tank+targetingAlarm) ⇒
    * [.debugData](#Tank+debugData) ⇒

<a name="new_Tank_new"></a>

### new Tank(aiDefinition, id, team)
Constructor should not be called directly but through
`Simulation.addTank()` method


| Param | Type | Description |
| --- | --- | --- |
| aiDefinition | [<code>AiDefinition</code>](#AiDefinition) | definition of tank's AI Script |
| id | <code>Number</code> | unique id of the tank |
| team | <code>Team</code> | reference to team object where the tank belongs |

<a name="Tank+id"></a>

### tank.id ⇒
**Kind**: instance property of [<code>Tank</code>](#Tank)  
**Returns**: unique id of the tank  
<a name="Tank+skin"></a>

### tank.skin ⇒
**Kind**: instance property of [<code>Tank</code>](#Tank)  
**Returns**: skin name applied to the tank  
<a name="Tank+state"></a>

### tank.state ⇒
**Kind**: instance property of [<code>Tank</code>](#Tank)  
**Returns**: an object that represents current state of the tank  
<a name="Tank+energy"></a>

### tank.energy ⇒
**Kind**: instance property of [<code>Tank</code>](#Tank)  
**Returns**: amount of energy that the tank has  
<a name="Tank+score"></a>

### tank.score ⇒
**Kind**: instance property of [<code>Tank</code>](#Tank)  
**Returns**: current score of the tank  
<a name="Tank+maxEnergy"></a>

### tank.maxEnergy ⇒
**Kind**: instance property of [<code>Tank</code>](#Tank)  
**Returns**: initial amount of the energy  
<a name="Tank+radarRange"></a>

### tank.radarRange ⇒
**Kind**: instance property of [<code>Tank</code>](#Tank)  
**Returns**: range of tank's radar  
<a name="Tank+radarFocal"></a>

### tank.radarFocal ⇒
**Kind**: instance property of [<code>Tank</code>](#Tank)  
**Returns**: angle that radar field covers  
<a name="Tank+name"></a>

### tank.name ⇒
**Kind**: instance property of [<code>Tank</code>](#Tank)  
**Returns**: name of the tank  
<a name="Tank+fullName"></a>

### tank.fullName ⇒
**Kind**: instance property of [<code>Tank</code>](#Tank)  
**Returns**: full name contains name of the tank and its unique ID  
<a name="Tank+team"></a>

### tank.team ⇒
**Kind**: instance property of [<code>Tank</code>](#Tank)  
**Returns**: name of the team  
<a name="Tank+x"></a>

### tank.x ⇒
**Kind**: instance property of [<code>Tank</code>](#Tank)  
**Returns**: x position of the tank  
<a name="Tank+y"></a>

### tank.y ⇒
**Kind**: instance property of [<code>Tank</code>](#Tank)  
**Returns**: y position of the tank  
<a name="Tank+speed"></a>

### tank.speed ⇒
**Kind**: instance property of [<code>Tank</code>](#Tank)  
**Returns**: linear speed of the tank  
<a name="Tank+angle"></a>

### tank.angle ⇒
**Kind**: instance property of [<code>Tank</code>](#Tank)  
**Returns**: rotation of tank's body  
<a name="Tank+throttle"></a>

### tank.throttle ⇒
**Kind**: instance property of [<code>Tank</code>](#Tank)  
**Returns**: current throttle of the tank  
<a name="Tank+hasBoost"></a>

### tank.hasBoost ⇒
**Kind**: instance property of [<code>Tank</code>](#Tank)  
**Returns**: true if tank has boost turned on. Otherwise false  
<a name="Tank+boost"></a>

### tank.boost ⇒
**Kind**: instance property of [<code>Tank</code>](#Tank)  
**Returns**: amount of boost that has left  
<a name="Tank+maxBoost"></a>

### tank.maxBoost ⇒
**Kind**: instance property of [<code>Tank</code>](#Tank)  
**Returns**: initial amount of boost  
<a name="Tank+gunAngle"></a>

### tank.gunAngle ⇒
**Kind**: instance property of [<code>Tank</code>](#Tank)  
**Returns**: rotation of tank's gun (relative to tank's body)  
<a name="Tank+radarAngle"></a>

### tank.radarAngle ⇒
**Kind**: instance property of [<code>Tank</code>](#Tank)  
**Returns**: rotation of tank's radar (relative to tank's body)  
<a name="Tank+targetingAlarm"></a>

### tank.targetingAlarm ⇒
**Kind**: instance property of [<code>Tank</code>](#Tank)  
**Returns**: true if tank is on the radar of an enemy. Otherwise false  
<a name="Tank+debugData"></a>

### tank.debugData ⇒
**Kind**: instance property of [<code>Tank</code>](#Tank)  
**Returns**: debug data set by AI script via `control.DEBUG`  
