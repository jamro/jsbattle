var pngQuant = require("imagemin-pngquant");

module.exports = {
  "scales": {
    "web": {"scale": 0.5, "resolution": 1},
    "retina": {"scale": 1, "resolution": 2}
  },
  "variations": ["bw", "brody"],
  "loading_stages": [ "game" ],
  group_default: {
    max_width: 2048,          // default: 2048
    max_height: 1024,         // default: 1024
    oversized_warning: true, // default: false
    padding: 1               // default: 1
  },

  "groups": [
    {
      "id": "default",
      "loading_stage": "game",
      "variation": "bw",
      "compressor": pngQuant(),
      "sprites": ["./bw/*.png"]
    },
    {
      "id": "default",
      "loading_stage": "game",
      "variation": "brody",
      "compressor": pngQuant(),
      "sprites": ["./brody/*.png"]
    }
  ]
};
