import { AHChunks, AHJSON, AHVideos } from "./../types/index";
import { Configuration, OpenAIApi } from "openai";
import fs from "fs"
import {loadEnvConfig} from "@next/env"
import  {createClient} from "@supabase/supabase-js"

loadEnvConfig("")

const generateEmbeddings = async (videos: AHVideos[]) => {

const configuration = new Configuration({apiKey: process.env.OPENAI_API_KEY})
const openai = new OpenAIApi(configuration)

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!)


for (let i = 0; i < videos.length; i++) {
    const video = videos[i]
    
    for (let j = 0; j < video.chunks.length; j++) {
        const chunk = video.chunks[j]
        const captions = chunk.captions
        const title = chunk.title
        
        
        const embeddingResponse = await openai.createEmbedding({
            model: "text-embedding-ada-002",
            input: captions
        })

        const [{embedding}] = embeddingResponse.data.data

        const {data, error} = await supabase.from("alex_hormozi").insert({
            title: title,
            captions: captions,
            captionTokens: chunk.captionsTokens,
            embedding
        }).select("*")


        if (error) {
            console.log("error")
        } else {
            console.log("success", i, j)
        }


        await new Promise((resolve) => setTimeout(resolve, 300)) 
    }
}
}


( async() => {
    const json: AHJSON = JSON.parse(fs.readFileSync("./data/alex_hormozi.json", "utf-8"))

    await generateEmbeddings(json.videos)
})