import { useLocalStorage } from 'react-use'

const useBookmarks = () => {
  const [bookmarks, setBookmarks, removeBookmarks] = useLocalStorage(
    'bookmarks',
    []
  )

  return {
    data: bookmarks,
    removeBookmarks,
    removeBookmark: (id, bookmarkType) => {
      setBookmarks(
        bookmarks.filter((r) => r.id !== id && r.bookmarkType === bookmarkType)
      )
    },
    isBookmarked: (id, bookmarkType) => {
      return bookmarks.some(function (item) {
        return item.id === id && item.bookmarkType === bookmarkType
      })
    },
    getBookmark: (id, bookmarkType) => {
      const data = bookmarks.filter(function (item) {
        return item.id === id && item.bookmarkType === bookmarkType
      })
      return data.length ? data[0] : null;

    },
    addBookmark: (bookmark, bookmarkType) => {
      if(bookmarkType === 'bookmark'){
        setBookmarks([...bookmarks.filter(r=> r.id !== bookmark.id), {...bookmark, bookmarkType}])
      }
      else {
        setBookmarks([...bookmarks.filter(r=> !(r.id === bookmark.id && r.bookmarkType=== bookmarkType)), {...bookmark, bookmarkType}])
      }
    
      return bookmark
    }
  }
}

export default useBookmarks
