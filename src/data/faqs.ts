export type Faq = {
  question: string
  answer: string
}

export const faqs: Faq[] = [
  {
    question: "What internet speed do I need?",
    answer:
      "We recommend at least 15 Mbps for 720p60, 25 Mbps for 1080p60 and 50 Mbps for 4K. AmberStream adapts your bitrate in real time, so brief dips won't kick you out of a session.",
  },
  {
    question: "Which devices can I play on?",
    answer:
      "Anything with a modern browser: laptop, desktop, tablet, phone, smart TV or a Steam Link. Pair any Bluetooth or USB controller, or fall back to keyboard and mouse.",
  },
  {
    question: "Do I keep my existing game libraries?",
    answer:
      "Yes. Connect your Steam, Epic and GOG accounts and stream the games you already own. The AmberStream library adds 150+ included titles on top, depending on your plan.",
  },
  {
    question: "How does the free tier work?",
    answer:
      "Starter gives you one hour of play per day at 720p, forever, with no card required. It's the fastest way to test your connection before committing to a plan.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Absolutely. Plans are month-to-month (or yearly if you choose) and you can cancel in two clicks from Settings. Your cloud saves are kept for 90 days after cancellation.",
  },
  {
    question: "How much data does streaming use?",
    answer:
      "Roughly 3 GB per hour at 1080p60 and up to 10 GB per hour at 4K. If you're on a metered connection, cap your stream quality in Settings to control usage.",
  },
]
