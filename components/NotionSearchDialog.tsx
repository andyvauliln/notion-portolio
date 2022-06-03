import * as React from 'react'
import * as types from 'notion-types'
import throttle from 'lodash.throttle'
import { searchNotionCollection } from 'lib/search-notion'
import { NotionContextConsumer, LoadingIcon, ClearIcon, SearchIcon, Checkbox } from 'react-notion-x'
import { GiNewspaper } from "@react-icons/all-files/gi/GiNewspaper";
import { FaUserGraduate } from "@react-icons/all-files/fa/FaUserGraduate";
import { GiSecretBook } from "@react-icons/all-files/gi/GiSecretBook";
import { BsTools } from "@react-icons/all-files/bs/BsTools";

// TODO: modal.default.setAppElement('.notion-viewport')
const settings = [{ name: "News", id: "15aea51f-e667-43dd-83fa-27fadd32c94d", checked: true },
{ name: "Articles", id: "df1fefb8-0cbf-4420-8c84-502cf2e89579", checked: true },
{ name: "Education", id: "9009ee4f-69ec-49f3-a2bd-7ce4fb786b46", checked: true },
{ name: "Tools", id: "51d18017-70c3-4ce3-8dbf-fa9d5a850ce6", checked: true }]

export class SearchDialog extends React.Component<{
  isOpen: boolean
  rootBlockId: string
  onClose: () => void
  searchNotion: (params: types.SearchParams) => Promise<types.SearchResults>
}> {
  constructor(props) {
    super(props)
    this._inputRef = React.createRef()
  }

  state = {
    isLoading: false,
    query: '',
    searchResult: null,
    searchError: null,
    settings: settings
  }

  _inputRef: any
  _search: any

  componentDidMount() {
    this._search = throttle(this._searchImpl.bind(this), 1000)
    this._warmupSearch()
  }

  render() {
    const { isOpen, onClose } = this.props
    const { isLoading, query, searchResult, searchError } = this.state

    const hasQuery = !!query.trim()

    return (
      <NotionContextConsumer>
        {(ctx) => {
          const { components, mapPageUrl } = ctx

          return (
            <>

              <components.Modal
                isOpen={isOpen}
                contentLabel='Search'
                className='notion-search'
                overlayClassName='notion-search-overlay'
                onRequestClose={onClose}
                onAfterOpen={this._onAfterOpen}
              >
                <SearchSetting settings={this.state.settings} handleClick={this._handleClick} />
                <div className='quickFindMenu'>

                  <div className='searchBar'>
                    <div className='inlineIcon'>
                      {isLoading ? (
                        <LoadingIcon className='loadingIcon' />
                      ) : (
                        <SearchIcon />
                      )}
                    </div>

                    <input
                      className='searchInput'
                      placeholder='Search'
                      value={query}
                      ref={this._inputRef}
                      onChange={this._onChangeQuery}
                    />

                    {query && (
                      <div
                        role='button'
                        className='clearButton'
                        onClick={this._onClearQuery}
                      >
                        <ClearIcon className='clearIcon' />
                      </div>
                    )}
                  </div>


                  {hasQuery && searchResult && (
                    <>
                      {searchResult.length ? (
                        <>
                          <div className='resultsPane'>
                            {searchResult.map((result) => (
                              <components.PageLink
                                key={result.id}
                                className={'result notion-page-link'}
                                href={mapPageUrl(result.id)}
                              >
                                <div style={{ display: "flex", alignItems: "center" }}>
                                  {getIcon(result.category, 24)}
                                  <div>
                                    <div className="notion-page-title">
                                      <span className='notion-page-title-text'>
                                        {result.title}
                                      </span>
                                    </div>
                                    <div style={{ display: "flex", marginTop: "2px" }} className='notion-collection-card-property search-tags-box'>
                                      {(result.tags && result.tags.length) && (
                                        result.tags.map((r, i) => {
                                          return <div className={`notion-property-multi_select-item notion-item-${r.color}`} key={i}>{r.name}</div>
                                        })
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </components.PageLink>
                            ))}
                          </div>

                          <footer className='resultsFooter'>
                            <div>
                              <span className='resultsCount'>
                                {searchResult.total}
                              </span>

                              {searchResult.total === 1 ? ' result' : ' results'}
                            </div>
                          </footer>
                        </>
                      ) : (
                        <div className='noResultsPane'>
                          <div className='noResults'>No results</div>
                          <div className='noResultsDetail'>
                            Try different search terms
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {hasQuery && !searchResult && searchError && (
                    <div className='noResultsPane'>
                      <div className='noResults'>Search error</div>
                    </div>
                  )}
                </div>
              </components.Modal>
            </>
          )
        }}
      </NotionContextConsumer>
    )
  }

  _onAfterOpen = () => {
    if (this._inputRef.current) {
      this._inputRef.current.focus()
    }
  }

  _onChangeQuery = (e) => {
    const query = e.target.value
    this.setState({ query })

    if (!query.trim()) {
      this.setState({ isLoading: false, searchResult: null, searchError: null })
      return
    } else {
      this._search()
    }
  }
  _handleClick = (item) => {
    this.setState({ settings: [...this.state.settings.filter(r => r.id !== item.id), item ]})

    if (this.state.query) {
      this._search()
    }
  }

  _onClearQuery = () => {
    this._onChangeQuery({ target: { value: '' } })
  }

  _warmupSearch = async () => {
    const { searchNotion, rootBlockId } = this.props

    // search is generally implemented as a serverless function wrapping the notion
    // private API, upon opening the search dialog, so we eagerly invoke an empty
    // search in order to warm up the serverless lambda
    await searchNotion({
      query: '',
      ancestorId: rootBlockId
    })
  }

  _searchImpl = async () => {

    const { query } = this.state

    if (!query.trim()) {
      this.setState({ isLoading: false, searchResult: null, searchError: null })
      return
    }

    this.setState({ isLoading: true })
    const filter = getSearchFilter(settings, query)
    
    const result: any = await searchNotionCollection({
      database_ids: settings.filter(r => r.checked).map(r => r.id),
      filter
    })
    console.log('search', query, result)

    let searchResult: any = null // TODO
    let searchError: types.APIError = null



    if (result.error || result.errorId) {
      searchError = result
    } else {
      searchResult = result.map(r => {
        return {
          id: r.id,
          emoji: r.icon ? r.icon.emoji : null,
          title: r.properties?.Name?.title[0].plain_text,
          domain: r.properties?.Domain?.select.name,
          category: r.properties?.Category?.select.name,
          tags: r.properties?.Tags?.multi_select,
        }
      })
    }

    searchResult.total = searchResult.length
    if (this.state.query === query) {
      this.setState({ isLoading: false, searchResult, searchError })
    }
  }
}

const SearchSetting = ({ handleClick, settings }) => {

  return <div className='search-settings'>
    {settings.sort((a, b) => a.name.localeCompare(b.name)).map((item, key) => {
      return <div key={key} className='notion-to-do-item' onClick={() => handleClick({ ...item, checked: !item.checked })}>
        {getIcon(item.name, 24, 8)}
        <div className={`notion-to-do-body ${item.checked && "notion-to-do-checked"}`}>
          <span>{item.name}</span>
        </div>
        <Checkbox blockId={"blockId"} isChecked={item.checked} />

      </div>
    })}
  </div>
}

const getSearchFilter = function (settings, query) {
  const tags = []
  const authors = []
  const queryStr = ""
  query.split(" ").forEach(element => {
    if (element.indexOf("@") === 0) {
      authors.push(element);
    }
    else if (element.indexOf("#") === 0) {
      tags.push(element);
    }
    else {
      queryStr += ` ${element}`;
    }

  });
 
  
  const filter = {
    and: [
      {
        property: "Name",
        rich_text: {
          contains: queryStr.trim()
        }
      },
      tags.length && {
        "or": tags.map(r => ({ property: "Tags", multi_select: { contains: r.replace("#", "") } }))
      },
      authors.length && {
        "or": authors.map(r => ({ property: "Author", rich_text: { contains: r.replace("@", "") } }))
      }
    ].filter(Boolean)
  }
  
  return filter
}

const getIcon = (title, size = 17,  marginRight = 13) => {
  if (title === "News")
    return <GiNewspaper size={size} style={{ marginRight: marginRight }} color="var(--fg-color)" />
  if (title === "Education")
    return <FaUserGraduate size={size} style={{ marginRight: marginRight }} color="var(--fg-color)" />
  if (title === "Tools")
    return <BsTools size={size} style={{ marginRight: marginRight }} color="var(--fg-color)" />
  if (title === "Articles")
    return <GiSecretBook style={{ marginRight: marginRight }} size={size} color="var(--fg-color)" />

  return null;
}

 // const { searchNotion } = this.props
   // const result: any = await searchNotion({
    //     query,
    //     ancestorId: "c3ab4843999548a7953db8f6df5dc73d",
    //     filters: {
    //       ancestors: settings.filter(r => r.checked).map(r => r.id),
    //       isNavigableOnly: true,
    //     }
    //   })

      // const results = searchResult.results
      //   .map((result: any) => {
      //     const block = searchResult.recordMap.block[result.id]?.value
      //     if (!block) return

      //     const title = getBlockTitle(block, searchResult.recordMap)
      //     if (!title) {
      //       return
      //     }

      //     result.title = title
      //     result.block = block
      //     result.recordMap = searchResult.recordMap
      //     result.page =
      //       getBlockParentPage(block, searchResult.recordMap, {
      //         inclusive: true
      //       }) || block

      //     if (!result.page.id) {
      //       return
      //     }

      //     if (result.highlight?.text) {
      //       result.highlight.html = result.highlight.text
      //         .replace(/<gzkNfoUU>/gi, '<b>')
      //         .replace(/<\/gzkNfoUU>/gi, '</b>')
      //     }

      //     return result
      //   })
      //   .filter(Boolean)

      // // dedupe results by page id
      // const searchResultsMap = results.reduce(
      //   (map, result) => ({
      //     ...map,
      //     [result.page.id]: result
      //   }),
      //   {}
      // )
      // searchResult.results = Object.values(searchResultsMap)


    //   <NotionContextProvider
    //   {...ctx}
    //   recordMap={searchResult.recordMap}
    // >
    //   <div className='resultsPane'>
    //     {searchResult.results.map((result) => (
    //       <components.PageLink
    //         key={result.id}
    //         className={'result notion-page-link'}
    //         href={mapPageUrl(
    //           result.page.id,
    //           searchResult.recordMap
    //         )}
    //       >
    //         <PageTitle
    //           block={result.page}
    //           defaultIcon={defaultPageIcon}
    //         />

    //         {result.highlight?.html && (
    //           <div
    //             className='notion-search-result-highlight'
    //             dangerouslySetInnerHTML={{
    //               __html: result.highlight.html
    //             }}
    //           />
    //         )}
    //       </components.PageLink>
    //     ))}
    //   </div>

    //   <footer className='resultsFooter'>
    //     <div>
    //       <span className='resultsCount'>
    //         {searchResult.total}
    //       </span>

    //       {searchResult.total === 1 ? ' result' : ' results'}
    //     </div>
    //   </footer>
    // </NotionContextProvider>