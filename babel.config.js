module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                    browsers: [
                        "> 0.5%",
                        "last 2 versions",
                        "IE 11"
                    ]
                },
                useBuiltIns: 'usage',
                corejs : {
                    version: "3",
                    proposals : true
                }
            },
        ],
    ],
};