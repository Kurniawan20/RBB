'use client'

// React Imports
import Image from 'next/image'

// Config Imports
import themeConfig from '@configs/themeConfig'

const Logo = () => {
  return (
    <div className='flex items-center justify-center'>
      <Image
        src='/images/stratex-logo-1.png'
        alt={themeConfig.templateName}
        width={180}
        height={80}
        style={{ objectFit: 'contain' }}
        priority
      />
    </div>
  )
}

export default Logo
