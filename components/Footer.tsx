import * as React from 'react'
import { FaInstagram } from '@react-icons/all-files/fa/FaInstagram'
import { FaTelegram } from '@react-icons/all-files/fa/FaTelegram'
import { IoHome } from '@react-icons/all-files/io5/IoHome'
import { GiNewspaper } from "@react-icons/all-files/gi/GiNewspaper";
import { FaUserGraduate } from "@react-icons/all-files/fa/FaUserGraduate";
import { FaUserCircle } from "@react-icons/all-files/fa/FaUserCircle";
import { GiSecretBook } from "@react-icons/all-files/gi/GiSecretBook";
import { IoCalendar } from "@react-icons/all-files/io5/IoCalendar";
import { MdWork } from "@react-icons/all-files/md/MdWork";
import { BsTools } from "@react-icons/all-files/bs/BsTools";
import { IoGlobeOutline } from "@react-icons/all-files/io5/IoGlobeOutline";
import * as config from 'lib/config'
import styles from './styles.module.css'
import { useNotionContext } from 'react-notion-x'
import cs from 'classnames'
import { createBreakpoint } from "react-use";

// TODO: merge the data and icons from PageSocial with the social links in Footer
const useBreakpoint = createBreakpoint({ L: 1020, M: 768, S: 420 });

const getIcon = (title, breakpoint) => {
  const size = breakpoint === 'M' ? 25 : 20
  
  if(title === "Home")
  return <IoHome size={size} />
  if(title === "News")
  return <GiNewspaper size={size} />
  if(title === "Education")
  return <FaUserGraduate size={size} />
  if(title === "Events")
  return <IoCalendar size={size} />
  if(title === "Articles")
  return <GiSecretBook size={size} />
  if(title === "Jobs")
  return <MdWork size={size} />
  if(title === "Tools")
  return <BsTools  size={size} />
  if(title === "Duniakripto")
  return <IoGlobeOutline size={size} />
  if(title === "Bookmarks")
  return <FaUserCircle size={size} />
  
  return null;
}

export const FooterImpl: React.FC = () => {
  const { components, mapPageUrl } = useNotionContext()
  const breakpoint = useBreakpoint();
  
  return (
    <footer className={styles.footer}>
     
    
      <div className={`${styles.flexRow} ${styles.spaceBetween} ${styles.footerRow2}`}>

        <div className={styles.copyright}>Copyright 2022 {config.author}</div>
        <div className={styles.mobileNav}>
        {config.navigationLinks
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
                      {getIcon(link.title, breakpoint)}
                    </components.PageLink>
                  )
                } else {
                  return (
                    <components.Link
                      href={link.url}
                      key={index}
                      className={cs(styles.navLink, 'breadcrumb', 'button')}
                    >
                      {getIcon(link.title,breakpoint)}
                    </components.Link>
                  )
                }
              })
              .filter(Boolean)}
               <components.Link
                      href={"/bookmarks"}
                      key={'bookmarks'}
                      className={cs(styles.navLink, 'breadcrumb', 'button')}
                    >
                      {getIcon("Bookmarks",breakpoint)}
                    </components.Link>
        </div>
        <div className={styles.settings}>
            <a
              className={styles.toggleDarkMode}
              href='/bookmarks'
              // role='button'
              // onClick={onToggleDarkMode}
              title='Toggle dark mode'
            >
              {<FaUserCircle />}
            </a>
        </div>

        <div className={styles.social}>
          {config.instagram && (
            <a
              className={styles.instagram}
              href={config.instagram}
              title={`Instagram @duniakripto_ind`}
              target='_blank'
              rel='noopener noreferrer'
            > <div className={styles.socialtext}>Instagram</div>
              <FaInstagram size={breakpoint === 'M' || breakpoint === "L" ? 25 : 20}/>
            </a>
          )}

          {config.telegramChannel && (
            <a
              className={styles.telegramChannel}
              href={config.telegramChannel}
              title={`Telegram Channel @duniakriptoind`}
              target='_blank'
              rel='noopener noreferrer'
            >  <div className={styles.socialtext}>Telegram</div>
              <FaTelegram size={breakpoint === 'M' || breakpoint === "L" ? 25 : 20} />
            </a>
          )}

          {/* {config.telegramChat && (
            <a
              className={styles.telegramChat}
              href={config.telegramChat}
              title={`Telegram Chat @duniakriptochat`}
              target='_blank'
              rel='noopener noreferrer'
            > <div className={styles.socialtext} >Chat</div>
              <FaTelegram size={breakpoint === 'M' || breakpoint === "L" ? 25 : 20} />
            </a>
          )} */}
        </div>
      </div>

    </footer>
  )
}
export const Footer = React.memo(FooterImpl)
