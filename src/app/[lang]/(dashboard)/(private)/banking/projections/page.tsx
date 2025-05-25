'use client'

// React Imports
import { useState } from 'react'

// Third-party Imports
import type { ApexOptions } from 'apexcharts'

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
import Button from '@mui/material/Button'

import Typography from '@mui/material/Typography'

// No external icon imports needed

// Component Imports
import ReactApexcharts from 'react-apexcharts'

const ProjectionsPage = () => {
  // States
  const [tabValue, setTabValue] = useState('1')
  const [year, setYear] = useState('2025')
  const [reportType, setReportType] = useState('1')

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue)
  }

  // Available years for filtering
  const years = ['2021', '2022', '2023', '2024', '2025', '2026']
  
  // Report types
  const reportTypes = [
    { value: '1', label: 'Lampiran 1. Proyeksi Postur Neraca' },
    { value: '2', label: 'Lampiran 2. Proyeksi Rincian Postur Neraca' },
    { value: '3', label: 'Lampiran 3. Proyeksi Postur Laba Rugi' },
    { value: '4', label: 'Lampiran 4. Proyeksi Rincian Laba Rugi' },
    { value: '5', label: 'Lampiran 5. Proyeksi Rincian Kredit/Pembiayaan' },
    { value: '6', label: 'Lampiran 6. Proyeksi Rincian Dana Masyarakat' },
    { value: '7', label: 'Lampiran 7. Rencana Pengembangan Jaringan Kantor' },
    { value: '8', label: 'Lampiran 8. Rencana Pengadaan Gedung Kantor' },
    { value: '9', label: 'Lampiran 9. Rencana Pengadaan Sewa' },
    { value: '10', label: 'Lampiran 10. Rencana Pemeliharaan Gedung Sewa' },
    { value: '11', label: 'Lampiran 11. Rencana Pengadaan Kendaraan Roda Dua' },
    { value: '12', label: 'Lampiran 12. Rencana Pengadaan Kendaraan Roda Empat' },
    { value: '13', label: 'Lampiran 13. Rencana Kebutuhan SDM' },
    { value: '14', label: 'Lampiran 14. Rencana Pendidikan SDM' }
  ]

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  // Sample data for Balance Sheet Projection
  const balanceSheetData = [
    { 
      category: 'AKTIVA', 
      items: [
        { name: 'Kas', prevYear: 500000000000, currentSep: 520000000000, currentDec: 550000000000, projections: [560000000000, 570000000000, 580000000000, 590000000000, 600000000000, 610000000000, 620000000000, 630000000000, 640000000000, 650000000000, 660000000000, 670000000000] },
        { name: 'Penempatan pada Bank Indonesia', prevYear: 2000000000000, currentSep: 2100000000000, currentDec: 2200000000000, projections: [2250000000000, 2300000000000, 2350000000000, 2400000000000, 2450000000000, 2500000000000, 2550000000000, 2600000000000, 2650000000000, 2700000000000, 2750000000000, 2800000000000] },
        { name: 'Penempatan pada Bank Lain', prevYear: 1500000000000, currentSep: 1550000000000, currentDec: 1600000000000, projections: [1620000000000, 1640000000000, 1660000000000, 1680000000000, 1700000000000, 1720000000000, 1740000000000, 1760000000000, 1780000000000, 1800000000000, 1820000000000, 1840000000000] },
        { name: 'Surat Berharga', prevYear: 3000000000000, currentSep: 3100000000000, currentDec: 3200000000000, projections: [3250000000000, 3300000000000, 3350000000000, 3400000000000, 3450000000000, 3500000000000, 3550000000000, 3600000000000, 3650000000000, 3700000000000, 3750000000000, 3800000000000] },
        { name: 'Kredit yang Diberikan', prevYear: 25000000000000, currentSep: 26000000000000, currentDec: 27000000000000, projections: [27500000000000, 28000000000000, 28500000000000, 29000000000000, 29500000000000, 30000000000000, 30500000000000, 31000000000000, 31500000000000, 32000000000000, 32500000000000, 33000000000000] },
        { name: 'Penyertaan', prevYear: 100000000000, currentSep: 100000000000, currentDec: 100000000000, projections: [100000000000, 100000000000, 100000000000, 100000000000, 100000000000, 100000000000, 100000000000, 100000000000, 100000000000, 100000000000, 100000000000, 100000000000] },
        { name: 'Cadangan Kerugian Penurunan Nilai', prevYear: -500000000000, currentSep: -550000000000, currentDec: -600000000000, projections: [-620000000000, -640000000000, -660000000000, -680000000000, -700000000000, -720000000000, -740000000000, -760000000000, -780000000000, -800000000000, -820000000000, -840000000000] },
        { name: 'Aset Tetap dan Inventaris', prevYear: 800000000000, currentSep: 820000000000, currentDec: 840000000000, projections: [845000000000, 850000000000, 855000000000, 860000000000, 865000000000, 870000000000, 875000000000, 880000000000, 885000000000, 890000000000, 895000000000, 900000000000] },
        { name: 'Aset Tidak Berwujud', prevYear: 200000000000, currentSep: 210000000000, currentDec: 220000000000, projections: [222000000000, 224000000000, 226000000000, 228000000000, 230000000000, 232000000000, 234000000000, 236000000000, 238000000000, 240000000000, 242000000000, 244000000000] },
        { name: 'Aset Lain-lain', prevYear: 400000000000, currentSep: 420000000000, currentDec: 440000000000, projections: [445000000000, 450000000000, 455000000000, 460000000000, 465000000000, 470000000000, 475000000000, 480000000000, 485000000000, 490000000000, 495000000000, 500000000000] }
      ]
    },
    { 
      category: 'PASIVA', 
      items: [
        { name: 'Giro', prevYear: 5000000000000, currentSep: 5200000000000, currentDec: 5400000000000, projections: [5450000000000, 5500000000000, 5550000000000, 5600000000000, 5650000000000, 5700000000000, 5750000000000, 5800000000000, 5850000000000, 5900000000000, 5950000000000, 6000000000000] },
        { name: 'Tabungan', prevYear: 10000000000000, currentSep: 10500000000000, currentDec: 11000000000000, projections: [11100000000000, 11200000000000, 11300000000000, 11400000000000, 11500000000000, 11600000000000, 11700000000000, 11800000000000, 11900000000000, 12000000000000, 12100000000000, 12200000000000] },
        { name: 'Deposito', prevYear: 12000000000000, currentSep: 12500000000000, currentDec: 13000000000000, projections: [13100000000000, 13200000000000, 13300000000000, 13400000000000, 13500000000000, 13600000000000, 13700000000000, 13800000000000, 13900000000000, 14000000000000, 14100000000000, 14200000000000] },
        { name: 'Pinjaman Diterima', prevYear: 2000000000000, currentSep: 2100000000000, currentDec: 2200000000000, projections: [2220000000000, 2240000000000, 2260000000000, 2280000000000, 2300000000000, 2320000000000, 2340000000000, 2360000000000, 2380000000000, 2400000000000, 2420000000000, 2440000000000] },
        { name: 'Kewajiban Lain-lain', prevYear: 1000000000000, currentSep: 1050000000000, currentDec: 1100000000000, projections: [1110000000000, 1120000000000, 1130000000000, 1140000000000, 1150000000000, 1160000000000, 1170000000000, 1180000000000, 1190000000000, 1200000000000, 1210000000000, 1220000000000] },
        { name: 'Modal Disetor', prevYear: 2000000000000, currentSep: 2000000000000, currentDec: 2000000000000, projections: [2000000000000, 2000000000000, 2000000000000, 2000000000000, 2000000000000, 2000000000000, 2000000000000, 2000000000000, 2000000000000, 2000000000000, 2000000000000, 2000000000000] },
        { name: 'Cadangan', prevYear: 500000000000, currentSep: 500000000000, currentDec: 550000000000, projections: [550000000000, 550000000000, 550000000000, 550000000000, 550000000000, 550000000000, 550000000000, 550000000000, 550000000000, 550000000000, 550000000000, 600000000000] },
        { name: 'Laba Ditahan', prevYear: 800000000000, currentSep: 800000000000, currentDec: 900000000000, projections: [900000000000, 900000000000, 900000000000, 900000000000, 900000000000, 900000000000, 900000000000, 900000000000, 900000000000, 900000000000, 900000000000, 950000000000] },
        { name: 'Laba Tahun Berjalan', prevYear: 700000000000, currentSep: 550000000000, currentDec: 850000000000, projections: [72000000000, 144000000000, 216000000000, 288000000000, 360000000000, 432000000000, 504000000000, 576000000000, 648000000000, 720000000000, 792000000000, 864000000000] }
      ]
    }
  ]

  // Define types for balance sheet data
  type BalanceSheetItem = {
    name: string;
    prevYear: number;
    currentSep: number;
    currentDec: number;
    projections: number[];
  }

  type BalanceSheetCategory = {
    category: string;
    items: BalanceSheetItem[];
  }

  type TotalResult = {
    aktiva: number | number[];
    pasiva: number | number[];
  }

  // Calculate totals for Balance Sheet
  const calculateTotals = (data: BalanceSheetCategory[], period: 'prevYear' | 'currentSep' | 'currentDec' | 'projections'): TotalResult => {
    const result: TotalResult = {
      aktiva: 0,
      pasiva: 0
    }

    data.forEach(category => {
      if (category.category === 'AKTIVA') {

        if (period === 'projections') {
          const monthlyTotals = Array(12).fill(0)
          category.items.forEach((item: BalanceSheetItem) => {
            item.projections.forEach((value: number, index: number) => {
              monthlyTotals[index] += value
            })
          })
          result.aktiva = monthlyTotals
        } else {
          category.items.forEach((item: BalanceSheetItem) => {
            result.aktiva = (result.aktiva as number) + item[period]
          })
        }
      } else if (category.category === 'PASIVA') {

        if (period === 'projections') {
          const monthlyTotals = Array(12).fill(0)
          category.items.forEach((item: BalanceSheetItem) => {
            item.projections.forEach((value: number, index: number) => {
              monthlyTotals[index] += value
            })
          })
          result.pasiva = monthlyTotals
        } else {
          category.items.forEach((item: BalanceSheetItem) => {
            result.pasiva = (result.pasiva as number) + item[period]
          })
        }
      }
    })

    return result
  }

  const totalPrevYear = calculateTotals(balanceSheetData, 'prevYear')
  const totalCurrentSep = calculateTotals(balanceSheetData, 'currentSep')
  const totalCurrentDec = calculateTotals(balanceSheetData, 'currentDec')
  const totalProjections = calculateTotals(balanceSheetData, 'projections')

  // Months for projection columns
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader 
            title='Proyeksi dan Lampiran' 
            subheader='Laporan hasil proyeksi dan lampiran pendukung'
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
                  label='Jenis Laporan'
                  value={reportType}
                  onChange={e => setReportType(e.target.value)}
                  sx={{ width: 300 }}
                >
                  {reportTypes.map(type => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </TextField>
                <Button 
                  variant='contained' 
                  startIcon={<i className='ri-file-download-line' />}
                >
                  Export
                </Button>
              </Box>
            }
          />
          <CardContent>
            <TabContext value={tabValue}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
                <TabList onChange={handleTabChange} aria-label='projection tabs'>
                  <Tab label='Tabel' value='1' />
                  <Tab label='Grafik' value='2' />
                </TabList>
              </Box>

              {/* Table View Tab */}
              <TabPanel value='1'>
                {reportType === '1' && (
                  <TableContainer component={Paper} sx={{ maxHeight: 600, overflow: 'auto' }}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell>Pos-pos</TableCell>
                          <TableCell align='right'>Realisasi {parseInt(year) - 1}</TableCell>
                          <TableCell align='right'>Realisasi Sep {year}</TableCell>
                          <TableCell align='right'>Estimasi Des {year}</TableCell>
                          {months.map((month, index) => (
                            <TableCell key={index} align='right'>Proyeksi {month} {parseInt(year) + 1}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {balanceSheetData.map((category, categoryIndex) => (
                          <>
                            <TableRow key={`category-${categoryIndex}`} sx={{ backgroundColor: '#f5f5f5' }}>
                              <TableCell colSpan={16}><strong>{category.category}</strong></TableCell>
                            </TableRow>
                            {category.items.map((item, itemIndex) => (
                              <TableRow key={`item-${categoryIndex}-${itemIndex}`}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell align='right'>{formatCurrency(item.prevYear)}</TableCell>
                                <TableCell align='right'>{formatCurrency(item.currentSep)}</TableCell>
                                <TableCell align='right'>{formatCurrency(item.currentDec)}</TableCell>
                                {item.projections.map((projection, projIndex) => (
                                  <TableCell key={projIndex} align='right'>{formatCurrency(projection)}</TableCell>
                                ))}
                              </TableRow>
                            ))}
                            <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
                              <TableCell><strong>Total {category.category}</strong></TableCell>
                              <TableCell align='right'><strong>
                                {formatCurrency(category.category === 'AKTIVA' ? totalPrevYear.aktiva : totalPrevYear.pasiva)}
                              </strong></TableCell>
                              <TableCell align='right'><strong>
                                {formatCurrency(category.category === 'AKTIVA' ? totalCurrentSep.aktiva : totalCurrentSep.pasiva)}
                              </strong></TableCell>
                              <TableCell align='right'><strong>
                                {formatCurrency(category.category === 'AKTIVA' ? totalCurrentDec.aktiva : totalCurrentDec.pasiva)}
                              </strong></TableCell>
                              {Array.isArray(category.category === 'AKTIVA' ? totalProjections.aktiva : totalProjections.pasiva) && (category.category === 'AKTIVA' ? totalProjections.aktiva : totalProjections.pasiva).map((total, totalIndex) => (
                                <TableCell key={totalIndex} align='right'><strong>{formatCurrency(total)}</strong></TableCell>
                              ))}
                            </TableRow>
                          </>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
                
                {reportType !== '1' && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
                    <Typography variant='h6'>
                      Silakan pilih jenis laporan untuk melihat data proyeksi
                    </Typography>
                  </Box>
                )}
              </TabPanel>

              {/* Chart View Tab */}
              <TabPanel value='2'>
                {reportType === '1' && (
                  <Grid container spacing={6}>
                    <Grid item xs={12} md={6}>
                      <Card>
                        <CardHeader title='Proyeksi Aktiva' />
                        <CardContent>
                          <ReactApexcharts
                            options={{
                              chart: {
                                type: 'line',
                                stacked: false,
                                toolbar: {
                                  show: true
                                }
                              },
                              dataLabels: {
                                enabled: false
                              },
                              stroke: {
                                width: 3,
                                curve: 'smooth'
                              },
                              xaxis: {
                                categories: months.map(month => `${month} ${parseInt(year) + 1}`)
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
                              colors: ['#00E396', '#008FFB', '#775DD0', '#FEB019', '#FF4560'],
                              legend: {
                                position: 'bottom',
                                horizontalAlign: 'center',
                                fontSize: '12px',
                                itemMargin: {
                                  horizontal: 10,
                                  vertical: 5
                                }
                              }
                            } as ApexOptions}
                            series={[
                              {
                                name: 'Total Aktiva',
                                data: Array.isArray(totalProjections.aktiva) ? totalProjections.aktiva : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                              },
                              {
                                name: 'Total Pasiva',
                                data: Array.isArray(totalProjections.pasiva) ? totalProjections.pasiva : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                              }
                            ]}
                            type='line'
                            height={350}
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Card>
                        <CardHeader title='Proyeksi Pasiva' />
                        <CardContent>
                          <ReactApexcharts
                            options={{
                              chart: {
                                type: 'line',
                                stacked: false,
                                toolbar: {
                                  show: true
                                }
                              },
                              dataLabels: {
                                enabled: false
                              },
                              stroke: {
                                width: 3,
                                curve: 'smooth'
                              },
                              xaxis: {
                                categories: months.map(month => `${month} ${parseInt(year) + 1}`)
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
                              colors: ['#00E396', '#008FFB', '#775DD0'],
                              legend: {
                                position: 'bottom',
                                horizontalAlign: 'center',
                                fontSize: '12px',
                                itemMargin: {
                                  horizontal: 10,
                                  vertical: 5
                                }
                              }
                            } as ApexOptions}
                            series={[
                              {
                                name: 'Giro',
                                data: balanceSheetData[1].items[0].projections
                              },

                              {
                                name: 'Tabungan',
                                data: balanceSheetData[1].items[1].projections
                              },
                              {
                                name: 'Deposito',
                                data: balanceSheetData[1].items[2].projections
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
                        <CardHeader title='Perbandingan Total Aktiva dan Pasiva' />
                        <CardContent>
                          <ReactApexcharts
                            options={{
                              chart: {
                                type: 'bar',
                                stacked: false,
                                toolbar: {
                                  show: true
                                }
                              },
                              plotOptions: {
                                bar: {
                                  horizontal: false,
                                  columnWidth: '55%',
                                  borderRadius: 2
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
                                categories: months.map(month => `${month} ${parseInt(year) + 1}`)
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
                              fill: {
                                opacity: 1
                              },
                              tooltip: {
                                y: {
                                  formatter: function(value) {
                                    return `Rp ${(value / 1000000000).toFixed(0)} Miliar`
                                  }
                                }
                              },
                              colors: ['#00E396', '#FF4560'],
                              legend: {
                                position: 'bottom',
                                horizontalAlign: 'center',
                                fontSize: '12px',
                                itemMargin: {
                                  horizontal: 10,
                                  vertical: 5
                                }
                              }
                            } as ApexOptions}
                            series={[
                              {
                                name: 'Total Aktiva',
                                data: Array.isArray(totalProjections.aktiva) ? totalProjections.aktiva : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                              },
                              {
                                name: 'Total Pasiva',
                                data: Array.isArray(totalProjections.pasiva) ? totalProjections.pasiva : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                              }
                            ]}
                            type='bar'
                            height={350}
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                )}
                
                {reportType !== '1' && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
                    <Typography variant='h6'>
                      Silakan pilih jenis laporan untuk melihat visualisasi proyeksi
                    </Typography>
                  </Box>
                )}
              </TabPanel>
            </TabContext>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ProjectionsPage
