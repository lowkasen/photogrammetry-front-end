import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Homebar } from '../../components/homebar'

const video: NextPage = () => {
  return (
    <div>
        <Homebar/>
        <h1>Upload video</h1>
    </div>
  )
}

export default video
