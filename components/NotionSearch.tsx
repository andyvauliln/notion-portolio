import * as React from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import cs from 'classnames'
import { useNotionContext,SearchIcon } from 'react-notion-x'
import {SearchDialog} from './NotionSearchDialog';


 const Search = ({ block, search, title = 'Search' }) => {
  const { searchNotion, rootPageId } = useNotionContext()
  const onSearchNotion = search || searchNotion
  

  const [isSearchOpen, setIsSearchOpen] = React.useState(false)
  const onOpenSearch = React.useCallback(() => {
    setIsSearchOpen(true)
  }, [])

  const onCloseSearch = React.useCallback(() => {
    setIsSearchOpen(false)
  }, [])

  useHotkeys('cmd+p', (event) => {
    onOpenSearch()
    event.preventDefault()
    event.stopPropagation()
  })

  const hasSearch = !!onSearchNotion

  return (
    <>
      {hasSearch && (
        <div
          role='button'
          className={cs('breadcrumb', 'button', 'notion-search-button')}
          onClick={onOpenSearch}
        >
          <SearchIcon className='searchIcon' />

          {title && <span className='title'>{title}</span>}
        </div>
      )}

      {isSearchOpen && hasSearch && (
        <SearchDialog
          isOpen={isSearchOpen}
          rootBlockId={rootPageId || block?.id}
          onClose={onCloseSearch}
          searchNotion={onSearchNotion}
        />
      )}
    </>
  )
  }

export default Search