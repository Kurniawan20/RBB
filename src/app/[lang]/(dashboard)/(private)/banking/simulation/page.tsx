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
import Slider from '@mui/material/Slider'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
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

// Define types for simulation parameters
interface SimulationParams {
  // Credit/Financing parameters
  creditGrowthRate: number
  productiveCreditPercentage: number
  consumerCreditPercentage: number
  conventionalCreditPercentage: number
  shariaCreditPercentage: number
  
  // Third-party funds parameters
  dpkGrowthRate: number
  currentAccountPercentage: number
  savingsPercentage: number
  timeDepositPercentage: number
  conventionalDpkPercentage: number
  shariaDpkPercentage: number
  
  // Interest rate parameters
  creditInterestRate: number
  dpkInterestRate: number
  secondaryReserveRate: number
  
  // NPL parameters
  nplRate: number
  nplCoverageRatio: number
  
  // Other parameters
  operatingExpenseGrowth: number
  nonOperatingIncomeGrowth: number
  capitalAdequacyRatio: number
}

const SimulationPage = () => {
  // States
  const [tabValue, setTabValue] = useState('1')
  const [year, setYear] = useState('2025')
  const [month, setMonth] = useState('5')
  const [scenarioName, setScenarioName] = useState('Skenario Dasar')
  const [activeScenario, setActiveScenario] = useState('base')
  
  // Simulation parameters state
  const [params, setParams] = useState<SimulationParams>({
    // Credit/Financing parameters
    creditGrowthRate: 10.0,
    productiveCreditPercentage: 60.0,
    consumerCreditPercentage: 40.0,
    conventionalCreditPercentage: 85.0,
    shariaCreditPercentage: 15.0,
    
    // Third-party funds parameters
    dpkGrowthRate: 8.0,
    currentAccountPercentage: 20.0,
    savingsPercentage: 30.0,
    timeDepositPercentage: 50.0,
    conventionalDpkPercentage: 90.0,
    shariaDpkPercentage: 10.0,
    
    // Interest rate parameters
    creditInterestRate: 9.5,
    dpkInterestRate: 3.5,
    secondaryReserveRate: 4.25,
    
    // NPL parameters
    nplRate: 2.5,
    nplCoverageRatio: 120.0,
    
    // Other parameters
    operatingExpenseGrowth: 7.0,
    nonOperatingIncomeGrowth: 5.0,
    capitalAdequacyRatio: 22.0
  })
  
  // Predefined scenarios
  const scenarios: {
    [key: string]: {
      name: string;
      params: SimulationParams;
    };
  } = {
    base: {
      name: 'Skenario Dasar',
      params: { ...params }
    },
    optimistic: {
      name: 'Skenario Optimis',
      params: {
        ...params,
        creditGrowthRate: 15.0,
        dpkGrowthRate: 12.0,
        nplRate: 1.8,
        creditInterestRate: 10.0,
        operatingExpenseGrowth: 6.0
      }
    },
    pessimistic: {
      name: 'Skenario Pesimis',
      params: {
        ...params,
        creditGrowthRate: 5.0,
        dpkGrowthRate: 4.0,
        nplRate: 4.0,
        creditInterestRate: 8.5,
        operatingExpenseGrowth: 9.0
      }
    },
    custom: {
      name: 'Skenario Kustom',
      params: { ...params }
    }
  }
  
  // Handle parameter change
  const handleParamChange = (param: keyof SimulationParams, value: number) => {
    setParams(prev => ({
      ...prev,
      [param]: value
    }))
    
    // When parameters change, we're creating a custom scenario
    setActiveScenario('custom')
    setScenarioName('Skenario Kustom')
  }
  
  // Load a predefined scenario
  const loadScenario = (scenarioKey: 'base' | 'optimistic' | 'pessimistic' | 'custom') => {
    if (scenarioKey === 'custom') return // Custom scenario is already active
    
    setActiveScenario(scenarioKey)
    setScenarioName(scenarios[scenarioKey].name)
    setParams(scenarios[scenarioKey].params)
  }
  
  // Save current parameters as a new custom scenario
  const saveCustomScenario = () => {
    scenarios.custom = {
      name: scenarioName,
      params: { ...params }
    }
    setActiveScenario('custom')
  }
  
  // Reset parameters to base scenario
  const resetParams = () => {
    loadScenario('base')
  }

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
  
  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }
  
  // Format percentage
  const formatPercentage = (value: number): string => {
    return `${value.toFixed(2)}%`
  }
  
  // Base financial values (in billions IDR)
  const baseValues = {
    totalAssets: 30000,
    totalLiabilities: 25000,
    totalEquity: 5000,
    totalCredit: 20000,
    totalDPK: 22000,
    interestIncome: 2500,
    interestExpense: 800,
    operatingIncome: 3000,
    operatingExpense: 1800,
    netProfit: 900,
    secondaryReserve: 4000,
    nplAmount: 500,
    ckpnAmount: 600
  }
  
  // Calculate financial indicators based on parameters
  const calculateFinancials = () => {
    // Credit calculation
    const totalCredit = baseValues.totalCredit * (1 + params.creditGrowthRate / 100)
    const productiveCredit = totalCredit * (params.productiveCreditPercentage / 100)
    const consumerCredit = totalCredit * (params.consumerCreditPercentage / 100)
    const conventionalCredit = totalCredit * (params.conventionalCreditPercentage / 100)
    const shariaCredit = totalCredit * (params.shariaCreditPercentage / 100)
    
    // DPK calculation
    const totalDPK = baseValues.totalDPK * (1 + params.dpkGrowthRate / 100)
    const currentAccount = totalDPK * (params.currentAccountPercentage / 100)
    const savings = totalDPK * (params.savingsPercentage / 100)
    const timeDeposit = totalDPK * (params.timeDepositPercentage / 100)
    const conventionalDPK = totalDPK * (params.conventionalDpkPercentage / 100)
    const shariaDPK = totalDPK * (params.shariaDpkPercentage / 100)
    
    // Secondary Reserve
    const secondaryReserve = baseValues.secondaryReserve * (1 + params.dpkGrowthRate / 200) // Assume secondary reserve grows at half the rate of DPK
    
    // Income and expense calculations
    const interestIncome = (conventionalCredit * params.creditInterestRate / 100) + 
                           (shariaCredit * (params.creditInterestRate * 0.9) / 100) // Sharia typically has slightly lower rates
    
    const interestExpense = (conventionalDPK * params.dpkInterestRate / 100) + 
                            (shariaDPK * (params.dpkInterestRate * 0.9) / 100)
    
    const secondaryReserveIncome = secondaryReserve * params.secondaryReserveRate / 100
    
    // NPL calculations
    const nplAmount = totalCredit * (params.nplRate / 100)
    const ckpnAmount = nplAmount * (params.nplCoverageRatio / 100)
    
    // Operating income and expense
    const operatingIncome = interestIncome + secondaryReserveIncome + (baseValues.operatingIncome - baseValues.interestIncome) * 
                           (1 + params.nonOperatingIncomeGrowth / 100)
    
    const operatingExpense = baseValues.operatingExpense * (1 + params.operatingExpenseGrowth / 100)
    
    // Net profit
    const netProfit = operatingIncome - operatingExpense - ckpnAmount * 0.1 // Assume 10% of CKPN impacts profit
    
    // Total assets, liabilities, and equity
    const totalAssets = totalCredit + secondaryReserve + (baseValues.totalAssets - baseValues.totalCredit - baseValues.secondaryReserve) * 1.05
    const totalLiabilities = totalDPK + (baseValues.totalLiabilities - baseValues.totalDPK) * 1.03
    const totalEquity = baseValues.totalEquity + netProfit * 0.5 // Assume 50% of profit goes to equity
    
    // Financial ratios
    const nim = (interestIncome - interestExpense) / totalAssets * 100
    const roa = netProfit / totalAssets * 100
    const roe = netProfit / totalEquity * 100
    const ldr = totalCredit / totalDPK * 100
    const bopo = operatingExpense / operatingIncome * 100
    const car = totalEquity / (totalCredit * 0.7 + secondaryReserve * 0.2) * 100 // Simplified CAR calculation
    
    return {
      // Assets and liabilities
      totalAssets,
      totalLiabilities,
      totalEquity,
      
      // Credit
      totalCredit,
      productiveCredit,
      consumerCredit,
      conventionalCredit,
      shariaCredit,
      
      // DPK
      totalDPK,
      currentAccount,
      savings,
      timeDeposit,
      conventionalDPK,
      shariaDPK,
      
      // Secondary Reserve
      secondaryReserve,
      secondaryReserveIncome,
      
      // Income and expenses
      interestIncome,
      interestExpense,
      operatingIncome,
      operatingExpense,
      netProfit,
      
      // NPL
      nplAmount,
      ckpnAmount,
      
      // Ratios
      nim,
      roa,
      roe,
      ldr,
      bopo,
      car,
      nplRate: params.nplRate,
      nplCoverageRatio: params.nplCoverageRatio
    }
  }
  
  // Calculate financials whenever parameters change
  const financials = calculateFinancials()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader 
            title='Simulasi Keuangan' 
            subheader='Simulasi untuk situasi darurat dan rapat yang memerlukan output cepat'
            action={
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  select
                  size='small'
                  label='Tahun'
                  value={year}
                  onChange={e => setYear(e.target.value)}
                  sx={{ minWidth: 100 }}
                >
                  {years.map(year => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  size='small'
                  label='Bulan'
                  value={month}
                  onChange={e => setMonth(e.target.value)}
                  sx={{ minWidth: 120 }}
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
            {/* Scenario Selection */}
            <Box sx={{ mb: 6 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={8} lg={6}>
                  <Card variant='outlined'>
                    <CardHeader title='Pilihan Skenario' />
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            gap: { xs: 1, sm: 2 },
                            flexWrap: { xs: 'wrap', sm: 'nowrap' }
                          }}>
                            <Button 
                              fullWidth
                              variant={activeScenario === 'base' ? 'contained' : 'outlined'} 
                              onClick={() => loadScenario('base')}
                              sx={{ minWidth: '120px' }}
                            >
                              Skenario Dasar
                            </Button>
                            <Button 
                              fullWidth
                              variant={activeScenario === 'optimistic' ? 'contained' : 'outlined'} 
                              color='success'
                              onClick={() => loadScenario('optimistic')}
                              sx={{ minWidth: '120px' }}
                            >
                              Skenario Optimis
                            </Button>
                            <Button 
                              fullWidth
                              variant={activeScenario === 'pessimistic' ? 'contained' : 'outlined'} 
                              color='error'
                              onClick={() => loadScenario('pessimistic')}
                              sx={{ minWidth: '120px' }}
                            >
                              Skenario Pesimis
                            </Button>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider sx={{ my: 1 }} />
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container spacing={2} alignItems='center'>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                size='small'
                                label='Nama Skenario'
                                value={scenarioName}
                                onChange={e => setScenarioName(e.target.value)}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box sx={{ 
                                display: 'flex', 
                                gap: 2,
                                justifyContent: { xs: 'space-between', sm: 'flex-end' }
                              }}>
                                <Button 
                                  variant='outlined' 
                                  onClick={saveCustomScenario}
                                  sx={{ minWidth: '140px' }}
                                >
                                  Simpan Skenario
                                </Button>
                                <Button 
                                  variant='outlined' 
                                  color='secondary'
                                  onClick={resetParams}
                                  sx={{ minWidth: '80px' }}
                                >
                                  Reset
                                </Button>
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
            
            {/* Parameter Controls */}
            <Box sx={{ mb: 6 }}>
              <Card variant='outlined'>
                <CardHeader title='Parameter Simulasi' />
                <CardContent>
                  <Grid container spacing={6}>
                    {/* Credit/Financing Parameters */}
                    <Grid item xs={12} md={6}>
                      <Typography variant='h6' sx={{ mb: 2 }}>Kredit/Pembiayaan</Typography>
                      
                      <Box sx={{ mb: 4 }}>
                        <Typography gutterBottom>
                          Pertumbuhan Kredit/Pembiayaan: {formatPercentage(params.creditGrowthRate)}
                        </Typography>
                        <Slider
                          value={params.creditGrowthRate}
                          onChange={(_, value) => handleParamChange('creditGrowthRate', value as number)}
                          min={-10}
                          max={30}
                          step={0.5}
                          valueLabelDisplay='auto'
                          valueLabelFormat={value => `${value}%`}
                        />
                      </Box>
                      
                      <Box sx={{ mb: 4 }}>
                        <Typography gutterBottom>
                          Komposisi Kredit Produktif: {formatPercentage(params.productiveCreditPercentage)}
                        </Typography>
                        <Slider
                          value={params.productiveCreditPercentage}
                          onChange={(_, value) => {
                            handleParamChange('productiveCreditPercentage', value as number)
                            handleParamChange('consumerCreditPercentage', 100 - (value as number))
                          }}
                          min={0}
                          max={100}
                          step={1}
                          valueLabelDisplay='auto'
                          valueLabelFormat={value => `${value}%`}
                        />
                      </Box>
                      
                      <Box sx={{ mb: 4 }}>
                        <Typography gutterBottom>
                          Komposisi Kredit Konvensional: {formatPercentage(params.conventionalCreditPercentage)}
                        </Typography>
                        <Slider
                          value={params.conventionalCreditPercentage}
                          onChange={(_, value) => {
                            handleParamChange('conventionalCreditPercentage', value as number)
                            handleParamChange('shariaCreditPercentage', 100 - (value as number))
                          }}
                          min={0}
                          max={100}
                          step={1}
                          valueLabelDisplay='auto'
                          valueLabelFormat={value => `${value}%`}
                        />
                      </Box>
                    </Grid>
                    
                    {/* Third-party Funds Parameters */}
                    <Grid item xs={12} md={6}>
                      <Typography variant='h6' sx={{ mb: 2 }}>Dana Pihak Ketiga</Typography>
                      
                      <Box sx={{ mb: 4 }}>
                        <Typography gutterBottom>
                          Pertumbuhan DPK: {formatPercentage(params.dpkGrowthRate)}
                        </Typography>
                        <Slider
                          value={params.dpkGrowthRate}
                          onChange={(_, value) => handleParamChange('dpkGrowthRate', value as number)}
                          min={-5}
                          max={25}
                          step={0.5}
                          valueLabelDisplay='auto'
                          valueLabelFormat={value => `${value}%`}
                        />
                      </Box>
                      
                      <Box sx={{ mb: 4 }}>
                        <Typography gutterBottom>
                          Komposisi Giro: {formatPercentage(params.currentAccountPercentage)}
                        </Typography>
                        <Slider
                          value={params.currentAccountPercentage}
                          onChange={(_, value) => {
                            const newValue = value as number
                            handleParamChange('currentAccountPercentage', newValue)
                            
                            // Adjust other percentages proportionally
                            const remaining = 100 - newValue
                            const ratio = params.savingsPercentage / (params.savingsPercentage + params.timeDepositPercentage)
                            const newSavings = remaining * ratio
                            const newTimeDeposit = remaining * (1 - ratio)
                            
                            handleParamChange('savingsPercentage', newSavings)
                            handleParamChange('timeDepositPercentage', newTimeDeposit)
                          }}
                          min={0}
                          max={100}
                          step={1}
                          valueLabelDisplay='auto'
                          valueLabelFormat={value => `${value}%`}
                        />
                      </Box>
                      
                      <Box sx={{ mb: 4 }}>
                        <Typography gutterBottom>
                          Komposisi DPK Konvensional: {formatPercentage(params.conventionalDpkPercentage)}
                        </Typography>
                        <Slider
                          value={params.conventionalDpkPercentage}
                          onChange={(_, value) => {
                            handleParamChange('conventionalDpkPercentage', value as number)
                            handleParamChange('shariaDpkPercentage', 100 - (value as number))
                          }}
                          min={0}
                          max={100}
                          step={1}
                          valueLabelDisplay='auto'
                          valueLabelFormat={value => `${value}%`}
                        />
                      </Box>
                    </Grid>
                    
                    {/* Interest Rate Parameters */}
                    <Grid item xs={12} md={6}>
                      <Typography variant='h6' sx={{ mb: 2 }}>Suku Bunga</Typography>
                      
                      <Box sx={{ mb: 4 }}>
                        <Typography gutterBottom>
                          Suku Bunga Kredit: {formatPercentage(params.creditInterestRate)}
                        </Typography>
                        <Slider
                          value={params.creditInterestRate}
                          onChange={(_, value) => handleParamChange('creditInterestRate', value as number)}
                          min={5}
                          max={15}
                          step={0.25}
                          valueLabelDisplay='auto'
                          valueLabelFormat={value => `${value}%`}
                        />
                      </Box>
                      
                      <Box sx={{ mb: 4 }}>
                        <Typography gutterBottom>
                          Suku Bunga DPK: {formatPercentage(params.dpkInterestRate)}
                        </Typography>
                        <Slider
                          value={params.dpkInterestRate}
                          onChange={(_, value) => handleParamChange('dpkInterestRate', value as number)}
                          min={1}
                          max={8}
                          step={0.25}
                          valueLabelDisplay='auto'
                          valueLabelFormat={value => `${value}%`}
                        />
                      </Box>
                      
                      <Box sx={{ mb: 4 }}>
                        <Typography gutterBottom>
                          Suku Bunga Secondary Reserve: {formatPercentage(params.secondaryReserveRate)}
                        </Typography>
                        <Slider
                          value={params.secondaryReserveRate}
                          onChange={(_, value) => handleParamChange('secondaryReserveRate', value as number)}
                          min={2}
                          max={8}
                          step={0.25}
                          valueLabelDisplay='auto'
                          valueLabelFormat={value => `${value}%`}
                        />
                      </Box>
                    </Grid>
                    
                    {/* Other Parameters */}
                    <Grid item xs={12} md={6}>
                      <Typography variant='h6' sx={{ mb: 2 }}>Parameter Lainnya</Typography>
                      
                      <Box sx={{ mb: 4 }}>
                        <Typography gutterBottom>
                          Rasio NPL: {formatPercentage(params.nplRate)}
                        </Typography>
                        <Slider
                          value={params.nplRate}
                          onChange={(_, value) => handleParamChange('nplRate', value as number)}
                          min={0.5}
                          max={10}
                          step={0.1}
                          valueLabelDisplay='auto'
                          valueLabelFormat={value => `${value}%`}
                        />
                      </Box>
                      
                      <Box sx={{ mb: 4 }}>
                        <Typography gutterBottom>
                          Pertumbuhan Biaya Operasional: {formatPercentage(params.operatingExpenseGrowth)}
                        </Typography>
                        <Slider
                          value={params.operatingExpenseGrowth}
                          onChange={(_, value) => handleParamChange('operatingExpenseGrowth', value as number)}
                          min={0}
                          max={20}
                          step={0.5}
                          valueLabelDisplay='auto'
                          valueLabelFormat={value => `${value}%`}
                        />
                      </Box>
                      
                      <Box sx={{ mb: 4 }}>
                        <Typography gutterBottom>
                          Capital Adequacy Ratio (CAR): {formatPercentage(params.capitalAdequacyRatio)}
                        </Typography>
                        <Slider
                          value={params.capitalAdequacyRatio}
                          onChange={(_, value) => handleParamChange('capitalAdequacyRatio', value as number)}
                          min={8}
                          max={40}
                          step={0.5}
                          valueLabelDisplay='auto'
                          valueLabelFormat={value => `${value}%`}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
            
            <TabContext value={tabValue}>
              <TabList
                onChange={handleTabChange}
                aria-label='simulation-tabs'
                variant='scrollable'
                scrollButtons='auto'
              >
                <Tab value='1' label='Indikator Utama' />
                <Tab value='2' label='Indikator Pendukung' />
                <Tab value='3' label='Rasio Keuangan' />
                <Tab value='4' label='Grafik' />
                <Tab value='5' label='Tabel' />
              </TabList>

              {/* Tab content will be added in the next steps */}
              <TabPanel value='1'>
                <Grid container spacing={4}>
                  <Grid item xs={12} lg={6}>
                    <Grid container spacing={4}>
                      {/* Main Financial Indicators */}
                      <Grid item xs={12}>
                        <Card sx={{ height: '100%' }}>
                          <CardHeader title='Indikator Keuangan Utama' />
                          <CardContent>
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
                                <Typography variant='subtitle2'>Total Aset</Typography>
                                <Typography variant='subtitle1' fontWeight='bold'>
                                  {formatCurrency(financials.totalAssets * 1000000000)}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
                                <Typography variant='subtitle2'>Total Kredit/Pembiayaan</Typography>
                                <Typography variant='subtitle1' fontWeight='bold'>
                                  {formatCurrency(financials.totalCredit * 1000000000)}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
                                <Typography variant='subtitle2'>Total Dana Pihak Ketiga</Typography>
                                <Typography variant='subtitle1' fontWeight='bold'>
                                  {formatCurrency(financials.totalDPK * 1000000000)}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant='subtitle2'>Laba Bersih</Typography>
                                <Typography variant='subtitle1' fontWeight='bold'>
                                  {formatCurrency(financials.netProfit * 1000000000)}
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                      
                      {/* Key Financial Ratios */}
                      <Grid item xs={12}>
                        <Card sx={{ height: '100%' }}>
                          <CardHeader title='Rasio Keuangan Utama' />
                          <CardContent>
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                                <Typography variant='subtitle2'>Return on Assets (ROA)</Typography>
                                <Typography 
                                  variant='subtitle1' 
                                  fontWeight='bold'
                                  color={financials.roa >= 1.5 ? 'success.main' : financials.roa >= 0.5 ? 'warning.main' : 'error.main'}
                                >
                                  {formatPercentage(financials.roa)}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                                <Typography variant='subtitle2'>Return on Equity (ROE)</Typography>
                                <Typography 
                                  variant='subtitle1' 
                                  fontWeight='bold'
                                  color={financials.roe >= 15 ? 'success.main' : financials.roe >= 5 ? 'warning.main' : 'error.main'}
                                >
                                  {formatPercentage(financials.roe)}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                                <Typography variant='subtitle2'>Net Interest Margin (NIM)</Typography>
                                <Typography 
                                  variant='subtitle1' 
                                  fontWeight='bold'
                                  color={financials.nim >= 5 ? 'success.main' : financials.nim >= 3 ? 'warning.main' : 'error.main'}
                                >
                                  {formatPercentage(financials.nim)}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                                <Typography variant='subtitle2'>Loan to Deposit Ratio (LDR)</Typography>
                                <Typography 
                                  variant='subtitle1' 
                                  fontWeight='bold'
                                  color={financials.ldr >= 70 && financials.ldr <= 92 ? 'success.main' : 'warning.main'}
                                >
                                  {formatPercentage(financials.ldr)}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                                <Typography variant='subtitle2'>BOPO</Typography>
                                <Typography 
                                  variant='subtitle1' 
                                  fontWeight='bold'
                                  color={financials.bopo <= 85 ? 'success.main' : financials.bopo <= 90 ? 'warning.main' : 'error.main'}
                                >
                                  {formatPercentage(financials.bopo)}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                                <Typography variant='subtitle2'>Capital Adequacy Ratio (CAR)</Typography>
                                <Typography 
                                  variant='subtitle1' 
                                  fontWeight='bold'
                                  color={financials.car >= 14 ? 'success.main' : financials.car >= 8 ? 'warning.main' : 'error.main'}
                                >
                                  {formatPercentage(financials.car)}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant='subtitle2'>NPL Ratio</Typography>
                                <Typography 
                                  variant='subtitle1' 
                                  fontWeight='bold'
                                  color={financials.nplRate <= 3 ? 'success.main' : financials.nplRate <= 5 ? 'warning.main' : 'error.main'}
                                >
                                  {formatPercentage(financials.nplRate)}
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  </Grid>
                  
                  <Grid item xs={12} lg={6}>
                    <Grid container spacing={4}>
                      {/* Credit Breakdown */}
                      <Grid item xs={12}>
                        <Card sx={{ height: '100%' }}>
                          <CardHeader title='Rincian Kredit/Pembiayaan' />
                          <CardContent>
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                                <Typography variant='subtitle2'>Kredit Produktif</Typography>
                                <Typography variant='subtitle1' fontWeight='bold'>
                                  {formatCurrency(financials.productiveCredit * 1000000000)}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                                <Typography variant='subtitle2'>Kredit Konsumtif</Typography>
                                <Typography variant='subtitle1' fontWeight='bold'>
                                  {formatCurrency(financials.consumerCredit * 1000000000)}
                                </Typography>
                              </Box>
                              <Divider sx={{ my: 2 }} />
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                                <Typography variant='subtitle2'>Kredit Konvensional</Typography>
                                <Typography variant='subtitle1' fontWeight='bold'>
                                  {formatCurrency(financials.conventionalCredit * 1000000000)}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                                <Typography variant='subtitle2'>Pembiayaan Syariah</Typography>
                                <Typography variant='subtitle1' fontWeight='bold'>
                                  {formatCurrency(financials.shariaCredit * 1000000000)}
                                </Typography>
                              </Box>
                              <Divider sx={{ my: 2 }} />
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                                <Typography variant='subtitle2'>Pendapatan Bunga</Typography>
                                <Typography variant='subtitle1' fontWeight='bold'>
                                  {formatCurrency(financials.interestIncome * 1000000000)}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant='subtitle2'>NPL</Typography>
                                <Typography variant='subtitle1' fontWeight='bold'>
                                  {formatCurrency(financials.nplAmount * 1000000000)}
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                      
                      {/* DPK Breakdown */}
                      <Grid item xs={12}>
                        <Card sx={{ height: '100%' }}>
                          <CardHeader title='Rincian Dana Pihak Ketiga' />
                          <CardContent>
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                                <Typography variant='subtitle2'>Giro</Typography>
                                <Typography variant='subtitle1' fontWeight='bold'>
                                  {formatCurrency(financials.currentAccount * 1000000000)}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                                <Typography variant='subtitle2'>Tabungan</Typography>
                                <Typography variant='subtitle1' fontWeight='bold'>
                                  {formatCurrency(financials.savings * 1000000000)}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                                <Typography variant='subtitle2'>Deposito</Typography>
                                <Typography variant='subtitle1' fontWeight='bold'>
                                  {formatCurrency(financials.timeDeposit * 1000000000)}
                                </Typography>
                              </Box>
                              <Divider sx={{ my: 2 }} />
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                                <Typography variant='subtitle2'>DPK Konvensional</Typography>
                                <Typography variant='subtitle1' fontWeight='bold'>
                                  {formatCurrency(financials.conventionalDPK * 1000000000)}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                                <Typography variant='subtitle2'>DPK Syariah</Typography>
                                <Typography variant='subtitle1' fontWeight='bold'>
                                  {formatCurrency(financials.shariaDPK * 1000000000)}
                                </Typography>
                              </Box>
                              <Divider sx={{ my: 2 }} />
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant='subtitle2'>Beban Bunga</Typography>
                                <Typography variant='subtitle1' fontWeight='bold'>
                                  {formatCurrency(financials.interestExpense * 1000000000)}
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value='2'>
                <Grid container spacing={4}>
                  {/* Secondary Reserve */}
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Secondary Reserve' />
                      <CardContent>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                              <Typography variant='subtitle2'>Total Secondary Reserve</Typography>
                              <Typography variant='subtitle1' fontWeight='bold'>
                                {formatCurrency(financials.secondaryReserve * 1000000000)}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                              <Typography variant='subtitle2'>Pendapatan Secondary Reserve</Typography>
                              <Typography variant='subtitle1' fontWeight='bold'>
                                {formatCurrency(financials.secondaryReserveIncome * 1000000000)}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                              <Typography variant='subtitle2'>Suku Bunga Secondary Reserve</Typography>
                              <Typography variant='subtitle1' fontWeight='bold'>
                                {formatPercentage(params.secondaryReserveRate)}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  {/* Income and Expenses */}
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Pendapatan dan Biaya' />
                      <CardContent>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                              <Typography variant='subtitle2'>Total Pendapatan Operasional</Typography>
                              <Typography variant='subtitle1' fontWeight='bold'>
                                {formatCurrency(financials.operatingIncome * 1000000000)}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                              <Typography variant='subtitle2'>Total Biaya Operasional</Typography>
                              <Typography variant='subtitle1' fontWeight='bold'>
                                {formatCurrency(financials.operatingExpense * 1000000000)}
                              </Typography>
                            </Box>
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                              <Typography variant='subtitle2'>Pendapatan Bunga</Typography>
                              <Typography variant='subtitle1' fontWeight='bold'>
                                {formatCurrency(financials.interestIncome * 1000000000)}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                              <Typography variant='subtitle2'>Beban Bunga</Typography>
                              <Typography variant='subtitle1' fontWeight='bold'>
                                {formatCurrency(financials.interestExpense * 1000000000)}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                              <Typography variant='subtitle2'>Pendapatan Bunga Bersih</Typography>
                              <Typography variant='subtitle1' fontWeight='bold'>
                                {formatCurrency((financials.interestIncome - financials.interestExpense) * 1000000000)}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  {/* NPL Details */}
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Rincian NPL' />
                      <CardContent>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                              <Typography variant='subtitle2'>Total NPL</Typography>
                              <Typography variant='subtitle1' fontWeight='bold'>
                                {formatCurrency(financials.nplAmount * 1000000000)}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                              <Typography variant='subtitle2'>Rasio NPL</Typography>
                              <Typography 
                                variant='subtitle1' 
                                fontWeight='bold'
                                color={financials.nplRate <= 3 ? 'success.main' : financials.nplRate <= 5 ? 'warning.main' : 'error.main'}
                              >
                                {formatPercentage(financials.nplRate)}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                              <Typography variant='subtitle2'>CKPN</Typography>
                              <Typography variant='subtitle1' fontWeight='bold'>
                                {formatCurrency(financials.ckpnAmount * 1000000000)}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                              <Typography variant='subtitle2'>NPL Coverage Ratio</Typography>
                              <Typography 
                                variant='subtitle1' 
                                fontWeight='bold'
                                color={financials.nplCoverageRatio >= 100 ? 'success.main' : 'warning.main'}
                              >
                                {formatPercentage(financials.nplCoverageRatio)}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  {/* Balance Sheet Summary */}
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Ringkasan Neraca' />
                      <CardContent>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                              <Typography variant='subtitle2'>Total Aset</Typography>
                              <Typography variant='subtitle1' fontWeight='bold'>
                                {formatCurrency(financials.totalAssets * 1000000000)}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                              <Typography variant='subtitle2'>Total Liabilitas</Typography>
                              <Typography variant='subtitle1' fontWeight='bold'>
                                {formatCurrency(financials.totalLiabilities * 1000000000)}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                              <Typography variant='subtitle2'>Total Ekuitas</Typography>
                              <Typography variant='subtitle1' fontWeight='bold'>
                                {formatCurrency(financials.totalEquity * 1000000000)}
                              </Typography>
                            </Box>
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                              <Typography variant='subtitle2'>Rasio Liabilitas terhadap Aset</Typography>
                              <Typography variant='subtitle1' fontWeight='bold'>
                                {formatPercentage((financials.totalLiabilities / financials.totalAssets) * 100)}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                              <Typography variant='subtitle2'>Rasio Ekuitas terhadap Aset</Typography>
                              <Typography variant='subtitle1' fontWeight='bold'>
                                {formatPercentage((financials.totalEquity / financials.totalAssets) * 100)}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value='3'>
                <Grid container spacing={4}>
                  {/* Financial Ratios Card */}
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Rasio Profitabilitas' />
                      <CardContent>
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Rasio</TableCell>
                                <TableCell align='right'>Nilai</TableCell>
                                <TableCell align='right'>Status</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell>Return on Assets (ROA)</TableCell>
                                <TableCell align='right'>{formatPercentage(financials.roa)}</TableCell>
                                <TableCell 
                                  align='right'
                                  sx={{ 
                                    color: financials.roa >= 1.5 ? 'success.main' : financials.roa >= 0.5 ? 'warning.main' : 'error.main'
                                  }}
                                >
                                  {financials.roa >= 1.5 ? 'Sangat Baik' : financials.roa >= 0.5 ? 'Cukup' : 'Kurang'}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Return on Equity (ROE)</TableCell>
                                <TableCell align='right'>{formatPercentage(financials.roe)}</TableCell>
                                <TableCell 
                                  align='right'
                                  sx={{ 
                                    color: financials.roe >= 15 ? 'success.main' : financials.roe >= 5 ? 'warning.main' : 'error.main'
                                  }}
                                >
                                  {financials.roe >= 15 ? 'Sangat Baik' : financials.roe >= 5 ? 'Cukup' : 'Kurang'}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Net Interest Margin (NIM)</TableCell>
                                <TableCell align='right'>{formatPercentage(financials.nim)}</TableCell>
                                <TableCell 
                                  align='right'
                                  sx={{ 
                                    color: financials.nim >= 5 ? 'success.main' : financials.nim >= 3 ? 'warning.main' : 'error.main'
                                  }}
                                >
                                  {financials.nim >= 5 ? 'Sangat Baik' : financials.nim >= 3 ? 'Cukup' : 'Kurang'}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>BOPO</TableCell>
                                <TableCell align='right'>{formatPercentage(financials.bopo)}</TableCell>
                                <TableCell 
                                  align='right'
                                  sx={{ 
                                    color: financials.bopo <= 85 ? 'success.main' : financials.bopo <= 90 ? 'warning.main' : 'error.main'
                                  }}
                                >
                                  {financials.bopo <= 85 ? 'Sangat Baik' : financials.bopo <= 90 ? 'Cukup' : 'Kurang'}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  {/* Liquidity and Capital Ratios */}
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Rasio Likuiditas dan Permodalan' />
                      <CardContent>
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Rasio</TableCell>
                                <TableCell align='right'>Nilai</TableCell>
                                <TableCell align='right'>Status</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell>Loan to Deposit Ratio (LDR)</TableCell>
                                <TableCell align='right'>{formatPercentage(financials.ldr)}</TableCell>
                                <TableCell 
                                  align='right'
                                  sx={{ 
                                    color: financials.ldr >= 70 && financials.ldr <= 92 ? 'success.main' : 'warning.main'
                                  }}
                                >
                                  {financials.ldr >= 70 && financials.ldr <= 92 ? 'Optimal' : 'Perlu Perhatian'}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Capital Adequacy Ratio (CAR)</TableCell>
                                <TableCell align='right'>{formatPercentage(financials.car)}</TableCell>
                                <TableCell 
                                  align='right'
                                  sx={{ 
                                    color: financials.car >= 14 ? 'success.main' : financials.car >= 8 ? 'warning.main' : 'error.main'
                                  }}
                                >
                                  {financials.car >= 14 ? 'Sangat Baik' : financials.car >= 8 ? 'Cukup' : 'Kurang'}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>NPL Ratio</TableCell>
                                <TableCell align='right'>{formatPercentage(financials.nplRate)}</TableCell>
                                <TableCell 
                                  align='right'
                                  sx={{ 
                                    color: financials.nplRate <= 3 ? 'success.main' : financials.nplRate <= 5 ? 'warning.main' : 'error.main'
                                  }}
                                >
                                  {financials.nplRate <= 3 ? 'Baik' : financials.nplRate <= 5 ? 'Cukup' : 'Kurang'}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>NPL Coverage Ratio</TableCell>
                                <TableCell align='right'>{formatPercentage(financials.nplCoverageRatio)}</TableCell>
                                <TableCell 
                                  align='right'
                                  sx={{ 
                                    color: financials.nplCoverageRatio >= 100 ? 'success.main' : 'warning.main'
                                  }}
                                >
                                  {financials.nplCoverageRatio >= 100 ? 'Baik' : 'Perlu Perhatian'}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  {/* Ratio Comparison */}
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader title='Perbandingan Rasio Antar Skenario' />
                      <CardContent>
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Rasio</TableCell>
                                <TableCell align='right'>Skenario Dasar</TableCell>
                                <TableCell align='right'>Skenario Optimis</TableCell>
                                <TableCell align='right'>Skenario Pesimis</TableCell>
                                <TableCell align='right'>Skenario Aktif</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell>ROA</TableCell>
                                <TableCell align='right'>1.50%</TableCell>
                                <TableCell align='right'>2.10%</TableCell>
                                <TableCell align='right'>0.85%</TableCell>
                                <TableCell align='right'>{formatPercentage(financials.roa)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>NIM</TableCell>
                                <TableCell align='right'>5.20%</TableCell>
                                <TableCell align='right'>5.80%</TableCell>
                                <TableCell align='right'>4.50%</TableCell>
                                <TableCell align='right'>{formatPercentage(financials.nim)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>LDR</TableCell>
                                <TableCell align='right'>90.91%</TableCell>
                                <TableCell align='right'>93.75%</TableCell>
                                <TableCell align='right'>87.72%</TableCell>
                                <TableCell align='right'>{formatPercentage(financials.ldr)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>BOPO</TableCell>
                                <TableCell align='right'>82.00%</TableCell>
                                <TableCell align='right'>78.50%</TableCell>
                                <TableCell align='right'>86.50%</TableCell>
                                <TableCell align='right'>{formatPercentage(financials.bopo)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>CAR</TableCell>
                                <TableCell align='right'>22.00%</TableCell>
                                <TableCell align='right'>21.50%</TableCell>
                                <TableCell align='right'>22.80%</TableCell>
                                <TableCell align='right'>{formatPercentage(financials.car)}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value='4'>
                <Grid container spacing={4}>
                  {/* Credit vs DPK Growth Chart */}
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Pertumbuhan Kredit vs DPK' />
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
                              categories: ['Skenario Dasar', 'Skenario Optimis', 'Skenario Pesimis', 'Skenario Kustom']
                            },
                            yaxis: {
                              title: {
                                text: 'Pertumbuhan (%)'
                              }
                            },
                            fill: {
                              opacity: 1
                            },
                            tooltip: {
                              y: {
                                formatter: function (val) {
                                  return val + '%'
                                }
                              }
                            },
                            colors: ['#00E396', '#008FFB']
                          } as ApexOptions}
                          series={[
                            {
                              name: 'Kredit',
                              data: [
                                scenarios.base.params.creditGrowthRate,
                                scenarios.optimistic.params.creditGrowthRate,
                                scenarios.pessimistic.params.creditGrowthRate,
                                params.creditGrowthRate
                              ]
                            },
                            {
                              name: 'DPK',
                              data: [
                                scenarios.base.params.dpkGrowthRate,
                                scenarios.optimistic.params.dpkGrowthRate,
                                scenarios.pessimistic.params.dpkGrowthRate,
                                params.dpkGrowthRate
                              ]
                            }
                          ]}
                          type='bar'
                          height={350}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  {/* Financial Ratios Chart */}
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Rasio Keuangan' />
                      <CardContent>
                        <ReactApexcharts
                          options={{
                            chart: {
                              type: 'radar',
                              toolbar: {
                                show: true
                              }
                            },
                            xaxis: {
                              categories: ['ROA', 'ROE', 'NIM', 'LDR', 'BOPO', 'CAR']
                            },
                            yaxis: {
                              show: false
                            },
                            markers: {
                              size: 4,
                              colors: ['#FF4560', '#775DD0', '#00E396']
                            },
                            fill: {
                              opacity: 0.7
                            }
                          } as ApexOptions}
                          series={[
                            {
                              name: 'Skenario Aktif',
                              data: [
                                financials.roa,
                                financials.roe / 10, // Scale down for better visualization
                                financials.nim,
                                financials.ldr / 10, // Scale down for better visualization
                                financials.bopo / 10, // Scale down for better visualization
                                financials.car / 10  // Scale down for better visualization
                              ]
                            }
                          ]}
                          type='radar'
                          height={350}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  {/* Credit Composition Chart */}
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Komposisi Kredit/Pembiayaan' />
                      <CardContent>
                        <ReactApexcharts
                          options={{
                            chart: {
                              type: 'pie',
                              toolbar: {
                                show: true
                              }
                            },
                            labels: ['Produktif', 'Konsumtif'],
                            responsive: [{
                              breakpoint: 480,
                              options: {
                                chart: {
                                  width: 200
                                },
                                legend: {
                                  position: 'bottom'
                                }
                              }
                            }],
                            colors: ['#00E396', '#FF4560']
                          } as ApexOptions}
                          series={[financials.productiveCredit, financials.consumerCredit]}
                          type='pie'
                          height={350}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  {/* DPK Composition Chart */}
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Komposisi Dana Pihak Ketiga' />
                      <CardContent>
                        <ReactApexcharts
                          options={{
                            chart: {
                              type: 'donut',
                              toolbar: {
                                show: true
                              }
                            },
                            labels: ['Giro', 'Tabungan', 'Deposito'],
                            responsive: [{
                              breakpoint: 480,
                              options: {
                                chart: {
                                  width: 200
                                },
                                legend: {
                                  position: 'bottom'
                                }
                              }
                            }],
                            colors: ['#008FFB', '#00E396', '#775DD0']
                          } as ApexOptions}
                          series={[financials.currentAccount, financials.savings, financials.timeDeposit]}
                          type='donut'
                          height={350}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value='5'>
                <Grid container spacing={4}>
                  {/* Main Financial Data Table */}
                  <Grid item xs={12}>
                    <Card>
                      <CardHeader title='Tabel Data Keuangan Utama' />
                      <CardContent>
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Indikator</TableCell>
                                <TableCell align='right'>Nilai (dalam Rupiah)</TableCell>
                                <TableCell align='right'>Pertumbuhan</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell>Total Aset</TableCell>
                                <TableCell align='right'>{formatCurrency(financials.totalAssets * 1000000000)}</TableCell>
                                <TableCell align='right'>{formatPercentage((financials.totalAssets / baseValues.totalAssets - 1) * 100)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Total Kredit/Pembiayaan</TableCell>
                                <TableCell align='right'>{formatCurrency(financials.totalCredit * 1000000000)}</TableCell>
                                <TableCell align='right'>{formatPercentage(params.creditGrowthRate)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Total Dana Pihak Ketiga</TableCell>
                                <TableCell align='right'>{formatCurrency(financials.totalDPK * 1000000000)}</TableCell>
                                <TableCell align='right'>{formatPercentage(params.dpkGrowthRate)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Secondary Reserve</TableCell>
                                <TableCell align='right'>{formatCurrency(financials.secondaryReserve * 1000000000)}</TableCell>
                                <TableCell align='right'>{formatPercentage((financials.secondaryReserve / baseValues.secondaryReserve - 1) * 100)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Pendapatan Bunga</TableCell>
                                <TableCell align='right'>{formatCurrency(financials.interestIncome * 1000000000)}</TableCell>
                                <TableCell align='right'>{formatPercentage((financials.interestIncome / baseValues.interestIncome - 1) * 100)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Beban Bunga</TableCell>
                                <TableCell align='right'>{formatCurrency(financials.interestExpense * 1000000000)}</TableCell>
                                <TableCell align='right'>{formatPercentage((financials.interestExpense / baseValues.interestExpense - 1) * 100)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Pendapatan Operasional</TableCell>
                                <TableCell align='right'>{formatCurrency(financials.operatingIncome * 1000000000)}</TableCell>
                                <TableCell align='right'>{formatPercentage((financials.operatingIncome / baseValues.operatingIncome - 1) * 100)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Biaya Operasional</TableCell>
                                <TableCell align='right'>{formatCurrency(financials.operatingExpense * 1000000000)}</TableCell>
                                <TableCell align='right'>{formatPercentage(params.operatingExpenseGrowth)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Laba Bersih</TableCell>
                                <TableCell align='right'>{formatCurrency(financials.netProfit * 1000000000)}</TableCell>
                                <TableCell align='right'>{formatPercentage((financials.netProfit / baseValues.netProfit - 1) * 100)}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  {/* Credit and DPK Breakdown Table */}
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Rincian Kredit/Pembiayaan' />
                      <CardContent>
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Jenis</TableCell>
                                <TableCell align='right'>Nilai (dalam Rupiah)</TableCell>
                                <TableCell align='right'>Persentase</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell colSpan={3} sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Berdasarkan Jenis Penggunaan</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Kredit Produktif</TableCell>
                                <TableCell align='right'>{formatCurrency(financials.productiveCredit * 1000000000)}</TableCell>
                                <TableCell align='right'>{formatPercentage(params.productiveCreditPercentage)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Kredit Konsumtif</TableCell>
                                <TableCell align='right'>{formatCurrency(financials.consumerCredit * 1000000000)}</TableCell>
                                <TableCell align='right'>{formatPercentage(params.consumerCreditPercentage)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell colSpan={3} sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Berdasarkan Jenis Pembiayaan</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Kredit Konvensional</TableCell>
                                <TableCell align='right'>{formatCurrency(financials.conventionalCredit * 1000000000)}</TableCell>
                                <TableCell align='right'>{formatPercentage(params.conventionalCreditPercentage)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Pembiayaan Syariah</TableCell>
                                <TableCell align='right'>{formatCurrency(financials.shariaCredit * 1000000000)}</TableCell>
                                <TableCell align='right'>{formatPercentage(params.shariaCreditPercentage)}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  {/* DPK Breakdown Table */}
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardHeader title='Rincian Dana Pihak Ketiga' />
                      <CardContent>
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Jenis</TableCell>
                                <TableCell align='right'>Nilai (dalam Rupiah)</TableCell>
                                <TableCell align='right'>Persentase</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell colSpan={3} sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Berdasarkan Jenis Produk</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Giro</TableCell>
                                <TableCell align='right'>{formatCurrency(financials.currentAccount * 1000000000)}</TableCell>
                                <TableCell align='right'>{formatPercentage(params.currentAccountPercentage)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Tabungan</TableCell>
                                <TableCell align='right'>{formatCurrency(financials.savings * 1000000000)}</TableCell>
                                <TableCell align='right'>{formatPercentage(params.savingsPercentage)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Deposito</TableCell>
                                <TableCell align='right'>{formatCurrency(financials.timeDeposit * 1000000000)}</TableCell>
                                <TableCell align='right'>{formatPercentage(params.timeDepositPercentage)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell colSpan={3} sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Berdasarkan Jenis Pembiayaan</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>DPK Konvensional</TableCell>
                                <TableCell align='right'>{formatCurrency(financials.conventionalDPK * 1000000000)}</TableCell>
                                <TableCell align='right'>{formatPercentage(params.conventionalDpkPercentage)}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>DPK Syariah</TableCell>
                                <TableCell align='right'>{formatCurrency(financials.shariaDPK * 1000000000)}</TableCell>
                                <TableCell align='right'>{formatPercentage(params.shariaDpkPercentage)}</TableCell>
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

export default SimulationPage
