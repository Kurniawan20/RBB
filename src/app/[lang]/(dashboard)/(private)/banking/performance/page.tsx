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
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

// Third-party Imports
import type { ApexOptions } from 'apexcharts'

// Component Imports
import ReactApexcharts from 'react-apexcharts'

import CardStatHorizontal from '@components/card-statistics/Horizontal'

const BankPerformancePage = () => {
  // States
  const [tabValue, setTabValue] = useState('1')
  const [year, setYear] = useState('2025')
  const [month, setMonth] = useState('5')

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue)
  }

  // Sample data for key performance indicators
  const kpiData = {
    creditGrowth: 8.2,
    depositGrowth: 5.3,
    netInterestMargin: 4.8,
    returnOnAssets: 2.1,
    returnOnEquity: 15.7,
    loanToDeposit: 87.5,
    nonPerformingLoan: 2.3,
    capitalAdequacyRatio: 22.5
  }

  // Sample data for monthly credit growth
  const monthlyCreditGrowthData = [
    { month: 'Jan', conventional: 15200000000, sharia: 3100000000 },
    { month: 'Feb', conventional: 15350000000, sharia: 3150000000 },
    { month: 'Mar', conventional: 15500000000, sharia: 3180000000 },
    { month: 'Apr', conventional: 15600000000, sharia: 3220000000 },
    { month: 'May', conventional: 15700000000, sharia: 3200000000 }
  ]

  // Sample data for monthly deposit growth
  const monthlyDepositGrowthData = [
    { month: 'Jan', conventional: 18200000000, sharia: 5300000000 },
    { month: 'Feb', conventional: 18350000000, sharia: 5380000000 },
    { month: 'Mar', conventional: 18500000000, sharia: 5420000000 },
    { month: 'Apr', conventional: 18600000000, sharia: 5450000000 },
    { month: 'May', conventional: 18700000000, sharia: 5500000000 }
  ]

  // Sample data for financial ratios
  const financialRatiosData = [
    { year: '2021', nim: 4.2, roa: 1.8, roe: 14.2, car: 20.1, ldr: 85.3, npl: 2.8 },
    { year: '2022', nim: 4.5, roa: 1.9, roe: 14.8, car: 21.2, ldr: 86.1, npl: 2.6 },
    { year: '2023', nim: 4.6, roa: 2.0, roe: 15.2, car: 21.8, ldr: 86.8, npl: 2.5 },
    { year: '2024', nim: 4.7, roa: 2.1, roe: 15.5, car: 22.1, ldr: 87.2, npl: 2.4 },
    { year: '2025 (YTD)', nim: 4.8, roa: 2.1, roe: 15.7, car: 22.5, ldr: 87.5, npl: 2.3 }
  ]

  // Chart options for credit growth
  const creditGrowthOptions: ApexOptions = {
    chart: {
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight',
      width: 3
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      }
    },
    xaxis: {
      categories: monthlyCreditGrowthData.map(item => item.month)
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
      text: 'Pertumbuhan Kredit/Pembiayaan Bulanan'
    },
    colors: ['#00E396', '#775DD0'],
    legend: {
      position: 'top'
    }
  }

  // Chart options for deposit growth
  const depositGrowthOptions: ApexOptions = {
    chart: {
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight',
      width: 3
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      }
    },
    xaxis: {
      categories: monthlyDepositGrowthData.map(item => item.month)
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
      text: 'Pertumbuhan Dana Pihak Ketiga Bulanan'
    },
    colors: ['#00E396', '#775DD0'],
    legend: {
      position: 'top'
    }
  }

  // Chart options for financial ratios
  const financialRatiosOptions: ApexOptions = {
    chart: {
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight',
      width: 3
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      }
    },
    xaxis: {
      categories: financialRatiosData.map(item => item.year)
    },
    yaxis: {
      title: {
        text: 'Persentase (%)'
      },
      labels: {
        formatter: function (value) {
          return value.toFixed(1) + '%'
        }
      }
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return value.toFixed(2) + '%'
        }
      }
    },
    title: {
      text: 'Tren Rasio Keuangan'
    },
    colors: ['#00E396', '#775DD0', '#FF4560', '#FEB019', '#2E93fA', '#FF9800'],
    legend: {
      position: 'top'
    }
  }

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)
  }

  // Format percentage
  const formatPercentage = (value: number) => {
    return value.toFixed(2) + '%'
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader 
            title='Modul Kinerja Utama Bank' 
            subheader='Data realisasi sebagai dasar untuk memproyeksikan asumsi pertumbuhan kinerja utama bank'
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
            {/* Key Performance Indicators */}
            <Grid container spacing={6} sx={{ mb: 6 }}>
              <Grid item xs={12} sm={6} md={3}>
                <CardStatHorizontal
                  title='Pertumbuhan Kredit'
                  stats={formatPercentage(kpiData.creditGrowth)}
                  avatarIcon='ri-line-chart-line'
                  avatarColor='primary'
                  trendNumber='0.5%'
                  trend='up'
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <CardStatHorizontal
                  title='Pertumbuhan DPK'
                  stats={formatPercentage(kpiData.depositGrowth)}
                  avatarIcon='ri-line-chart-line'
                  avatarColor='success'
                  trendNumber='0.3%'
                  trend='up'
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <CardStatHorizontal
                  title='Net Interest Margin'
                  stats={formatPercentage(kpiData.netInterestMargin)}
                  avatarIcon='ri-percent-line'
                  avatarColor='info'
                  trendNumber='0.1%'
                  trend='up'
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <CardStatHorizontal
                  title='Return on Assets'
                  stats={formatPercentage(kpiData.returnOnAssets)}
                  avatarIcon='ri-funds-line'
                  avatarColor='warning'
                  trendNumber='0.1%'
                  trend='up'
                />
              </Grid>
            </Grid>

            <TabContext value={tabValue}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleTabChange} aria-label='bank performance tabs'>
                  <Tab label='Pertumbuhan Kredit' value='1' />
                  <Tab label='Pertumbuhan DPK' value='2' />
                  <Tab label='Rasio Keuangan' value='3' />
                </TabList>
              </Box>
              
              {/* Credit Growth Tab */}
              <TabPanel value='1'>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader title='Pertumbuhan Kredit/Pembiayaan Bulanan' />
                      <CardContent>
                        <ReactApexcharts
                          options={creditGrowthOptions}
                          series={[
                            {
                              name: 'Kredit Konvensional',
                              data: monthlyCreditGrowthData.map(item => item.conventional)
                            },
                            {
                              name: 'Pembiayaan Syariah',
                              data: monthlyCreditGrowthData.map(item => item.sharia)
                            }
                          ]}
                          type='line'
                          height={350}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader title='Data Pertumbuhan Kredit/Pembiayaan Bulanan' />
                      <CardContent>
                        <TableContainer>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Bulan</TableCell>
                                <TableCell align='right'>Kredit Konvensional</TableCell>
                                <TableCell align='right'>Pembiayaan Syariah</TableCell>
                                <TableCell align='right'>Total</TableCell>
                                <TableCell align='right'>Pertumbuhan MoM</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {monthlyCreditGrowthData.map((row, index) => {
                                const total = row.conventional + row.sharia

                                const prevTotal = index > 0 
                                  ? monthlyCreditGrowthData[index - 1].conventional + monthlyCreditGrowthData[index - 1].sharia 
                                  : total

                                const growth = ((total - prevTotal) / prevTotal) * 100
                                
                                return (
                                  <TableRow key={row.month}>
                                    <TableCell component='th' scope='row'>{row.month}</TableCell>
                                    <TableCell align='right'>{formatCurrency(row.conventional)}</TableCell>
                                    <TableCell align='right'>{formatCurrency(row.sharia)}</TableCell>
                                    <TableCell align='right'>{formatCurrency(total)}</TableCell>
                                    <TableCell align='right'>
                                      {index === 0 ? '-' : formatPercentage(growth)}
                                    </TableCell>
                                  </TableRow>
                                )
                              })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>
              
              {/* Deposit Growth Tab */}
              <TabPanel value='2'>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader title='Pertumbuhan Dana Pihak Ketiga Bulanan' />
                      <CardContent>
                        <ReactApexcharts
                          options={depositGrowthOptions}
                          series={[
                            {
                              name: 'DPK Konvensional',
                              data: monthlyDepositGrowthData.map(item => item.conventional)
                            },
                            {
                              name: 'DPK Syariah',
                              data: monthlyDepositGrowthData.map(item => item.sharia)
                            }
                          ]}
                          type='line'
                          height={350}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader title='Data Pertumbuhan Dana Pihak Ketiga Bulanan' />
                      <CardContent>
                        <TableContainer>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Bulan</TableCell>
                                <TableCell align='right'>DPK Konvensional</TableCell>
                                <TableCell align='right'>DPK Syariah</TableCell>
                                <TableCell align='right'>Total</TableCell>
                                <TableCell align='right'>Pertumbuhan MoM</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {monthlyDepositGrowthData.map((row, index) => {
                                const total = row.conventional + row.sharia

                                const prevTotal = index > 0 
                                  ? monthlyDepositGrowthData[index - 1].conventional + monthlyDepositGrowthData[index - 1].sharia 
                                  : total

                                const growth = ((total - prevTotal) / prevTotal) * 100
                                
                                return (
                                  <TableRow key={row.month}>
                                    <TableCell component='th' scope='row'>{row.month}</TableCell>
                                    <TableCell align='right'>{formatCurrency(row.conventional)}</TableCell>
                                    <TableCell align='right'>{formatCurrency(row.sharia)}</TableCell>
                                    <TableCell align='right'>{formatCurrency(total)}</TableCell>
                                    <TableCell align='right'>
                                      {index === 0 ? '-' : formatPercentage(growth)}
                                    </TableCell>
                                  </TableRow>
                                )
                              })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>
              
              {/* Financial Ratios Tab */}
              <TabPanel value='3'>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader title='Tren Rasio Keuangan' />
                      <CardContent>
                        <ReactApexcharts
                          options={financialRatiosOptions}
                          series={[
                            {
                              name: 'NIM',
                              data: financialRatiosData.map(item => item.nim)
                            },
                            {
                              name: 'ROA',
                              data: financialRatiosData.map(item => item.roa)
                            },
                            {
                              name: 'ROE',
                              data: financialRatiosData.map(item => item.roe)
                            },
                            {
                              name: 'CAR',
                              data: financialRatiosData.map(item => item.car)
                            },
                            {
                              name: 'LDR',
                              data: financialRatiosData.map(item => item.ldr)
                            },
                            {
                              name: 'NPL',
                              data: financialRatiosData.map(item => item.npl)
                            }
                          ]}
                          type='line'
                          height={350}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader title='Data Rasio Keuangan' />
                      <CardContent>
                        <TableContainer>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Tahun</TableCell>
                                <TableCell align='right'>NIM (%)</TableCell>
                                <TableCell align='right'>ROA (%)</TableCell>
                                <TableCell align='right'>ROE (%)</TableCell>
                                <TableCell align='right'>CAR (%)</TableCell>
                                <TableCell align='right'>LDR (%)</TableCell>
                                <TableCell align='right'>NPL (%)</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {financialRatiosData.map((row) => (
                                <TableRow key={row.year}>
                                  <TableCell component='th' scope='row'>{row.year}</TableCell>
                                  <TableCell align='right'>{row.nim.toFixed(2)}</TableCell>
                                  <TableCell align='right'>{row.roa.toFixed(2)}</TableCell>
                                  <TableCell align='right'>{row.roe.toFixed(2)}</TableCell>
                                  <TableCell align='right'>{row.car.toFixed(2)}</TableCell>
                                  <TableCell align='right'>{row.ldr.toFixed(2)}</TableCell>
                                  <TableCell align='right'>{row.npl.toFixed(2)}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader title='Keterangan Rasio Keuangan' />
                      <CardContent>
                        <Grid container spacing={4}>
                          <Grid item xs={12} md={6}>
                            <Typography variant='subtitle1' fontWeight='bold'>NIM (Net Interest Margin)</Typography>
                            <Typography variant='body2' paragraph>
                              Rasio antara pendapatan bunga bersih terhadap rata-rata aset produktif. Menunjukkan kemampuan bank dalam menghasilkan pendapatan bunga bersih.
                            </Typography>
                            
                            <Typography variant='subtitle1' fontWeight='bold'>ROA (Return on Assets)</Typography>
                            <Typography variant='body2' paragraph>
                              Rasio antara laba bersih terhadap total aset. Menunjukkan kemampuan bank dalam menghasilkan laba dari aset yang dimiliki.
                            </Typography>
                            
                            <Typography variant='subtitle1' fontWeight='bold'>ROE (Return on Equity)</Typography>
                            <Typography variant='body2' paragraph>
                              Rasio antara laba bersih terhadap total ekuitas. Menunjukkan kemampuan bank dalam menghasilkan laba dari ekuitas yang dimiliki.
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Typography variant='subtitle1' fontWeight='bold'>CAR (Capital Adequacy Ratio)</Typography>
                            <Typography variant='body2' paragraph>
                              Rasio kecukupan modal yang menunjukkan kemampuan bank dalam menyediakan dana untuk keperluan pengembangan usaha dan menampung risiko kerugian.
                            </Typography>
                            
                            <Typography variant='subtitle1' fontWeight='bold'>LDR (Loan to Deposit Ratio)</Typography>
                            <Typography variant='body2' paragraph>
                              Rasio antara total kredit yang diberikan terhadap total dana pihak ketiga. Menunjukkan kemampuan bank dalam membayar kembali penarikan dana oleh deposan dengan mengandalkan kredit yang diberikan.
                            </Typography>
                            
                            <Typography variant='subtitle1' fontWeight='bold'>NPL (Non Performing Loan)</Typography>
                            <Typography variant='body2' paragraph>
                              Rasio antara kredit bermasalah terhadap total kredit. Menunjukkan kualitas aset kredit yang dimiliki bank.
                            </Typography>
                          </Grid>
                        </Grid>
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

export default BankPerformancePage
