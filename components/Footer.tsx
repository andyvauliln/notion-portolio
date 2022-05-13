import * as React from 'react'
import { FaInstagram } from '@react-icons/all-files/fa/FaInstagram'
import { FaTelegram } from '@react-icons/all-files/fa/FaTelegram'
import { IoSunnyOutline } from '@react-icons/all-files/io5/IoSunnyOutline'
import { IoMoonSharp } from '@react-icons/all-files/io5/IoMoonSharp'
import { useDarkMode } from 'lib/use-dark-mode'
import * as config from 'lib/config'
import styles from './styles.module.css'

// TODO: merge the data and icons from PageSocial with the social links in Footer

export const FooterImpl: React.FC = () => {
  const [hasMounted, setHasMounted] = React.useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  const onToggleDarkMode = React.useCallback(
    (e) => {
      e.preventDefault()
      toggleDarkMode()
    },
    [toggleDarkMode]
  )

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  return (
    <footer className={styles.footer}>
     
    
      <div className={`${styles.flexRow} ${styles.spaceBetween} ${styles.footerRow2}`}>

        <div className={styles.copyright}>Copyright 2022 {config.author}</div>
        <div className={styles.settings}>
          {hasMounted && (
            <a
              className={styles.toggleDarkMode}
              href='#'
              role='button'
              onClick={onToggleDarkMode}
              title='Toggle dark mode'
            >
              {isDarkMode ? <IoMoonSharp /> : <IoSunnyOutline />}
            </a>
          )}

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
              <FaInstagram size={25} />
            </a>
          )}

          {config.telegramChannel && (
            <a
              className={styles.telegramChannel}
              href={config.telegramChannel}
              title={`Telegram Channel @duniakriptoind`}
              target='_blank'
              rel='noopener noreferrer'
            >  <div className={styles.socialtext}>Channel</div>
              <FaTelegram size={25} />
            </a>
          )}

          {config.telegramChat && (
            <a
              className={styles.telegramChat}
              href={config.telegramChat}
              title={`Telegram Chat @duniakriptochat`}
              target='_blank'
              rel='noopener noreferrer'
            > <div className={styles.socialtext} >Chat</div>
              <FaTelegram size={25} />
            </a>
          )}
        </div>
      </div>

    </footer>
  )
}

// function LanguageSwitcher(): JSX.Element {
//   const [lang, setLeng] = useAtom(lng)
//   console.log(lang, "lng")


//   return (
//     <LanguageWrapper
//       onClick={e => {
//         lang === 'eng' ? setLeng('ind') : setLeng('eng')
//         e.stopPropagation()
//         e.preventDefault()
//         return false
//       }}
//     >
//       <div>Eng</div>
//       <ToggleButton both={true} checked={lang !== 'eng'} />
//       <div>Ind</div>
//     </LanguageWrapper>
//   )
// }
// const LanguageWrapper = styled.div`
//  display:flex;
//  justify-content: space-between;
//  width: 7em;
//  align-items: baseline;
//  font-weight: bold;
// `;

export const Footer = React.memo(FooterImpl)
