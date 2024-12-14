import { HfInference } from '@huggingface/inference';

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`
// console.log(import.meta.env)

const hf = new HfInference(import.meta.env.VITE_RECIPE_KEY)

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })
        return response.choices[0].message.content
    } catch (err) {
        console.error(err.message)
    }
}

// const HF_SPACE_URL = 'https://huggingface.co/spaces/4d0T/mistralai-Mixtral-8x22B-Instruct-v0.1'

// export async function getRecipeFromMistral(ingredientsArr) {
//     const ingredientsString = ingredientsArr.join(", ")
//     const headers = {
//         'Content-Type': 'application/json',
//     }

//     const body = JSON.stringify({
//         inputs: ingredientsString
//     })

//     try {
//         const response = await fetch(HF_SPACE_URL, { 
//             method: 'POST', 
//             headers, 
//             body 
//         })

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`)
//         }

//         const data = await response.json()
        
//         return data || 'No response generated by the model.'

//     } catch (err) {
//         console.error('Error while fetching recipe:', err.message)
//         return 'There was an issue generating the recipe. Please try again later.'
//     }
// }
