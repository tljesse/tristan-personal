import { ScullyRoute } from '@scullyio/ng-lib';

export interface TristanBlogRoute extends ScullyRoute {
  description?: string;
  blurb?: string;
  datePublished?: string;
  image?: string;
  author?: string;
  authorImage?: string;
}