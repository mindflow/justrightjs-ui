import multiEntry from 'rollup-plugin-multi-entry';
import postprocess from 'rollup-plugin-postprocess';
import copy from 'rollup-plugin-copy';

export default [{
    input: "src/**/*.js",
    external: [ 'coreutil_v1','xmlparser_v1','mindi_v1','justright_core_v1' ],
    output: {
        name: 'justright_ui_v1',
        file: "dist/jsm/justright_ui_v1.js",
        sourcemap: "inline",
        format: "es"
    },
    plugins: [
        multiEntry(),
        postprocess([
            [/(?<=import\s*(.*)\s*from\s*)['"]((?!.*[.]js).*)['"];/, '\'./$2.js\'']
        ])
    ]
},{
    input: "src/**/*.js",
    external: [ 'coreutil_v1','xmlparser_v1','mindi_v1','justright_core_v1' ],
    output: {
        name: 'justright_ui_v1',
        file: "dist/cjs/justright_ui_v1.js",
        sourcemap: "inline",
        format: "cjs"
    },
    plugins: [
        multiEntry(),
        copy({
            targets: [
              { src: 'src/**/*.css', dest: 'dist/assets/justrightjs-ui' },
              { src: 'src/**/*.html', dest: 'dist/assets/justrightjs-ui' }
            ],
            verbose: true
        })
    ]
}];