# Hydra Component library

`hydra-components` is a React component library, inspired by the architecture behind [create-react-library](https://www.npmjs.com/package/create-react-library).

There are three very important modules in this project

1. `~/src` - the 'source of truth' for the hydra component library
2. `~/dist` - the built version of `~/src` that can be referenced in other projects (such as the nested `~/app` project, or the root `hydra` project)
3. `~/app` - a sample React app that provides a sandbox environment to develop new components in

> NOTE: This project is read-only, and is designed to be maintained as a sub-module in `hydra`

## What is Hydra?

[Hydra](https://github.com/evenstephenr/hydra) is a sandbox project where I get to experiment with Lerna, React, Storybook, and Typescript to learn the tradeoffs and benefits of the [majestic monolith](https://m.signalvnoise.com/the-majestic-monolith/).

## Getting started

Setting up hydra-components as a standalone project

1. Fork the repo

2. in the root, run `npm i` to install the component library dependencies

3. in the root, run `npm run build` to initialize the `~/dist` directory

4. in `~/app`, run `npm i` to link the nested react app to the component library at the root, and install app-specific deps

5. in `~/app`, run `npm run start` to verify the nested app builds correctly

## Developer tooling

You can use the script `npm run start` in both the root of the project and `~/app` simultaneously to start a dev environment

- When you use `npm run start` in the project root, `microbundle-crl` will re-build the component library as you make updates. If there are type or runtime errors, you will see them reported in the console.
- When you use `npm run start` in the `~/app` directory, `react-scripts` will run the nested sample app as a normal React application

## Resources

- [create-react-library](https://www.npmjs.com/package/create-react-library)
- [microbundle-crl](https://www.npmjs.com/package/microbundle-crl)
