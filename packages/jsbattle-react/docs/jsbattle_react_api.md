# JsBattle React Component API
<a name="JsBattleBattlefield"></a>

## JsBattleBattlefield
For easier integration with [ReactJs](https://reactjs.org/) applications,
`jsbattle-react` package contains React component of JsBattle

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| aiDefList | <code>Array</code> | requred. array of AiDefinition objects that describes tanks that fight in the battlefield |
| width | <code>Number</code> | width of battlefield canvas in pixels |
| height | <code>Number</code> | height of battlefield canvas in pixels |
| battlefieldWidth | <code>Number</code> | width of battlefield area |
| battlefieldHeight | <code>Number</code> | height of battlefield area |
| renderer | <code>String</code> | name of renderer to be used |
| rngSeed | <code>Number</code> | rngSeed to be used for the simulation. Random seed will be used if not provided |
| timeLimit | <code>Number</code> | duration of the battle. A battle without limit is started when not defined or set to zero |
| speed | <code>Number</code> | speed multiplier of the battle. For example 2 means that the battle is playes at doubled speed |
| quality | <code>Number</code> | Number between 0 and 1 that define rendering quality (if renderer supports it). String 'auto' can be also provided. In such case, quality will be automatialy adjusted to keep proper performance |
| teamMode | <code>Boolean</code> | whether the battle is played in team mode or not |
| autoResize | <code>Boolean</code> | if true, size of battlefield canvas will be automaticaly adjusted. Otherwise, fixed values from `width` and `height` properties will be used |
| modifier | <code>function</code> | function applied before the battle that allow changes in the battlefield setup |
| onError | <code>function</code> | callback for handling errors |
| onInit | <code>function</code> | callback executed when battlefield is initialized (at the beginning or just after restart) |
| onReady | <code>function</code> | callback executed when battle is ready to be started (e.g. after loading all assets) |
| onStart | <code>function</code> | callback executed when battle is started |
| onRender | <code>function</code> | callback executed on each rendering loop of the battle simulation |
| onFinish | <code>function</code> | callback executed when battle is finished |


* [JsBattleBattlefield](#JsBattleBattlefield)
    * [.tankList](#JsBattleBattlefield+tankList) ⇒ <code>Array</code>
    * [.teamList](#JsBattleBattlefield+teamList) ⇒ <code>Array</code>
    * [.actualRendererQuality](#JsBattleBattlefield+actualRendererQuality) ⇒ <code>Number</code>
    * [.stop()](#JsBattleBattlefield+stop) ⇒ <code>undefined</code>
    * [.restart()](#JsBattleBattlefield+restart) ⇒ <code>undefined</code>
    * [.addTank(aiDefinition)](#JsBattleBattlefield+addTank) ⇒ <code>undefined</code>
    * [.getSimulation()](#JsBattleBattlefield+getSimulation) ⇒ <code>Simulation</code>

<a name="JsBattleBattlefield+tankList"></a>

### jsBattleBattlefield.tankList ⇒ <code>Array</code>
**Kind**: instance property of [<code>JsBattleBattlefield</code>](#JsBattleBattlefield)  
**Returns**: <code>Array</code> - all tanks that were added to the battle  
<a name="JsBattleBattlefield+teamList"></a>

### jsBattleBattlefield.teamList ⇒ <code>Array</code>
**Kind**: instance property of [<code>JsBattleBattlefield</code>](#JsBattleBattlefield)  
**Returns**: <code>Array</code> - list of teams  
<a name="JsBattleBattlefield+actualRendererQuality"></a>

### jsBattleBattlefield.actualRendererQuality ⇒ <code>Number</code>
**Kind**: instance property of [<code>JsBattleBattlefield</code>](#JsBattleBattlefield)  
**Returns**: <code>Number</code> - actual quality of renderer. If the quality was set as a number, that number will be returned. If the quality is set as 'auto', current numeric value of quality will be returned  
<a name="JsBattleBattlefield+stop"></a>

### jsBattleBattlefield.stop() ⇒ <code>undefined</code>
Stops battle simulation. It also stops rendering loop.
After stop, you cannot resume the battle. Use restart instead.

**Kind**: instance method of [<code>JsBattleBattlefield</code>](#JsBattleBattlefield)  
<a name="JsBattleBattlefield+restart"></a>

### jsBattleBattlefield.restart() ⇒ <code>undefined</code>
Restarts battle simulation.

**Kind**: instance method of [<code>JsBattleBattlefield</code>](#JsBattleBattlefield)  
<a name="JsBattleBattlefield+addTank"></a>

### jsBattleBattlefield.addTank(aiDefinition) ⇒ <code>undefined</code>
Create a tank according to provided `AiDefinition` and adds it to the battle

**Kind**: instance method of [<code>JsBattleBattlefield</code>](#JsBattleBattlefield)  

| Param | Type | Description |
| --- | --- | --- |
| aiDefinition | <code>AiDefinition</code> | defintion of tank AI script |

<a name="JsBattleBattlefield+getSimulation"></a>

### jsBattleBattlefield.getSimulation() ⇒ <code>Simulation</code>
**Kind**: instance method of [<code>JsBattleBattlefield</code>](#JsBattleBattlefield)  
**Returns**: <code>Simulation</code> - JsBattle simulation object  
