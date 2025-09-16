// pages/index.js

export default function Home() {
  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>✅ Kakao Chatbot Server</h1>
      <p>서버가 정상적으로 실행 중입니다.</p>
      <p>API Routes:</p>
      <ul>
        <li><code>/api/webhook</code> → 카카오 오픈빌더 webhook</li>
        <li><code>/api/send-due</code> → 예약 발송 트리거</li>
      </ul>
    </main>
  );
}
