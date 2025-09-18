import { useState } from 'react'
import {
  Divider,
  Select,
  Space,
  Typography,
  Flex,
  Form,
  Input,
  InputNumber,
  Button,
  DatePicker,
  Result,
} from 'antd'
import { useCrypto } from '../../context/crypto-context'
import CoinInfo from '../CoinInfo'

// const validateMessage = {
//   required: '${label} is required!',
//   types: {
//     number: '${label} is not correct number',
//   },
//   number: {
//     ramge: '${label} should be between ${min} and ${max}',
//   },
// }

export default function AddAssetForm({ onClose }) {
  const [form] = Form.useForm()
  const { crypto } = useCrypto()
  const [coin, setCoin] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <Result
        status='success'
        title='New asset added!'
        subTitle={`Added ${44} of ${coin.name} by price ${24}`}
        extra={[
          <Button type='primary' key='console' onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    )
  }

  if (!coin) {
    return (
      <Select
        onSelect={(v) => setCoin(crypto.find((c) => c.id == v))}
        placeholder={'Select coin'}
        style={{ width: '100%' }}
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: '25px' }}
              src={option.data.icon}
              alt={option.data.value}
            />{' '}
            {option.data.label}
          </Space>
        )}
      />
    )
  }

  function onFinish(values) {
    console.log('finish', values)
    setSubmitted(true)
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    }
  }

  function handleAmountChange(value) {
    const price = form.getFieldValue('price')
    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    })
  }

  function handlePriceChange(value) {
    const amount = form.getFieldValue('amount')
    form.setFieldsValue({
      total: +(value * amount).toFixed(2),
    })
  }

  return (
    <Form
      form={form}
      name='basic'
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 10 }}
      style={{ width: '100%' }}
      initialValues={{ price: +coin.price.toFixed(2) }}
      onFinish={onFinish}
      // validateMessage={validateMessage}
    >
      <CoinInfo coin={coin} />
      <Divider />

      <Form.Item
        label='Amount'
        name='amount'
        style={{ width: '100%' }}
        rules={[
          {
            required: true,
            type: 'number',
            min: 0,
          },
        ]}
      >
        <InputNumber
          placeholder='Enter coin amount'
          onChange={handleAmountChange}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item label='Price' name='price'>
        <InputNumber onChange={handlePriceChange} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label='Date & time' name='date'>
        <DatePicker
          showTime
          format='YYYY-MM-DD HH:mm:ss'
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item label='Total' name='total'>
        <InputNumber disabled style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Add asset
        </Button>
      </Form.Item>
    </Form>
  )
}
