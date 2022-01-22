import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Homebar } from '../../components/homebar'

const images: NextPage = () => {
  return (
    <div>
      <Homebar/>
      <h1>Upload images</h1>
      <form action="/">
        <input type="file" id="myFile" name="filename" multiple></input>
        <input type="submit"></input>
      </form>
    </div>
  )
}

export default images
