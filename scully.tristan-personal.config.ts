import { ScullyConfig } from '@scullyio/scully';
export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "tristan-personal",
  outDir: './dist/static',
  routes: {
    '/blog/:title': {
      type: 'contentFolder',
      title: {
        folder: "./mdblog"
      }
    },
  }
};