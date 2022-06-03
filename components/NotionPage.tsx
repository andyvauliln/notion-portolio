import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import cs from 'classnames'
import { useRouter } from 'next/router'
import { useSearchParam } from 'react-use'
import BodyClassName from 'react-body-classname'
import { PageBlock } from 'notion-types'
import TweetEmbed from 'react-tweet-embed'

// core notion renderer
import { NotionRenderer } from 'react-notion-x'

// utils
import { getBlockTitle, getPageProperty, formatDate } from 'notion-utils'
import { mapPageUrl, getCanonicalPageUrl } from 'lib/map-page-url'
import { mapImageUrl } from 'lib/map-image-url'
import { searchNotion } from 'lib/search-notion'
import { useDarkMode } from 'lib/use-dark-mode'
import * as types from 'lib/types'
import * as config from 'lib/config'

// components
import { Loading } from './Loading'
import { Page404 } from './Page404'
import { PageHead } from './PageHead'
//import { PageAside } from './PageAside'
import { Footer } from './Footer'
import { PageFooter } from './PageFooter'
import { NotionPageHeader } from './NotionPageHeader'
import { PageHeader } from './PageHeader'
//import { GitHubShareButton } from './GitHubShareButton'

import styles from './styles.module.css'
import useBookmarks from 'lib/useBookmarks'

// -----------------------------------------------------------------------------
// dynamic imports for optional components
// -----------------------------------------------------------------------------

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then(async (m) => {
    // add / remove any prism syntaxes here
    await Promise.all([
      import('prismjs/components/prism-markup-templating.js'),
      import('prismjs/components/prism-markup.js'),
      import('prismjs/components/prism-bash.js'),
      import('prismjs/components/prism-c.js'),
      import('prismjs/components/prism-cpp.js'),
      import('prismjs/components/prism-csharp.js'),
      import('prismjs/components/prism-docker.js'),
      import('prismjs/components/prism-java.js'),
      import('prismjs/components/prism-js-templates.js'),
      import('prismjs/components/prism-coffeescript.js'),
      import('prismjs/components/prism-diff.js'),
      import('prismjs/components/prism-git.js'),
      import('prismjs/components/prism-go.js'),
      import('prismjs/components/prism-graphql.js'),
      import('prismjs/components/prism-handlebars.js'),
      import('prismjs/components/prism-less.js'),
      import('prismjs/components/prism-makefile.js'),
      import('prismjs/components/prism-markdown.js'),
      import('prismjs/components/prism-objectivec.js'),
      import('prismjs/components/prism-ocaml.js'),
      import('prismjs/components/prism-python.js'),
      import('prismjs/components/prism-reason.js'),
      import('prismjs/components/prism-rust.js'),
      import('prismjs/components/prism-sass.js'),
      import('prismjs/components/prism-scss.js'),
      import('prismjs/components/prism-solidity.js'),
      import('prismjs/components/prism-sql.js'),
      import('prismjs/components/prism-stylus.js'),
      import('prismjs/components/prism-swift.js'),
      import('prismjs/components/prism-wasm.js'),
      import('prismjs/components/prism-yaml.js')
    ])
    return m.Code
  })
)

const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
)
const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
)
const Pdf = dynamic(
  () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
  {
    ssr: false
  }
)
const Modal = dynamic(
  () =>
    import('react-notion-x/build/third-party/modal').then((m) => {
      m.Modal.setAppElement('.notion-viewport')
      return m.Modal
    }),
  {
    ssr: false
  }
)
const Tweet = ({ id }: { id: string }) => {
  return <TweetEmbed tweetId={id} />
}

const propertyLastEditedTimeValue = (
  { block, pageHeader },
  defaultFn: () => React.ReactNode
) => {
  if (pageHeader && block?.last_edited_time) {
    return `Last updated ${formatDate(block?.last_edited_time, {
      month: 'long'
    })}`
  }

  return defaultFn()
}

