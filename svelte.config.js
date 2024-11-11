import adapter from "@sveltejs/adapter-static";
import Accos from "./src/lib/conf/accos.json" with { type: "json" };
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

let accoEntries = [];
if (!!Accos && Accos.length > 0) {
  accoEntries = Accos.map((a) => a.path);
} else {
  accoEntries = ["/accomodations/dummy_entry"];
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".html"],

  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    prerender: {
      entries: [
        "*",
        "/",
        "/accomodations",
        "/imprint",
        "/terms",
        "/robots.txt",
        "/sitemap.xml",
        ...accoEntries,
      ],
    },
    paths: {
      relative: true,
    },
  },
};

export default config;
