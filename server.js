const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve static files from the root directory

const deepseekApiKey = process.env.DEEPSEEK_API_KEY;
const deepseekApiUrl = 'https://api.deepseek.com/chat/completions';

async function getAiInterpretation(data) {
    if (!deepseekApiKey) {
        console.error("DeepSeek API key is not set.");
        return {
            html: `<div class="interpretation"><h3>AI 配置错误</h3><p>服务器未能找到 DeepSeek API 密钥，请检查环境变量配置。</p></div>`
        };
    }

    const prompt = `
        你是一位精通周易解读的智者。请根据以下信息，为用户提供一次深刻且富有启发性的占卜解读。
        用户的姓名是 ${data.name}。
        他们的问题是：“${data.question}”。
        占卜得到的本卦是 ${data.originalHexagram.name} (${data.originalHexagram.symbol})，卦辞是：${data.originalHexagram.meaning}。
        ${data.hasChangedHexagram ? `变卦为 ${data.changedHexagram.name} (${data.changedHexagram.symbol})，卦辞是：${data.changedHexagram.meaning}。` : ''}
        ${data.changingLines.length > 0 ? `变爻是第 ${data.changingLines.map(l => l.index + 1).join(', ')} 爻。` : '没有变爻。'}

        请结合用户的具体问题，深入解读卦象的含义，并提供关于他们所问之事的具体建议和未来趋势分析。
        请用亲切、智慧且鼓励人心的语气，生成一段 HTML 格式的解读，只需要返回 div 标签内部的内容，不要包含 "<html>", "<body>", 或 "<div class='interpretation'>" 标签本身。
    `;

    try {
        const response = await axios.post(deepseekApiUrl, {
            model: "deepseek-chat",
            messages: [
                { "role": "system", "content": "You are a wise I Ching master." },
                { "role": "user", "content": prompt }
            ],
            temperature: 0.7,
            stream: false
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${deepseekApiKey}`
            }
        });

        if (response.data && response.data.choices && response.data.choices.length > 0) {
            const content = response.data.choices[0].message.content;
            return { html: `<div class="interpretation">${content}</div>` };
        } else {
            throw new Error("Invalid response structure from DeepSeek API.");
        }

    } catch (error) {
        console.error("Error calling DeepSeek AI:", error.response ? error.response.data : error.message);
        return {
            html: `<div class="interpretation"><h3>AI 解读失败</h3><p>抱歉，连接智慧的桥梁暂时中断，请稍后再试或检查服务器配置。</p></div>`
        };
    }
}

app.post('/api/divine', async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(400).json({ error: 'No data provided' });
        }
        
        const aiResult = await getAiInterpretation(data);
        res.json(aiResult);

    } catch (error) {
        console.error('Error in /api/divine:', error);
        res.status(500).json({ error: 'An internal server error occurred' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
