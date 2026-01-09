import multi from '@rollup/plugin-multi-entry';
import webes from 'rollup-plugin-webes';
import { terser } from "rollup-plugin-terser";
import copy from 'rollup-plugin-copy';

export default [{
    input: "src/**/*.js",
    external: [ 'coreutil_v1','xmlparser_v1','mindi_v1', 'containerbridge_v1','justright_core_v1' ],
    output: {
        name: 'justright_ui_v1',
        file: "dist/jsm/justright_ui_v1.js",
        sourcemap: "inline",
        format: "es"
    },
    plugins: [
        multi(),
        webes({
            'coreutil_v1': './coreutil_v1.js',
            'xmlparser_v1': './xmlparser_v1.js',
            'mindi_v1': './mindi_v1.js',
            'containerbridge_v1': './containerbridge_v1.js',
            'justright_core_v1': './justright_core_v1.js',
            replaceStage: 'renderChunk'
        })
    ]
},{
    input: "src/**/*.js",
    external: [ 'coreutil_v1','xmlparser_v1','mindi_v1','containerbridge_v1','justright_core_v1' ],
    output: {
        name: 'justright_ui_v1',
        file: "dist/jsm/justright_ui_v1.min.js",
        format: "es"
    },
    plugins: [
        multi(),
        webes({
            'coreutil_v1': './coreutil_v1.js',
            'xmlparser_v1': './xmlparser_v1.js',
            'mindi_v1': './mindi_v1.js',
            'containerbridge_v1': './containerbridge_v1.js',
            'justright_core_v1': './justright_core_v1.js',
            replaceStage: 'renderChunk'
        }),
        terser()
    ]
},{
    input: "src/**/*.js",
    external: [ 'coreutil_v1','xmlparser_v1','mindi_v1','containerbridge_v1','justright_core_v1' ],
    output: {
        name: 'justright_ui_v1',
        file: "dist/cjs/justright_ui_v1.js",
        sourcemap: "inline",
        format: "cjs"
    },
    plugins: [
        multi(),
        copy({
            targets: [
              { src: 'src/**/*.css', dest: 'dist/assets/css' },
              { src: 'src/**/*.html', dest: 'dist/assets/html' }
            ],
            verbose: true
        })
    ]
}];