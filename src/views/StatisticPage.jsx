import React, { Component } from 'react'
import { bitcoinService } from '../services/bitcoin.service.js'
import { predefinedColors } from '../cmps/colors.jsx'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  CategoryScale,
  Tooltip,
} from 'chart.js'
Chart.register(
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  CategoryScale,
  Tooltip
)

export class StatisticPage extends Component {
  state = {
    currChart: 'Trade Volume',
    chartList: ['Trade Volume', 'Market Price', 'Block Size'],
    chartData: {
      labels: [],
      datasets: [
        {
          label: '',
          data: [],
          backgroundColor: [],
          borderColor: '#1C758A',
          borderWidth: 1,
        },
      ],
    },
    chartType: 'line',
  }

  async componentDidMount() {
    await this.setTradeVolume()
  }

  setTradeVolume = async () => {
    try {
      const tradeVolumes = await bitcoinService.getTradeVolume()
      const tradeVolume = tradeVolumes.values.map((value) => value.y)
      const timestamps = tradeVolumes.values.map((value) =>
        new Date(value.x * 1000).toLocaleDateString()
      )
      this.updateChartData('Trade Volume', tradeVolume, timestamps)
    } catch (err) {
      console.error('Error getting trade volume:', err)
      return null
    }
  }

  setMarketPrice = async () => {
    try {
      const marketPrices = await bitcoinService.getMarketPrice()
      const marketPrice = marketPrices.values.map((value) => value.y)
      const timestamps = marketPrices.values.map((value) =>
        new Date(value.x * 1000).toLocaleDateString()
      )
      this.setState({ data: marketPrice }, () => {
        this.updateChartData('Market Price', marketPrice, timestamps)
      })
    } catch (err) {
      console.error('Error getting market price:', err)
      return null
    }
  }

  setConfirmedTransactions = async () => {
    try {
      const confirmedTransactions =
        await bitcoinService.getConfirmedTransactions()
      const blockSize = confirmedTransactions.values.map((value) => value.y)
      const timestamps = confirmedTransactions.values.map((value) =>
        new Date(value.x * 1000).toLocaleDateString()
      )
      this.setState({ data: blockSize }, () => {
        this.updateChartData('Block Size', blockSize, timestamps)
      })
    } catch (err) {
      console.error('Error getting confirmed transactions:', err)
      return null
    }
  }

  updateChartData = (label, data, timestamps) => {
    try {
      const slicedData = data.slice(0, 100)
      const slicedTimestamps = timestamps.slice(0, 100)

      this.setState({
        chartData: {
          labels: slicedTimestamps,
          datasets: [
            {
              label,
              data: slicedData,
              backgroundColor: slicedData.map(
                (_, idx) => predefinedColors[idx % predefinedColors.length]
              ),
              borderColor: '#5CD2F0',
              borderWidth: 1,
            },
          ],
        },
      })
    } catch (err) {
      console.error(`Error updating chart data for ${label}: `, err)
    }
  }

  handleChartChange = (selectedChart) => {
    this.setState({ currChart: selectedChart }, async () => {
      switch (selectedChart) {
        case 'Market Price':
          await this.setMarketPrice()
          break
        case 'Block Size':
          await this.setConfirmedTransactions()
          break
        case 'Trade Volume':
          await this.setTradeVolume()
          break
        default:
          await this.setTradeVolume()
          break
      }
    })
  }

  handleChartTypeChange = () => {
    const { chartType } = this.state
    const newChartType = chartType === 'line' ? 'bar' : 'line'
    this.setState({ chartType: newChartType })
  }

  render() {
    const { chartList, chartData, chartType, currChart } = this.state
    if (!chartData) return <div className="loader"></div>

    const options = {
      scales: {
        y: {
          type: 'linear',
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
            lineWidth: 1,
            drawBorder: false,
          },
          ticks: {
            color: 'white',
          },
        },
        x: {
          display: true,
          beginAtZero: true,
          grid: {
            display: false,
          },
          ticks: {
            color: 'white',
            callback: (value, index) => index + 1,
            maxTicksLimit: 34,
          },
        },
      },
      plugins: {
        tooltip: {
          enabled: true,
          mode: 'index',
          intersect: false,
          callbacks: {
            title: (context) => {
              return chartData.labels[context[0].dataIndex]
            },
            label: (context) => {
              return `${chartData.datasets[0].label}: ${context.parsed.y}`
            },
          },
        },
      },
    }

    return (
      <section className="statics-container">
        <div className="chart-buttons-container">
          <button
            className="btn-chart-type"
            onClick={this.handleChartTypeChange}
          >
            Switch to {chartType === 'line' ? 'bar' : 'line'} chart
          </button>
          <div className="chart-options">
            {chartList.map((chartOption, idx) => (
              <button
                key={chartOption + idx}
                onClick={() => this.handleChartChange(chartOption)}
              >
                {chartOption}
              </button>
            ))}
          </div>
        </div>
        {chartType === 'line' ? (
          <Line data={chartData} options={options} />
        ) : (
          <Bar data={chartData} options={options} />
        )}
      </section>
    )
  }
}
