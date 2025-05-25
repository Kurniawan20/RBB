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
import Paper from '@mui/material/Paper'

// Third-party Imports
import type { ApexOptions } from 'apexcharts'

// Component Imports
import ReactApexcharts from 'react-apexcharts'
import CardStatHorizontal from '@components/card-statistics/Horizontal'

const CreditInterestPage = () => {
  // States
  const [tabValue, setTabValue] = useState('1')
  const [year, setYear] = useState('2025')
  const [month, setMonth] = useState('5')
  const [creditType, setCreditType] = useState('conventional')

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue)
  }

  // Handle credit type change
  const handleCreditTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreditType(event.target.value)
  }

  // Available years and months for filtering
  const years = ['2021', '2022', '2023', '2024', '2025']
  
  const months = [
    { value: '1', label: 'Januari' },
    { value: '2', label: 'Februari' },
    { value: '3', label: 'Maret' },
    { value: '4', label: 'April' },
    { value: '5', label: 'Mei' },
    { value: '6', label: 'Juni' },
    { value: '7', label: 'Juli' },
    { value: '8', label: 'Agustus' },
    { value: '9', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'Desember' }
  ]

  // Sample data for productive credit
  const productiveCreditData = {
    kur: {
      position: 3200000000,
      interest: 384000000,
      effectiveRate: 12
    },
    nonKur: {
      position: 5800000000,
      interest: 638000000,
      effectiveRate: 11
    }
  }

  // Sample data for consumer credit
  const consumerCreditData = {
    kpr: {
      position: 3500000000,
      interest: 315000000,
      effectiveRate: 9
    },
    kccIntern: {
      position: 1200000000,
      interest: 144000000,
      effectiveRate: 12
    },
    others: {
      position: 2000000000,
      interest: 200000000,
      effectiveRate: 10
    }
  }

  // Sample data for conventional credit
  const conventionalCreditData = {
    productive: {
      position: 9000000000,
      interest: 1022000000,
      effectiveRate: 11.35
    },
    consumer: {
      position: 6700000000,
      interest: 659000000,
      effectiveRate: 9.83
    }
  }

  // Sample data for sharia financing
  const shariaFinancingData = {
    productive: {
      position: 2000000000,
      bagiHasil: 200000000,  // Changed from interest to bagiHasil
      effectiveRate: 10
    },
    consumer: {
      position: 1200000000,
      bagiHasil: 108000000,  // Changed from interest to bagiHasil
      effectiveRate: 9
    }
  }

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  // Format percentage
  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`
  }

  // Chart options for productive credit
  const productiveCreditOptions: ApexOptions = {
    chart: {
      type: 'bar'
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['KUR', 'Non-KUR']
    },
    yaxis: {
      title: {
        text: 'Miliar Rupiah'
      },
      labels: {
        formatter: function(value) {
          return (value / 1000000000).toFixed(2)
        }
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function(value) {
          return `Rp ${(value / 1000000000).toFixed(2)} Miliar`
        }
      }
    },
    colors: ['#00E396', '#FEB019', '#FF4560']
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader 
            title='Rincian Kredit/Pembiayaan dan Pendapatan Bunga Kredit' 
            subheader='Data realisasi rincian kredit/pembiayaan berikut dengan pendapatan bunga dan effective rate'
            action={
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  select
                  label='Tahun'
                  value={year}
                  onChange={e => setYear(e.target.value)}
                  sx={{ width: 100 }}
                >
                  {years.map(year => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  label='Bulan'
                  value={month}
                  onChange={e => setMonth(e.target.value)}
                  sx={{ width: 150 }}
                >
                  {months.map(month => (
                    <MenuItem key={month.value} value={month.value}>
                      {month.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            }
          />
          <CardContent>
            <TabContext value={tabValue}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleTabChange} aria-label='credit interest tabs'>
                  <Tab label='Kredit/Pembiayaan Produktif' value='1' />
                  <Tab label='Kredit/Pembiayaan Konsumtif' value='2' />
                  <Tab label='Kredit Konvensional' value='3' />
                  <Tab label='Pembiayaan Syariah' value='4' />
                </TabList>
              </Box>

              {/* Productive Credit/Financing Tab */}
              <TabPanel value='1'>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Posisi Kredit/Pembiayaan Produktif' />
                      <CardContent>
                        <ReactApexcharts 
                          options={productiveCreditOptions} 
                          series={[
                            {
                              name: 'Posisi',
                              data: [
                                productiveCreditData.kur.position,
                                productiveCreditData.nonKur.position
                              ]
                            },
                            {
                              name: 'Pendapatan Bunga',
                              data: [
                                productiveCreditData.kur.interest,
                                productiveCreditData.nonKur.interest
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
                      <CardHeader title='Rincian Kredit/Pembiayaan Produktif' />
                      <CardContent>
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Jenis</TableCell>
                                <TableCell align='right'>Posisi</TableCell>
                                <TableCell align='right'>Pendapatan Bagi Hasil</TableCell>
                                <TableCell align='right'>Effective Rate</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell>KUR</TableCell>
                                <TableCell align='right'>{formatCurrency(productiveCreditData.kur.position)}</TableCell>
                                <TableCell align='right'>{formatCurrency(productiveCreditData.kur.interest)}</TableCell>
                                <TableCell align='right'>{formatPercentage(productiveCreditData.kur.effectiveRate)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Non-KUR</TableCell>
                                <TableCell align='right'>{formatCurrency(productiveCreditData.nonKur.position)}</TableCell>
                                <TableCell align='right'>{formatCurrency(productiveCreditData.nonKur.interest)}</TableCell>
                                <TableCell align='right'>{formatPercentage(productiveCreditData.nonKur.effectiveRate)}</TableCell>
                              </TableRow>
                              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell><strong>Total</strong></TableCell>
                                <TableCell align='right'><strong>{formatCurrency(productiveCreditData.kur.position + productiveCreditData.nonKur.position)}</strong></TableCell>
                                <TableCell align='right'><strong>{formatCurrency(productiveCreditData.kur.interest + productiveCreditData.nonKur.interest)}</strong></TableCell>
                                <TableCell align='right'><strong>{formatPercentage((productiveCreditData.kur.interest + productiveCreditData.nonKur.interest) / (productiveCreditData.kur.position + productiveCreditData.nonKur.position) * 100)}</strong></TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>

              {/* Consumer Credit/Financing Tab */}
              <TabPanel value='2'>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader title='Rincian Kredit/Pembiayaan Konsumtif' />
                      <CardContent>
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Jenis</TableCell>
                                <TableCell align='right'>Posisi</TableCell>
                                <TableCell align='right'>Pendapatan Bagi Hasil</TableCell>
                                <TableCell align='right'>Effective Rate</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell>KPR</TableCell>
                                <TableCell align='right'>{formatCurrency(consumerCreditData.kpr.position)}</TableCell>
                                <TableCell align='right'>{formatCurrency(consumerCreditData.kpr.interest)}</TableCell>
                                <TableCell align='right'>{formatPercentage(consumerCreditData.kpr.effectiveRate)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>KCC Intern</TableCell>
                                <TableCell align='right'>{formatCurrency(consumerCreditData.kccIntern.position)}</TableCell>
                                <TableCell align='right'>{formatCurrency(consumerCreditData.kccIntern.interest)}</TableCell>
                                <TableCell align='right'>{formatPercentage(consumerCreditData.kccIntern.effectiveRate)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Lainnya</TableCell>
                                <TableCell align='right'>{formatCurrency(consumerCreditData.others.position)}</TableCell>
                                <TableCell align='right'>{formatCurrency(consumerCreditData.others.interest)}</TableCell>
                                <TableCell align='right'>{formatPercentage(consumerCreditData.others.effectiveRate)}</TableCell>
                              </TableRow>
                              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell><strong>Total</strong></TableCell>
                                <TableCell align='right'><strong>{formatCurrency(consumerCreditData.kpr.position + consumerCreditData.kccIntern.position + consumerCreditData.others.position)}</strong></TableCell>
                                <TableCell align='right'><strong>{formatCurrency(consumerCreditData.kpr.interest + consumerCreditData.kccIntern.interest + consumerCreditData.others.interest)}</strong></TableCell>
                                <TableCell align='right'><strong>{formatPercentage((consumerCreditData.kpr.interest + consumerCreditData.kccIntern.interest + consumerCreditData.others.interest) / (consumerCreditData.kpr.position + consumerCreditData.kccIntern.position + consumerCreditData.others.position) * 100)}</strong></TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>

              {/* Conventional Credit Tab */}
              <TabPanel value='3'>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader title='Rincian Kredit Konvensional' />
                      <CardContent>
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Jenis</TableCell>
                                <TableCell align='right'>Posisi</TableCell>
                                <TableCell align='right'>Pendapatan Bagi Hasil</TableCell>
                                <TableCell align='right'>Effective Rate</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell>Kredit Produktif</TableCell>
                                <TableCell align='right'>{formatCurrency(conventionalCreditData.productive.position)}</TableCell>
                                <TableCell align='right'>{formatCurrency(conventionalCreditData.productive.interest)}</TableCell>
                                <TableCell align='right'>{formatPercentage(conventionalCreditData.productive.effectiveRate)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Kredit Konsumtif</TableCell>
                                <TableCell align='right'>{formatCurrency(conventionalCreditData.consumer.position)}</TableCell>
                                <TableCell align='right'>{formatCurrency(conventionalCreditData.consumer.interest)}</TableCell>
                                <TableCell align='right'>{formatPercentage(conventionalCreditData.consumer.effectiveRate)}</TableCell>
                              </TableRow>
                              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell><strong>Total</strong></TableCell>
                                <TableCell align='right'><strong>{formatCurrency(conventionalCreditData.productive.position + conventionalCreditData.consumer.position)}</strong></TableCell>
                                <TableCell align='right'><strong>{formatCurrency(conventionalCreditData.productive.interest + conventionalCreditData.consumer.interest)}</strong></TableCell>
                                <TableCell align='right'><strong>{formatPercentage((conventionalCreditData.productive.interest + conventionalCreditData.consumer.interest) / (conventionalCreditData.productive.position + conventionalCreditData.consumer.position) * 100)}</strong></TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>

              {/* Sharia Financing Tab */}
              <TabPanel value='4'>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader title='Rincian Pembiayaan Syariah' />
                      <CardContent>
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Jenis</TableCell>
                                <TableCell align='right'>Posisi</TableCell>
                                <TableCell align='right'>Pendapatan Bagi Hasil</TableCell>
                                <TableCell align='right'>Effective Rate</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell>Pembiayaan Produktif</TableCell>
                                <TableCell align='right'>{formatCurrency(shariaFinancingData.productive.position)}</TableCell>
                                <TableCell align='right'>{formatCurrency(shariaFinancingData.productive.bagiHasil)}</TableCell>
                                <TableCell align='right'>{formatPercentage(shariaFinancingData.productive.effectiveRate)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Pembiayaan Konsumtif</TableCell>
                                <TableCell align='right'>{formatCurrency(shariaFinancingData.consumer.position)}</TableCell>
                                <TableCell align='right'>{formatCurrency(shariaFinancingData.consumer.bagiHasil)}</TableCell>
                                <TableCell align='right'>{formatPercentage(shariaFinancingData.consumer.effectiveRate)}</TableCell>
                              </TableRow>
                              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell><strong>Total</strong></TableCell>
                                <TableCell align='right'><strong>{formatCurrency(shariaFinancingData.productive.position + shariaFinancingData.consumer.position)}</strong></TableCell>
                                <TableCell align='right'><strong>{formatCurrency(shariaFinancingData.productive.bagiHasil + shariaFinancingData.consumer.bagiHasil)}</strong></TableCell>
                                <TableCell align='right'><strong>{formatPercentage((shariaFinancingData.productive.bagiHasil + shariaFinancingData.consumer.bagiHasil) / (shariaFinancingData.productive.position + shariaFinancingData.consumer.position) * 100)}</strong></TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
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

export default CreditInterestPage
