var pngQuant = require("imagemin-pngquant");

module.exports = {
    "scales": {
        "web": {"scale": 1, "resolution": 1}
    },
    "variations": ["en"],
    "loading_stages": [ "init" ],
    group_default: {
        max_width: 2048,          // default: 2048
        max_height: 1024,         // default: 1024
        oversized_warning: true, // default: false
        padding: 1               // default: 1
    },

    "groups": [
        {
            "id": "default",
            "loading_stage": "init",
            "compressor": pngQuant(),
            "sprites": ["*.png"]
        }
    ]
};
