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
import Divider from '@mui/material/Divider'

// Third-party Imports
import type { ApexOptions } from 'apexcharts'

// Component Imports
import ReactApexcharts from 'react-apexcharts'

const SecondaryReservePage = () => {
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

  // Sample data for sources of Secondary Reserve funds
  const sourcesData = [
    { name: 'Kewajiban kepada bank lain', value: 12500000000 },
    { name: 'Pinjaman Diterima', value: 8200000000 },
    { name: 'Setoran Jaminan', value: 3500000000 },
    { name: 'Modal Disetor', value: 25000000000 },
    { name: 'Rupa-Rupa Pasiva', value: 4200000000 },
    { name: 'Dana Setoran Modal', value: 7500000000 },
    { name: 'Perkiraan Tambahan Setoran Modal', value: 5000000000 },
    { name: 'Selisih Revaluasi Aset Tetap', value: 3800000000 }
  ]

  // Sample data for deduction factors
  const deductionFactorsData = [
    { name: 'Aktiva Tetap dan Inventaris', value: 15200000000 },
    { name: 'Aktiva Tidak Berwujud', value: 2800000000 },
    { name: 'CKPN', value: 5500000000 },
    { name: 'Aset Pajak Tangguhan', value: 1200000000 },
    { name: 'Properti Terbengkalai', value: 800000000 },
    { name: 'Rekening Tunda', value: 500000000 }
  ]

  // Sample data for placement types
  const placementTypesData = [
    { 
      name: 'Penempatan pada Bank Indonesia', 
      value: 18500000000,
      income: 925000000,
      effectiveRate: 5.0
    },
    { 
      name: 'Surat-Surat Berharga', 
      value: 12000000000,
      income: 840000000,
      effectiveRate: 7.0
    },
    { 
      name: 'Surat Berharga yang dijual Kembali', 
      value: 5500000000,
      income: 330000000,
      effectiveRate: 6.0
    },
    { 
      name: 'Penempatan Antar Bank', 
      value: 8000000000,
      income: 560000000,
      effectiveRate: 7.0
    }
  ]

  // Calculate total sources
  const totalSources = sourcesData.reduce((sum, item) => sum + item.value, 0)

  // Calculate total deductions
  const totalDeductions = deductionFactorsData.reduce((sum, item) => sum + item.value, 0)

  // Calculate net available funds
  const netAvailableFunds = totalSources - totalDeductions

  // Calculate total placements
  const totalPlacements = placementTypesData.reduce((sum, item) => sum + item.value, 0)

  // Calculate total income
  const totalIncome = placementTypesData.reduce((sum, item) => sum + item.income, 0)

  // Calculate weighted average effective rate
  const weightedAvgEffRate = totalIncome / totalPlacements * 100

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

  // Chart options for sources
  const sourcesChartOptions: ApexOptions = {
    chart: {
      type: 'pie'
    },
    labels: sourcesData.map(item => item.name),
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

  // Chart options for deduction factors
  const deductionsChartOptions: ApexOptions = {
    chart: {
      type: 'pie'
    },
    labels: deductionFactorsData.map(item => item.name),
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

  // Chart options for placement types
  const placementsChartOptions: ApexOptions = {
    chart: {
      type: 'bar'
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
      categories: placementTypesData.map(item => item.name)
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
    colors: ['#00E396', '#FEB019']
  }

  // Chart options for effective rates
  const effectiveRatesChartOptions: ApexOptions = {
    chart: {
      type: 'bar'
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
      categories: placementTypesData.map(item => item.name)
    },
    yaxis: {
      title: {
        text: 'Persentase (%)'
      },
      labels: {
        formatter: function(value) {
          return value.toFixed(2) + '%'
        }
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function(value) {
          return value.toFixed(2) + '%'
        }
      }
    },
    colors: ['#775DD0']
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader 
            title='Secondary Reserve' 
            subheader='Data realisasi Secondary Reserve Bank berikut dengan jumlah pendapatan dan effective rate'
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
                <TabList onChange={handleTabChange} aria-label='secondary reserve tabs'>
                  <Tab label='Sumber Dana' value='1' />
                  <Tab label='Faktor Pengurang' value='2' />
                  <Tab label='Penempatan Dana' value='3' />
                  <Tab label='Pendapatan & Eff Rate' value='4' />
                  <Tab label='Ringkasan' value='5' />
                </TabList>
              </Box>

              {/* Sources Tab */}
              <TabPanel value='1'>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Sumber Dana Kelolaan Secondary Reserve' />
                      <CardContent>
                        <ReactApexcharts 
                          options={sourcesChartOptions} 
                          series={sourcesData.map(item => item.value)} 
                          type='pie' 
                          height={350} 
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Rincian Sumber Dana Kelolaan Secondary Reserve' />
                      <CardContent>
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Sumber Dana</TableCell>
                                <TableCell align='right'>Nilai</TableCell>
                                <TableCell align='right'>Persentase</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {sourcesData.map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell>{item.name}</TableCell>
                                  <TableCell align='right'>{formatCurrency(item.value)}</TableCell>
                                  <TableCell align='right'>{formatPercentage((item.value / totalSources) * 100)}</TableCell>
                                </TableRow>
                              ))}
                              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell><strong>Total</strong></TableCell>
                                <TableCell align='right'><strong>{formatCurrency(totalSources)}</strong></TableCell>
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

              {/* Deduction Factors Tab */}
              <TabPanel value='2'>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Faktor Pengurang Dana Kelolaan Secondary Reserve' />
                      <CardContent>
                        <ReactApexcharts 
                          options={deductionsChartOptions} 
                          series={deductionFactorsData.map(item => item.value)} 
                          type='pie' 
                          height={350} 
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Rincian Faktor Pengurang Dana Kelolaan Secondary Reserve' />
                      <CardContent>
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Faktor Pengurang</TableCell>
                                <TableCell align='right'>Nilai</TableCell>
                                <TableCell align='right'>Persentase</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {deductionFactorsData.map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell>{item.name}</TableCell>
                                  <TableCell align='right'>{formatCurrency(item.value)}</TableCell>
                                  <TableCell align='right'>{formatPercentage((item.value / totalDeductions) * 100)}</TableCell>
                                </TableRow>
                              ))}
                              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell><strong>Total</strong></TableCell>
                                <TableCell align='right'><strong>{formatCurrency(totalDeductions)}</strong></TableCell>
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

              {/* Placement Types Tab */}
              <TabPanel value='3'>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Jenis Penempatan Dana Secondary Reserve' />
                      <CardContent>
                        <ReactApexcharts 
                          options={placementsChartOptions} 
                          series={[
                            {
                              name: 'Nilai Penempatan',
                              data: placementTypesData.map(item => item.value)
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
                      <CardHeader title='Rincian Penempatan Dana Secondary Reserve' />
                      <CardContent>
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Jenis Penempatan</TableCell>
                                <TableCell align='right'>Nilai</TableCell>
                                <TableCell align='right'>Persentase</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {placementTypesData.map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell>{item.name}</TableCell>
                                  <TableCell align='right'>{formatCurrency(item.value)}</TableCell>
                                  <TableCell align='right'>{formatPercentage((item.value / totalPlacements) * 100)}</TableCell>
                                </TableRow>
                              ))}
                              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell><strong>Total</strong></TableCell>
                                <TableCell align='right'><strong>{formatCurrency(totalPlacements)}</strong></TableCell>
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

              {/* Income & Effective Rate Tab */}
              <TabPanel value='4'>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Effective Rate Penempatan Dana Secondary Reserve' />
                      <CardContent>
                        <ReactApexcharts 
                          options={effectiveRatesChartOptions} 
                          series={[
                            {
                              name: 'Effective Rate',
                              data: placementTypesData.map(item => item.effectiveRate)
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
                      <CardHeader title='Rincian Pendapatan dan Effective Rate Secondary Reserve' />
                      <CardContent>
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Jenis Penempatan</TableCell>
                                <TableCell align='right'>Pendapatan</TableCell>
                                <TableCell align='right'>Effective Rate</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {placementTypesData.map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell>{item.name}</TableCell>
                                  <TableCell align='right'>{formatCurrency(item.income)}</TableCell>
                                  <TableCell align='right'>{formatPercentage(item.effectiveRate)}</TableCell>
                                </TableRow>
                              ))}
                              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell><strong>Total / Rata-rata</strong></TableCell>
                                <TableCell align='right'><strong>{formatCurrency(totalIncome)}</strong></TableCell>
                                <TableCell align='right'><strong>{formatPercentage(weightedAvgEffRate)}</strong></TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>

              {/* Summary Tab */}
              <TabPanel value='5'>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader title='Ringkasan Secondary Reserve' />
                      <CardContent>
                        <Box sx={{ mb: 4 }}>
                          <Typography variant='h6' sx={{ mb: 2 }}>Perhitungan Dana Kelolaan Secondary Reserve</Typography>
                          <TableContainer component={Paper}>
                            <Table>
                              <TableBody>
                                <TableRow>
                                  <TableCell><strong>Total Sumber Dana</strong></TableCell>
                                  <TableCell align='right'>{formatCurrency(totalSources)}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell><strong>Total Faktor Pengurang</strong></TableCell>
                                  <TableCell align='right'>({formatCurrency(totalDeductions)})</TableCell>
                                </TableRow>
                                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                  <TableCell><strong>Dana Tersedia untuk Secondary Reserve</strong></TableCell>
                                  <TableCell align='right'><strong>{formatCurrency(netAvailableFunds)}</strong></TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Box>

                        <Divider sx={{ my: 4 }} />

                        <Box sx={{ mb: 4 }}>
                          <Typography variant='h6' sx={{ mb: 2 }}>Realisasi Penempatan Dana Secondary Reserve</Typography>
                          <TableContainer component={Paper}>
                            <Table>
                              <TableBody>
                                <TableRow>
                                  <TableCell><strong>Total Dana Tersedia</strong></TableCell>
                                  <TableCell align='right'>{formatCurrency(netAvailableFunds)}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell><strong>Total Penempatan</strong></TableCell>
                                  <TableCell align='right'>{formatCurrency(totalPlacements)}</TableCell>
                                </TableRow>
                                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                  <TableCell><strong>Persentase Penempatan</strong></TableCell>
                                  <TableCell align='right'><strong>{formatPercentage((totalPlacements / netAvailableFunds) * 100)}</strong></TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Box>

                        <Divider sx={{ my: 4 }} />

                        <Box>
                          <Typography variant='h6' sx={{ mb: 2 }}>Pendapatan Secondary Reserve</Typography>
                          <TableContainer component={Paper}>
                            <Table>
                              <TableBody>
                                <TableRow>
                                  <TableCell><strong>Total Pendapatan</strong></TableCell>
                                  <TableCell align='right'>{formatCurrency(totalIncome)}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell><strong>Rata-rata Effective Rate</strong></TableCell>
                                  <TableCell align='right'>{formatPercentage(weightedAvgEffRate)}</TableCell>
                                </TableRow>
                                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                  <TableCell><strong>Yield on Secondary Reserve</strong></TableCell>
                                  <TableCell align='right'><strong>{formatPercentage((totalIncome / netAvailableFunds) * 100)}</strong></TableCell>
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
            </TabContext>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default SecondaryReservePage
