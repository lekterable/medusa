import { MoneyAmount, PriceList } from "@models"

import { SqlEntityManager } from "@mikro-orm/postgresql"
import { defaultPriceListData } from "./data"

export async function createPriceLists(
  manager: SqlEntityManager,
  priceListsData: any[] = defaultPriceListData
): Promise<PriceList[]> {
  const priceLists: PriceList[] = []

  for (let priceListData of priceListsData) {
    const { prices, ...rest } = priceListData
    const priceList: PriceList = manager.create(PriceList, rest)

    const createdPrices: MoneyAmount[] = []
    if (prices?.length) {
      for (let price of prices) {
        const createdPrice = manager.create(MoneyAmount, price)
        createdPrices.push(createdPrice)
      }

      priceList.money_amounts = createdPrices
    }

    priceLists.push(priceList)
  }

  await manager.persistAndFlush(priceLists)

  return priceLists
}
