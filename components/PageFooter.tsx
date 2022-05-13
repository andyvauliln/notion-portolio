/* eslint-disable react/no-unescaped-entities */
import * as React from 'react'
import styles from './styles.module.css'

export const PageFooterImpl: React.FC = () => {
    return (<div className={`${styles.column} ${styles.spaceBetween} ${styles.footerRow1}`}>
        <div className={`${styles.flexColumn} ${styles.spaceBetween} ${styles.aboutSection}`}>
            <h3 >About us</h3>
            <span style={{
                fontFamily: 'Dosis', color: "var(--fg-color)",
            }}>
                Current project made by initiative of people who wants to help people to get a knowledge about the crypto industry and always get updated about what is happening in the world of crypto. Project made on our own resources and needs support to continue making grate and useful information source for Indonesian's citizen.

            </span>

        </div>

        <div className={`${styles.flexColumn} ${styles.spaceBetween} ${styles.supportSection}`}>
            <h3>Support our work</h3>
            <div className={`${styles.flexColumn} ${styles.spaceBetween}`}>
                <div className={`${styles.flexRow} ${styles.spaceBetween} ${styles.cryptoWallets}`}>
                    <div style={{ fontWeight: 'bold', }}>ETH: </div>
                    <div style={{ color: "var(--select-color-0)", fontFamily: 'Dosis' }}>
                        0x4edd6b520d92203c89a2b9cb2de00fccf18733cb
                    </div>
                </div>
                <div className={`${styles.flexRow} ${styles.spaceBetween} ${styles.cryptoWallets}`}>
                    <div style={{ fontWeight: 'bold', }}>BTC: </div>
                    <div style={{ color: "var(--select-color-0)", fontFamily: 'Dosis' }}>
                        bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}


export const PageFooter = React.memo(PageFooterImpl)
