import Layout from "antd/es/layout/layout"
import { Card, Statistic, List, Spin, Tag } from "antd"
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons"
import { toCapitalize } from "../../../utils"
import { useContext } from "react"
import CryptoContext from "../../../context/crypto-context"

const siderStyle = {
  padding: "1rem",
}

export default function AppSider() {
  const { assets } = useContext(CryptoContext)

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
