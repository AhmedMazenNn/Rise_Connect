export interface SlackMessage {
  name: string;
  email: string;
  company: string;
  message: string;
}

export function isValidSlackWebhook(value?: string): value is string {
  return !!value && /^https:\/\/hooks\.slack\.com\/services\//.test(value.trim());
}

// Posts to the configured destination. In production this should be a Cloudflare
// Worker endpoint; the legacy webhook shape remains supported for local setup.
export async function sendSlackMessage(endpointUrl: string, data: SlackMessage): Promise<void> {
  const payload = {
    text: `New website inquiry from ${data.name}`,
    blocks: [
    { type: 'header', text: { type: 'plain_text', text: '📬 New website inquiry' } },
    {
      type: 'section',
      fields: [
      { type: 'mrkdwn', text: `*Name*\n${data.name}` },
      { type: 'mrkdwn', text: `*Email*\n${data.email}` },
      { type: 'mrkdwn', text: `*Company*\n${data.company || '—'}` }]

    },
    { type: 'section', text: { type: 'mrkdwn', text: `*Message*\n${data.message}` } }]

  };
  const isWorker = !isValidSlackWebhook(endpointUrl);
  await fetch(endpointUrl.trim(), {
    method: 'POST',
    mode: isWorker ? 'cors' : 'no-cors',
    headers: { 'Content-Type': isWorker ? 'application/json' : 'application/x-www-form-urlencoded' },
    body: isWorker ? JSON.stringify(data) : `payload=${encodeURIComponent(JSON.stringify(payload))}`
  });
}
