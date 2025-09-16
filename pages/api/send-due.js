import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))
  });
}
const db = admin.firestore();

export default async function handler(req, res) {
  const now = new Date();

  // 5분 오차 범위 안의 메시지만 보냄 (6:40 ~ 6:45)
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 40);
  const end = new Date(start.getTime() + 5 * 60000);

  const snaps = await db.collection('schedules')
    .where('status', '==', 'pending')
    .where('sendAt', '>=', start)
    .where('sendAt', '<=', end)
    .get();

  const results = [];
  for (const doc of snaps.docs) {
    const data = doc.data();
    // 오픈빌더 응답 포맷 → 사용자에게 보내는 로직
    // 여기서는 "푸시" 개념이라 오픈빌더의 "푸시 API"를 사용해야 함.
    // (Business 인증된 챗봇이면 send API 가능)
    // 초보자는 일단 "웹훅 응답"으로 연습하세요.
    results.push(data.message);
    await doc.ref.update({ status: 'sent' });
  }

  res.json({ ok: true, sent: results });
}