const propertyDateValue = (
  { data, schema, pageHeader },
  defaultFn: () => React.ReactNode
) => {
  if (pageHeader && schema?.name?.toLowerCase() === 'published') {
    const publishDate = data?.[0]?.[1]?.[0]?.[1]?.start_date

    if (publishDate) {
      return `Published ${formatDate(publishDate, {
        month: 'long'
      })}`
    }
  }

  return defaultFn()
}

const propertyTextValue = (
  { schema, pageHeader },
  defaultFn: () => React.ReactNode
) => {
  if (pageHeader && schema?.name?.toLowerCase() === 'author') {
    return <b>{defaultFn()}</b>
  }

  return defaultFn()
}

export const NotionPage: React.FC<types.PageProps> = ({
  site,
  recordMap,
  error,
  pageId,
}) => {

  const router = useRouter()
  const bookmarks = useBookmarks()
  const lite = useSearchParam('lite')

  //bookmarks page
  if (pageId && pageId.replaceAll('-', '') === "9bff14071eeb4da3a51fa9a07b47eb55") {
    bookmarks.data.forEach(bookmark => {
      recordMap.block[bookmark.id] = { role: "reader", value: bookmark }
    })

    Object.values(recordMap.collection_query).forEach((col) => {
      Object.keys(col).forEach((key) => {
        const val = col[key];

        if (key === "edf96bcc-a919-40b5-bcd3-4b26414a2039") { // favorite
          val.collection_group_results.blockIds = bookmarks.data.filter(r => r.bookmarkType === 'favorite').map(r => r.id);
        }
        if (key === "8d3fcfa7-18ad-45fb-8226-441f7216d268") { //bookmarks
          val.collection_group_results.blockIds = bookmarks.data.filter(r => r.bookmarkType === 'bookmark').map(r => r.id);
        }
        if (key === "e9495047-d8cc-4689-90b5-4c4f8b31fd0f") { // by category
          Object.keys(val).filter(key => key.indexOf('result') > -1).forEach(prop => {
            val[prop].blockIds = bookmarks.data.filter(bf => bf.Category && bf.Category.toLowerCase().indexOf(prop.split(":")[2].toLowerCase()) > -1).map(br => br.id)
          })
        }
        if (key === "4f2f23ca-e1b9-4a4d-b965-cabec17daca2") { // by domain

          Object.keys(val).filter(key => key.indexOf('result') > -1).forEach(prop => {
            val[prop].blockIds = bookmarks.data
              .filter(bf => bf.Domain && bf.Domain.toLowerCase().indexOf(prop.split(":")[2].toLowerCase()) > -1)
              .map(br => br.id)
          })
        }
      })
    })
  }

  const components = React.useMemo(
    () => ({
      nextImage: Image,
      nextLink: Link,
      Code,
      Collection,
      Equation,
      Pdf,
      Modal,
      Tweet,
      Header: NotionPageHeader,
      propertyLastEditedTimeValue,
      propertyTextValue,
      propertyDateValue
    }),
    []
  )

  // tooltips
  React.useEffect(() => {
    const onPageLoad = () => {
      Array.from(document.querySelectorAll<HTMLElement>('[data-tip]')).forEach((el) => {
        if (el.querySelectorAll('.tooltip').length === 0) {
          const tip = document.createElement('div');
          tip.classList.add('tooltip');
          tip.innerHTML += `<div class='tooltip-header notion-text'>Preview</div>
                           <div class='tooltip-body'>
                            ${el.getAttribute('data-tip')}
                            <div class=''>...</div>
                           </div>
                           <div class='tooltip-footer notion-text'>Click to Read More</div>`
          el.appendChild(tip);
          el.onmousemove = e => {
            tip.style.left = e.clientX + 'px'
            tip.style.top = e.clientY + 'px';
  
            if (e.clientX > window.innerWidth / 2) {
              tip.style.transform = `translate(calc(-100% - 15px), ${e.clientY > window.innerHeight / 2 ? "calc(-100% - 15px)" : "15px"})`;
            }
            else {
              tip.style.transform = `translate(15px,${e.clientY > window.innerHeight / 2 ? "calc(-100% - 15px)" : "15px"})`;
            }
          };
        }

      });
    };
    setTimeout(onPageLoad, 1000)
    return () => {
      Array.from(document.querySelectorAll('.tooltip')).forEach(el => {
        el.remove()
      })
    }
  }, [router.isFallback, pageId])

  // lite mode is for oembed
  const isLiteMode = lite === 'true'

  const { isDarkMode } = useDarkMode()

  const siteMapPageUrl = React.useMemo(() => {
    const params: any = {}
    if (lite) params.lite = lite

    const searchParams = new URLSearchParams(params)
    return mapPageUrl(site, recordMap, searchParams)
  }, [site, recordMap, lite])

  const keys = Object.keys(recordMap?.block || {})
  const block = recordMap?.block?.[keys[0]]?.value

  // const isRootPage =
  //   parsePageId(block?.id) === parsePageId(site?.rootNotionPageId)
  // const isBlogPost =
  //   block?.type === 'page' && block?.parent_table === 'collection'

  // const showTableOfContents = !!isBlogPost
  // const minTableOfContentsItems = 3

  // const pageAside = React.useMemo(
  //   () => (
  //     <PageAside block={block} recordMap={recordMap} isBlogPost={isBlogPost} />
  //   ),
  //   [block, recordMap, isBlogPost]
  // )


  const footer = React.useMemo(() => <Footer />, [])
  const pageFooter = <PageFooter />
  const pageHeader = React.useMemo(() => <PageHeader />, [])

  if (router.isFallback) {
    return <Loading />
  }

  if (error || !site || !block) {
    return <Page404 site={site} pageId={pageId} error={error} />
  }

  const title = getBlockTitle(block, recordMap) || site.name

  console.log('notion page', {
    isDev: config.isDev,
    title,
    pageId,
    rootNotionPageId: site.rootNotionPageId,
    recordMap
  })

  if (!config.isServer) {
    // add important objects to the window global for easy debugging
    const g = window as any
    g.pageId = pageId
    g.recordMap = recordMap
    g.block = block
  }

  const canonicalPageUrl =
    !config.isDev && getCanonicalPageUrl(site, recordMap)(pageId)

  const socialImage = mapImageUrl(
    getPageProperty<string>('Social Image', block, recordMap) ||
    (block as PageBlock).format?.page_cover ||
    config.defaultPageCover,
    block
  )

  const socialDescription =
    getPageProperty<string>('Description', block, recordMap) ||
    config.description

  return (
    <>
      <PageHead
        pageId={pageId}
        site={site}
        title={title}
        description={socialDescription}
        image={socialImage}
        url={canonicalPageUrl}
      />

      {isLiteMode && <BodyClassName className='notion-lite' />}
      {isDarkMode && <BodyClassName className='dark-mode' />}

      <NotionRenderer
        bodyClassName={cs(
          styles.notion,
          pageId === site.rootNotionPageId && 'index-page'
        )}
        darkMode={isDarkMode}
        components={components}
        recordMap={recordMap}
        rootPageId={site.rootNotionPageId}
        rootDomain={site.domain}
        fullPage={!isLiteMode}
        previewImages={!!recordMap.preview_images}
        showCollectionViewDropdown={true}
        // showTableOfContents={showTableOfContents}
        // minTableOfContentsItems={minTableOfContentsItems}
        defaultPageIcon={config.defaultPageIcon}
        defaultPageCover={config.defaultPageCover}
        defaultPageCoverPosition={config.defaultPageCoverPosition}
        mapPageUrl={siteMapPageUrl}
        mapImageUrl={mapImageUrl}
        searchNotion={config.isSearchEnabled ? searchNotion : null}
        // pageAside={pageAside}
        footer={footer}
        pageFooter={pageFooter}
        pageHeader={pageHeader}
      />
    </>
  )
}
