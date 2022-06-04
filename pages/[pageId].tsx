import * as React from 'react'
import { isDev, domain } from 'lib/config'
import { getSiteMap } from 'lib/get-site-map'
import { resolveNotionPage } from 'lib/resolve-notion-page'
import { NotionPage } from 'components'

export const getStaticProps = async (context) => {
  const rawPageId = context.params.pageId as string

  try {
    const props = await resolveNotionPage(domain, rawPageId)
    //to do move to server
    if (props.site && props.site.rootNotionPageId === props.pageId) {
      Object.keys(props.recordMap.collection_query).forEach((r) => {
        Object.keys(props.recordMap.collection_query[r]).forEach((item) => {
          props.recordMap.collection_query[r][item].collection_group_results.blockIds = props.recordMap.collection_query[r][item].collection_group_results.blockIds.slice(0, 3)
        });
      });
    }
    return { props, revalidate: 10 }
  } catch (err) {
    console.error('page error', domain, rawPageId, err)

    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err
  }
}

export async function getStaticPaths() {
  // if (isDev) {
    return {
      paths: [],
      fallback: true
    }
  // }

  const siteMap = await getSiteMap()

  const staticPaths = {
    paths: Object.keys(siteMap.canonicalPageMap).map((pageId) => ({
      params: {
        pageId
      }
    })),
    // paths: [],
    fallback: true
  }
  return staticPaths
}

export default function NotionDomainDynamicPage(props) {
  return <NotionPage {...props} />
}