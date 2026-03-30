import Parser from 'rss-parser';
import type { ArticleResponse } from '../services/article.service';

const usedArticles = new Set<string>();

// Maak parser aan en definieer extra namespaces voor media:content en dc:creator
const parser = new Parser({
   customFields: {
      item: [
         ['media:content', 'mediaContent', { keepArray: true }],
         ['dc:creator', 'creator'],
         ['category', 'categories', { keepArray: true }],
      ],
   },
});

interface Article {
   title: string;
   link: string;
   pubDate: Date;
   description: string;
   creator: string;
   categories: string[];
   mediaContent?: any[];
}

// Functie om RSS-feed van Observador op te halen en te parseren
async function fetchObservadorArticles(): Promise<Article[]> {
   const feed = await parser.parseURL('https://www.observador.pt/rss/ultimas');

   return feed.items.map((item: any) => ({
      title: item.title,
      link: item.link,
      pubDate: new Date(item.pubDate),
      description: item.description,
      creator: item.creator,
      categories: item.categories || [],
      mediaContent: item.mediaContent || [],
   }));
}

// Filter alleen artikelen van de laatste 24 uur
function filterRecentArticles(
   articles: Article[],
   category: string
): Article[] {
   const now = Date.now();
   const day = 24 * 60 * 60 * 1000;

   return articles
      .filter((a) => a.categories.indexOf(category) > -1)
      .filter((a) => now - a.pubDate.getTime() < day);
}

// Verwijder reeds gebruikte artikelen (op basis van link)
function pickRandomArticle(
   articles: Article[],
   used: Set<string>
): Article | undefined {
   const available = articles.filter((a) => !used.has(a.link));
   if (available.length === 0) return undefined;

   const random = available[Math.floor(Math.random() * available.length)];
   if (random && random.link) used.add(random.link);
   return random;
}

export const Observador = {
   async getArticleByCategory(cat: string): Promise<ArticleResponse> {
      const allArticles = await fetchObservadorArticles();
      const recentArticles = filterRecentArticles(allArticles, cat);
      const article = pickRandomArticle(recentArticles, usedArticles);

      // get image
      let imageUrl: string | undefined;
      const imageItem = article?.mediaContent?.find(
         (m: any) => m.$?.medium === 'image'
      );
      if (imageItem) imageUrl = imageItem.$?.url;

      return {
         title: article?.title ?? '',
         description: article?.description ?? '',
         text: '',
         link: article?.link ?? '',
         creator: article?.creator ?? '',
         pubDate: article?.pubDate ?? new Date(),
         categories: article?.categories ?? [],
         imageUrl: imageUrl ?? '',
      };
   },
};
