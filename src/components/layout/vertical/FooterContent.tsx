'use client'



// Third-party Imports
import classnames from 'classnames'



// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

const FooterContent = () => {
  // No hooks needed

  return (
    <div
      className={classnames(verticalLayoutClasses.footerContent, 'flex items-center justify-between flex-wrap gap-4')}
    >
      {/* Footer content removed */}
    </div>
  )
}

export default FooterContent
