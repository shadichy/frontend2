# Team Fuho website (re-built with astro)

```sh
npm run init
```

## 🚀 Project Structure

Inside this project, you'll see the following folders and files:

```text
/
├── scripts/
│   └── <init and other generator scripts>
├── public/
│   └── <resouces>
├── src/
|   ├── defaults.js (default configurations)
│   ├── layouts/
│   |   ├── main.astro (header and footer)
│   |   ├── paths/
│   |   |   └── <uhh>
│   |   ├── pages/
│   |   |   └── <site sources>
│   |   ├── components/
│   |   |   └── <miscs go here>
│   |   ├── css/
│   |   |   └── <stylesheets>
│   |   ├── js/
│   |   |   └── <scripts>
│   |   └── lang/
│   |       └── <localizaton>
│   └── pages/
│       ├── <lang>/
│       |   ├── article/
│       |   |   └── <posts go here>
│       |   ├── image/
│       |   |   └── <generated image links go here>
│       |   └── shop/
│       |       └── product/
│       |           └── <shop products go here>
│       └── <pages are generated here>
└── package.json
```

Astro looks for `.astro` or `.md`/`.mdx` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/layouts/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact/Json components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:3000`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `npm run astro --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or ask nerds.
