import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';

export default [
    // JavaScript bundle
    {
        input: './lib/index.js',
        output: {
            file: './dist/revoltfx.min.js',
            format: 'es',
            name: 'revolt',
            globals: {
                'pixi.js': 'PIXI'
            },
        },
        moduleContext: () => 'window',
        external: [
            'pixi.js'
        ],
        plugins: [
            nodeResolve(),
            commonjs(),
            terser({
                ecma: 2020,
                module: true
            }),
        ]
    },
    // TypeScript declarations bundle
    {
        input: './lib/index.d.ts',
        output: {
            file: './dist/revoltfx.d.ts',
            format: 'es'
        },
        external: [
            'pixi.js'
        ],
        plugins: [
            dts()
        ]
    }
];
