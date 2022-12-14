import React from 'react'
import { connectToDatabase } from '../../lib/mongoConnect'
import { ObjectId } from 'mongodb'

import Slider from '../../components/Slider'
import Heading from '../../components/Heading'

import styles from "../../styles/singlePage.module.css"

function DetailPage({detailData,dataSlider}) {

    return (
    <div className={styles.container}>
        <Heading />
        <Slider dataSlider={dataSlider} idx={detailData.idx}/>        
    </div>
  )
}

export async function getServerSideProps (context){
    const detailId = context.params.detailId

    const client = await connectToDatabase()
    const db = client.db()
    const detaisCollection = db.collection('documents');

    const detailData = await detaisCollection.findOne({_id: new ObjectId(detailId)})

    const  data = await detaisCollection.find({}).toArray()

    client.close()
    return {
        props: {
            detailData: {
                id: detailData._id.toString(),
                title: detailData.title,
                description: detailData.description,
                image: detailData.image,
                idx: detailData.idx
             },
             dataSlider: data.map((item) => ({
                title: item.title,
                description: item.description,
                image: item.image,
                id: item._id.toString(),
                idx: item.idx
              }))
            }
        }
    }


export default DetailPage
