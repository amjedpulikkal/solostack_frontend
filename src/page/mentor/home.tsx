import React from 'react'
import NaveBar from './navBar'
import { ApexChart } from '@/components/mentor/ApexChart'
import MTimerTab from '@/components/mentor/mentorTimerTabs'
import SparkLinesChart from '@/components/ApexChart/sparklines'
import HeatmapCharts from '@/components/ApexChart/heatmapCharts'

export default function MentorHome() {
    return (
        <>
            <div className="w-full h-full">
                <NaveBar />
                <SparkLinesChart />
                <div className='flex justify-between p-5 gap-1'>
                    <div className='w-[57%]'>
                        <ApexChart />
                    </div>
                    <div className='w-[45%]'>
                        <MTimerTab />
                    </div>

                </div>
                <div>
                    <HeatmapCharts />   
                </div>
            </div>
        </>
    )
}
