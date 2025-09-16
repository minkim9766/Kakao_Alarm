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

// pages/api/webhook.js
export default function handler(req, res) {
  res.status(200).json({
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: "안녕하세요! 챗봇이 준비되었습니다 ✅",
          },
        },
      ],
    },
  });
}

