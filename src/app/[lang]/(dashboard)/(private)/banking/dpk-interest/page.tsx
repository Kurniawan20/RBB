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

const DPKInterestPage = () => {
  // States
  const [tabValue, setTabValue] = useState('1')
  const [year, setYear] = useState('2025')
  const [month, setMonth] = useState('5')
  const [dpkType, setDpkType] = useState('conventional')

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

  // Sample data for conventional DPK position
  const conventionalDPKPosition = {
    giro: 8500000000,
    tabungan: 15200000000,
    deposito: 12800000000
  }

  // Sample data for sharia DPK position
  const shariaDPKPosition = {
    giro: 1200000000,
    tabungan: 2500000000,
    deposito: 1800000000
  }

  // Sample data for conventional DPK interest expense
  const conventionalDPKInterest = {
    giro: 85000000,
    tabungan: 304000000,
    deposito: 640000000
  }

  // Sample data for sharia DPK interest expense
  const shariaDPKInterest = {
    giro: 12000000,
    tabungan: 50000000,
    deposito: 90000000
  }

  // Calculate Cost of Fund (CoF) for conventional DPK
  const conventionalDPKCoF = {
    giro: (conventionalDPKInterest.giro / conventionalDPKPosition.giro) * 100,
    tabungan: (conventionalDPKInterest.tabungan / conventionalDPKPosition.tabungan) * 100,
    deposito: (conventionalDPKInterest.deposito / conventionalDPKPosition.deposito) * 100
  }

  // Calculate Cost of Fund (CoF) for sharia DPK
  const shariaDPKCoF = {
    giro: (shariaDPKInterest.giro / shariaDPKPosition.giro) * 100,
    tabungan: (shariaDPKInterest.tabungan / shariaDPKPosition.tabungan) * 100,
    deposito: (shariaDPKInterest.deposito / shariaDPKPosition.deposito) * 100
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

  // Chart options for DPK position
  const dpkPositionOptions: ApexOptions = {
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
      categories: ['Giro', 'Tabungan', 'Deposito']
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

  // Chart options for DPK interest expense
  const dpkInterestOptions: ApexOptions = {
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
      categories: ['Giro', 'Tabungan', 'Deposito']
    },
    yaxis: {
      title: {
        text: 'Juta Rupiah'
      },
      labels: {
        formatter: function(value) {
          return (value / 1000000).toFixed(2)
        }
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function(value) {
          return `Rp ${(value / 1000000).toFixed(2)} Juta`
        }
      }
    },
    colors: ['#FF4560', '#FEB019']
  }

  // Chart options for Cost of Fund
  const cofOptions: ApexOptions = {
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
      categories: ['Giro', 'Tabungan', 'Deposito']
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
    colors: ['#008FFB', '#00E396']
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader 
            title='Dana Pihak Ketiga dan Beban Bunga DPK' 
            subheader='Data realisasi rincian Dana Pihak Ketiga berikut dengan Beban Bunga dan Cost Of Fund'
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
                <TabList onChange={handleTabChange} aria-label='dpk interest tabs'>
                  <Tab label='Posisi DPK' value='1' />
                  <Tab label='Beban Bunga DPK' value='2' />
                  <Tab label='Cost of Fund (CoF)' value='3' />
                </TabList>
              </Box>

              {/* DPK Position Tab */}
              <TabPanel value='1'>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Posisi Dana Pihak Ketiga' />
                      <CardContent>
                        <ReactApexcharts 
                          options={dpkPositionOptions} 
                          series={[
                            {
                              name: 'Konvensional',
                              data: [
                                conventionalDPKPosition.giro,
                                conventionalDPKPosition.tabungan,
                                conventionalDPKPosition.deposito
                              ]
                            },
                            {
                              name: 'Syariah',
                              data: [
                                shariaDPKPosition.giro,
                                shariaDPKPosition.tabungan,
                                shariaDPKPosition.deposito
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
                      <CardHeader title='Rincian Posisi Dana Pihak Ketiga' />
                      <CardContent>
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Jenis</TableCell>
                                <TableCell align='right'>Konvensional</TableCell>
                                <TableCell align='right'>Syariah</TableCell>
                                <TableCell align='right'>Total</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell>Giro</TableCell>
                                <TableCell align='right'>{formatCurrency(conventionalDPKPosition.giro)}</TableCell>
                                <TableCell align='right'>{formatCurrency(shariaDPKPosition.giro)}</TableCell>
                                <TableCell align='right'>{formatCurrency(conventionalDPKPosition.giro + shariaDPKPosition.giro)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Tabungan</TableCell>
                                <TableCell align='right'>{formatCurrency(conventionalDPKPosition.tabungan)}</TableCell>
                                <TableCell align='right'>{formatCurrency(shariaDPKPosition.tabungan)}</TableCell>
                                <TableCell align='right'>{formatCurrency(conventionalDPKPosition.tabungan + shariaDPKPosition.tabungan)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Deposito</TableCell>
                                <TableCell align='right'>{formatCurrency(conventionalDPKPosition.deposito)}</TableCell>
                                <TableCell align='right'>{formatCurrency(shariaDPKPosition.deposito)}</TableCell>
                                <TableCell align='right'>{formatCurrency(conventionalDPKPosition.deposito + shariaDPKPosition.deposito)}</TableCell>
                              </TableRow>
                              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell><strong>Total</strong></TableCell>
                                <TableCell align='right'><strong>{formatCurrency(
                                  conventionalDPKPosition.giro + 
                                  conventionalDPKPosition.tabungan + 
                                  conventionalDPKPosition.deposito
                                )}</strong></TableCell>
                                <TableCell align='right'><strong>{formatCurrency(
                                  shariaDPKPosition.giro + 
                                  shariaDPKPosition.tabungan + 
                                  shariaDPKPosition.deposito
                                )}</strong></TableCell>
                                <TableCell align='right'><strong>{formatCurrency(
                                  conventionalDPKPosition.giro + 
                                  conventionalDPKPosition.tabungan + 
                                  conventionalDPKPosition.deposito +
                                  shariaDPKPosition.giro + 
                                  shariaDPKPosition.tabungan + 
                                  shariaDPKPosition.deposito
                                )}</strong></TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>

              {/* DPK Interest Expense Tab */}
              <TabPanel value='2'>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Beban Bunga Dana Pihak Ketiga' />
                      <CardContent>
                        <ReactApexcharts 
                          options={dpkInterestOptions} 
                          series={[
                            {
                              name: 'Konvensional',
                              data: [
                                conventionalDPKInterest.giro,
                                conventionalDPKInterest.tabungan,
                                conventionalDPKInterest.deposito
                              ]
                            },
                            {
                              name: 'Syariah',
                              data: [
                                shariaDPKInterest.giro,
                                shariaDPKInterest.tabungan,
                                shariaDPKInterest.deposito
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
                      <CardHeader title='Rincian Beban Bunga Dana Pihak Ketiga' />
                      <CardContent>
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Jenis</TableCell>
                                <TableCell align='right'>Konvensional</TableCell>
                                <TableCell align='right'>Syariah</TableCell>
                                <TableCell align='right'>Total</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell>Giro</TableCell>
                                <TableCell align='right'>{formatCurrency(conventionalDPKInterest.giro)}</TableCell>
                                <TableCell align='right'>{formatCurrency(shariaDPKInterest.giro)}</TableCell>
                                <TableCell align='right'>{formatCurrency(conventionalDPKInterest.giro + shariaDPKInterest.giro)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Tabungan</TableCell>
                                <TableCell align='right'>{formatCurrency(conventionalDPKInterest.tabungan)}</TableCell>
                                <TableCell align='right'>{formatCurrency(shariaDPKInterest.tabungan)}</TableCell>
                                <TableCell align='right'>{formatCurrency(conventionalDPKInterest.tabungan + shariaDPKInterest.tabungan)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Deposito</TableCell>
                                <TableCell align='right'>{formatCurrency(conventionalDPKInterest.deposito)}</TableCell>
                                <TableCell align='right'>{formatCurrency(shariaDPKInterest.deposito)}</TableCell>
                                <TableCell align='right'>{formatCurrency(conventionalDPKInterest.deposito + shariaDPKInterest.deposito)}</TableCell>
                              </TableRow>
                              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell><strong>Total</strong></TableCell>
                                <TableCell align='right'><strong>{formatCurrency(
                                  conventionalDPKInterest.giro + 
                                  conventionalDPKInterest.tabungan + 
                                  conventionalDPKInterest.deposito
                                )}</strong></TableCell>
                                <TableCell align='right'><strong>{formatCurrency(
                                  shariaDPKInterest.giro + 
                                  shariaDPKInterest.tabungan + 
                                  shariaDPKInterest.deposito
                                )}</strong></TableCell>
                                <TableCell align='right'><strong>{formatCurrency(
                                  conventionalDPKInterest.giro + 
                                  conventionalDPKInterest.tabungan + 
                                  conventionalDPKInterest.deposito +
                                  shariaDPKInterest.giro + 
                                  shariaDPKInterest.tabungan + 
                                  shariaDPKInterest.deposito
                                )}</strong></TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>

              {/* Cost of Fund Tab */}
              <TabPanel value='3'>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Cost of Fund (CoF) Dana Pihak Ketiga' />
                      <CardContent>
                        <ReactApexcharts 
                          options={cofOptions} 
                          series={[
                            {
                              name: 'Konvensional',
                              data: [
                                conventionalDPKCoF.giro,
                                conventionalDPKCoF.tabungan,
                                conventionalDPKCoF.deposito
                              ]
                            },
                            {
                              name: 'Syariah',
                              data: [
                                shariaDPKCoF.giro,
                                shariaDPKCoF.tabungan,
                                shariaDPKCoF.deposito
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
                      <CardHeader title='Rincian Cost of Fund (CoF) Dana Pihak Ketiga' />
                      <CardContent>
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Jenis</TableCell>
                                <TableCell align='right'>Konvensional</TableCell>
                                <TableCell align='right'>Syariah</TableCell>
                                <TableCell align='right'>Rata-rata</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell>Giro</TableCell>
                                <TableCell align='right'>{formatPercentage(conventionalDPKCoF.giro)}</TableCell>
                                <TableCell align='right'>{formatPercentage(shariaDPKCoF.giro)}</TableCell>
                                <TableCell align='right'>{formatPercentage(
                                  (conventionalDPKInterest.giro + shariaDPKInterest.giro) / 
                                  (conventionalDPKPosition.giro + shariaDPKPosition.giro) * 100
                                )}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Tabungan</TableCell>
                                <TableCell align='right'>{formatPercentage(conventionalDPKCoF.tabungan)}</TableCell>
                                <TableCell align='right'>{formatPercentage(shariaDPKCoF.tabungan)}</TableCell>
                                <TableCell align='right'>{formatPercentage(
                                  (conventionalDPKInterest.tabungan + shariaDPKInterest.tabungan) / 
                                  (conventionalDPKPosition.tabungan + shariaDPKPosition.tabungan) * 100
                                )}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Deposito</TableCell>
                                <TableCell align='right'>{formatPercentage(conventionalDPKCoF.deposito)}</TableCell>
                                <TableCell align='right'>{formatPercentage(shariaDPKCoF.deposito)}</TableCell>
                                <TableCell align='right'>{formatPercentage(
                                  (conventionalDPKInterest.deposito + shariaDPKInterest.deposito) / 
                                  (conventionalDPKPosition.deposito + shariaDPKPosition.deposito) * 100
                                )}</TableCell>
                              </TableRow>
                              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell><strong>Rata-rata</strong></TableCell>
                                <TableCell align='right'><strong>{formatPercentage(
                                  (conventionalDPKInterest.giro + conventionalDPKInterest.tabungan + conventionalDPKInterest.deposito) / 
                                  (conventionalDPKPosition.giro + conventionalDPKPosition.tabungan + conventionalDPKPosition.deposito) * 100
                                )}</strong></TableCell>
                                <TableCell align='right'><strong>{formatPercentage(
                                  (shariaDPKInterest.giro + shariaDPKInterest.tabungan + shariaDPKInterest.deposito) / 
                                  (shariaDPKPosition.giro + shariaDPKPosition.tabungan + shariaDPKPosition.deposito) * 100
                                )}</strong></TableCell>
                                <TableCell align='right'><strong>{formatPercentage(
                                  (conventionalDPKInterest.giro + conventionalDPKInterest.tabungan + conventionalDPKInterest.deposito +
                                   shariaDPKInterest.giro + shariaDPKInterest.tabungan + shariaDPKInterest.deposito) / 
                                  (conventionalDPKPosition.giro + conventionalDPKPosition.tabungan + conventionalDPKPosition.deposito +
                                   shariaDPKPosition.giro + shariaDPKPosition.tabungan + shariaDPKPosition.deposito) * 100
                                )}</strong></TableCell>
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

export default DPKInterestPage
