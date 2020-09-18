# Hydra Component library

`hydra-components` is a React component library, made with the help of [create-react-library](https://www.npmjs.com/package/create-react-library).

There are three very important modules in this project

1. `~/src` - the 'source of truth' for the hydra component library
2. `~/dist` - the built version of `~/src` that can be referenced in other projects (such as the nested `~/app` project, or the root `hydra` project)
3. `~/app` - a sample React app that provides a sandbox environment to develop new components in

This project is read-only, and is designed to be maintained as a sub-module in `hydra`

## What is Hydra?

[Hydra](https://github.com/evenstephenr/hydra) is a sandbox project where I get to experiment with Lerna, React, Storybook, and Typescript to learn the tradeoffs and benefits of the [majestic monolith](https://m.signalvnoise.com/the-majestic-monolith/).

## Getting started

I highly recommend following the getting started section of [Hydra](https://github.com/evenstephenr/hydra) to set up this project. However, if you're not interested in Lerna, you can fork this repo and set it up as a standalone project.

Setting up hydra-components as a standalone project

1. Fork the repo

2. in the root, run `npm i` to install the project dependencies

3. in the root, run `npm run build` to initialize the `~/dist` directory

4. in `~/app`, run `npm i` to link the nested react app to the root project dependencies, and install app-specific deps

5. in `~/app`, run `npm run start` to verify the nested app builds correctly

> NOTE: Every time you make updates to `~/src`, you will need to re-build `~/dist` using `npm run build` in `~/src` AND re-install the `~/dist` dependency using `npm i` inside `~/src/app` to pull the changes into `~/app`

## References

* [create-react-library](https://www.npmjs.com/package/create-react-library)
