import admin from 'firebase-admin';
import { DateTime } from 'luxon';

// Firebase init
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))
  });
}
const db = admin.firestore();

function next640() {
  const now = DateTime.now().setZone('Asia/Seoul');
  let target = now.set({ hour: 6, minute: 40, second: 0, millisecond: 0 });
  if (now >= target) target = target.plus({ days: 1 });
  return target.toJSDate();
}

export default async function handler(req, res) {
  const userRequest = req.body.userRequest; // 카카오 오픈빌더 기본 구조
  const userId = userRequest.user.id;
  const msg = userRequest.utterance;

  // DB에 저장 (오늘/내일 6:40에 보낼 예정)
  await db.collection('schedules').add({
    userId,
    message: msg,
    sendAt: next640(),
    status: 'pending'
  });

  // 챗봇 즉시 응답 (받았다는 확인)
  res.json({
    version: "2.0",
    template: {
      outputs: [
        { simpleText: { text: `메시지를 저장했어요! 내일 아침 6:40에 다시 보내줄게요.` } }
      ]
    }
  });
}

