import axios from 'axios'
import { storageService } from './storage.service'
const MARKET_PRICE_KEY = 'marketPriceDB'
const BLOCK_SIZE_KEY = 'blockSizeDB'
const TRADE_VOLUME_KEY = 'tradeVolumeDB'
export const bitcoinService = {
  getRate,
  getTradeVolume,
  getMarketPrice,
  getConfirmedTransactions,
}
async function getRate(coins) {
  const url = `https://blockchain.info/tobtc?currency=USD&value=${coins}`
  try {
    const rate = await axios({
      method: 'get',
      url,
    })
    return rate.data
  } catch (err) {
    console.log('error rate', err)
  }
}
async function getTradeVolume() {
  const storedTradeVolume = storageService.load(TRADE_VOLUME_KEY)
  if (storedTradeVolume) return storedTradeVolume
  try {
    const response = await axios.get(
      'https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true'
    )
    const data = response.data
    storageService.save(TRADE_VOLUME_KEY, data)
    return data
  } catch (err) {
    console.error('Error getting trade volume:', err)
    return null
  }
}

async function getMarketPrice() {
  const storedMarketPrices = storageService.load(MARKET_PRICE_KEY)
  if (storedMarketPrices) return storedMarketPrices
  try {
    const response = await axios.get(
      `https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`
    )
    const data = response.data
    storageService.save(MARKET_PRICE_KEY, data)
    return data
  } catch (err) {
    console.error('Error getting market prices:', err)
    return null
  }
}

async function getConfirmedTransactions() {
  const storedBlockSizes = storageService.load(BLOCK_SIZE_KEY)
  if (storedBlockSizes) return storedBlockSizes
  try {
    const response = await axios.get(
      `https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true`
    )
    const data = response.data
    storageService.save(BLOCK_SIZE_KEY, data)
    return data
  } catch (err) {
    console.error('Error getting block size:', err)
    return null
  }
}
