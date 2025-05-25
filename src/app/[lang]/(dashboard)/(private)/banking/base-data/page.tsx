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
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'

// Third-party Imports
import type { ApexOptions } from 'apexcharts'

// Component Imports
import ReactApexcharts from 'react-apexcharts'

const BaseDataPage = () => {
  // States
  const [tabValue, setTabValue] = useState('1')
  const [year, setYear] = useState('2025')
  const [month, setMonth] = useState('5')

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

  // Sample data for balance sheet
  const balanceSheetData = {
    assets: [
      { name: 'Kas', value: 1250000000 },
      { name: 'Penempatan pada Bank Indonesia', value: 5600000000 },
      { name: 'Penempatan pada Bank Lain', value: 3200000000 },
      { name: 'Kredit yang Diberikan', value: 15700000000 },
      { name: 'Pembiayaan Syariah', value: 3200000000 },
      { name: 'Aset Tetap', value: 2100000000 },
      { name: 'Aset Lainnya', value: 1800000000 }
    ],
    liabilities: [
      { name: 'Giro', value: 4200000000 },
      { name: 'Tabungan', value: 8500000000 },
      { name: 'Deposito', value: 6000000000 },
      { name: 'Pinjaman yang Diterima', value: 3500000000 },
      { name: 'Liabilitas Lainnya', value: 2650000000 }
    ],
    equity: [
      { name: 'Modal Disetor', value: 5000000000 },
      { name: 'Tambahan Modal Disetor', value: 1200000000 },
      { name: 'Laba Ditahan', value: 2400000000 }
    ]
  }

  // Sample data for profit/loss
  const profitLossData = {
    income: [
      { name: 'Pendapatan Bunga', value: 2800000000 },
      { name: 'Pendapatan Operasional Lainnya', value: 950000000 },
      { name: 'Pendapatan Non-Operasional', value: 350000000 }
    ],
    expenses: [
      { name: 'Beban Bunga', value: 1200000000 },
      { name: 'Beban Operasional', value: 850000000 },
      { name: 'Beban Non-Operasional', value: 180000000 },
      { name: 'Beban Pajak', value: 470000000 }
    ]
  }

  // Chart options for balance sheet
  const balanceSheetChartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      stacked: true
    },
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    xaxis: {
      categories: balanceSheetData.assets.map(item => item.name),
      labels: {
        formatter: function (value) {
          return 'Rp ' + (Number(value) / 1000000000).toFixed(2) + ' M'
        }
      }
    },
    yaxis: {
      title: {
        text: 'Komponen Neraca'
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
      text: 'Komponen Neraca (Miliar Rupiah)'
    }
  }

  // Chart options for profit/loss
  const profitLossChartOptions: ApexOptions = {
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
    xaxis: {
      categories: [...profitLossData.income.map(item => item.name), ...profitLossData.expenses.map(item => item.name)]
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
      text: 'Laba Rugi (Miliar Rupiah)'
    },
    colors: ['#00E396', '#FF4560']
  }

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader 
            title='Modul Basis Data' 
            subheader='Data realisasi bulanan dari rincian postur Neraca dan rincian postur Laba Rugi'
            action={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                  select
                  label='Tahun'
                  value={year}
                  onChange={e => setYear(e.target.value)}
                  size='small'
                  sx={{ minWidth: 100 }}
                >
                  {years.map(year => (
                    <MenuItem key={year} value={year}>{year}</MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  label='Bulan'
                  value={month}
                  onChange={e => setMonth(e.target.value)}
                  size='small'
                  sx={{ minWidth: 120 }}
                >
                  {months.map(month => (
                    <MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>
                  ))}
                </TextField>
                <Button variant='contained' color='primary'>
                  Tampilkan
                </Button>
              </Box>
            }
          />
          <CardContent>
            <TabContext value={tabValue}>
              <Box sx={{ mb: 4 }}>
                <TabList 
                  onChange={handleTabChange} 
                  aria-label='basis data tabs'
                  variant='scrollable'
                  scrollButtons='auto'
                  sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
                >
                  <Tab label='Neraca' value='1' />
                  <Tab label='Laba Rugi' value='2' />
                </TabList>
              </Box>
              <Divider />
              <TabPanel value='1'>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%' }}>
                      <CardHeader 
                        title='Aset' 
                        titleTypographyProps={{ variant: 'h6' }}
                        sx={{ 
                          backgroundColor: theme => theme.palette.primary.light,
                          color: theme => theme.palette.primary.contrastText,
                          '& .MuiCardHeader-title': { fontWeight: 600 }
                        }}
                      />
                      <Divider />
                      <CardContent>
                        {balanceSheetData.assets.map((item, index) => (
                          <Box 
                            key={index} 
                            sx={{ 
                              display: 'flex', 
                              justifyContent: 'space-between', 
                              mb: 2,
                              p: 1,
                              '&:hover': { backgroundColor: 'action.hover', borderRadius: 1 }
                            }}
                          >
                            <Typography variant='body2'>{item.name}</Typography>
                            <Typography variant='body2' fontWeight={500}>{formatCurrency(item.value)}</Typography>
                          </Box>
                        ))}
                        <Divider sx={{ my: 3 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 1, fontWeight: 'bold' }}>
                          <Typography variant='subtitle1'>Total Aset</Typography>
                          <Typography variant='subtitle1' color='primary'>
                            {formatCurrency(balanceSheetData.assets.reduce((acc, item) => acc + item.value, 0))}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%' }}>
                      <CardHeader 
                        title='Liabilitas' 
                        titleTypographyProps={{ variant: 'h6' }}
                        sx={{ 
                          backgroundColor: theme => theme.palette.error.light,
                          color: theme => theme.palette.error.contrastText,
                          '& .MuiCardHeader-title': { fontWeight: 600 }
                        }}
                      />
                      <Divider />
                      <CardContent>
                        {balanceSheetData.liabilities.map((item, index) => (
                          <Box 
                            key={index} 
                            sx={{ 
                              display: 'flex', 
                              justifyContent: 'space-between', 
                              mb: 2,
                              p: 1,
                              '&:hover': { backgroundColor: 'action.hover', borderRadius: 1 }
                            }}
                          >
                            <Typography variant='body2'>{item.name}</Typography>
                            <Typography variant='body2' fontWeight={500}>{formatCurrency(item.value)}</Typography>
                          </Box>
                        ))}
                        <Divider sx={{ my: 3 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 1, fontWeight: 'bold' }}>
                          <Typography variant='subtitle1'>Total Liabilitas</Typography>
                          <Typography variant='subtitle1' color='error'>
                            {formatCurrency(balanceSheetData.liabilities.reduce((acc, item) => acc + item.value, 0))}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%' }}>
                      <CardHeader 
                        title='Ekuitas' 
                        titleTypographyProps={{ variant: 'h6' }}
                        sx={{ 
                          backgroundColor: theme => theme.palette.success.light,
                          color: theme => theme.palette.success.contrastText,
                          '& .MuiCardHeader-title': { fontWeight: 600 }
                        }}
                      />
                      <Divider />
                      <CardContent>
                        {balanceSheetData.equity.map((item, index) => (
                          <Box 
                            key={index} 
                            sx={{ 
                              display: 'flex', 
                              justifyContent: 'space-between', 
                              mb: 2,
                              p: 1,
                              '&:hover': { backgroundColor: 'action.hover', borderRadius: 1 }
                            }}
                          >
                            <Typography variant='body2'>{item.name}</Typography>
                            <Typography variant='body2' fontWeight={500}>{formatCurrency(item.value)}</Typography>
                          </Box>
                        ))}
                        <Divider sx={{ my: 3 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 1, fontWeight: 'bold' }}>
                          <Typography variant='subtitle1'>Total Ekuitas</Typography>
                          <Typography variant='subtitle1' color='success.main'>
                            {formatCurrency(balanceSheetData.equity.reduce((acc, item) => acc + item.value, 0))}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader title='Grafik Neraca' />
                      <CardContent>
                        <ReactApexcharts
                          options={balanceSheetChartOptions}
                          series={[
                            {
                              name: 'Aset',
                              data: balanceSheetData.assets.map(item => item.value)
                            }
                          ]}
                          type='bar'
                          height={350}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value='2'>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%' }}>
                      <CardHeader 
                        title='Pendapatan' 
                        titleTypographyProps={{ variant: 'h6' }}
                        sx={{ 
                          backgroundColor: theme => theme.palette.success.light,
                          color: theme => theme.palette.success.contrastText,
                          '& .MuiCardHeader-title': { fontWeight: 600 }
                        }}
                      />
                      <Divider />
                      <CardContent>
                        {profitLossData.income.map((item, index) => (
                          <Box 
                            key={index} 
                            sx={{ 
                              display: 'flex', 
                              justifyContent: 'space-between', 
                              mb: 2,
                              p: 1,
                              '&:hover': { backgroundColor: 'action.hover', borderRadius: 1 }
                            }}
                          >
                            <Typography variant='body2'>{item.name}</Typography>
                            <Typography variant='body2' fontWeight={500}>{formatCurrency(item.value)}</Typography>
                          </Box>
                        ))}
                        <Divider sx={{ my: 3 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 1, fontWeight: 'bold' }}>
                          <Typography variant='subtitle1'>Total Pendapatan</Typography>
                          <Typography variant='subtitle1' color='success.main'>
                            {formatCurrency(profitLossData.income.reduce((acc, item) => acc + item.value, 0))}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%' }}>
                      <CardHeader 
                        title='Beban' 
                        titleTypographyProps={{ variant: 'h6' }}
                        sx={{ 
                          backgroundColor: theme => theme.palette.error.light,
                          color: theme => theme.palette.error.contrastText,
                          '& .MuiCardHeader-title': { fontWeight: 600 }
                        }}
                      />
                      <Divider />
                      <CardContent>
                        {profitLossData.expenses.map((item, index) => (
                          <Box 
                            key={index} 
                            sx={{ 
                              display: 'flex', 
                              justifyContent: 'space-between', 
                              mb: 2,
                              p: 1,
                              '&:hover': { backgroundColor: 'action.hover', borderRadius: 1 }
                            }}
                          >
                            <Typography variant='body2'>{item.name}</Typography>
                            <Typography variant='body2' fontWeight={500}>{formatCurrency(item.value)}</Typography>
                          </Box>
                        ))}
                        <Divider sx={{ my: 3 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 1, fontWeight: 'bold' }}>
                          <Typography variant='subtitle1'>Total Beban</Typography>
                          <Typography variant='subtitle1' color='error'>
                            {formatCurrency(profitLossData.expenses.reduce((acc, item) => acc + item.value, 0))}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader 
                        title='Ringkasan Laba Rugi' 
                        titleTypographyProps={{ variant: 'h6' }}
                        sx={{ 
                          backgroundColor: theme => theme.palette.primary.light,
                          color: theme => theme.palette.primary.contrastText,
                          '& .MuiCardHeader-title': { fontWeight: 600 }
                        }}
                      />
                      <Divider />
                      <CardContent sx={{ p: 6 }}>
                        <Grid container spacing={4}>
                          <Grid item xs={12} md={4}>
                            <Paper 
                              elevation={3} 
                              sx={{ 
                                p: 3, 
                                textAlign: 'center',
                                backgroundColor: theme => theme.palette.success.light,
                                color: theme => theme.palette.success.contrastText,
                                borderRadius: 2
                              }}
                            >
                              <Typography variant='subtitle2' sx={{ mb: 1 }}>Total Pendapatan</Typography>
                              <Typography variant='h5' fontWeight='bold'>
                                {formatCurrency(profitLossData.income.reduce((acc, item) => acc + item.value, 0))}
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Paper 
                              elevation={3} 
                              sx={{ 
                                p: 3, 
                                textAlign: 'center',
                                backgroundColor: theme => theme.palette.error.light,
                                color: theme => theme.palette.error.contrastText,
                                borderRadius: 2
                              }}
                            >
                              <Typography variant='subtitle2' sx={{ mb: 1 }}>Total Beban</Typography>
                              <Typography variant='h5' fontWeight='bold'>
                                {formatCurrency(profitLossData.expenses.reduce((acc, item) => acc + item.value, 0))}
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Paper 
                              elevation={3} 
                              sx={{ 
                                p: 3, 
                                textAlign: 'center',
                                backgroundColor: theme => theme.palette.primary.light,
                                color: theme => theme.palette.primary.contrastText,
                                borderRadius: 2
                              }}
                            >
                              <Typography variant='subtitle2' sx={{ mb: 1 }}>Laba Bersih</Typography>
                              <Typography variant='h5' fontWeight='bold'>
                                {formatCurrency(
                                  profitLossData.income.reduce((acc, item) => acc + item.value, 0) -
                                    profitLossData.expenses.reduce((acc, item) => acc + item.value, 0)
                                )}
                              </Typography>
                            </Paper>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader 
                        title='Grafik Laba Rugi' 
                        titleTypographyProps={{ variant: 'h6' }}
                        sx={{ 
                          backgroundColor: theme => theme.palette.background.default,
                          '& .MuiCardHeader-title': { fontWeight: 600 }
                        }}
                      />
                      <Divider />
                      <CardContent sx={{ pt: 4 }}>
                        <ReactApexcharts
                          options={{
                            ...profitLossChartOptions,
                            colors: ['#9155FD', '#FF4C51'],
                            legend: {
                              position: 'top',
                              horizontalAlign: 'center',
                              markers: { offsetX: -3 },
                              fontSize: '13px',
                              itemMargin: { horizontal: 10 }
                            },
                            grid: {
                              padding: { top: -10 },
                              borderColor: 'rgba(0, 0, 0, 0.1)',
                              strokeDashArray: 5
                            }
                          }}
                          series={[
                            {
                              name: 'Pendapatan',
                              data: profitLossData.income.map(item => item.value)
                            },
                            {
                              name: 'Beban',
                              data: profitLossData.expenses.map(item => item.value)
                            }
                          ]}
                          type='bar'
                          height={400}
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

export default BaseDataPage
