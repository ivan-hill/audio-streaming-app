
export function verifyEnv() {
    console.log('NEXT_PUBLIC_PUSHER_KEY:', process.env.NEXT_PUBLIC_PUSHER_KEY);
    console.log('NEXT_PUBLIC_PUSHER_CLUSTER:', process.env.NEXT_PUBLIC_PUSHER_CLUSTER);
    console.log('NEXT_PUBLIC_PUSHER_CHANNEL:', process.env.NEXT_PUBLIC_PUSHER_CHANNEL);
    console.log('NEXT_PUBLIC_PUSHER_EVENT:', process.env.NEXT_PUBLIC_PUSHER_EVENT);
  }
  