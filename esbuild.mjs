import * as esbuild from 'esbuild';

esbuild.buildSync({
    bundle: true,
    minify: true,
    entryPoints: ['src/index.ts'],
    outfile: 'public/popup.js',
    sourcemap: true,
});
