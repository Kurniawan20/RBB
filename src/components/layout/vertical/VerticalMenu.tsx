// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports
import type { getDictionary } from '@/utils/getDictionary'
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import { Menu, MenuItem, MenuSection, SubMenu } from '@menu/vertical-menu'

// import { GenerateVerticalMenu } from '@components/GenerateMenu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

// Menu Data Imports
// import menuData from '@/data/navigation/verticalMenuData'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='ri-arrow-right-s-line' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ dictionary, scrollMenu }: Props) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const params = useParams()

  // Vars
  const { isBreakpointReached, transitionDuration } = verticalNavOptions
  const { lang: locale } = params

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 17 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-fill' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <MenuItem 
          href={`/${locale}/banking`} 
          icon={<i className='ri-dashboard-line' />}
        >
          Dashboard
        </MenuItem>
          
          {/* Base Data */}
          <SubMenu 
            label='Basis Data' 
            icon={<i className='ri-database-2-line' />}
          >
            <MenuItem 
              href={`/${locale}/banking/base-data`} 
            >
              Neraca & Laba Rugi
            </MenuItem>
            <MenuItem 
              href={`/${locale}/banking/data-management`} 
            >
              Manajemen Data
            </MenuItem>
          </SubMenu>
          
          {/* Bank Performance */}
          <SubMenu 
            label='Kinerja Bank' 
            icon={<i className='ri-line-chart-line' />}
          >
            <MenuItem 
              href={`/${locale}/banking/performance`} 
            >
              Kinerja Utama Bank
            </MenuItem>
            <MenuItem 
              href={`/${locale}/banking/credit-financing`} 
            >
              Kredit/Pembiayaan
            </MenuItem>
            <MenuItem 
              href={`/${locale}/banking/third-party-funds`} 
            >
              Dana Pihak Ketiga
            </MenuItem>
          </SubMenu>
          
          {/* Credit Details and Interest */}
          <SubMenu 
            label='Rincian Kredit' 
            icon={<i className='ri-percent-line' />}
          >
            <MenuItem 
              href={`/${locale}/banking/credit-interest`} 
            >
              Rincian Kredit & Bunga
            </MenuItem>
          </SubMenu>
          
          {/* Third-Party Funds and Interest Expense */}
          <SubMenu 
            label='DPK & Beban Bunga' 
            icon={<i className='ri-bank-line' />}
          >
            <MenuItem 
              href={`/${locale}/banking/dpk-interest`} 
            >
              DPK & Beban Bunga
            </MenuItem>
          </SubMenu>
          
          {/* Secondary Reserve */}
          <SubMenu 
            label='Secondary Reserve' 
            icon={<i className='ri-safe-2-line' />}
          >
            <MenuItem 
              href={`/${locale}/banking/secondary-reserve`} 
            >
              Secondary Reserve
            </MenuItem>
          </SubMenu>
          
          {/* NPL */}
          <SubMenu 
            label='NPL' 
            icon={<i className='ri-funds-line' />}
          >
            <MenuItem 
              href={`/${locale}/banking/npl`} 
            >
              Non-Performing Loans
            </MenuItem>
          </SubMenu>
          
          {/* Simulation */}
          <SubMenu 
            label='Simulasi' 
            icon={<i className='ri-calculator-line' />}
          >
            <MenuItem 
              href={`/${locale}/banking/simulation`} 
            >
              Simulasi Keuangan
            </MenuItem>
          </SubMenu>
          
          {/* ATMR */}
          <SubMenu 
            label='ATMR' 
            icon={<i className='ri-scales-3-line' />}
          >
            <MenuItem 
              href={`/${locale}/banking/atmr`} 
            >
              Aktiva Tertimbang Menurut Risiko
            </MenuItem>
          </SubMenu>
          
          {/* Projections */}
          <SubMenu 
            label='Proyeksi' 
            icon={<i className='ri-file-chart-line' />}
          >
            <MenuItem 
              href={`/${locale}/banking/projections`} 
            >
              Laporan Proyeksi
            </MenuItem>
          </SubMenu>
        
        <MenuSection label={dictionary['navigation'].settings || 'Pengaturan'}>
          <MenuItem 
            href={`/${locale}/pages/account-settings/account`} 
            icon={<i className='ri-user-settings-line' />}
          >
            Profil Pengguna
          </MenuItem>
          
          <MenuItem 
            href={`/${locale}/pages/account-settings/security`} 
            icon={<i className='ri-shield-keyhole-line' />}
          >
            Keamanan
          </MenuItem>
        </MenuSection>
      </Menu>
      {/* <Menu
        popoutMenuOffset={{ mainAxis: 17 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
{{ ... }}
        renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-fill' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <GenerateVerticalMenu menuData={menuData(dictionary, params)} />
      </Menu> */}
    </ScrollWrapper>
  )
}

export default VerticalMenu
