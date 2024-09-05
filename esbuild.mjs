import * as esbuild from 'esbuild';

const build = (entrypoint, target) => esbuild.buildSync({
    bundle: true,
    minify: true,
    entryPoints: [entrypoint],
    outfile: target,
    sourcemap: false,
});

build('src/backend/serviceWorker.ts', 'public/sw.js');
build('src/client/index.ts','public/client.js');
