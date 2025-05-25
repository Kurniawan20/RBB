'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

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

const ATMRPage = () => {
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

  // Sample data for ATMR Kredit - Eksposur Aset
  const atmrKreditAset = [
    { item: 'Tagihan kepada Pemerintah Indonesia', amount: 0, riskWeight: 0, atmr: 0 },
    { item: 'Tagihan kepada Entitas Sektor Publik', amount: 250000000000, riskWeight: 20, atmr: 50000000000 },
    { item: 'Tagihan Jangka Pendek', amount: 150000000000, riskWeight: 20, atmr: 30000000000 },
    { item: 'Tagihan Jangka Panjang', amount: 300000000000, riskWeight: 50, atmr: 150000000000 },
    { item: 'Kredit Beragun Rumah Tinggal', amount: 500000000000, riskWeight: 35, atmr: 175000000000 },
    { item: 'Kredit Beragun Properti Komersial', amount: 400000000000, riskWeight: 100, atmr: 400000000000 },
    { item: 'Kredit untuk Pengadaan Tanah, Pengolahan Tanah, dan Konstruksi', amount: 350000000000, riskWeight: 100, atmr: 350000000000 },
    { item: 'Kredit kepada Pegawai/Pensiunan', amount: 200000000000, riskWeight: 50, atmr: 100000000000 },
    { item: 'Tagihan kepada Usaha Mikro, Usaha Kecil dan Usaha Menengah', amount: 600000000000, riskWeight: 75, atmr: 450000000000 },
    { item: 'Tagihan kepada Korporasi', amount: 800000000000, riskWeight: 100, atmr: 800000000000 },
    { item: 'Tagihan yang telah jatuh tempo - Kredit Beragun Rumah Tinggal', amount: 50000000000, riskWeight: 100, atmr: 50000000000 },
    { item: 'Tagihan yang telah jatuh tempo - Kredit Selain Beragun Rumah Tinggal', amount: 100000000000, riskWeight: 150, atmr: 150000000000 },
    { item: 'Uang Tunai, Emas dan Commemorative Coin', amount: 25000000000, riskWeight: 0, atmr: 0 },
    { item: 'Aset Tetap dan Inventaris Neto', amount: 120000000000, riskWeight: 100, atmr: 120000000000 },
    { item: 'Lainnya', amount: 80000000000, riskWeight: 100, atmr: 80000000000 }
  ]

  // Sample data for ATMR Kredit - Eksposur Kewajiban Komitmen/Kontinjensi
  const atmrKreditKomitmen = [
    { item: 'Tagihan kepada Entitas Sektor Publik', amount: 100000000000, riskWeight: 20, atmr: 20000000000 },
    { item: 'Kredit Beragun Rumah Tinggal', amount: 150000000000, riskWeight: 35, atmr: 52500000000 },
    { item: 'Kredit Beragun Properti Komersial', amount: 200000000000, riskWeight: 100, atmr: 200000000000 },
    { item: 'Kredit kepada Pegawai/Pensiunan', amount: 50000000000, riskWeight: 50, atmr: 25000000000 },
    { item: 'Tagihan kepada Usaha Mikro, Usaha Kecil dan Usaha Menengah', amount: 250000000000, riskWeight: 75, atmr: 187500000000 },
    { item: 'Tagihan kepada Korporasi', amount: 300000000000, riskWeight: 100, atmr: 300000000000 },
    { item: 'Tagihan yang telah jatuh tempo', amount: 30000000000, riskWeight: 150, atmr: 45000000000 }
  ]

  // Sample data for ATMR Kredit - Eksposur Usaha Syariah
  const atmrKreditSyariah = [
    { item: 'Pembiayaan Murabahah', amount: 200000000000, riskWeight: 100, atmr: 200000000000 },
    { item: 'Pembiayaan Musyarakah', amount: 150000000000, riskWeight: 100, atmr: 150000000000 },
    { item: 'Pembiayaan Mudharabah', amount: 100000000000, riskWeight: 100, atmr: 100000000000 },
    { item: 'Pembiayaan Ijarah', amount: 80000000000, riskWeight: 100, atmr: 80000000000 },
    { item: 'Pembiayaan Istishna', amount: 50000000000, riskWeight: 100, atmr: 50000000000 },
    { item: 'Pembiayaan Qardh', amount: 20000000000, riskWeight: 100, atmr: 20000000000 }
  ]

  // Sample data for ATMR Risiko Operasional
  const atmrOperasional = [
    { item: 'Komponen Bunga, Sewa, dan Dividen (KBSD)', amount: 500000000000 },
    { item: 'Komponen Jasa (KJ)', amount: 300000000000 },
    { item: 'Komponen Keuangan (KK)', amount: 200000000000 },
    { item: 'Indikator Bisnis (IB)', amount: 1000000000000 },
    { item: 'Komponen Indikator Bisnis (KIB)', amount: 120000000000 },
    { item: 'Pengungkapan IB', amount: 50000000000 }
  ]

  // Calculate totals
  const totalATMRKreditAset = atmrKreditAset.reduce((sum, item) => sum + item.atmr, 0)
  const totalATMRKreditKomitmen = atmrKreditKomitmen.reduce((sum, item) => sum + item.atmr, 0)
  const totalATMRKreditSyariah = atmrKreditSyariah.reduce((sum, item) => sum + item.atmr, 0)
  const totalATMRKredit = totalATMRKreditAset + totalATMRKreditKomitmen + totalATMRKreditSyariah
  
  // Calculate ATMR Operasional
  const totalATMROperasional = 1250000000000
  
  // Calculate ATMR Pasar
  const totalATMRPasar = 500000000000
  
  // Calculate Total ATMR
  const totalATMR = totalATMRKredit + totalATMROperasional + totalATMRPasar

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
    return `${value}%`
  }

  // Chart options for ATMR breakdown
  const atmrBreakdownOptions: ApexOptions = {
    chart: {
      type: 'pie'
    },
    labels: ['ATMR Kredit', 'ATMR Operasional', 'ATMR Pasar'],
    colors: ['#00E396', '#775DD0', '#FF4560'],
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

  // Chart options for ATMR Kredit breakdown
  const atmrKreditBreakdownOptions: ApexOptions = {
    chart: {
      type: 'pie'
    },
    labels: ['Eksposur Aset', 'Eksposur Komitmen/Kontinjensi', 'Eksposur Syariah'],
    colors: ['#00E396', '#FEB019', '#775DD0'],
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

  // Chart options for ATMR trend
  const atmrTrendOptions: ApexOptions = {
    chart: {
      type: 'line',
      stacked: false
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: [3, 3, 3],
      curve: 'straight'
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yaxis: {
      title: {
        text: 'Miliar Rupiah'
      },
      labels: {
        formatter: function(value) {
          return (value / 1000000000).toFixed(0)
        }
      }
    },
    tooltip: {
      y: {
        formatter: function(value) {
          return `Rp ${(value / 1000000000).toFixed(0)} Miliar`
        }
      }
    },
    colors: ['#00E396', '#775DD0', '#FF4560'],
    legend: {
      position: 'top'
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader 
            title='Aktiva Tertimbang Menurut Risiko (ATMR)' 
            subheader='Data realisasi item-item kinerja untuk menghitung proyeksi ATMR'
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
                <TabList onChange={handleTabChange} aria-label='atmr tabs' variant='scrollable' scrollButtons='auto'>
                  <Tab label='ATMR Kredit - Eksposur Aset' value='1' />
                  <Tab label='ATMR Kredit - Eksposur Komitmen/Kontinjensi' value='2' />
                  <Tab label='ATMR Kredit - Eksposur Syariah' value='3' />
                  <Tab label='ATMR Risiko Operasional' value='4' />
                  <Tab label='Ringkasan ATMR' value='5' />
                </TabList>
              </Box>

              {/* ATMR Kredit - Eksposur Aset Tab */}
              <TabPanel value='1'>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader title='ATMR Kredit - Eksposur Aset' />
                      <CardContent>
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Item</TableCell>
                                <TableCell align='right'>Nilai Eksposur</TableCell>
                                <TableCell align='right'>Bobot Risiko</TableCell>
                                <TableCell align='right'>ATMR</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {atmrKreditAset.map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell>{item.item}</TableCell>
                                  <TableCell align='right'>{formatCurrency(item.amount)}</TableCell>
                                  <TableCell align='right'>{formatPercentage(item.riskWeight)}</TableCell>
                                  <TableCell align='right'>{formatCurrency(item.atmr)}</TableCell>
                                </TableRow>
                              ))}
                              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell colSpan={3}><strong>Total ATMR Kredit - Eksposur Aset</strong></TableCell>
                                <TableCell align='right'><strong>{formatCurrency(totalATMRKreditAset)}</strong></TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>

              {/* ATMR Kredit - Eksposur Komitmen/Kontinjensi Tab */}
              <TabPanel value='2'>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader title='ATMR Kredit - Eksposur Kewajiban Komitmen/Kontinjensi' />
                      <CardContent>
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Item</TableCell>
                                <TableCell align='right'>Nilai Eksposur</TableCell>
                                <TableCell align='right'>Bobot Risiko</TableCell>
                                <TableCell align='right'>ATMR</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {atmrKreditKomitmen.map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell>{item.item}</TableCell>
                                  <TableCell align='right'>{formatCurrency(item.amount)}</TableCell>
                                  <TableCell align='right'>{formatPercentage(item.riskWeight)}</TableCell>
                                  <TableCell align='right'>{formatCurrency(item.atmr)}</TableCell>
                                </TableRow>
                              ))}
                              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell colSpan={3}><strong>Total ATMR Kredit - Eksposur Komitmen/Kontinjensi</strong></TableCell>
                                <TableCell align='right'><strong>{formatCurrency(totalATMRKreditKomitmen)}</strong></TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>

              {/* ATMR Kredit - Eksposur Syariah Tab */}
              <TabPanel value='3'>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader title='ATMR Kredit - Eksposur Usaha Syariah' />
                      <CardContent>
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Item</TableCell>
                                <TableCell align='right'>Nilai Eksposur</TableCell>
                                <TableCell align='right'>Bobot Risiko</TableCell>
                                <TableCell align='right'>ATMR</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {atmrKreditSyariah.map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell>{item.item}</TableCell>
                                  <TableCell align='right'>{formatCurrency(item.amount)}</TableCell>
                                  <TableCell align='right'>{formatPercentage(item.riskWeight)}</TableCell>
                                  <TableCell align='right'>{formatCurrency(item.atmr)}</TableCell>
                                </TableRow>
                              ))}
                              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell colSpan={3}><strong>Total ATMR Kredit - Eksposur Usaha Syariah</strong></TableCell>
                                <TableCell align='right'><strong>{formatCurrency(totalATMRKreditSyariah)}</strong></TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>

              {/* ATMR Risiko Operasional Tab */}
              <TabPanel value='4'>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader title='ATMR Risiko Operasional' />
                      <CardContent>
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Komponen</TableCell>
                                <TableCell align='right'>Nilai</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {atmrOperasional.map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell>{item.item}</TableCell>
                                  <TableCell align='right'>{formatCurrency(item.amount)}</TableCell>
                                </TableRow>
                              ))}
                              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell><strong>Total ATMR Risiko Operasional</strong></TableCell>
                                <TableCell align='right'><strong>{formatCurrency(totalATMROperasional)}</strong></TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>

              {/* Ringkasan ATMR Tab */}
              <TabPanel value='5'>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Ringkasan ATMR' />
                      <CardContent>
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Jenis ATMR</TableCell>
                                <TableCell align='right'>Nilai</TableCell>
                                <TableCell align='right'>Persentase</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell>ATMR Kredit</TableCell>
                                <TableCell align='right'>{formatCurrency(totalATMRKredit)}</TableCell>
                                <TableCell align='right'>{formatPercentage(Math.round(totalATMRKredit / totalATMR * 100))}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>ATMR Operasional</TableCell>
                                <TableCell align='right'>{formatCurrency(totalATMROperasional)}</TableCell>
                                <TableCell align='right'>{formatPercentage(Math.round(totalATMROperasional / totalATMR * 100))}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>ATMR Pasar</TableCell>
                                <TableCell align='right'>{formatCurrency(totalATMRPasar)}</TableCell>
                                <TableCell align='right'>{formatPercentage(Math.round(totalATMRPasar / totalATMR * 100))}</TableCell>
                              </TableRow>
                              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell><strong>Total ATMR</strong></TableCell>
                                <TableCell align='right'><strong>{formatCurrency(totalATMR)}</strong></TableCell>
                                <TableCell align='right'><strong>100%</strong></TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Komposisi ATMR' />
                      <CardContent>
                        <ReactApexcharts 
                          options={atmrBreakdownOptions} 
                          series={[totalATMRKredit, totalATMROperasional, totalATMRPasar]} 
                          type='pie' 
                          height={350} 
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Komposisi ATMR Kredit' />
                      <CardContent>
                        <ReactApexcharts 
                          options={atmrKreditBreakdownOptions} 
                          series={[totalATMRKreditAset, totalATMRKreditKomitmen, totalATMRKreditSyariah]} 
                          type='pie' 
                          height={350} 
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Tren ATMR (2025)' />
                      <CardContent>
                        <ReactApexcharts 
                          options={atmrTrendOptions} 
                          series={[
                            {
                              name: 'ATMR Kredit',
                              data: [2800, 2900, 3000, 3050, 3100, 3150, 3200, 3250, 3300, 3350, 3400, 3450].map(val => val * 1000000000)
                            },
                            {
                              name: 'ATMR Operasional',
                              data: [1100, 1150, 1200, 1200, 1250, 1250, 1300, 1300, 1350, 1350, 1400, 1400].map(val => val * 1000000000)
                            },
                            {
                              name: 'ATMR Pasar',
                              data: [400, 420, 450, 460, 480, 490, 500, 510, 520, 530, 540, 550].map(val => val * 1000000000)
                            }
                          ]} 
                          type='line' 
                          height={350} 
                        />
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

export default ATMRPage
