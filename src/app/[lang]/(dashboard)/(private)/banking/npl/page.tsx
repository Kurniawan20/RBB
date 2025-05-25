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
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
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

const NPLPage = () => {
  // States
  const [tabValue, setTabValue] = useState('1')
  const [year, setYear] = useState('2025')
  const [month, setMonth] = useState('5')


  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue)
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

  // Collectibility categories
  const collectibilityCategories = [
    { id: 1, name: 'Lancar' },
    { id: 2, name: 'Dalam Perhatian Khusus' },
    { id: 3, name: 'Kurang Lancar' },
    { id: 4, name: 'Diragukan' },
    { id: 5, name: 'Macet' }
  ]

  // Sample data for conventional credit by collectibility
  const conventionalCreditByCollectibility = [
    { collectibility: 1, amount: 25000000000, percentage: 83.33 },
    { collectibility: 2, amount: 2500000000, percentage: 8.33 },
    { collectibility: 3, amount: 1000000000, percentage: 3.33 },
    { collectibility: 4, amount: 500000000, percentage: 1.67 },
    { collectibility: 5, amount: 1000000000, percentage: 3.33 }
  ]

  // Sample data for sharia financing by collectibility
  const shariaFinancingByCollectibility = [
    { collectibility: 1, amount: 3500000000, percentage: 87.5 },
    { collectibility: 2, amount: 250000000, percentage: 6.25 },
    { collectibility: 3, amount: 100000000, percentage: 2.5 },
    { collectibility: 4, amount: 50000000, percentage: 1.25 },
    { collectibility: 5, amount: 100000000, percentage: 2.5 }
  ]

  // Sample data for conventional restructured credit by collectibility
  const conventionalRestructuredByCollectibility = [
    { collectibility: 1, amount: 1500000000, percentage: 60.0 },
    { collectibility: 2, amount: 500000000, percentage: 20.0 },
    { collectibility: 3, amount: 250000000, percentage: 10.0 },
    { collectibility: 4, amount: 125000000, percentage: 5.0 },
    { collectibility: 5, amount: 125000000, percentage: 5.0 }
  ]

  // Sample data for sharia restructured financing by collectibility
  const shariaRestructuredByCollectibility = [
    { collectibility: 1, amount: 200000000, percentage: 66.67 },
    { collectibility: 2, amount: 50000000, percentage: 16.67 },
    { collectibility: 3, amount: 25000000, percentage: 8.33 },
    { collectibility: 4, amount: 12500000, percentage: 4.17 },
    { collectibility: 5, amount: 12500000, percentage: 4.17 }
  ]

  // Sample data for conventional LAR by collectibility
  const conventionalLARByCollectibility = [
    { collectibility: 1, amount: 0, percentage: 0 },
    { collectibility: 2, amount: 2500000000, percentage: 50.0 },
    { collectibility: 3, amount: 1000000000, percentage: 20.0 },
    { collectibility: 4, amount: 500000000, percentage: 10.0 },
    { collectibility: 5, amount: 1000000000, percentage: 20.0 }
  ]

  // Sample data for sharia LAR by collectibility
  const shariaLARByCollectibility = [
    { collectibility: 1, amount: 0, percentage: 0 },
    { collectibility: 2, amount: 250000000, percentage: 50.0 },
    { collectibility: 3, amount: 100000000, percentage: 20.0 },
    { collectibility: 4, amount: 50000000, percentage: 10.0 },
    { collectibility: 5, amount: 100000000, percentage: 20.0 }
  ]

  // Calculate NPL (Collectibility 3-5) for conventional credit
  const conventionalNPL = conventionalCreditByCollectibility
    .filter(item => item.collectibility >= 3)
    .reduce((sum, item) => sum + item.amount, 0)

  // Calculate total conventional credit
  const totalConventionalCredit = conventionalCreditByCollectibility
    .reduce((sum, item) => sum + item.amount, 0)

  // Calculate NPL (Collectibility 3-5) for sharia financing
  const shariaNPL = shariaFinancingByCollectibility
    .filter(item => item.collectibility >= 3)
    .reduce((sum, item) => sum + item.amount, 0)

  // Calculate total sharia financing
  const totalShariaFinancing = shariaFinancingByCollectibility
    .reduce((sum, item) => sum + item.amount, 0)

  // Calculate total NPL
  const totalNPL = conventionalNPL + shariaNPL

  // Calculate total credit/financing
  const totalCreditFinancing = totalConventionalCredit + totalShariaFinancing

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

  // Chart options for credit by collectibility
  const creditByCollectibilityOptions: ApexOptions = {
    chart: {
      type: 'bar',
      stacked: false
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%'
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
      categories: collectibilityCategories.map(cat => `Kol-${cat.id} (${cat.name})`)
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
    colors: ['#00E396', '#775DD0']
  }

  // Chart options for NPL ratio
  const nplRatioOptions: ApexOptions = {
    chart: {
      type: 'pie'
    },
    labels: ['NPL', 'Performing Loans'],
    colors: ['#FF4560', '#00E396'],
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

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader 
            title='Non-Performing Loans (NPL)' 
            subheader='Data realisasi kualitas Kredit/Pembiayaan berdasarkan Kolektibilitas'
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
                <TabList onChange={handleTabChange} aria-label='npl tabs'>
                  <Tab label='Kredit/Pembiayaan berdasarkan Kolektibilitas' value='1' />
                  <Tab label='Restrukturisasi Kredit/Pembiayaan' value='2' />
                  <Tab label='Loan at Risk (LAR)' value='3' />
                  <Tab label='Ringkasan NPL' value='4' />
                </TabList>
              </Box>

              {/* Credit/Financing by Collectibility Tab */}
              <TabPanel value='1'>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Kredit/Pembiayaan berdasarkan Kolektibilitas' />
                      <CardContent>
                        <ReactApexcharts 
                          options={creditByCollectibilityOptions} 
                          series={[
                            {
                              name: 'Konvensional',
                              data: conventionalCreditByCollectibility.map(item => item.amount)
                            },
                            {
                              name: 'Syariah',
                              data: shariaFinancingByCollectibility.map(item => item.amount)
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
                      <CardHeader title='Rincian Kredit/Pembiayaan berdasarkan Kolektibilitas' />
                      <CardContent>
                        <Box sx={{ mb: 4 }}>
                          <Typography variant='h6' sx={{ mb: 2 }}>Kredit Konvensional</Typography>
                          <TableContainer component={Paper}>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell>Kolektibilitas</TableCell>
                                  <TableCell>Kategori</TableCell>
                                  <TableCell align='right'>Nilai</TableCell>
                                  <TableCell align='right'>Persentase</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {conventionalCreditByCollectibility.map((item, index) => (
                                  <TableRow 
                                    key={index}
                                    sx={item.collectibility >= 3 ? { backgroundColor: '#ffebee' } : {}}
                                  >
                                    <TableCell>{item.collectibility}</TableCell>
                                    <TableCell>{collectibilityCategories.find(cat => cat.id === item.collectibility)?.name}</TableCell>
                                    <TableCell align='right'>{formatCurrency(item.amount)}</TableCell>
                                    <TableCell align='right'>{formatPercentage(item.percentage)}</TableCell>
                                  </TableRow>
                                ))}
                                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                  <TableCell colSpan={2}><strong>Total</strong></TableCell>
                                  <TableCell align='right'><strong>{formatCurrency(totalConventionalCredit)}</strong></TableCell>
                                  <TableCell align='right'><strong>100.00%</strong></TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Box>

                        <Box>
                          <Typography variant='h6' sx={{ mb: 2 }}>Pembiayaan Syariah</Typography>
                          <TableContainer component={Paper}>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell>Kolektibilitas</TableCell>
                                  <TableCell>Kategori</TableCell>
                                  <TableCell align='right'>Nilai</TableCell>
                                  <TableCell align='right'>Persentase</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {shariaFinancingByCollectibility.map((item, index) => (
                                  <TableRow 
                                    key={index}
                                    sx={item.collectibility >= 3 ? { backgroundColor: '#ffebee' } : {}}
                                  >
                                    <TableCell>{item.collectibility}</TableCell>
                                    <TableCell>{collectibilityCategories.find(cat => cat.id === item.collectibility)?.name}</TableCell>
                                    <TableCell align='right'>{formatCurrency(item.amount)}</TableCell>
                                    <TableCell align='right'>{formatPercentage(item.percentage)}</TableCell>
                                  </TableRow>
                                ))}
                                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                  <TableCell colSpan={2}><strong>Total</strong></TableCell>
                                  <TableCell align='right'><strong>{formatCurrency(totalShariaFinancing)}</strong></TableCell>
                                  <TableCell align='right'><strong>100.00%</strong></TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>

              {/* Restructured Credit/Financing Tab */}
              <TabPanel value='2'>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Restrukturisasi Kredit Konvensional berdasarkan Kolektibilitas' />
                      <CardContent>
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Kolektibilitas</TableCell>
                                <TableCell>Kategori</TableCell>
                                <TableCell align='right'>Nilai</TableCell>
                                <TableCell align='right'>Persentase</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {conventionalRestructuredByCollectibility.map((item, index) => (
                                <TableRow 
                                  key={index}
                                  sx={item.collectibility >= 3 ? { backgroundColor: '#ffebee' } : {}}
                                >
                                  <TableCell>{item.collectibility}</TableCell>
                                  <TableCell>{collectibilityCategories.find(cat => cat.id === item.collectibility)?.name}</TableCell>
                                  <TableCell align='right'>{formatCurrency(item.amount)}</TableCell>
                                  <TableCell align='right'>{formatPercentage(item.percentage)}</TableCell>
                                </TableRow>
                              ))}
                              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell colSpan={2}><strong>Total</strong></TableCell>
                                <TableCell align='right'><strong>{formatCurrency(
                                  conventionalRestructuredByCollectibility.reduce((sum, item) => sum + item.amount, 0)
                                )}</strong></TableCell>
                                <TableCell align='right'><strong>100.00%</strong></TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Restrukturisasi Pembiayaan Syariah berdasarkan Kolektibilitas' />
                      <CardContent>
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Kolektibilitas</TableCell>
                                <TableCell>Kategori</TableCell>
                                <TableCell align='right'>Nilai</TableCell>
                                <TableCell align='right'>Persentase</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {shariaRestructuredByCollectibility.map((item, index) => (
                                <TableRow 
                                  key={index}
                                  sx={item.collectibility >= 3 ? { backgroundColor: '#ffebee' } : {}}
                                >
                                  <TableCell>{item.collectibility}</TableCell>
                                  <TableCell>{collectibilityCategories.find(cat => cat.id === item.collectibility)?.name}</TableCell>
                                  <TableCell align='right'>{formatCurrency(item.amount)}</TableCell>
                                  <TableCell align='right'>{formatPercentage(item.percentage)}</TableCell>
                                </TableRow>
                              ))}
                              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell colSpan={2}><strong>Total</strong></TableCell>
                                <TableCell align='right'><strong>{formatCurrency(
                                  shariaRestructuredByCollectibility.reduce((sum, item) => sum + item.amount, 0)
                                )}</strong></TableCell>
                                <TableCell align='right'><strong>100.00%</strong></TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>

              {/* Loan at Risk (LAR) Tab */}
              <TabPanel value='3'>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Loan at Risk (LAR) Konvensional berdasarkan Kolektibilitas' />
                      <CardContent>
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Kolektibilitas</TableCell>
                                <TableCell>Kategori</TableCell>
                                <TableCell align='right'>Nilai</TableCell>
                                <TableCell align='right'>Persentase</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {conventionalLARByCollectibility.map((item, index) => (
                                <TableRow 
                                  key={index}
                                  sx={item.collectibility >= 3 ? { backgroundColor: '#ffebee' } : {}}
                                >
                                  <TableCell>{item.collectibility}</TableCell>
                                  <TableCell>{collectibilityCategories.find(cat => cat.id === item.collectibility)?.name}</TableCell>
                                  <TableCell align='right'>{formatCurrency(item.amount)}</TableCell>
                                  <TableCell align='right'>{formatPercentage(item.percentage)}</TableCell>
                                </TableRow>
                              ))}
                              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell colSpan={2}><strong>Total</strong></TableCell>
                                <TableCell align='right'><strong>{formatCurrency(
                                  conventionalLARByCollectibility.reduce((sum, item) => sum + item.amount, 0)
                                )}</strong></TableCell>
                                <TableCell align='right'><strong>100.00%</strong></TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Loan at Risk (LAR) Syariah berdasarkan Kolektibilitas' />
                      <CardContent>
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Kolektibilitas</TableCell>
                                <TableCell>Kategori</TableCell>
                                <TableCell align='right'>Nilai</TableCell>
                                <TableCell align='right'>Persentase</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {shariaLARByCollectibility.map((item, index) => (
                                <TableRow 
                                  key={index}
                                  sx={item.collectibility >= 3 ? { backgroundColor: '#ffebee' } : {}}
                                >
                                  <TableCell>{item.collectibility}</TableCell>
                                  <TableCell>{collectibilityCategories.find(cat => cat.id === item.collectibility)?.name}</TableCell>
                                  <TableCell align='right'>{formatCurrency(item.amount)}</TableCell>
                                  <TableCell align='right'>{formatPercentage(item.percentage)}</TableCell>
                                </TableRow>
                              ))}
                              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell colSpan={2}><strong>Total</strong></TableCell>
                                <TableCell align='right'><strong>{formatCurrency(
                                  shariaLARByCollectibility.reduce((sum, item) => sum + item.amount, 0)
                                )}</strong></TableCell>
                                <TableCell align='right'><strong>100.00%</strong></TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>

              {/* NPL Summary Tab */}
              <TabPanel value='4'>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Rasio NPL' />
                      <CardContent>
                        <ReactApexcharts 
                          options={nplRatioOptions} 
                          series={[totalNPL, totalCreditFinancing - totalNPL]} 
                          type='pie' 
                          height={350} 
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Ringkasan NPL' />
                      <CardContent>
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Kategori</TableCell>
                                <TableCell align='right'>Konvensional</TableCell>
                                <TableCell align='right'>Syariah</TableCell>
                                <TableCell align='right'>Total</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell>Total Kredit/Pembiayaan</TableCell>
                                <TableCell align='right'>{formatCurrency(totalConventionalCredit)}</TableCell>
                                <TableCell align='right'>{formatCurrency(totalShariaFinancing)}</TableCell>
                                <TableCell align='right'>{formatCurrency(totalCreditFinancing)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>NPL (Kol 3-5)</TableCell>
                                <TableCell align='right'>{formatCurrency(conventionalNPL)}</TableCell>
                                <TableCell align='right'>{formatCurrency(shariaNPL)}</TableCell>
                                <TableCell align='right'>{formatCurrency(totalNPL)}</TableCell>
                              </TableRow>
                              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell><strong>Rasio NPL</strong></TableCell>
                                <TableCell align='right'><strong>{formatPercentage((conventionalNPL / totalConventionalCredit) * 100)}</strong></TableCell>
                                <TableCell align='right'><strong>{formatPercentage((shariaNPL / totalShariaFinancing) * 100)}</strong></TableCell>
                                <TableCell align='right'><strong>{formatPercentage((totalNPL / totalCreditFinancing) * 100)}</strong></TableCell>
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

export default NPLPage
