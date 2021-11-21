// svelte.config.js
import adapter from '@sveltejs/adapter-static';

import preprocess from "svelte-preprocess";
/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
			// default options are shown
			pages: 'build',
			assets: 'build',
			fallback: null
		}),
    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",
  },

  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],
};

export default config;