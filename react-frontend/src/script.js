async function callgpt(input){

    const { Configuration, OpenAIApi } = require("openai");

    const configuration = new Configuration({
    apiKey: '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',
    });
    const openai = new OpenAIApi(configuration);

    const msg = input;

    const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: msg}],
    });

    const response = completion.data.choices[0].message.content;
    console.log(completion.data.choices[0].message.content);
    
    return "hi";


};

export default callgpt;
