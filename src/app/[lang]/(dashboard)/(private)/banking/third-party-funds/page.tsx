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

const ThirdPartyFundsPage = () => {
  // States
  const [tabValue, setTabValue] = useState('1')
  const [year, setYear] = useState('2025')
  const [month, setMonth] = useState('5')

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue)
  }

  // Sample data for conventional third party funds
  const conventionalFundsData = {
    currentAccounts: 4200000000,
    savings: 8500000000,
    timeDeposits: 6000000000
  }

  // Sample data for sharia third party funds
  const shariaFundsData = {
    currentAccounts: 1200000000,
    savings: 2500000000,
    timeDeposits: 1800000000
  }

  // Sample data for conventional time deposits by period
  const conventionalTimeDepositsByPeriod = [
    { name: '1 Bulan', value: 2200000000 },
    { name: '3 Bulan', value: 1500000000 },
    { name: '6 Bulan', value: 1200000000 },
    { name: '12 Bulan', value: 800000000 },
    { name: '24 Bulan', value: 300000000 }
  ]

  // Sample data for sharia time deposits by period
  const shariaTimeDepositsByPeriod = [
    { name: '1 Bulan', value: 700000000 },
    { name: '3 Bulan', value: 500000000 },
    { name: '6 Bulan', value: 300000000 },
    { name: '12 Bulan', value: 200000000 },
    { name: '24 Bulan', value: 100000000 }
  ]

  // Chart options for conventional vs sharia
  const conventionalVsShariaPieOptions: ApexOptions = {
    chart: {
      type: 'pie'
    },
    labels: ['Dana Pihak Ketiga Konvensional', 'Dana Pihak Ketiga Syariah'],
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

  // Chart options for funds by type
  const fundsByTypeOptions: ApexOptions = {
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
      categories: ['Giro', 'Tabungan', 'Deposito']
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
      text: 'Dana Pihak Ketiga berdasarkan Jenis'
    },
    colors: ['#00E396', '#775DD0'],
    legend: {
      position: 'bottom'
    }
  }

  // Chart options for time deposits by period
  const timeDepositsByPeriodOptions: ApexOptions = {
    chart: {
      type: 'bar'
    },
    plotOptions: {
      bar: {
        horizontal: false
      }
    },
    xaxis: {
      categories: conventionalTimeDepositsByPeriod.map(item => item.name)
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
      text: 'Deposito berdasarkan Jangka Waktu'
    },
    colors: ['#00E396', '#775DD0'],
    legend: {
      position: 'bottom'
    }
  }

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)
  }

  // Calculate totals
  const totalConventionalFunds = 
    conventionalFundsData.currentAccounts + 
    conventionalFundsData.savings + 
    conventionalFundsData.timeDeposits
  
  const totalShariaFunds = 
    shariaFundsData.currentAccounts + 
    shariaFundsData.savings + 
    shariaFundsData.timeDeposits

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader 
            title='Modul Dana Pihak Ketiga' 
            subheader='Rincian Total Dana Pihak Ketiga Konvensional dan Syariah'
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
                  title='Total DPK Konvensional'
                  stats={formatCurrency(totalConventionalFunds)}
                  avatarIcon='ri-money-dollar-box-line'
                  avatarColor='primary'
                  trendNumber='5.3%'
                  trend='up'
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <CardStatHorizontal
                  title='Total DPK Syariah'
                  stats={formatCurrency(totalShariaFunds)}
                  avatarIcon='ri-money-dollar-box-line'
                  avatarColor='success'
                  trendNumber='7.8%'
                  trend='up'
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <CardStatHorizontal
                  title='Total Giro'
                  stats={formatCurrency(conventionalFundsData.currentAccounts + shariaFundsData.currentAccounts)}
                  avatarIcon='ri-bank-line'
                  avatarColor='info'
                  trendNumber='3.2%'
                  trend='up'
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <CardStatHorizontal
                  title='Total Tabungan'
                  stats={formatCurrency(conventionalFundsData.savings + shariaFundsData.savings)}
                  avatarIcon='ri-safe-2-line'
                  avatarColor='warning'
                  trendNumber='6.5%'
                  trend='up'
                />
              </Grid>
            </Grid>

            <TabContext value={tabValue}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleTabChange} aria-label='third party funds tabs'>
                  <Tab label='Konvensional vs Syariah' value='1' />
                  <Tab label='Berdasarkan Jenis' value='2' />
                  <Tab label='Deposito berdasarkan Jangka Waktu' value='3' />
                </TabList>
              </Box>
              
              {/* Conventional vs Sharia Tab */}
              <TabPanel value='1'>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Dana Pihak Ketiga Konvensional' />
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Typography>Giro</Typography>
                          <Typography>{formatCurrency(conventionalFundsData.currentAccounts)}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Typography>Tabungan</Typography>
                          <Typography>{formatCurrency(conventionalFundsData.savings)}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Typography>Deposito</Typography>
                          <Typography>{formatCurrency(conventionalFundsData.timeDeposits)}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, borderTop: '1px solid', pt: 2, fontWeight: 'bold' }}>
                          <Typography variant='h6'>Total DPK Konvensional</Typography>
                          <Typography variant='h6'>
                            {formatCurrency(totalConventionalFunds)}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Dana Pihak Ketiga Syariah' />
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Typography>Giro Syariah</Typography>
                          <Typography>{formatCurrency(shariaFundsData.currentAccounts)}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Typography>Tabungan Syariah</Typography>
                          <Typography>{formatCurrency(shariaFundsData.savings)}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Typography>Deposito Syariah</Typography>
                          <Typography>{formatCurrency(shariaFundsData.timeDeposits)}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, borderTop: '1px solid', pt: 2, fontWeight: 'bold' }}>
                          <Typography variant='h6'>Total DPK Syariah</Typography>
                          <Typography variant='h6'>
                            {formatCurrency(totalShariaFunds)}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader title='Perbandingan Dana Pihak Ketiga Konvensional vs Syariah' />
                      <CardContent>
                        <ReactApexcharts
                          options={conventionalVsShariaPieOptions}
                          series={[totalConventionalFunds, totalShariaFunds]}
                          type='pie'
                          height={350}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>
              
              {/* Funds by Type Tab */}
              <TabPanel value='2'>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader title='Dana Pihak Ketiga berdasarkan Jenis' />
                      <CardContent>
                        <ReactApexcharts
                          options={fundsByTypeOptions}
                          series={[
                            {
                              name: 'Konvensional',
                              data: [
                                conventionalFundsData.currentAccounts,
                                conventionalFundsData.savings,
                                conventionalFundsData.timeDeposits
                              ]
                            },
                            {
                              name: 'Syariah',
                              data: [
                                shariaFundsData.currentAccounts,
                                shariaFundsData.savings,
                                shariaFundsData.timeDeposits
                              ]
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
                      <CardHeader title='Komposisi Dana Pihak Ketiga Konvensional' />
                      <CardContent>
                        <ReactApexcharts
                          options={{
                            chart: { type: 'pie' },
                            labels: ['Giro', 'Tabungan', 'Deposito'],
                            colors: ['#00E396', '#FEB019', '#775DD0'],
                            legend: { position: 'bottom' }
                          }}
                          series={[
                            conventionalFundsData.currentAccounts,
                            conventionalFundsData.savings,
                            conventionalFundsData.timeDeposits
                          ]}
                          type='pie'
                          height={300}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Komposisi Dana Pihak Ketiga Syariah' />
                      <CardContent>
                        <ReactApexcharts
                          options={{
                            chart: { type: 'pie' },
                            labels: ['Giro Syariah', 'Tabungan Syariah', 'Deposito Syariah'],
                            colors: ['#00E396', '#FEB019', '#775DD0'],
                            legend: { position: 'bottom' }
                          }}
                          series={[
                            shariaFundsData.currentAccounts,
                            shariaFundsData.savings,
                            shariaFundsData.timeDeposits
                          ]}
                          type='pie'
                          height={300}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>
              
              {/* Time Deposits by Period Tab */}
              <TabPanel value='3'>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader title='Deposito berdasarkan Jangka Waktu' />
                      <CardContent>
                        <ReactApexcharts
                          options={timeDepositsByPeriodOptions}
                          series={[
                            {
                              name: 'Deposito Konvensional',
                              data: conventionalTimeDepositsByPeriod.map(item => item.value)
                            },
                            {
                              name: 'Deposito Syariah',
                              data: shariaTimeDepositsByPeriod.map(item => item.value)
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
                      <CardHeader title='Deposito Konvensional berdasarkan Jangka Waktu' />
                      <CardContent>
                        {conventionalTimeDepositsByPeriod.map((item, index) => (
                          <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography>{item.name}</Typography>
                            <Typography>{formatCurrency(item.value)}</Typography>
                          </Box>
                        ))}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, borderTop: '1px solid', pt: 2, fontWeight: 'bold' }}>
                          <Typography variant='subtitle1'>Total Deposito Konvensional</Typography>
                          <Typography variant='subtitle1'>
                            {formatCurrency(conventionalTimeDepositsByPeriod.reduce((acc, item) => acc + item.value, 0))}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Deposito Syariah berdasarkan Jangka Waktu' />
                      <CardContent>
                        {shariaTimeDepositsByPeriod.map((item, index) => (
                          <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography>{item.name}</Typography>
                            <Typography>{formatCurrency(item.value)}</Typography>
                          </Box>
                        ))}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, borderTop: '1px solid', pt: 2, fontWeight: 'bold' }}>
                          <Typography variant='subtitle1'>Total Deposito Syariah</Typography>
                          <Typography variant='subtitle1'>
                            {formatCurrency(shariaTimeDepositsByPeriod.reduce((acc, item) => acc + item.value, 0))}
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

export default ThirdPartyFundsPage
