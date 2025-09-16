// pages/api/webhook.js

export default function handler(req, res) {
  res.status(200).json({
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: "안녕하세요! 카카오 챗봇 서버가 잘 연결되었습니다 ✅",
          },
        },
      ],
    },
  });
}
