'use client'

// React Imports

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const BankingDashboardPage = () => {
  // Hooks
  const { lang: locale } = useParams()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant='h4' sx={{ mb: 4 }}>
              Dashboard Banking - Rencana Bisnis Bank dan Rencana Kerja dan
              anggaran.
            </Typography>
            <Grid container spacing={6}>
              <Grid item xs={12} md={3}>
                <Button
                  component={Link}
                  href={`/${locale}/banking/base-data`}
                  variant='contained'
                  fullWidth
                  sx={{ height: '100%', p: 4 }}
                >
                  <div className='flex flex-col items-center'>
                    <i className='ri-database-2-line text-3xl mb-2'></i>
                    <Typography variant='h6'>Modul Basis Data</Typography>
                    <Typography variant='caption' className='text-center mt-2'>
                      Data realisasi bulanan dari rincian postur Neraca dan Laba Rugi
                    </Typography>
                  </div>
                </Button>
              </Grid>
              <Grid item xs={12} md={3}>
                <Button
                  component={Link}
                  href={`/${locale}/banking/performance`}
                  variant='contained'
                  fullWidth
                  sx={{ height: '100%', p: 4 }}
                >
                  <div className='flex flex-col items-center'>
                    <i className='ri-line-chart-line text-3xl mb-2'></i>
                    <Typography variant='h6'>Kinerja Utama Bank</Typography>
                    <Typography variant='caption' className='text-center mt-2'>
                      Data untuk memproyeksikan asumsi pertumbuhan kinerja utama bank
                    </Typography>
                  </div>
                </Button>
              </Grid>
              <Grid item xs={12} md={3}>
                <Button
                  component={Link}
                  href={`/${locale}/banking/credit-interest`}
                  variant='contained'
                  fullWidth
                  sx={{ height: '100%', p: 4 }}
                >
                  <div className='flex flex-col items-center'>
                    <i className='ri-percent-line text-3xl mb-2'></i>
                    <Typography variant='h6'>Kredit & Pendapatan Bunga</Typography>
                    <Typography variant='caption' className='text-center mt-2'>
                      Rincian kredit/pembiayaan dan pendapatan bunga
                    </Typography>
                  </div>
                </Button>
              </Grid>
              <Grid item xs={12} md={3}>
                <Button
                  component={Link}
                  href={`/${locale}/banking/dpk-interest`}
                  variant='contained'
                  fullWidth
                  sx={{ height: '100%', p: 4 }}
                >
                  <div className='flex flex-col items-center'>
                    <i className='ri-bank-line text-3xl mb-2'></i>
                    <Typography variant='h6'>DPK & Beban Bunga</Typography>
                    <Typography variant='caption' className='text-center mt-2'>
                      Rincian dana pihak ketiga dan beban bunga
                    </Typography>
                  </div>
                </Button>
              </Grid>
              <Grid item xs={12} md={3}>
                <Button
                  component={Link}
                  href={`/${locale}/banking/secondary-reserve`}
                  variant='contained'
                  fullWidth
                  sx={{ height: '100%', p: 4 }}
                >
                  <div className='flex flex-col items-center'>
                    <i className='ri-safe-2-line text-3xl mb-2'></i>
                    <Typography variant='h6'>Secondary Reserve</Typography>
                    <Typography variant='caption' className='text-center mt-2'>
                      Rincian secondary reserve dan pendapatan
                    </Typography>
                  </div>
                </Button>
              </Grid>
              <Grid item xs={12} md={3}>
                <Button
                  component={Link}
                  href={`/${locale}/banking/npl`}
                  variant='contained'
                  fullWidth
                  sx={{ height: '100%', p: 4 }}
                >
                  <div className='flex flex-col items-center'>
                    <i className='ri-funds-line text-3xl mb-2'></i>
                    <Typography variant='h6'>Non-Performing Loans</Typography>
                    <Typography variant='caption' className='text-center mt-2'>
                      Rincian kredit berdasarkan kolektibilitas
                    </Typography>
                  </div>
                </Button>
              </Grid>
              <Grid item xs={12} md={3}>
                <Button
                  component={Link}
                  href={`/${locale}/banking/simulation`}
                  variant='contained'
                  fullWidth
                  sx={{ height: '100%', p: 4 }}
                >
                  <div className='flex flex-col items-center'>
                    <i className='ri-calculator-line text-3xl mb-2'></i>
                    <Typography variant='h6'>Simulasi Keuangan</Typography>
                    <Typography variant='caption' className='text-center mt-2'>
                      Simulasi untuk rapat dan situasi darurat
                    </Typography>
                  </div>
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default BankingDashboardPage