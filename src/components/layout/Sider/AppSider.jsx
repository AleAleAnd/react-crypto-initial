import Layout from "antd/es/layout/layout"
import { Card, Statistic, List, Typography, Spin, Tag } from "antd"
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { FakeFetchCrypto, FetchAssets } from "../../../api"
import { percentDifference, toCapitalize } from "../../../utils"

const siderStyle = {
  padding: "1rem",
}

export default function AppSider() {
  const [loading, setLoading] = useState(false)
  const [crypto, setCrypto] = useState([])
  const [assets, setAssets] = useState([])

  useEffect(() => {
    async function preload() {
      setLoading(true)
      const { result } = await FakeFetchCrypto()
      const assets = await FetchAssets()

      setAssets(
        assets.map((asset) => {
          const coin = result.find((c) => c.id == asset.id)
          return {
            grow: asset.price < coin.price,
            growPercent: percentDifference(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfit: asset.amount * coin.price - asset.amount * asset.price,
            ...asset,
          }
        })
      )
      setCrypto(result)
      setLoading(false)
    }
    preload()
  }, [])

  if (loading) {
    return <Spin fullscreen />
  }

  return (
    <Layout.Sider width="33.33%" style={siderStyle}>
      {assets.map((asset) => (
        <Card key={asset.id} style={{ marginBottom: "1rem" }}>
          <Statistic
            title={toCapitalize(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />

          <List
            header={<div></div>}
            footer={<div></div>}
            bordered
            size="small"
            dataSource={[
              {
                title: "Total Profit",
                value: asset.totalProfit.toFixed(2) + " $",
                isGrow: true,
                withTag: true,
              },
              {
                title: "Asset amout",
                value: asset.amount + " " + asset.id + "s",
              },
            ]}
            renderItem={(item) => (
              <List.Item>
                <span>{item.title}</span>
                <span
                  style={{
                    color: item.isGrow
                      ? asset.grow
                        ? "#3f8600"
                        : "#cf1322"
                      : "#000",
                  }}
                >
                  {item.withTag && (
                    <Tag color={asset.grow ? "green" : "red"}>
                      {asset.grow ? "+" : "-"}
                      {asset.growPercent.toFixed(2) + "%"}
                    </Tag>
                  )}
                  {item.value}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  )
}
