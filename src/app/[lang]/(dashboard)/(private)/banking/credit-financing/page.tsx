'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'

// Third-party Imports
import type { ApexOptions } from 'apexcharts'

// Component Imports
import ReactApexcharts from 'react-apexcharts'

import CardStatHorizontal from '@components/card-statistics/Horizontal'

const CreditFinancingPage = () => {
  // States
  const [tabValue, setTabValue] = useState('1')
  const [year, setYear] = useState('2025')
  const [month, setMonth] = useState('5')
  const [creditType, setCreditType] = useState('conventional')
  const [sector, setSector] = useState('all')
  const [msmeType, setMsmeType] = useState('all')

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue)
  }

  // Handle credit type change
  const handleCreditTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreditType(event.target.value)
  }

  // Handle sector change
  const handleSectorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSector(event.target.value)
  }

  // Handle MSME type change
  const handleMsmeTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMsmeType(event.target.value)
  }

  // Sample data for conventional credit
  const conventionalCreditData = {
    productive: [
      { name: 'Modal Kerja', value: 5200000000 },
      { name: 'Investasi', value: 3800000000 }
    ],
    consumptive: [
      { name: 'KPR', value: 3500000000 },
      { name: 'Kredit Kendaraan', value: 1200000000 },
      { name: 'Kredit Multiguna', value: 2000000000 }
    ]
  }

  // Sample data for sharia financing
  const shariaFinancingData = {
    productive: [
      { name: 'Murabahah Modal Kerja', value: 1200000000 },
      { name: 'Musyarakah', value: 800000000 }
    ],
    consumptive: [
      { name: 'Murabahah KPR', value: 700000000 },
      { name: 'Murabahah Kendaraan', value: 300000000 },
      { name: 'Ijarah', value: 200000000 }
    ]
  }

  // Sample data for credit by usage
  const creditByUsageData = {
    conventional: [
      { name: 'Modal Kerja', value: 5200000000 },
      { name: 'Investasi', value: 3800000000 },
      { name: 'Konsumsi', value: 6700000000 }
    ],
    sharia: [
      { name: 'Modal Kerja', value: 1200000000 },
      { name: 'Investasi', value: 800000000 },
      { name: 'Konsumsi', value: 1200000000 }
    ]
  }

  // Sample data for credit by economic sector
  const creditBySectorData = {
    conventional: [
      { name: 'Pertanian', value: 2500000000 },
      { name: 'Pertambangan', value: 1200000000 },
      { name: 'Industri Pengolahan', value: 3200000000 },
      { name: 'Konstruksi', value: 2800000000 },
      { name: 'Perdagangan', value: 4500000000 },
      { name: 'Jasa', value: 1500000000 }
    ],
    sharia: [
      { name: 'Pertanian', value: 600000000 },
      { name: 'Pertambangan', value: 200000000 },
      { name: 'Industri Pengolahan', value: 500000000 },
      { name: 'Konstruksi', value: 700000000 },
      { name: 'Perdagangan', value: 900000000 },
      { name: 'Jasa', value: 300000000 }
    ]
  }

  // Sample data for MSME credit
  const msmeCreditData = {
    conventional: [
      { name: 'Mikro', value: 1800000000 },
      { name: 'Kecil', value: 2500000000 },
      { name: 'Menengah', value: 3200000000 },
      { name: 'Non-UMKM', value: 8200000000 }
    ],
    sharia: [
      { name: 'Mikro', value: 500000000 },
      { name: 'Kecil', value: 700000000 },
      { name: 'Menengah', value: 800000000 },
      { name: 'Non-UMKM', value: 1200000000 }
    ]
  }

  // Chart options for conventional vs sharia
  const conventionalVsShariaPieOptions: ApexOptions = {
    chart: {
      type: 'pie'
    },
    labels: ['Kredit Konvensional', 'Pembiayaan Syariah'],
    colors: ['#00E396', '#775DD0'],
    legend: {
      position: 'bottom'
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  }

  // Chart options for credit by usage
  const creditByUsageOptions: ApexOptions = {
    chart: {
      type: 'bar',
      stacked: true
    },
    plotOptions: {
      bar: {
        horizontal: false
      }
    },
    xaxis: {
      categories: ['Modal Kerja', 'Investasi', 'Konsumsi']
    },
    yaxis: {
      title: {
        text: 'Nilai (Miliar Rupiah)'
      },
      labels: {
        formatter: function (value) {
          return 'Rp ' + (Number(value) / 1000000000).toFixed(2) + ' M'
        }
      }
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return 'Rp ' + (value / 1000000000).toFixed(2) + ' Miliar'
        }
      }
    },
    title: {
      text: 'Kredit/Pembiayaan berdasarkan Jenis Penggunaan'
    },
    colors: ['#00E396', '#775DD0'],
    legend: {
      position: 'bottom'
    }
  }

  // Chart options for credit by economic sector
  const creditBySectorOptions: ApexOptions = {
    chart: {
      type: 'bar'
    },
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    xaxis: {
      categories: creditBySectorData.conventional.map(item => item.name),
      labels: {
        formatter: function (value) {
          return 'Rp ' + (Number(value) / 1000000000).toFixed(2) + ' M'
        }
      }
    },
    yaxis: {
      title: {
        text: 'Sektor Ekonomi'
      }
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return 'Rp ' + (value / 1000000000).toFixed(2) + ' Miliar'
        }
      }
    },
    title: {
      text: 'Kredit/Pembiayaan berdasarkan Sektor Ekonomi'
    },
    colors: ['#00E396', '#775DD0'],
    legend: {
      position: 'bottom'
    }
  }

  // Chart options for MSME credit
  const msmeCreditOptions: ApexOptions = {
    chart: {
      type: 'donut'
    },
    labels: ['Mikro', 'Kecil', 'Menengah', 'Non-UMKM'],
    colors: ['#00E396', '#775DD0', '#FF4560', '#FEB019'],
    legend: {
      position: 'bottom'
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  }

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)
  }

  // Calculate totals
  const totalConventionalCredit = 
    conventionalCreditData.productive.reduce((acc, item) => acc + item.value, 0) +
    conventionalCreditData.consumptive.reduce((acc, item) => acc + item.value, 0)
  
  const totalShariaFinancing = 
    shariaFinancingData.productive.reduce((acc, item) => acc + item.value, 0) +
    shariaFinancingData.consumptive.reduce((acc, item) => acc + item.value, 0)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader 
            title='Modul Kredit/Pembiayaan' 
            subheader='Rincian Total Kredit/Pembiayaan Konvensional dan Syariah'
            action={
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  select
                  label='Tahun'
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  size='small'
                  sx={{ width: 100 }}
                >
                  <MenuItem value='2023'>2023</MenuItem>
                  <MenuItem value='2024'>2024</MenuItem>
                  <MenuItem value='2025'>2025</MenuItem>
                </TextField>
                <TextField
                  select
                  label='Bulan'
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  size='small'
                  sx={{ width: 100 }}
                >
                  <MenuItem value='1'>Januari</MenuItem>
                  <MenuItem value='2'>Februari</MenuItem>
                  <MenuItem value='3'>Maret</MenuItem>
                  <MenuItem value='4'>April</MenuItem>
                  <MenuItem value='5'>Mei</MenuItem>
                  <MenuItem value='6'>Juni</MenuItem>
                  <MenuItem value='7'>Juli</MenuItem>
                  <MenuItem value='8'>Agustus</MenuItem>
                  <MenuItem value='9'>September</MenuItem>
                  <MenuItem value='10'>Oktober</MenuItem>
                  <MenuItem value='11'>November</MenuItem>
                  <MenuItem value='12'>Desember</MenuItem>
                </TextField>
                <Button variant='contained' color='primary'>
                  Tampilkan
                </Button>
              </Box>
            }
          />
          <CardContent>
            {/* Summary Cards */}
            <Grid container spacing={6} sx={{ mb: 6 }}>
              <Grid item xs={12} sm={6} md={3}>
                <CardStatHorizontal
                  title='Total Kredit Konvensional'
                  stats={formatCurrency(totalConventionalCredit)}
                  avatarIcon='ri-bank-card-line'
                  avatarColor='primary'
                  trendNumber='8.2%'
                  trend='up'
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <CardStatHorizontal
                  title='Total Pembiayaan Syariah'
                  stats={formatCurrency(totalShariaFinancing)}
                  avatarIcon='ri-bank-card-line'
                  avatarColor='success'
                  trendNumber='12.5%'
                  trend='up'
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <CardStatHorizontal
                  title='Total Kredit Produktif'
                  stats={formatCurrency(
                    conventionalCreditData.productive.reduce((acc, item) => acc + item.value, 0) +
                    shariaFinancingData.productive.reduce((acc, item) => acc + item.value, 0)
                  )}
                  avatarIcon='ri-building-line'
                  avatarColor='info'
                  trendNumber='5.8%'
                  trend='up'
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <CardStatHorizontal
                  title='Total Kredit Konsumtif'
                  stats={formatCurrency(
                    conventionalCreditData.consumptive.reduce((acc, item) => acc + item.value, 0) +
                    shariaFinancingData.consumptive.reduce((acc, item) => acc + item.value, 0)
                  )}
                  avatarIcon='ri-shopping-cart-line'
                  avatarColor='warning'
                  trendNumber='9.3%'
                  trend='up'
                />
              </Grid>
            </Grid>

            <TabContext value={tabValue}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleTabChange} aria-label='credit financing tabs'>
                  <Tab label='Konvensional vs Syariah' value='1' />
                  <Tab label='Berdasarkan Penggunaan' value='2' />
                  <Tab label='Berdasarkan Sektor Ekonomi' value='3' />
                  <Tab label='UMKM' value='4' />
                </TabList>
              </Box>
              
              {/* Conventional vs Sharia Tab */}
              <TabPanel value='1'>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Kredit Konvensional' />
                      <CardContent>
                        <Typography variant='h6' sx={{ mb: 2 }}>Kredit Produktif</Typography>
                        {conventionalCreditData.productive.map((item, index) => (
                          <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography>{item.name}</Typography>
                            <Typography>{formatCurrency(item.value)}</Typography>
                          </Box>
                        ))}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, borderTop: '1px solid', pt: 2, fontWeight: 'bold' }}>
                          <Typography>Total Kredit Produktif</Typography>
                          <Typography>
                            {formatCurrency(conventionalCreditData.productive.reduce((acc, item) => acc + item.value, 0))}
                          </Typography>
                        </Box>

                        <Typography variant='h6' sx={{ mb: 2 }}>Kredit Konsumtif</Typography>
                        {conventionalCreditData.consumptive.map((item, index) => (
                          <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography>{item.name}</Typography>
                            <Typography>{formatCurrency(item.value)}</Typography>
                          </Box>
                        ))}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, borderTop: '1px solid', pt: 2, fontWeight: 'bold' }}>
                          <Typography>Total Kredit Konsumtif</Typography>
                          <Typography>
                            {formatCurrency(conventionalCreditData.consumptive.reduce((acc, item) => acc + item.value, 0))}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, borderTop: '2px solid', pt: 2, fontWeight: 'bold' }}>
                          <Typography variant='h6'>Total Kredit Konvensional</Typography>
                          <Typography variant='h6'>
                            {formatCurrency(totalConventionalCredit)}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Pembiayaan Syariah' />
                      <CardContent>
                        <Typography variant='h6' sx={{ mb: 2 }}>Pembiayaan Produktif</Typography>
                        {shariaFinancingData.productive.map((item, index) => (
                          <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography>{item.name}</Typography>
                            <Typography>{formatCurrency(item.value)}</Typography>
                          </Box>
                        ))}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, borderTop: '1px solid', pt: 2, fontWeight: 'bold' }}>
                          <Typography>Total Pembiayaan Produktif</Typography>
                          <Typography>
                            {formatCurrency(shariaFinancingData.productive.reduce((acc, item) => acc + item.value, 0))}
                          </Typography>
                        </Box>

                        <Typography variant='h6' sx={{ mb: 2 }}>Pembiayaan Konsumtif</Typography>
                        {shariaFinancingData.consumptive.map((item, index) => (
                          <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography>{item.name}</Typography>
                            <Typography>{formatCurrency(item.value)}</Typography>
                          </Box>
                        ))}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, borderTop: '1px solid', pt: 2, fontWeight: 'bold' }}>
                          <Typography>Total Pembiayaan Konsumtif</Typography>
                          <Typography>
                            {formatCurrency(shariaFinancingData.consumptive.reduce((acc, item) => acc + item.value, 0))}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, borderTop: '2px solid', pt: 2, fontWeight: 'bold' }}>
                          <Typography variant='h6'>Total Pembiayaan Syariah</Typography>
                          <Typography variant='h6'>
                            {formatCurrency(totalShariaFinancing)}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader title='Perbandingan Kredit Konvensional vs Pembiayaan Syariah' />
                      <CardContent>
                        <ReactApexcharts
                          options={conventionalVsShariaPieOptions}
                          series={[totalConventionalCredit, totalShariaFinancing]}
                          type='pie'
                          height={350}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>
              
              {/* Credit by Usage Tab */}
              <TabPanel value='2'>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader title='Kredit/Pembiayaan berdasarkan Jenis Penggunaan' />
                      <CardContent>
                        <ReactApexcharts
                          options={creditByUsageOptions}
                          series={[
                            {
                              name: 'Konvensional',
                              data: creditByUsageData.conventional.map(item => item.value)
                            },
                            {
                              name: 'Syariah',
                              data: creditByUsageData.sharia.map(item => item.value)
                            }
                          ]}
                          type='bar'
                          height={350}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Kredit Konvensional berdasarkan Jenis Penggunaan' />
                      <CardContent>
                        {creditByUsageData.conventional.map((item, index) => (
                          <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography>{item.name}</Typography>
                            <Typography>{formatCurrency(item.value)}</Typography>
                          </Box>
                        ))}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, borderTop: '1px solid', pt: 2, fontWeight: 'bold' }}>
                          <Typography variant='subtitle1'>Total</Typography>
                          <Typography variant='subtitle1'>
                            {formatCurrency(creditByUsageData.conventional.reduce((acc, item) => acc + item.value, 0))}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Pembiayaan Syariah berdasarkan Jenis Penggunaan' />
                      <CardContent>
                        {creditByUsageData.sharia.map((item, index) => (
                          <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography>{item.name}</Typography>
                            <Typography>{formatCurrency(item.value)}</Typography>
                          </Box>
                        ))}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, borderTop: '1px solid', pt: 2, fontWeight: 'bold' }}>
                          <Typography variant='subtitle1'>Total</Typography>
                          <Typography variant='subtitle1'>
                            {formatCurrency(creditByUsageData.sharia.reduce((acc, item) => acc + item.value, 0))}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>
              
              {/* Credit by Economic Sector Tab */}
              <TabPanel value='3'>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader title='Kredit/Pembiayaan berdasarkan Sektor Ekonomi' />
                      <CardContent>
                        <ReactApexcharts
                          options={creditBySectorOptions}
                          series={[
                            {
                              name: 'Konvensional',
                              data: creditBySectorData.conventional.map(item => item.value)
                            },
                            {
                              name: 'Syariah',
                              data: creditBySectorData.sharia.map(item => item.value)
                            }
                          ]}
                          type='bar'
                          height={350}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Kredit Konvensional berdasarkan Sektor Ekonomi' />
                      <CardContent>
                        {creditBySectorData.conventional.map((item, index) => (
                          <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography>{item.name}</Typography>
                            <Typography>{formatCurrency(item.value)}</Typography>
                          </Box>
                        ))}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, borderTop: '1px solid', pt: 2, fontWeight: 'bold' }}>
                          <Typography variant='subtitle1'>Total</Typography>
                          <Typography variant='subtitle1'>
                            {formatCurrency(creditBySectorData.conventional.reduce((acc, item) => acc + item.value, 0))}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Pembiayaan Syariah berdasarkan Sektor Ekonomi' />
                      <CardContent>
                        {creditBySectorData.sharia.map((item, index) => (
                          <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography>{item.name}</Typography>
                            <Typography>{formatCurrency(item.value)}</Typography>
                          </Box>
                        ))}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, borderTop: '1px solid', pt: 2, fontWeight: 'bold' }}>
                          <Typography variant='subtitle1'>Total</Typography>
                          <Typography variant='subtitle1'>
                            {formatCurrency(creditBySectorData.sharia.reduce((acc, item) => acc + item.value, 0))}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>
              
              {/* MSME Credit Tab */}
              <TabPanel value='4'>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Kredit UMKM Konvensional' />
                      <CardContent>
                        <ReactApexcharts
                          options={msmeCreditOptions}
                          series={msmeCreditData.conventional.map(item => item.value)}
                          type='donut'
                          height={350}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Pembiayaan UMKM Syariah' />
                      <CardContent>
                        <ReactApexcharts
                          options={msmeCreditOptions}
                          series={msmeCreditData.sharia.map(item => item.value)}
                          type='donut'
                          height={350}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Rincian Kredit UMKM Konvensional' />
                      <CardContent>
                        {msmeCreditData.conventional.map((item, index) => (
                          <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography>{item.name}</Typography>
                            <Typography>{formatCurrency(item.value)}</Typography>
                          </Box>
                        ))}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, borderTop: '1px solid', pt: 2, fontWeight: 'bold' }}>
                          <Typography variant='subtitle1'>Total</Typography>
                          <Typography variant='subtitle1'>
                            {formatCurrency(msmeCreditData.conventional.reduce((acc, item) => acc + item.value, 0))}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Rincian Pembiayaan UMKM Syariah' />
                      <CardContent>
                        {msmeCreditData.sharia.map((item, index) => (
                          <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography>{item.name}</Typography>
                            <Typography>{formatCurrency(item.value)}</Typography>
                          </Box>
                        ))}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, borderTop: '1px solid', pt: 2, fontWeight: 'bold' }}>
                          <Typography variant='subtitle1'>Total</Typography>
                          <Typography variant='subtitle1'>
                            {formatCurrency(msmeCreditData.sharia.reduce((acc, item) => acc + item.value, 0))}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>
            </TabContext>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default CreditFinancingPage
