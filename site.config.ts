import { siteConfig } from './lib/site-config'

export default siteConfig({
  // the site's root Notion page (required)
  // rootNotionPageId: '7875426197cf461698809def95960ebf',
  rootNotionPageId: 'f9ad2e7368314b14965645d849b51998',

  // if you want to restrict pages to a single notion workspace (optional)
  // (this should be a Notion ID; see the docs for how to extract this)
  rootNotionSpaceId: null,

  // basic site info (required)
  name: 'DuniaKripto',
  domain: 'dunuakripto.com',
  author: 'dunuakripto',

  // open graph metadata (optional)
  description: 'Indonesian Crypto News Portal',

  // social usernames (optional)
  instagram: 'https://www.instagram.com/duniakripto_ind/',
  telegramChannel: 'https://t.me/duniakriptoind',
  telegramChat: 'https://t.me/duniakriptochat',

  // default notion icon and cover images for site-wide consistency (optional)
  // page-specific values will override these site-wide defaults
  defaultPageIcon: null,
  defaultPageCover: null,
  defaultPageCoverPosition: 0.5,

  // whether or not to enable support for LQIP preview images (optional)
  isPreviewImageSupportEnabled: true,

  // whether or not redis is enabled for caching generated preview images (optional)
  // NOTE: if you enable redis, you need to set the `REDIS_HOST` and `REDIS_PASSWORD`
  // environment variables. see the readme for more info
  isRedisEnabled: false,

  // map of notion page IDs to URL paths (optional)
  // any pages defined here will override their default URL paths
  // example:
  //
  pageUrlOverrides: {
    '/news': 'b0883aee906e4b7ea23d94bd6bf77dd8',
    '/education': '83143e47f6c5444190d68cfafe9de2af',
    '/articles': 'd6602ada9a10493298b65ddc4079a26d',
    '/events': 'cf91485acaac4c51a06597eb1084461f',
    '/jobs': 'f225ef03dfcb4b9897494ed3ef81100d',
    '/articles': '37fffde2a6f44a3aa5cb12ec95ae44dd',
    '/duniakripto': 'c9ef46dbb6fb4e9b86969d1164bce8e9',
    '/bookmarks': '9bff14071eeb4da3a51fa9a07b47eb55',
  },

  // whether to use the default notion navigation style or a custom one with links to
  // important pages
 // navigationStyle: 'default'
  navigationStyle: 'custom',
  navigationLinks: [
    {
      title: 'Home',
      pageId: 'f9ad2e7368314b14965645d849b51998'
    },
    {
      title: 'News',
      pageId: 'b0883aee906e4b7ea23d94bd6bf77dd8'
    },
    {
      title: 'Education',
      pageId: '83143e47f6c5444190d68cfafe9de2af'
    },
    {
      title: 'Articles',
      pageId: 'd6602ada9a10493298b65ddc4079a26d'
    },
    {
      title: 'Events',
      pageId: 'cf91485acaac4c51a06597eb1084461f'
    },
    {
      title: 'Jobs',
      pageId: 'f225ef03dfcb4b9897494ed3ef81100d'
    },
    {
      title: 'Tools',
      pageId: '37fffde2a6f44a3aa5cb12ec95ae44dd'
    },
    {
      title: 'Duniakripto',
      pageId: 'c9ef46dbb6fb4e9b86969d1164bce8e9'
    },
  ]
})
