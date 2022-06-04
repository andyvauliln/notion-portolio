import * as React from 'react'
import cs from 'classnames'
import { IoSunnyOutline } from '@react-icons/all-files/io5/IoSunnyOutline'
import { IoMoonSharp } from '@react-icons/all-files/io5/IoMoonSharp'
import { IoStar } from '@react-icons/all-files/io5/IoStar'
import { IoStarOutline } from '@react-icons/all-files/io5/IoStarOutline'
import { IoBookmarks } from '@react-icons/all-files/io5/IoBookmarks'
import { IoBookmarksOutline } from '@react-icons/all-files/io5/IoBookmarksOutline'
import { IoHome } from '@react-icons/all-files/io5/IoHome'
import { GiNewspaper } from "@react-icons/all-files/gi/GiNewspaper";
import { FaUserGraduate } from "@react-icons/all-files/fa/FaUserGraduate";
import { FaUserCircle } from "@react-icons/all-files/fa/FaUserCircle";
import { GiSecretBook } from "@react-icons/all-files/gi/GiSecretBook";
import { IoCalendar } from "@react-icons/all-files/io5/IoCalendar";
import { MdWork } from "@react-icons/all-files/md/MdWork";
import { BsTools } from "@react-icons/all-files/bs/BsTools";
import { IoGlobeOutline } from "@react-icons/all-files/io5/IoGlobeOutline";
import { Header, useNotionContext } from 'react-notion-x'
import * as types from 'notion-types'
import Logo from './Logo'
//import NotionSearch  from './NotionSearch'

import { useDarkMode } from 'lib/use-dark-mode'
import useBookmarks from 'lib/useBookmarks'
import { navigationStyle, navigationLinks, isSearchEnabled } from 'lib/config'

import styles from './styles.module.css'

const ToggleThemeButton = () => {
  const [hasMounted, setHasMounted] = React.useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  const onToggleTheme = React.useCallback(() => {
    toggleDarkMode()
  }, [toggleDarkMode])

  return (
    <div
      className={cs('breadcrumb', 'button', !hasMounted && styles.hidden)}
      onClick={onToggleTheme}
    >
      {hasMounted && isDarkMode ? <IoMoonSharp size={21} /> : <IoSunnyOutline size={21} />}
    </div>
  )
}
const ToggleBookMarks = ({ block, recordMap }) => {
  const [hasMounted, setHasMounted] = React.useState(false)
  const bookmarks = useBookmarks()


  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  const onToggleBookmarks = React.useCallback((id, bookmarkType) => {
    if(block.parent_table === 'collection' && recordMap.collection[block.parent_id]){
      
      const schema = Object.keys(recordMap.collection[block.parent_id].value.schema).reduce((obj, item)=> { 
        obj[recordMap.collection[block.parent_id].value.schema[item].name] = item
       
        return {...obj}
      },{})
      if(block.properties[schema.Category]){
        block.Category = block.properties[schema.Category].join(" ")
      }
      if(block.properties[schema.Domain]){
        block.Domain = block.properties[schema.Domain].join(" ")
      }
    }

    bookmarks.isBookmarked(id, bookmarkType) ? bookmarks.removeBookmark(id, bookmarkType) : bookmarks.addBookmark(block, bookmarkType)
  }, [bookmarks, block])

  return (
    <>
      {!bookmarks.isBookmarked(block.id, "bookmark") && 
      <div
        className={cs('breadcrumb', 'button', !hasMounted && styles.hidden)}
        onClick={() => onToggleBookmarks(block.id, 'favorite')}
      >
        {hasMounted && bookmarks.isBookmarked(block.id, "favorite") ? <IoStar size={21} /> : <IoStarOutline size={21} />}
      </div>}
      {!bookmarks.isBookmarked(block.id, "favorite") && 
      <div
        className={cs('breadcrumb', 'button', !hasMounted && styles.hidden)}
        onClick={() => onToggleBookmarks(block.id, 'bookmark')}
      >
        {hasMounted && bookmarks.isBookmarked(block.id, "bookmark") ? <IoBookmarks size={21} /> : <IoBookmarksOutline size={21} />}
      </div>}
    </>
  )
}


export const NotionPageHeader: React.FC<{
  block: types.CollectionViewPageBlock | types.PageBlock
}> = ({ block }) => {
  const { components, mapPageUrl, recordMap } = useNotionContext()
  
  if (navigationStyle === 'default') { 
    return <Header block={block} />
  }
  return (
    <React.Fragment>
      <header className='notion-header'>
        <div className='notion-nav-header'>
          {/* <Breadcrumbs block={block} rootOnly={true} /> */}
          <Logo />

          <div className='notion-nav-header-rhs breadcrumbs'>
            {navigationLinks
              ?.map((link, index) => {
                if (!link.pageId && !link.url) {
                  return null
                }

                if (link.pageId) {
                  return (
                    <components.PageLink
                      href={mapPageUrl(link.pageId)}
                      key={index}
                      className={cs(styles.navLink, 'breadcrumb', 'button')}
                    >
                      {getIcon(link.title)}
                      {link.title}
                    </components.PageLink>
                  )
                } else {
                  return (
                    <components.Link
                      href={link.url}
                      key={index}
                      className={cs(styles.navLink, 'breadcrumb', 'button')}
                    >
                      {link.title}
                    </components.Link>
                  )
                }
              })
              .filter(Boolean)}
            <div style={{ borderLeft: "1px solid var(--divider-color)", height: "60%", marginRight: "0.5em", marginLeft: "0.5em" }}></div>
            <ToggleThemeButton />


            {/* {isSearchEnabled && <NotionSearch block={block} title={null} />} */}
            {
              ![...navigationLinks, {pageId :'9bff14071eeb4da3a51fa9a07b47eb55'}].some(r => r.pageId === block.id.replaceAll("-", "")) && 
              <ToggleBookMarks block={block} recordMap={recordMap} />
             }
          </div>
        </div>
      </header>
    </React.Fragment>
  )
}

const getIcon = (title, size=16) => {  
  if(title === "Home")
  return <IoHome style={{marginRight: 5}} size={size} />
  if(title === "News")
  return <GiNewspaper size={size} style={{marginRight: 5}}/>
  if(title === "Education")
  return <FaUserGraduate size={size} style={{marginRight: 5}}/>
  if(title === "Events")
  return <IoCalendar size={size} style={{marginRight: 5}}/>
  if(title === "Articles")
  return <GiSecretBook size={size} style={{marginRight: 5}}/>
  if(title === "Jobs")
  return <MdWork size={size} style={{marginRight: 5}}/>
  if(title === "Tools")
  return <BsTools  size={size} style={{marginRight: 5}}/>
  if(title === "Duniakripto")
  return <IoGlobeOutline size={size} style={{marginRight: 5}}/>
  if(title === "Bookmarks")
  return <FaUserCircle size={size} style={{marginRight: 5}}/>
  
  return null;
}