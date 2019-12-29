# Spritesheets

To simplify build process and reduce amount of project dependencies, all spritsheets are kept as static images in `/resources/spritesheets`. They can be always regenerated if needed from source images that are kept in `/resources/images`.


## Texture Packer
To pack textures and generate any tool that support PixiJS format can be used.
Some examples are:

- [SpriteSheetPacker](https://github.com/amakaseev/sprite-sheet-packer)
- [TexturePacker](https://www.codeandweb.com/texturepacker)

## Texture Packer Configuration

Texture packer must be configured properly to be compatible with JsBattle:

- **Sprites naming convention:**
  - no file extension
  - no directory name (it may be required to manually remove ./ prefix)
- **Texture padding:** 0px
- **Sprites padding:** 1px
- **Scaling variants:**
  - `retina@2x/`, max size: 2048px, scale: 1.0, power of two: yes
  - `web/`, max size: 2048px, scale: 0.5, power of two: yes
- **Spritesheet name**: jsbattle.png, jsbattle.json
- **Data format:** pixijs
- **Image output format:** png

## Spritesheet file examples

Here is an example of JSON file that describes the spritesheet

```json
{
	"frames": {
		"battlefield": {
			"frame": {
				"h": 600,
				"w": 900,
				"x": 0,
				"y": 0
			},
			"rotated": false,
			"spriteSourceSize": {
				"h": 600,
				"w": 900,
				"x": 0,
				"y": 0
			},
			"sourceSize": {
				"h": 600,
				"w": 900
			},
			"trimmed": false
		},
    ...
  },
  "meta": {
		"image": "jsbattle.png"
	}
}
```
