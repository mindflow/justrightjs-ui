import multi from '@rollup/plugin-multi-entry';
import replace from '@rollup/plugin-replace';
import { terser } from "rollup-plugin-terser";
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
        multi(),
        replace({
            'coreutil_v1': 'coreutilv1',
            'xmlparser_v1': 'xmlparserv1',
            'mindi_v1': 'mindiv1',
            'justright_core_v1': 'justrightcorev1',

            'coreutilv1': './coreutil_v1.js',
            'xmlparserv1': './xmlparser_v1.js',
            'mindiv1': './mindi_v1.js',
            'justrightcorev1' : './justright_core_v1.js'
        })
    ]
},{
    input: "src/**/*.js",
    external: [ 'coreutil_v1','xmlparser_v1','mindi_v1','justright_core_v1' ],
    output: {
        name: 'justright_ui_v1',
        file: "dist/jsm/justright_ui_v1.min.js",
        format: "es"
    },
    plugins: [
        multi(),
        replace({
            'coreutil_v1': 'coreutilv1',
            'xmlparser_v1': 'xmlparserv1',
            'mindi_v1': 'mindiv1',
            'justright_core_v1': 'justrightcorev1',

            'coreutilv1': './coreutil_v1.js',
            'xmlparserv1': './xmlparser_v1.js',
            'mindiv1': './mindi_v1.js',
            'containerbridgev1': './containerbridge_v1.js',
            'justrightcorev1' : './justright_core_v1.js'
        }),
        terser()
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
        multi(),
        copy({
            targets: [
              { src: 'src/**/*.css', dest: 'dist/assets/justrightjs-ui' },
              { src: 'src/**/*.html', dest: 'dist/assets/justrightjs-ui' }
            ],
            verbose: true
        })
    ]
}];