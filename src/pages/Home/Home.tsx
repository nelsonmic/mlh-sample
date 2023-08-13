import React from 'react'
import styles from './home.module.scss'
import { Link } from 'react-router-dom'
import Orders from './sections/Orders'
import { chartData, chartLabel } from './data'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // Legend,
  ResponsiveContainer,
} from 'recharts'
import Map from 'components/Map/Map'
import { useGetDashboardStats } from 'api/dashboard'
import Users from '../../assets/icons/activeUsers.svg'
import Earnings from '../../assets/icons/earnings.svg'
import Signup from '../../assets/icons/signup.svg'
import Order from '../../assets/icons/totalOrders.svg'

const Home = () => {
  const { data: stats } = useGetDashboardStats()
  const data = stats?.data

  return (
    <div>
      <div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 pt-8 pb-[70px]'>
        <SummaryCard name='Total Signup' value={data?.total_signup || 0} image={Users} />
        <SummaryCard name='Total Active Users' value={0} image={Signup} />
        <SummaryCard name='Total Orders' value={data?.total_orders || 0} image={Order} />
        <SummaryCard name='Total Earnings' value={data?.total_earnings || 0} image={Earnings} />
      </div>
      <div className={styles.CharTracking}>
        <div className={styles.homeChart}>
          <div className='mb-8'>
            <h3 className='font-medium text-4xl'>Traffic Chart</h3>
          </div>
          <div className={styles.chartCard}>
            <h3>5.987,37</h3>
            <p>Engagements</p>

            <div className={styles.chartLabels}>
              {chartLabel.map((item) => (
                <div key={item.id} className={styles.chartLabel}>
                  <div
                    className={styles.chartLabelColor}
                    style={{
                      backgroundColor: item.color,
                    }}
                  ></div>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>

            <div>
              <ResponsiveContainer width='100%' height={250}>
                <LineChart
                  width={500}
                  height={300}
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis />
                  <Tooltip />
                  {/* <Legend /> */}
                  <Line type='monotone' dataKey='users' stroke='#7F60D2' />
                  <Line type='monotone' dataKey='orders' stroke='#FF6678' />
                  <Line type='monotone' dataKey='revenue' stroke='#78DC99' />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className={styles.liveTracking}>
          <div className='mb-8 flex justify-between items-center'>
            <h3 className='font-medium text-4xl'>Live Tracking</h3>
            <Link to='/' className='font-semi-bolid text-lg bg-grey-100 rounded-[15px] py-2 px-4'>
              Go to page
            </Link>
          </div>

          <div className={styles.mapCard}>
            <Map position={[6.601838, 3.351486]} />
          </div>
        </div>
      </div>
      <Orders />
    </div>
  )
}

type OverviewData = {
  name: string
  value: number | string
  image?: string
}

const SummaryCard = ({ name, value, image }: OverviewData) => {
  return (
    <div className='shadow-sm rounded-[8px] py-14 px-8 border'>
      <div className='flex justify-between'>
        <h2 className='font-medium text-4xl'>{value}</h2>
        <div className='w-[32px] h-[32px]'>
          <img src={image} alt={name} />
        </div>
      </div>
      <p className='text-2xl text-font-black mt-6'>{name}</p>
    </div>
  )
}

export default Home
