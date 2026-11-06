# OSS Accelerator

A browser-based toolkit for launching and maintaining an open source project. It includes a document generator, license comparison, launch planner, growth and maintenance guides, and a resource hub.

**[Try the live demo](https://oss-accelerator.jimiljojo.workers.dev/)**

## Run locally

Install Node.js 20.19+ or 22.12+, then run:

```sh
npm ci --legacy-peer-deps
npm run dev
```

Open the local URL printed by Vite. Run `npm run build` to produce static files in `dist/`.

The demo does not require an API key, a database, or a Lovable subscription. The original AI name checker, repository evaluation, and license chat are not included in this standalone version. License summaries and generated documents are starting points; review them for your project.

## License

MIT. See [LICENSE](LICENSE).
