import * as React from 'react'
import { translate } from 'lib/translation'
import useBookmarks from 'lib/useBookmarks'
import { NotionRenderer } from 'react-notion-x'
import styles from './styles.module.css'
import cs from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import { Collection } from 'react-notion-x/third-party/collection'

const data = {
  isDev: true,
  title: 'Bookmarks',
  pageId: '9bff1407-1eeb-4da3-a51f-a9a07b47eb55',
  rootNotionPageId: 'f9ad2e7368314b14965645d849b51998',
  recordMap: {
    block: {
      '9bff1407-1eeb-4da3-a51f-a9a07b47eb55': {
        role: 'reader',
        value: {
          id: '9bff1407-1eeb-4da3-a51f-a9a07b47eb55',
          version: 53,
          type: 'page',
          properties: {
            title: [['Bookmarks']]
          },
          content: ['a61dc077-dd98-4dce-ba28-f04eea32551d'],
          format: {
            page_icon: '📑',
            page_cover:
              'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&q=80&cs=tinysrgb&fm=jpg&crop=entropy',
            page_cover_position: 0.5
          },
          permissions: [
            {
              role: 'reader',
              type: 'public_permission',
              added_timestamp: 1653680110485
            }
          ],
          created_time: 1653677280000,
          last_edited_time: 1655213820000,
          parent_id: '67ee97f7-74b1-4729-b17b-92e2b3a29080',
          parent_table: 'block',
          alive: true,
          created_by_table: 'notion_user',
          created_by_id: '69dabb69-76a1-44c0-8c8c-fca482d3e47a',
          last_edited_by_table: 'notion_user',
          last_edited_by_id: '69dabb69-76a1-44c0-8c8c-fca482d3e47a',
          space_id: 'e092d171-3f1d-496d-8f9b-4eb7ba294de9'
        }
      },
      'a61dc077-dd98-4dce-ba28-f04eea32551d': {
        role: 'reader',
        value: {
          id: 'a61dc077-dd98-4dce-ba28-f04eea32551d',
          version: 67,
          type: 'collection_view',
          view_ids: [
            'edf96bcc-a919-40b5-bcd3-4b26414a2039',
            '8d3fcfa7-18ad-45fb-8226-441f7216d268'
          ],
          format: {
            collection_pointer: {
              id: '4c49167e-8cf3-42e8-ba7f-18db48260c8f',
              table: 'collection',
              spaceId: 'e092d171-3f1d-496d-8f9b-4eb7ba294de9'
            }
          },
          created_time: 1653677382377,
          last_edited_time: 1654857000000,
          parent_id: '9bff1407-1eeb-4da3-a51f-a9a07b47eb55',
          parent_table: 'block',
          alive: true,
          created_by_table: 'notion_user',
          created_by_id: '69dabb69-76a1-44c0-8c8c-fca482d3e47a',
          last_edited_by_table: 'notion_user',
          last_edited_by_id: '69dabb69-76a1-44c0-8c8c-fca482d3e47a',
          space_id: 'e092d171-3f1d-496d-8f9b-4eb7ba294de9'
        }
      }
    },
    collection: {
      '4c49167e-8cf3-42e8-ba7f-18db48260c8f': {
        role: 'reader',
        value: {
          id: '4c49167e-8cf3-42e8-ba7f-18db48260c8f',
          version: 42,
          name: [['Bokmarks DB']],
          schema: {
            'B:qz': {
              name: 'Tags',
              type: 'multi_select',
              options: [
                {
                  id: '34f4458b-dec5-4dc9-ba90-13fd3321169f',
                  color: 'brown',
                  value: 'Some Text'
                },
                {
                  id: '148745cd-3a9d-4761-be3e-ddd38798eb35',
                  color: 'blue',
                  value: 'Some Label'
                }
              ]
            },
            HFHv: {
              name: 'Description',
              type: 'text'
            },
            'K[{[': {
              name: 'Domain',
              type: 'select',
              options: [
                {
                  id: 'e10d5a9a-8b07-4385-b285-9063751628c4',
                  color: 'pink',
                  value: 'Dao'
                },
                {
                  id: '419b3e68-c8b1-42ed-a480-5debe9aca429',
                  color: 'gray',
                  value: 'NFT'
                }
              ]
            },
            '_U}~': {
              name: 'Created Time',
              type: 'created_time'
            },
            'gd]b': {
              name: 'BookmarkType',
              type: 'select',
              options: [
                {
                  id: '53ef027a-98de-4226-8454-ec6171dc304d',
                  color: 'orange',
                  value: 'Favorite'
                },
                {
                  id: '9c6e6029-88e7-4fb8-bafc-7f405f285902',
                  color: 'gray',
                  value: 'ReadLater'
                }
              ]
            },
            lAhv: {
              name: 'Category',
              type: 'select',
              options: [
                {
                  id: '93d3b454-b063-4a24-817a-8ae21f082fee',
                  color: 'red',
                  value: 'News'
                }
              ]
            },
            title: {
              name: 'Name',
              type: 'title'
            }
          },
          format: {
            collection_page_properties: [
              {
                visible: true,
                property: '_U}~'
              },
              {
                visible: true,
                property: 'B:qz'
              },
              {
                visible: true,
                property: 'HFHv'
              },
              {
                visible: true,
                property: 'lAhv'
              },
              {
                visible: true,
                property: 'K[{['
              }
            ]
          },
          parent_id: 'a61dc077-dd98-4dce-ba28-f04eea32551d',
          parent_table: 'block',
          alive: true,
          migrated: true,
          space_id: 'e092d171-3f1d-496d-8f9b-4eb7ba294de9'
        }
      }
    },
    collection_view: {
      'edf96bcc-a919-40b5-bcd3-4b26414a2039': {
        role: 'reader',
        value: {
          id: 'edf96bcc-a919-40b5-bcd3-4b26414a2039',
          version: 18,
          type: 'gallery',
          name: 'Favorites',
          format: {
            gallery_cover: {
              type: 'page_cover'
            },
            property_filters: [
              {
                id: '91e1baad-2e69-4b79-a122-6f6de0d90bc1',
                filter: {
                  filter: {
                    value: {
                      type: 'exact',
                      value: 'Favorite'
                    },
                    operator: 'enum_is'
                  },
                  property: 'gd]b'
                }
              }
            ],
            collection_groups: [
              {
                value: {
                  type: 'select',
                  value: 'News'
                },
                property: 'lAhv'
              },
              {
                value: {
                  type: 'select'
                },
                property: 'lAhv'
              }
            ],
            collection_pointer: {
              id: '4c49167e-8cf3-42e8-ba7f-18db48260c8f',
              table: 'collection',
              spaceId: 'e092d171-3f1d-496d-8f9b-4eb7ba294de9'
            },
            gallery_properties: [
              {
                visible: false,
                property: 'gd]b'
              },
              {
                visible: false,
                property: '_U}~'
              },
              {
                visible: true,
                property: 'title'
              },
              {
                visible: false,
                property: 'HFHv'
              },
              {
                visible: false,
                property: 'K[{['
              },
              {
                visible: true,
                property: 'B:qz'
              },
              {
                visible: true,
                property: 'lAhv'
              }
            ],
            hide_linked_collection_name: true
          },
          parent_id: 'a61dc077-dd98-4dce-ba28-f04eea32551d',
          parent_table: 'block',
          alive: true,
          page_sort: [
            'a43d1a9b-867c-4a42-9eb4-3795837460e0',
            '92a49f66-e988-4738-acf1-cce637a21f97',
            '44386212-08bc-4a5f-b310-1d84edc85c88',
            'eab905af-f375-4032-9236-7c97a49715af',
            '4db94e7e-8c8f-4df5-96f6-a5da79c9f0d9'
          ],
          query2: {
            aggregations: [
              {
                aggregator: 'count'
              }
            ]
          },
          space_id: 'e092d171-3f1d-496d-8f9b-4eb7ba294de9'
        }
      },
      '8d3fcfa7-18ad-45fb-8226-441f7216d268': {
        role: 'reader',
        value: {
          id: '8d3fcfa7-18ad-45fb-8226-441f7216d268',
          version: 12,
          type: 'gallery',
          name: 'Bookmarks',
          format: {
            gallery_cover: {
              type: 'page_cover'
            },
            property_filters: [
              {
                id: '8691f635-fd36-42d2-a61a-6c1d4ca33df4',
                filter: {
                  filter: {
                    value: {
                      type: 'exact',
                      value: 'ReadLater'
                    },
                    operator: 'enum_is'
                  },
                  property: 'gd]b'
                }
              }
            ],
            gallery_properties: [
              {
                visible: true,
                property: 'title'
              },
              {
                visible: false,
                property: 'gd]b'
              },
              {
                visible: false,
                property: '_U}~'
              },
              {
                visible: false,
                property: 'HFHv'
              },
              {
                visible: false,
                property: 'K[{['
              },
              {
                visible: true,
                property: 'B:qz'
              },
              {
                visible: true,
                property: 'lAhv'
              }
            ],
            hide_linked_collection_name: true
          },
          parent_id: 'a61dc077-dd98-4dce-ba28-f04eea32551d',
          parent_table: 'block',
          alive: true,
          space_id: 'e092d171-3f1d-496d-8f9b-4eb7ba294de9'
        }
      }
    },
    collection_query: {
      '4c49167e-8cf3-42e8-ba7f-18db48260c8f': {
        'edf96bcc-a919-40b5-bcd3-4b26414a2039': {
          collection_group_results: {
            type: 'results',
            blockIds: ['eab905af-f375-4032-9236-7c97a49715af'],
            hasMore: false
          }
        },
        '8d3fcfa7-18ad-45fb-8226-441f7216d268': {
          collection_group_results: {
            type: 'results',
            blockIds: ['4db94e7e-8c8f-4df5-96f6-a5da79c9f0d9'],
            hasMore: false
          }
        }
      }
    },
    signed_urls: {
      '9bff1407-1eeb-4da3-a51f-a9a07b47eb55':
        'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&q=80&cs=tinysrgb&fm=jpg&crop=entropy'
    },
    preview_images: {
      'images.unsplash.com/photo-1507842217343-583bb7270b66': {
        originalWidth: 5957,
        originalHeight: 3493,
        dataURIBase64:
          'data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAAAwAgCdASoQAAkABUB8JbACdEf/gaXewMvsAAD+3HIcpTVw4JkRLgjsVowC22AB2tgNjpof2qVmvvh+gy5aqmIgwAA='
      }
    }
  }
}

