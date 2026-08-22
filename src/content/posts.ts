
export type Post = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  /** ISO date — drives ordering and the <time> element. */
  date: string;
  readingTime: string;
  /** Paragraphs. A CMS would return rich text here instead. */
  body: string[];
};

/**
 * CMS-ready: same shape a headless CMS would return. Swap this array for a
 * fetch and every listing, detail page and sitemap entry follows.
 */
export const posts: Post[] = [
  {
    slug: "best-summer-destinations",
    title: "Where to Go This Summer, and When to Book It",
    category: "Destinations",
    excerpt:
      "The honest version: three regions worth your summer, and the booking window that decides what you pay for each.",
    date: "2026-04-12",
    readingTime: "5 min",
    body: [
      "Summer travel from Kosovo divides neatly into three: the Aegean and Turkish coast, the Red Sea, and the long-haul options that only make sense with two full weeks.",
      "The Aegean is the easiest. Short flights, warm sea from June, and enough range between Greek islands and the Turkish coast that there is something at almost every budget.",
      "Egypt is the value option and stays comfortable later into autumn than most people expect. It is also the region where hotel choice matters most — the gap between resorts is enormous.",
      "For long-haul, book by February. Prices for July and August do not improve as the date approaches, whatever the internet tells you.",
    ],
  },
  {
    slug: "weekend-escapes-in-europe",
    title: "Weekend Escapes That Are Genuinely Worth the Flight",
    category: "City Breaks",
    excerpt:
      "A weekend away only works if the travel does not eat it. These cities are close enough to leave on Friday and still have a Saturday.",
    date: "2026-03-28",
    readingTime: "4 min",
    body: [
      "The test for a weekend city is simple: can you be somewhere pleasant by Friday evening, and home Sunday night without losing the day?",
      "Istanbul passes easily and offers more than most capitals twice its reputation. Vienna and Budapest work for the same reason — short flights and compact centres.",
      "Book the hotel by neighbourhood, not by price. On a two-night trip, twenty minutes of commuting each way is a meaningful share of the holiday.",
    ],
  },
  {
    slug: "what-to-pack",
    title: "What to Actually Pack (And What to Leave)",
    category: "Travel Tips",
    excerpt:
      "Cabin-bag discipline, the documents that matter, and the three things travellers most often forget.",
    date: "2026-03-05",
    readingTime: "6 min",
    body: [
      "Almost everyone overpacks clothes and underpacks documents. Reverse it.",
      "Keep passports, booking references, insurance and any visa paperwork in one place — physical and photographed. Every problem we help solve mid-trip is easier when this exists.",
      "Medication, chargers and one change of clothes belong in your cabin bag, always. Checked luggage catches up with you eventually; the first evening does not wait.",
    ],
  },
  {
    slug: "destinations-for-couples",
    title: "Six Destinations That Suit Two People",
    category: "Couples",
    excerpt:
      "Quiet, walkable and slow. Places where the plan can be nothing more than dinner.",
    date: "2026-02-18",
    readingTime: "5 min",
    body: [
      "The best couples' destinations share one quality: they reward doing very little.",
      "Santorini in shoulder season, the Amalfi coast in May, Ubud away from the main road — all of them are transformed by going slightly off the peak week.",
      "If it is a honeymoon or an anniversary, tell the hotel when we book. It costs nothing and changes the welcome.",
    ],
  },
  {
    slug: "family-holiday-ideas",
    title: "Family Holidays That Work for Everyone",
    category: "Family",
    excerpt:
      "Flight times, room configurations and the resort details that decide whether the week is restful or not.",
    date: "2026-01-30",
    readingTime: "5 min",
    body: [
      "A family holiday is judged on the difficult hours: the transfer, the first evening, the afternoon it rains.",
      "Direct flights at civilised times are worth paying for. So are connecting rooms, and a hotel where food is available outside fixed hours.",
      "Turkey and Egypt remain the strongest value for families travelling from Kosovo, with Spain and Greece close behind in shoulder season.",
    ],
  },
  {
    slug: "diaspora-travel-tips",
    title: "Travelling Home: Booking the Busy Months",
    category: "Diaspora",
    excerpt:
      "July, August and December behave differently from the rest of the year. Here is how to book them.",
    date: "2026-01-14",
    readingTime: "4 min",
    body: [
      "Three windows carry most diaspora travel: mid-July to late August, the fortnight around New Year, and the days either side of Eid.",
      "Fares in these windows are set by demand months ahead. Booking early is not a small saving — it is usually the difference between a comfortable fare and an uncomfortable one.",
      "If your dates have any flexibility at all, tell us the range rather than a single day. It is frequently worth a great deal.",
    ],
  },
];

export const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export const postCategories = Array.from(new Set(posts.map((p) => p.category))).sort();
