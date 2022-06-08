import * as React from 'react'
import { PageBlock } from 'notion-types'

import { CollectionViewProps } from '../types'
import { cs } from '../utils'
import { getCollectionGroups } from './collection-utils'
import { useNotionContext } from '../context'
import { CollectionCard } from './collection-card'
import { CollectionGroup } from './collection-group'

const defaultBlockIds = []

export const CollectionViewGallery: React.FC<CollectionViewProps> = ({
  collection,
  collectionView,
  collectionData
}) => {
  const isGroupedCollection = collectionView?.format?.collection_group_by

  if (isGroupedCollection) {
    const collectionGroups = getCollectionGroups(
      collection,
      collectionView,
      collectionData
    )

    return collectionGroups.map((group, index) => (
      <CollectionGroup
        key={index}
        index={index}
        {...group}
        collectionViewComponent={Gallery}
      />
    ))
  }

  const blockIds =
    (collectionData['collection_group_results']?.blockIds ??
      collectionData.blockIds) ||
    defaultBlockIds

  return (
    <Gallery
      collectionView={collectionView}
      collection={collection}
      blockIds={blockIds}
    />
  )
}

function Gallery({ blockIds, collectionView, collection }) {
  const { recordMap } = useNotionContext()
  const {
    gallery_cover = { type: 'none' },
    gallery_cover_size = 'medium',
    gallery_cover_aspect = 'cover'
  } = collectionView.format || {}

  return (
    <div className='notion-gallery'>
      <div className='notion-gallery-view'>
        <div
          className={cs(
            'notion-gallery-grid',
            `notion-gallery-grid-size-${gallery_cover_size}`
          )}
        >
          {(blockIds && blockIds.length )? blockIds.map((blockId) => {
            const block = recordMap.block[blockId]?.value as PageBlock
            if (!block) return null

            return (
              <CollectionCard
                collection={collection}
                block={block}
                cover={gallery_cover}
                coverSize={gallery_cover_size}
                coverAspect={gallery_cover_aspect}
                properties={collectionView.format?.gallery_properties}
                key={blockId}
              />
            )
          }):
          <div style={{width:100, position: "absolute", right: "calc(50% - 50px)", top: "calc(50% - 10px)", textAlign:"center", fontSize: "20px", fontWeight: "bold", opacity: 0.7 }}>No Result</div>
          }
        </div>
      </div>
    </div>
  )
}