const BookmarksDialog = ({ onClose, isOpen }) => {
  const bookmarks = useBookmarks()
  addBookmakrsToRecordMap(data.recordMap, bookmarks)
  const components = React.useMemo(
    () => ({
      nextImage: Image,
      nextLink: Link,
      Collection
    }),
    []
  )
  React.useEffect(() => {
    document.body.style.overflow = 'hidden'
    return function () {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div className='bookmarkmodal'>
      <NotionRenderer
        bodyClassName={cs(styles.notion)}
        darkMode={true}
        components={components}
        recordMap={data.recordMap}
        fullPage={true}
        // previewImages={!!data.preview_images}
        showCollectionViewDropdown={true}
      />
    </div>
  )
}

function addBookmakrsToRecordMap(recordMap, bookmarks) {
    console.log(recordMap,'data' );
    
  bookmarks.data.forEach((bookmark) => {
    recordMap.block[bookmark.id] = { role: 'reader', value: bookmark }
  })

  Object.values(recordMap.collection_query).forEach((col) => {
    Object.keys(col).forEach((key) => {
      const val = col[key]

      if (key === 'edf96bcc-a919-40b5-bcd3-4b26414a2039') {
        // favorite
        val.collection_group_results.blockIds = bookmarks.data
          .filter((r) => r.bookmarkType === 'favorite')
          .map((r) => r.id)
      }
      if (key === '8d3fcfa7-18ad-45fb-8226-441f7216d268') {
        //bookmarks
        val.collection_group_results.blockIds = bookmarks.data
          .filter((r) => r.bookmarkType === 'bookmark')
          .map((r) => r.id)
      }
    })
  })
}

export default BookmarksDialog
